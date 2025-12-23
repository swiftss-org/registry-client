
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
                cy.get('main').contains('Surgery').find('svg').should('exist');
                cy.get('main').contains('Discharge').find('svg').should('exist');
                cy.get('main').contains('Follow Up').find('svg').should('exist');
            });

            it('should expand and display surgery details', () => {
                // Click on Surgery to expand
                cy.get('main > div > div > li:nth-child(2)').click().within(() => {

                    // Verify surgery details are visible
                    cy.get('input[id="cepod"]').should('have.value', 'Elective');
                    cy.get('input[id="side"]').should('have.value', 'Left');
                    cy.get('input[id="occurence"]').should('have.value', 'Primary');
                    cy.get('input[id="type"]').should('have.value', 'Inguinal');
                    cy.get('input[id="size"]').should('have.value', 'Medium');
                    cy.get('input[id="complexity"]').should('have.value', 'Simple');
                    cy.get('input[id="mesh_type"]').should('have.value', 'Synthetic');
                    cy.get('input[id="anaesthetic_type"]').should('have.value', 'General');
                    cy.get('input[id="diathermy_used"]').should('have.value', 'Yes');
                    cy.get('input[id="antibiotic_used"]').should('have.value', 'Yes');
                    cy.get('input[id="antibiotic_type"]').should('have.value', 'Cephalosporin');
                    cy.get('input[id="surgeon"]').should('have.value', 'John Doe');
                    cy.get('textarea[id="surgery_comments"]').should('have.value', 'Test surgery comments');

                    // Verify surgery inputs are disabled
                    cy.get('input[id="cepod"]').should('have.attr', 'disabled');
                    cy.get('input[id="side"]').should('have.attr', 'disabled');
                    cy.get('input[id="occurence"]').should('have.attr', 'disabled');
                    cy.get('input[id="type"]').should('have.attr', 'disabled');
                    cy.get('input[id="size"]').should('have.attr', 'disabled');
                    cy.get('input[id="complexity"]').should('have.attr', 'disabled');
                    cy.get('input[id="mesh_type"]').should('have.attr', 'disabled');
                    cy.get('input[id="anaesthetic_type"]').should('have.attr', 'disabled');
                    cy.get('input[id="diathermy_used"]').should('have.attr', 'disabled');
                    cy.get('input[id="antibiotic_used"]').should('have.attr', 'disabled');
                    cy.get('input[id="antibiotic_type"]').should('have.attr', 'disabled');
                    cy.get('input[id="surgeon"]').should('have.attr', 'disabled');
                    cy.get('textarea[id="surgery_comments"]').should('have.attr', 'disabled');
                });
            });

            it('should expand and display discharge details', () => {
                // Click on Discharge to expand
                cy.get('main > div > div > li:nth-child(3)').click().within(() => {

                    // Verify discharge details are visible
                    cy.get('input[id="date"]').should('have.value', '2023-01-16');
                    cy.get('#aware_of_mesh').contains('Yes').should('exist');
                    cy.get('input[id="discharge_duration"]').should('have.value', '2');
                    cy.get('input[id="infection"]').should('have.value', 'Bleeding,Urinary Retention');
                    cy.get('textarea[id="comments"]').should('have.value', 'Test discharge comments');

                    // Verify discharge inputs are disabled
                    cy.get('input[id="date"]').should('have.attr', 'disabled');
                    cy.get('input[name="aware_of_mesh"]').should('have.attr', 'disabled');
                    cy.get('input[id="infection"]').should('have.attr', 'disabled');
                    cy.get('textarea[id="comments"]').should('have.attr', 'disabled');
                });
            });

            it('should display the discharge details when Post-operative complications is none', () => {
                cy.intercept('GET', `**/episodes/${episodeId}/discharge/`, {
                    statusCode: 200,
                    body: {
                        id: 10,
                        infection: 'None',
                        date: '2023-01-16',
                        aware_of_mesh: 'Yes',
                        episode_id: 888,
                        comments: 'Test discharge comments',
                        discharge_duration: '2'
                    }
                }).as('getDischarge');

                cy.reload();
                cy.wait('@getDischarge');

                cy.get('#root main > div > div > li:nth-child(3)').click().within(() => {
                    cy.get('input[id="infection"]').should('have.value', 'None');
                });
            });

            it('should display existing follow-up data', () => {
                // Check existing Follow Up
                cy.get('main > div > div > li:nth-child(4)').click().within(() => {
                    // Verify follow-up details are visible
                    cy.get('input[id="date"]').should('have.value', '2023-02-15');
                    cy.get('input[id="surgeon"]').should('have.value', 'John Doe');
                    cy.get('div[id="pain_severity"]').contains('No Pain').should('exist');
                    cy.get('div[id="mesh_awareness"]').contains('Yes').should('exist');
                    cy.get('div[id="seroma"]').contains('Yes').should('exist');
                    cy.get('div[id="infection"]').contains('Yes').should('exist');
                    cy.get('div[id="numbness"]').contains('Yes').should('exist');
                    cy.get('div[id="recurrence"]').contains('Yes').should('exist');
                    cy.get('div[id="further_surgery_need"]').contains('Yes').should('exist');
                    cy.get('textarea[id="surgery_comments_box"]').should('have.value', 'Patient recovering well');

                    // Verify follow-up inputs are disabled
                    cy.get('input[id="date"]').should('have.attr', 'disabled');
                    cy.get('input[id="surgeon"]').should('have.attr', 'disabled');
                    cy.get('input[name="pain_severity"]').should('have.attr', 'disabled');
                    cy.get('input[name="mesh_awareness"]').should('have.attr', 'disabled');
                    cy.get('input[name="seroma"]').should('have.attr', 'disabled');
                    cy.get('input[name="infection"]').should('have.attr', 'disabled');
                    cy.get('input[name="numbness"]').should('have.attr', 'disabled');
                    cy.get('input[name="recurrence"]').should('have.attr', 'disabled');
                    cy.get('input[name="further_surgery_need"]').should('have.attr', 'disabled');
                    cy.get('textarea[id="surgery_comments_box"]').should('have.attr', 'disabled');
                });
            });

            it('should navigate back to patient details', () => {
                cy.get('main > div > div > div > button > svg').first().click();
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

            cy.get('main > div > div > li:nth-child(2)').click().within(() => {
                cy.get('input[id="surgeon"]').eq(0).should('have.value', 'John Doe');
                cy.get('input[id="surgeon"]').eq(1).should('have.value', 'Jane Smith');
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

            // Should still display without errors
            cy.contains('Episode Details').should('be.visible');
            cy.get('main > div > div > li:nth-child(2)').click();
            cy.get('input[id="antibiotic_used"]').should('have.value', 'No');
            cy.get('input[id="antibiotic_type"]').should('have.value', '');
            cy.get('input[id="surgeon"]').should('not.exist');
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
            cy.get('main > div > div > div > button').click();
            cy.url().should('include', '/patients/1/101');
            cy.url().should('not.include', '/episodes/888');
        });
    });
});
