
describe('Episode Details Page', () => {

    const episodeId = '888';

    describe('Happy Path', () => {
        describe('Read Only Views', () => {
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
                            aware_of_mesh: true,
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

                    cy.get('main h3 p').contains('Surgery').siblings('svg[data-testid="CheckCircleIcon"]').should('exist');
                    cy.get('main h3 p').contains('Discharge').siblings('svg[data-testid="CheckCircleIcon"]').should('exist');
                    cy.get('main h3 p').contains('Follow Up').siblings('svg[data-testid="CheckCircleIcon"]').should('not.exist');
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

                    cy.get('main h3 p').contains('Surgery').siblings('svg[data-testid="CheckCircleIcon"]').should('exist');
                    cy.get('main h3 p').contains('Discharge').siblings('svg[data-testid="CheckCircleIcon"]').should('not.exist');
                    cy.get('main h3 p').contains('Follow Up').siblings('svg[data-testid="CheckCircleIcon"]').should('not.exist');
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
                            aware_of_mesh: true,
                            episode_id: 888,
                            comments: 'Test discharge comments',
                            discharge_duration: '2'
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
                });

                it('should display episode details when the episode had Surgery, Discharge and Follow Up', () => {
                    cy.get('main').contains('Episode Details').should('be.visible');
                    cy.get('main').contains('Primary Inguinal').should('be.visible');
                    cy.get('main').contains('2023-01-15').should('be.visible');
                    cy.get('main h3 p').contains('Surgery').siblings('svg[data-testid="CheckCircleIcon"]').should('exist');
                    cy.get('main h3 p').contains('Discharge').siblings('svg[data-testid="CheckCircleIcon"]').should('exist');
                    cy.get('main h3 p').contains('Follow Up').siblings('svg[data-testid="CheckCircleIcon"]').should('exist');
                });

                it('should expand and display surgery details', () => {
                    // Click on Surgery to expand
                    cy.get('main > div > div > div:nth-child(2) > h3 > button').click();

                    // Verify surgery details are visible
                    cy.get('#cepod').should('have.text', 'Elective').and('be.visible');
                    cy.get('#side').should('have.text', 'Left').and('be.visible');
                    cy.get('#occurence').should('have.text', 'Primary').and('be.visible');
                    cy.get('#type').should('have.text', 'Inguinal').and('be.visible');
                    cy.get('#size').should('have.text', 'Medium').and('be.visible');
                    cy.get('#complexity').should('have.text', 'Simple').and('be.visible');
                    cy.get('#mesh_type').should('have.text', 'Synthetic').and('be.visible');
                    cy.get('#anaesthetic_type').should('have.text', 'General').and('be.visible');
                    cy.get('#diathermy_used').should('have.text', 'Yes').and('be.visible');
                    cy.get('#antibiotic_used').should('have.text', 'Yes').and('be.visible');
                    cy.get('#antibiotic_type').should('have.text', 'Cephalosporin').and('be.visible');
                    cy.get('#surgeon_0').should('have.text', 'John Doe').and('be.visible');
                    cy.get('#surgery_comments').should('have.text', 'Test surgery comments');
                });

                it('should expand and display discharge details', () => {
                    // Click on Discharge to expand
                    cy.get('main > div > div > div:nth-child(3) > h3 > button').click();

                    // Verify discharge details are visible
                    cy.get('#discharge_date').should('have.text', '2023-01-16').and('be.visible');
                    cy.get('#aware_of_mesh').should('have.text', 'Yes').and('be.visible');
                    cy.get('#discharge_duration').should('have.text', '2').and('be.visible');
                    cy.get('#post_operative_complication').should('have.text', 'Bleeding,Urinary Retention').and('be.visible');
                    cy.get('#discharge_comments').should('have.text', 'Test discharge comments').and('be.visible');
                });

                it('should display the discharge details when Post-operative complications is none', () => {
                    cy.intercept('GET', `**/episodes/${episodeId}/discharge/`, {
                        statusCode: 200,
                        body: {
                            id: 10,
                            infection: 'None',
                            date: '2023-01-16',
                            aware_of_mesh: true,
                            episode_id: 888,
                            comments: 'Test discharge comments',
                            discharge_duration: '2'
                        }
                    }).as('getDischarge');

                    cy.reload();
                    cy.wait('@getDischarge');

                    cy.get('main > div > div > div:nth-child(3) > h3 > button').click();
                    cy.get('#post_operative_complication').should('have.text', 'None');
                });

                it('should NOT display the discharge duration when Antibiotics is not given', () => {
                    cy.intercept('GET', `**/episodes/${episodeId}/discharge/`, {
                        statusCode: 200,
                        body: {
                            id: 10,
                            infection: 'None',
                            date: '2023-01-16',
                            aware_of_mesh: false,
                            episode_id: 888,
                            comments: 'Test discharge comments',
                            discharge_duration: ''
                        }
                    }).as('getDischarge');

                    cy.reload();
                    cy.wait('@getDischarge');

                    cy.get('main > div > div > div:nth-child(3) > h3 > button').click();
                    cy.get('#aware_of_mesh').should('have.text', 'No');
                    cy.get('#discharge_duration').should('not.exist');
                });

                it('should display existing follow-up data', () => {
                    // Check existing Follow Up
                    cy.get('main > div > div > div:nth-child(4) > h3 > button').click();

                    // Verify follow-up details are visible
    //                 cy.scrollTo('bottom', { ensureScrollable: false })

                    cy.get('#follow_up_date').should('have.text', '2023-02-15').and('be.visible');
                    cy.get('#pain_severity').should('have.text', 'No Pain').and('be.visible');
                    cy.get('#mesh_awareness').should('have.text', 'Yes').and('be.visible');
                    cy.get('#seroma').should('have.text', 'Yes').and('be.visible');
                    cy.get('#infection').should('have.text', 'Yes').and('be.visible');
                    cy.get('#numbness').should('have.text', 'Yes').and('be.visible');
                    cy.get('#recurrence').should('have.text', 'Yes').and('be.visible');
                    cy.get('#further_surgery_need').should('have.text', 'Yes').and('be.visible');
                    cy.contains('Patient recovering well').scrollIntoView().click().should('be.visible');
                    cy.get('#surgeon_0').should('have.text', 'John Doe');
                    cy.get('#follow_up_comments').should('have.text', 'Patient recovering well').and('be.visible');

                });

                it('should navigate back to patient details epsiode tab', () => {
                    cy.get('main > div > div > button > svg').first().click();
                    cy.url().should('include', '/patients/1/101?tab=episodes');
                    cy.url().should('not.include', '/episodes/888');
                });
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

            cy.get('main > div > div > div:nth-child(2) > h3 > button').click();
            cy.contains('Test surgery comments').scrollIntoView().click().should('be.visible');

            cy.get('#surgeon_0').should('have.text', 'John Doe').should('be.visible');
            cy.get('#surgeon_1').should('have.text', 'Jane Smith').should('be.visible');
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

            // Should still display without errors
            cy.contains('Episode Details').should('be.visible');
            cy.get('main > div > div > div:nth-child(2) > h3 > button').click(); // Open Surgery section
            cy.get('#antibiotic_used').should('have.text', 'No');
            cy.get('#antibiotic_type').should('have.text', '—');
            cy.get('#surgeon_0').should('not.exist');
        });

        it('should handle API errors gracefully', () => {
            cy.intercept('GET', `**/episodes/${episodeId}/`, {
                statusCode: 500,
                body: { detail: 'Internal server error' }
            }).as('getEpisodeError');

            cy.reload();
            cy.wait('@getEpisodeError');

            cy.get('body').should('exist'); // Page doesn't crash completely
            cy.contains('Episode Details').should('be.visible');

            // User can go back to the previous page
            cy.get('main > div > div > button').click();
            cy.url().should('include', '/patients/1/101');
            cy.url().should('not.include', '/episodes/888');
        });
    });
});
