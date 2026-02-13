
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
    });

    describe('Happy Path', () => {
        it('should display KPI table with correct data', () => {
            cy.contains('Global KPIs').should('be.visible');

            // Headers
            cy.get('#global-kpis-table').get('th').contains('Total');
            cy.get('#global-kpis-table').get('th').contains('Past Year');
            cy.get('#global-kpis-table').get('th').contains('Past Month');
            cy.get('#global-kpis-table').get('th').contains('Past Week');

            // Data
            // Wait for calls - simpler to just look for text because multiple calls happen
            cy.get('#global-kpis-table').get('td').contains('1000').should('be.visible'); // Total
            cy.get('#global-kpis-table').get('td').contains('500').should('be.visible');  // Year
            cy.get('#global-kpis-table').get('td').contains('50').should('be.visible');   // Month
            cy.get('#global-kpis-table').get('td').contains('10').should('be.visible');   // Week
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

            cy.visit('/globalKPIs');
            cy.wait('@getZeroStats');

            // Should display 0 without errors
            cy.get('#global-kpis-table').get('td').contains('0').should('be.visible');
        });

        it('should handle API errors gracefully', () => {
            cy.intercept('GET', '**/episodes/stats/**', {
                statusCode: 500,
                body: { detail: 'Internal server error' }
            }).as('getStatsError');

            cy.visit('/globalKPIs');
            cy.wait('@getStatsError');

            // Should handle error without crashing
            cy.get('#global-kpis-table').get('td').filter(':contains("Error")').should('have.length', 4);
        });

        it('should handle missing data fields', () => {
            cy.intercept('GET', '**/episodes/stats/**', (req) => {
                req.reply({
                    statusCode: 200,
                    body: {} // Empty response
                });
            }).as('getEmptyStats');

            cy.visit('/globalKPIs');
            cy.wait('@getEmptyStats');

            // Should handle empty data gracefully
            cy.get('#global-kpis-table').get('td').filter(':contains("0")').should('have.length', 4);
        });

        it('should handle network errors', () => {
            cy.intercept('GET', '**/episodes/stats/**', {
                forceNetworkError: true
            }).as('getStatsNetworkError');

            cy.visit('/globalKPIs');
            cy.wait('@getStatsNetworkError');

            // Should handle network error gracefully
            cy.get('#global-kpis-table').get('td').filter(':contains("Error")').should('have.length', 4);
        });

        it('should handle very large numbers', () => {
            cy.intercept('GET', '**/episodes/stats/**', (req) => {
                req.reply({
                    statusCode: 200,
                    body: { total_episodes: 999999999999999 }
                });
            }).as('getLargeStats');

            cy.visit('/globalKPIs');
            cy.wait('@getLargeStats');

            // Should display large numbers correctly
            cy.get('#global-kpis-table').get('td').filter(':contains("999999999999999")').should('have.length', 4);
        });

        it('should refresh data when navigating back to page', () => {
            // Navigate away
            cy.visit('/landing');

            // Navigate back
            cy.visit('/globalKPIs');

            // Data should reload
            cy.contains('Global KPIs').should('be.visible');
            cy.get('#global-kpis-table').contains('1000').should('be.visible');
        });
    });

    describe('not authorised', () => {
        it('should not show page', () => {
            cy.window().then((win) => {
                win.localStorage.setItem('token-registry', 'fake-token');
                // Required for /globalKPIs access: must be staff/superuser AND username='admin'
                win.localStorage.setItem('username', 'admin');
                win.localStorage.setItem('is_staff', 'false');
                win.localStorage.setItem('is_superuser', 'false');
            });
            cy.visit('/globalKPIs');
            cy.get('#global-kpis-table').should('not.exist');
            cy.url().should('include', '/login');
        });
    });
});
