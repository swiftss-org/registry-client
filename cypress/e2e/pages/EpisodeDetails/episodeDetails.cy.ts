
describe('Episode Details Page', () => {

    const episodeId = '888';

    describe('Happy Path', () => {
        describe('Partial Episode', () => {
            beforeEach(() => {
                cy.window().then((win) => {
                    win.localStorage.setItem('token-registry', 'fake-token');
                });

                cy.visit(`/patients/1/101/episodes/${episodeId}`);
            });

            it('should display episode details when the episode had Surgery, Discharge but no Follow Up', () => {
                cy.intercept('GET', `**/episodes/${episodeId}/`, {
                    statusCode: 200,
                    body: {
                        id: 888,
                        episode_type: 'Primary Inguinal',
                        surgery_date: '2023-01-15',
                        cepod: 'Elective',
                        side: 'Left',
                        occurence: 'Primary',
                        type: 'Inguinal',
                        size: 'Medium',
                        complexity: 'Simple',
                        mesh_type: 'Synthetic',
                        diathermy_used: true,
                        antibiotic_used: true,
                        antibiotic_type: 'Cephalosporin',
                        comments: 'Test surgery comments',
                        anaesthetic_type: 'General',
                        surgeons: [
                            {
                                id: 1,
                                user: {
                                    email: 'surgeon@example.com',
                                    first_name: 'John',
                                    last_name: 'Doe'
                                },
                                level: 'Consultant'
                            }
                        ]
                    }
                }).as('getEpisode');

                cy.intercept('GET', `**/episodes/${episodeId}/discharge/`, {
                    statusCode: 200,
                    body: {
                        id: 10,
                        infection: 'Bleeding,Urinary Retention',
                        date: '2023-01-16',
                        aware_of_mesh: 'Yes',
                        episode_id: 888,
                        comments: 'Test discharge comments',
                        discharge_duration: '24 hours'
                    }
                }).as('getDischarge');

                cy.intercept('GET', `**/episodes/${episodeId}/follow-ups/`, {
                    statusCode: 200,
                    body: []
                }).as('getFollowUps');

                cy.intercept('GET', `**/medical-personnel/**`, {
                    statusCode: 200,
                    body: []
                }).as('getMedicalPersonnel');

                cy.reload();
                cy.wait(['@getEpisode', '@getDischarge', '@getFollowUps', '@getMedicalPersonnel']);
                // Remove error overlay if present (hack for lint warnings)
                cy.get('body > iframe').then(($iframe) => {
                    $iframe.remove();
                });

                cy.get('main').contains('Surgery').find('svg').should('exist');
                cy.get('main').contains('Discharge').find('svg').should('exist');
                cy.get('main').contains('Follow Up').find('svg').should('not.exist');
            });

            it('should display episode details when the episode had Surgery but not Discharge nor Follow Up', () => {
                cy.intercept('GET', `**/episodes/${episodeId}/`, {
                    statusCode: 200,
                    body: {
                        id: 888,
                        episode_type: 'Primary Inguinal',
                        surgery_date: '2023-01-15',
                        cepod: 'Elective',
                        side: 'Left',
                        occurence: 'Primary',
                        type: 'Inguinal',
                        size: 'Medium',
                        complexity: 'Simple',
                        mesh_type: 'Synthetic',
                        diathermy_used: true,
                        antibiotic_used: true,
                        antibiotic_type: 'Cephalosporin',
                        comments: 'Test surgery comments',
                        anaesthetic_type: 'General',
                        surgeons: [
                            {
                                id: 1,
                                user: {
                                    email: 'surgeon@example.com',
                                    first_name: 'John',
                                    last_name: 'Doe'
                                },
                                level: 'Consultant'
                            }
                        ]
                    }
                }).as('getEpisode');

                cy.intercept('GET', `**/episodes/${episodeId}/discharge/`, {
                    statusCode: 200,
                    body: {}
                }).as('getDischarge');

                cy.intercept('GET', `**/episodes/${episodeId}/follow-ups/`, {
                    statusCode: 200,
                    body: []
                }).as('getFollowUps');

                cy.intercept('GET', `**/medical-personnel/**`, {
                    statusCode: 200,
                    body: []
                }).as('getMedicalPersonnel');

                cy.reload();
                cy.wait(['@getEpisode', '@getDischarge', '@getFollowUps', '@getMedicalPersonnel']);
                // Remove error overlay if present (hack for lint warnings)
                cy.get('body > iframe').then(($iframe) => {
                    $iframe.remove();
                });

                cy.get('main').contains('Surgery').find('svg').should('exist');
                cy.get('main').contains('Discharge').find('svg').should('not.exist');
                cy.get('main').contains('Follow Up').find('svg').should('not.exist');
            });
        });

        describe('Full Episode', () => {
            beforeEach(() => {
                cy.window().then((win) => {
                    win.localStorage.setItem('token-registry', 'fake-token');
                });

                // Mock APIs
                cy.intercept('GET', `**/episodes/${episodeId}/`, {
                    statusCode: 200,
                    body: {
                        id: 888,
                        episode_type: 'Primary Inguinal',
                        surgery_date: '2023-01-15',
                        cepod: 'Elective',
                        side: 'Left',
                        occurence: 'Primary',
                        type: 'Inguinal',
                        size: 'Medium',
                        complexity: 'Simple',
                        mesh_type: 'Synthetic',
                        diathermy_used: true,
                        antibiotic_used: true,
                        antibiotic_type: 'Cephalosporin',
                        comments: 'Test surgery comments',
                        anaesthetic_type: 'General',
                        surgeons: [
                            {
                                id: 1,
                                user: {
                                    email: 'surgeon@example.com',
                                    first_name: 'John',
                                    last_name: 'Doe'
                                },
                                level: 'Consultant'
                            }
                        ]
                    }
                }).as('getEpisode');

                cy.intercept('GET', `**/episodes/${episodeId}/discharge/`, {
                    statusCode: 200,
                    body: {
                        id: 10,
                        infection: 'Bleeding,Urinary Retention',
                        date: '2023-01-16',
                        aware_of_mesh: 'Yes',
                        episode_id: 888,
                        comments: 'Test discharge comments',
                        discharge_duration: '24 hours'
                    }
                }).as('getDischarge');

                cy.intercept('GET', `**/episodes/${episodeId}/follow-ups/`, {
                    statusCode: 200,
                    body: [
                        {
                            id: 50,
                            date: '2023-02-15',
                            pain_severity: 'No Pain',
                            attendees: [
                                {
                                    id: 1,
                                    user: {
                                        email: 'surgeon@example.com',
                                        first_name: 'John',
                                        last_name: 'Doe'
                                    },
                                    level: 'Consultant'
                                }
                            ],
                            mesh_awareness: true,
                            seroma: true,
                            infection: true,
                            numbness: true,
                            recurrence: true,
                            further_surgery_need: true,
                            surgery_comments_box: 'Patient recovering well'
                        }
                    ]
                }).as('getFollowUps');

                cy.intercept('GET', `**/medical-personnel/**`, {
                    statusCode: 200,
                    body: [
                        { id: 1, first_name: 'John', last_name: 'Doe', level: 'Consultant' },
                        { id: 2, first_name: 'Jane', last_name: 'Doe', level: 'Consultant' }
                    ]
                }).as('getMedicalPersonnel');

                // Mock POST for new follow up
                cy.intercept('POST', '**/follow-ups/', {
                    statusCode: 201,
                    body: { id: 51 }
                }).as('addFollowUp');

                cy.visit(`/patients/1/101/episodes/${episodeId}`);

                // Wait for the data to load
                cy.wait(['@getEpisode', '@getDischarge', '@getFollowUps', '@getMedicalPersonnel']);

                // Remove error overlay if present (hack for lint warnings)
                cy.get('body > iframe').then(($iframe) => {
                    $iframe.remove();
                });
            });

            it('should display episode details when the episode had Surgery, Discharge and Follow Up', () => {
                cy.get('main').contains('Episode Details').should('be.visible');
                cy.get('main').contains('Primary Inguinal').should('be.visible');
                cy.get('main').contains('2023-01-15').should('be.visible');
                cy.get('main').contains('Surgery').find('svg').should('exist');
                cy.get('main').contains('Discharge').find('svg').should('exist');
                cy.get('main').contains('Follow Up').find('svg').should('exist');
            });

            it('should expand and display surgery details', () => {
                // Click on Surgery to expand
                cy.get('main > div > div > li:nth-child(2)').click().within(() => {

                    // Verify surgery details are visible
                    cy.get('input[placeholder="CEPOD"]').should('have.value', 'Elective');
                    cy.get('input[placeholder="Side"]').should('have.value', 'Left');
                    cy.get('input[placeholder="Type"]').should('have.value', 'Inguinal');
                    cy.get('input[placeholder="Mesh type"]').should('have.value', 'Synthetic');
                    cy.get('input[placeholder="Surgeon"]').should('have.value', 'John Doe');

                    // Verify surgery inputs are disabled
                    cy.get('input[placeholder="CEPOD"]').should('have.attr', 'disabled');
                    cy.get('input[placeholder="Side"]').should('have.attr', 'disabled');
                    cy.get('input[placeholder="Type"]').should('have.attr', 'disabled');
                    cy.get('input[placeholder="Mesh type"]').should('have.attr', 'disabled');
                    cy.get('input[placeholder="Surgeon"]').should('have.attr', 'disabled');
                });
            });

            it('should expand and display discharge details', () => {
                // Click on Discharge to expand
                cy.get('main > div > div > li:nth-child(3)').click().within(() => {

                    // Verify discharge details are visible
                    cy.get('input[placeholder="Date"]').should('have.value', '2023-01-16');
                    cy.get('input[placeholder="Antibiotics given on discharge"]').should('have.value', 'Yes');
                    cy.get('input[placeholder="Post-operative complications"]').should('have.value', 'Bleeding,Urinary Retention');
                    cy.get('textarea[id="comments"]').should('have.value', 'Test discharge comments');

                    // Verify discharge inputs are disabled
                    cy.get('input[placeholder="Date"]').should('have.attr', 'disabled');
                    cy.get('input[placeholder="Antibiotics given on discharge"]').should('have.attr', 'disabled');
                    cy.get('input[placeholder="Post-operative complications"]').should('have.attr', 'disabled');
                    cy.get('textarea[id="comments"]').should('have.attr', 'disabled');
                });
            });

            it('should display the discharge details when Post-operative complications is none', () => {
                cy.intercept('GET', `**/episodes/${episodeId}/discharge/`, {
                    statusCode: 200,
                    body: {
                        id: 10,
                        infection: 'none',
                        date: '2023-01-16',
                        aware_of_mesh: 'Yes',
                        episode_id: 888,
                        comments: 'Test discharge comments',
                        discharge_duration: '24 hours'
                    }
                }).as('getDischarge');

                cy.reload();
                cy.wait('@getDischarge');
                // Remove error overlay if present (hack for lint warnings)
                cy.get('body > iframe').then(($iframe) => {
                    $iframe.remove();
                });

                cy.get('#root main > div > div > li:nth-child(3)').click().within(() => {
                    cy.get('input[placeholder="Post-operative complications"]').should('have.value', 'none');
                });
            });

            it('should display existing follow-up data', () => {
                // Check existing Follow Up
                cy.get('main > div > div > li:nth-child(4)').click().within(() => {
                    // Verify follow-up details are visible
                    cy.get('input[placeholder="Date"]').should('have.value', '2023-02-15');
                    cy.get('input[placeholder="Surgeon"]').should('have.value', 'John Doe');
                    cy.get('input[placeholder="Pain Severity"]').should('have.value', 'No Pain');
                    cy.get('input[placeholder="Mesh Awareness"]').should('have.value', 'Yes');
                    cy.get('input[placeholder="Seroma"]').should('have.value', 'Yes');
                    cy.get('input[placeholder="Infection"]').should('have.value', 'Yes');
                    cy.get('input[placeholder="Numbness"]').should('have.value', 'Yes');
                    cy.get('input[placeholder="Recurrence"]').should('have.value', 'Yes');
                    cy.get('input[placeholder="Need for further surgery?"]').should('have.value', 'Yes');
                    cy.get('textarea[id="surgery_comments_box"]').should('have.value', 'Patient recovering well');

                    // Verify follow-up inputs are disabled
                    cy.get('input[placeholder="Date"]').should('have.attr', 'disabled');
                    cy.get('input[placeholder="Surgeon"]').should('have.attr', 'disabled');
                    cy.get('input[placeholder="Pain Severity"]').should('have.attr', 'disabled');
                    cy.get('input[placeholder="Mesh Awareness"]').should('have.attr', 'disabled');
                    cy.get('input[placeholder="Seroma"]').should('have.attr', 'disabled');
                    cy.get('input[placeholder="Infection"]').should('have.attr', 'disabled');
                    cy.get('input[placeholder="Numbness"]').should('have.attr', 'disabled');
                    cy.get('input[placeholder="Recurrence"]').should('have.attr', 'disabled');
                    cy.get('input[placeholder="Need for further surgery?"]').should('have.attr', 'disabled');
                    cy.get('textarea[id="surgery_comments_box"]').should('have.attr', 'disabled');
                });
            });

            it('should navigate back to patient details', () => {
                cy.get('main > div > div > div > span > svg').first().click();
                cy.url().should('include', '/patients/1/101');
                cy.url().should('not.include', '/episodes/888');
            });
        });
    });

    describe('Edge Cases', () => {
        beforeEach(() => {
            cy.window().then((win) => {
                win.localStorage.setItem('token-registry', 'fake-token');
            });

            cy.visit(`/patients/1/101/episodes/${episodeId}`);
        });

        it('should handle episodes with multiple surgeons', () => {
            // Update mock to include multiple surgeons
            cy.intercept('GET', `**/episodes/${episodeId}/`, {
                statusCode: 200,
                body: {
                    id: 888,
                    episode_type: 'Primary Inguinal',
                    surgery_date: '2023-01-15',
                    cepod: 'Elective',
                    side: 'Left',
                    occurence: 'Primary',
                    type: 'Inguinal',
                    size: 'Medium',
                    complexity: 'Simple',
                    mesh_type: 'Synthetic',
                    diathermy_used: true,
                    antibiotic_used: true,
                    antibiotic_type: 'Cephalosporin',
                    comments: 'Test surgery comments',
                    anaesthetic_type: 'General',
                    surgeons: [
                        {
                            id: 1,
                            user: {
                                email: 'surgeon1@example.com',
                                first_name: 'John',
                                last_name: 'Doe'
                            },
                            level: 'Consultant'
                        },
                        {
                            id: 2,
                            user: {
                                email: 'surgeon2@example.com',
                                first_name: 'Jane',
                                last_name: 'Smith'
                            },
                            level: 'Registrar'
                        }
                    ]
                }
            }).as('getEpisodeMultipleSurgeons');

            cy.reload();
            cy.wait('@getEpisodeMultipleSurgeons');
            // Remove error overlay if present (hack for lint warnings)
            cy.get('body > iframe').then(($iframe) => {
                $iframe.remove();
            });

            cy.get('main > div > div > li:nth-child(2)').click().within(() => {
                cy.get('input[placeholder="Surgeon"]').eq(0).should('have.value', 'John Doe');
                cy.get('input[placeholder="Surgeon"]').eq(1).should('have.value', 'Jane Smith');
            });
        });

        it('should handle missing optional fields gracefully', () => {
            cy.intercept('GET', `**/episodes/${episodeId}/`, {
                statusCode: 200,
                body: {
                    id: 888,
                    episode_type: 'Primary Inguinal',
                    surgery_date: '2023-01-15',
                    cepod: 'Elective',
                    side: 'Left',
                    occurence: 'Primary',
                    type: 'Inguinal',
                    size: 'Medium',
                    complexity: 'Simple',
                    mesh_type: 'Synthetic',
                    diathermy_used: false,
                    antibiotic_used: false,
                    antibiotic_type: '',
                    comments: '',
                    anaesthetic_type: 'General',
                    surgeons: []
                }
            }).as('getEpisodeMinimal');

            cy.reload();
            cy.wait('@getEpisodeMinimal');
            // Remove error overlay if present (hack for lint warnings)
            cy.get('body > iframe').then(($iframe) => {
                $iframe.remove();
            });

            // Should still display without errors
            cy.contains('Episode Details').should('be.visible');
            cy.get('main > div > div > li:nth-child(2)').click();
            cy.get('input[placeholder="Surgeon"]').should('have.value', '');
        });

        it('should handle API errors gracefully', () => {
            cy.intercept('GET', `**/episodes/${episodeId}/`, {
                statusCode: 500,
                body: { detail: 'Internal server error' }
            }).as('getEpisodeError');

            cy.reload();
            cy.wait('@getEpisodeError');

            // Remove error overlay if present (hack for lint warnings)
            cy.get('body > iframe').then(($iframe) => {
                if ($iframe.length > 0) {
                    $iframe.remove();
                }
            });

            // Should handle error without crashing
            // The page should still render even with API error
            // Common patterns: error message, fallback UI, or redirect
            cy.get('body').should('exist'); // Page doesn't crash completely
            cy.contains('Episode Details').should('be.visible');

            // User can go back to the previous page
            cy.get('main > div > div > div > span > svg').first().click();
            cy.url().should('include', '/patients/1/101');
            cy.url().should('not.include', '/episodes/888');
        });
    });
});
