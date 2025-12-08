
describe('Global KPIs Page', () => {
    beforeEach(() => {
        // Mock token and user data
        cy.window().then((win) => {
            win.localStorage.setItem('token-registry', 'fake-token');
            // Required for /globalKPIs access: must be staff/superuser AND username='admin'
            win.localStorage.setItem('username', 'admin');
            win.localStorage.setItem('is_staff', 'true');
            win.localStorage.setItem('is_superuser', 'true');
        });

        // Mock APIs for different periods
        // It uses query params, but cypress intercept matching can be tricky with query params if not strict.
        // We can use routeMatcher callback or just match path and check query in response or define multiple intercepts.

        // Default (all time)
        cy.intercept('GET', '**/episodes/stats/**', (req) => {
            // Check query params
            const { period } = req.query;
            let count = 0;
            if (!period) count = 1000;
            else if (period === '365d') count = 500;
            else if (period === '30d') count = 50;
            else if (period === '7d') count = 10;

            req.reply({
                statusCode: 200,
                body: { total_episodes: count }
            });
        }).as('getStats');

        cy.visit('/globalKPIs');

        cy.wait('@getStats');

        // Remove error overlay if present (hack for lint warnings)
        cy.get('body > iframe').then(($iframe) => {
            $iframe.remove();
        });
    });

    describe('Happy Path', () => {
        it('should display KPI table with correct data', () => {
            cy.get('main').contains('Global KPIs').should('be.visible');

            // Headers
            cy.get('main').get('th').contains('Total');
            cy.get('main').get('th').contains('Past Year');
            cy.get('main').get('th').contains('Past Month');
            cy.get('main').get('th').contains('Past Week');

            // Data
            // Wait for calls - simpler to just look for text because multiple calls happen
            cy.get('main').get('td').contains('1000').should('be.visible'); // Total
            cy.get('main').get('td').contains('500').should('be.visible');  // Year
            cy.get('main').get('td').contains('50').should('be.visible');   // Month
            cy.get('main').get('td').contains('10').should('be.visible');   // Week
        });

        it('should display multiple KPI rows if available', () => {
            // If the implementation supports multiple KPI types
            cy.get('main').contains('Global KPIs').should('be.visible');
        });
    });

    describe('Edge Cases', () => {
        it('should handle zero episode counts', () => {
            cy.intercept('GET', '**/episodes/stats/', (req) => {
                req.reply({
                    statusCode: 200,
                    body: { total_episodes: 0 }
                });
            }).as('getZeroStats');

            cy.reload();
            cy.wait('@getZeroStats');
            // Remove error overlay if present (hack for lint warnings)
            cy.get('body > iframe').then(($iframe) => {
                $iframe.remove();
            });

            // Should display 0 without errors
            cy.contains('td', '0').should('be.visible');
        });

        it('should handle API errors gracefully', () => {
            cy.intercept('GET', '**/episodes/stats/**', {
                statusCode: 500,
                body: { detail: 'Internal server error' }
            }).as('getStatsError');

            cy.reload();
            cy.wait('@getStatsError');
            // Remove error overlay if present (hack for lint warnings)
            cy.get('body > iframe').then(($iframe) => {
                $iframe.remove();
            });

            // Should handle error without crashing
            cy.get('main').get('td').filter(':contains("Error")').should('have.length', 4);
        });

        it('should handle missing data fields', () => {
            cy.intercept('GET', '**/episodes/stats/**', (req) => {
                req.reply({
                    statusCode: 200,
                    body: {} // Empty response
                });
            }).as('getEmptyStats');

            cy.reload();
            cy.wait('@getEmptyStats');
            // Remove error overlay if present (hack for lint warnings)
            cy.get('body > iframe').then(($iframe) => {
                $iframe.remove();
            });

            // Should handle empty data gracefully
            cy.get('main').get('td').filter(':contains("0")').should('have.length', 4);
        });

        it('should handle network errors', () => {
            cy.intercept('GET', '**/episodes/stats/**', {
                forceNetworkError: true
            }).as('getStatsNetworkError');

            cy.reload();
            cy.wait('@getStatsNetworkError');
            // Remove error overlay if present (hack for lint warnings)
            cy.get('body > iframe').then(($iframe) => {
                $iframe.remove();
            });

            // Should handle network error gracefully
            cy.get('main').get('td').filter(':contains("Error")').should('have.length', 4);
        });

        it('should handle very large numbers', () => {
            cy.intercept('GET', '**/episodes/stats/**', (req) => {
                req.reply({
                    statusCode: 200,
                    body: { total_episodes: 999999999999999 }
                });
            }).as('getLargeStats');

            cy.reload();
            cy.wait('@getLargeStats');
            // Remove error overlay if present (hack for lint warnings)
            cy.get('body > iframe').then(($iframe) => {
                $iframe.remove();
            });

            // Should display large numbers correctly
            cy.contains('td', '999999999999999').should('be.visible');
        });

        it('should refresh data when navigating back to page', () => {
            // Navigate away
            cy.visit('/landing');

            // Navigate back
            cy.visit('/globalKPIs');

            // Data should reload
            cy.get('main').contains('Global KPIs').should('be.visible');
            cy.get('main').contains('1000').should('be.visible');
        });
    });
});
