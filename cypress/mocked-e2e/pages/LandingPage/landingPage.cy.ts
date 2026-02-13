
describe('Landing Page', () => {
    beforeEach(() => {
        // Mock token
        cy.window().then((win) => {
            win.localStorage.setItem('token-registry', 'fake-token');
        });

        // Mock APIs
        cy.intercept('GET', '**/surgeon-episode-summary/', {
            statusCode: 200,
            body: {
                episode_count: 42,
                last_episode_date: '2023-10-15T10:00:00Z'
            }
        }).as('getSummary');

        cy.intercept('GET', '**/owned-episodes/', {
            statusCode: 200,
            body: [
                {
                    id: 1,
                    surgery_date: '2023-10-10',
                    patient_name: 'John Doe',
                    follow_up_dates: ['2023-11-10'],
                    discharge: { id: 1 }, // has discharge
                    hospital_id: 1,
                    patient_id: 101
                },
                {
                    id: 2,
                    surgery_date: '2023-10-12',
                    patient_name: 'Jane Smith',
                    follow_up_dates: [],
                    discharge: null, // no discharge
                    hospital_id: 1,
                    patient_id: 102
                }
            ]
        }).as('getOwnedEpisodes');

        cy.intercept('GET', '**/unlinked-patients/', {
            statusCode: 200,
            body: [
                { id: 201, full_name: 'Unlinked Patient', hospital_id: 1, patient_hospital_id: 'H123' }
            ]
        }).as('getUnlinked');

        cy.intercept('GET', '**/preferred-hospital/retrieve_for_current_user/', {
            statusCode: 200,
            body: { id: 1, name: 'General Hospital' }
        }).as('getPreferredHospital');

        cy.intercept('GET', '**/announcements/', {
            statusCode: 200,
            body: {
                results: [
                    { id: 1, announcement_text: 'Welcome to the system!' }
                ]
            }
        }).as('getAnnouncements');

        cy.visit('/landing');

        cy.wait(['@getSummary', '@getOwnedEpisodes', '@getUnlinked', '@getPreferredHospital', '@getAnnouncements']);
    });

    describe('Happy Path', () => {
        it('should display surgeon summary', () => {
            cy.get('main').contains('Surgeon Dashboard').should('be.visible');
            cy.get('main').contains('Number of episodes: 42').should('be.visible');
            cy.get('main').contains('Last episode: 15/10/2023').should('be.visible');
        });

        it('should display announcements and allow dismissal', () => {
            cy.get('main').contains('Welcome to the system!').should('be.visible');

            // Dismiss
            cy.get('button[aria-label="Dismiss"]').click();
            cy.get('main').contains('Welcome to the system!').should('not.exist');
        });

        it('should display unlinked patients', () => {
            cy.get('main').contains('Patients without Episodes Registered in Your Hospital').should('be.visible');
            cy.get('main').contains('Unlinked Patient').should('be.visible');
            cy.get('main').contains('H123').should('be.visible');
        });

        it('should redirect to patient details when clicking on unlinked patient row', () => {
            // Find the row containing the unlinked patient and click it
            cy.get('main').contains('tr', 'Unlinked Patient').click();

            // Verify the URL has changed to the patient details page
            cy.url().should('include', '/patients/1/201');
            cy.url().should('not.include', '/landing');
        });

        it('should display Your Episodes', () => {
            cy.get('main').contains('Your Episodes').should('be.visible');
            cy.get('main').contains('John Doe').should('be.visible');
            cy.get('main').contains('Jane Smith').should('be.visible');
        });

        it('should redirect to episode details when clicking on episode row in Your Episodes table', () => {
            // Find the Your Episodes table and click on the first episode row
            cy.get('main').contains('Your Episodes').should('be.visible');
            cy.get('main').contains('tr', 'John Doe').click();

            // Verify the URL has changed to the episode details page
            cy.url().should('include', '/episodes/1');
            cy.url().should('not.include', '/landing');
        });

        it('should sort episodes by surgery date when clicking column header', () => {
            // Click on Surgery Date column header to revert the sort
            cy.get('main').contains('th', 'Surgery Date').click().parent().parent().parent().within(() => {
                cy.get('tr').eq(1).contains('10/10/2023');
                cy.get('tr').eq(2).contains('12/10/2023');
            });

            // Click again to sort descending
            cy.get('main').contains('th', 'Surgery Date').click().parent().parent().parent().within(() => {
                cy.get('tr').eq(1).contains('12/10/2023');
                cy.get('tr').eq(2).contains('10/10/2023');
            });
        });

        it('should navigate to patient directory', () => {
            cy.get('main').contains('button', 'Go to Patient Directory').click();
            cy.url().should('include', '/patients');
            cy.url().should('not.include', '/landing');
        });
    });

    describe('Edge Cases', () => {
        it('should handle empty owned episodes list', () => {
            cy.intercept('GET', '**/owned-episodes/', {
                statusCode: 200,
                body: []
            }).as('getEmptyEpisodes');

            cy.visit('/landing');
            cy.wait('@getEmptyEpisodes');

            // Should display without errors
            cy.get('main').contains('Your Episodes').should('be.visible');
            cy.get('main').contains('You have not recorded any episodes yet.').should('be.visible');
        });

        it('should handle no unlinked patients', () => {
            cy.intercept('GET', '**/unlinked-patients/', {
                statusCode: 200,
                body: []
            }).as('getNoUnlinked');

            cy.visit('/landing');
            cy.wait('@getNoUnlinked');

            // Should handle empty state gracefully
            cy.get('main').contains('Patients without Episodes Registered in Your Hospital').should('not.exist');
        });

        it('should handle API errors gracefully', () => {
            cy.intercept('GET', '**/surgeon-episode-summary/', {
                statusCode: 500,
                body: { detail: 'Internal server error' }
            }).as('getSummaryError');

            cy.visit('/landing');
            cy.wait('@getSummaryError');

            // Should handle error without crashing the entire page
            cy.get('main').contains('Surgeon Dashboard').should('be.visible');
            cy.get('main').contains('Failed to load surgeon stats').should('be.visible');
        });

        it('should handle missing announcements', () => {
            cy.intercept('GET', '**/announcements/', {
                statusCode: 200,
                body: {
                    results: []
                }
            }).as('getNoAnnouncements');

            cy.visit('/landing');
            cy.wait('@getNoAnnouncements');

            // Page should load without announcements section or show empty state
            cy.get('button[aria-label="Dismiss"]').should('not.exist');
        });
    });
});
