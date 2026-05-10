
describe('Episode Details Page', () => {

    const episodeId = '888';

    describe('Happy Path', () => {
        describe('Read Only Views', () => {
            describe('Partial Episode', () => {
                beforeEach(() => {
                    cy.window().then((win) => {
                        win.localStorage.setItem('token-registry', 'fake-token');
                    });
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

                    cy.visit(`/patients/1/101/episodes/${episodeId}`);
                    cy.wait(['@getEpisode', '@getDischarge', '@getFollowUps', '@getMedicalPersonnel']);

                    cy.get('[data-testid="surgery-check-icon"]').should('exist');
                    cy.get('[data-testid="discharge-check-icon"]').should('exist');
                    cy.get('[data-testid="follow-up-check-icon-0"]').should('not.exist');
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

                    cy.visit(`/patients/1/101/episodes/${episodeId}`);
                    cy.wait(['@getEpisode', '@getDischarge', '@getFollowUps', '@getMedicalPersonnel']);

                    cy.get('[data-testid="surgery-check-icon"]').should('exist');
                    cy.get('[data-testid="discharge-check-icon"]').should('not.exist');
                    cy.get('[data-testid="follow-up-check-icon-0"]').should('not.exist');
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
                            primary_surgeon: {
                                id: 1,
                                user: {
                                    email: 'surgeon@example.com',
                                    first_name: 'John',
                                    last_name: 'Doe'
                                },
                                level: 'Consultant'
                            }
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
                    cy.get('[data-testid="surgery-check-icon"]').should('exist');
                    cy.get('[data-testid="discharge-check-icon"]').should('exist');
                    cy.get('[data-testid="follow-up-check-icon-0"]').should('exist');
                });

                it.skip('should expand and display surgery details', () => {
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
                    cy.get('#primary_surgeon').should('have.text', 'John Doe').and('be.visible');
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
                    cy.get('#follow_up_date').should('have.text', '2023-02-15').and('be.visible');
                    cy.get('#pain_severity').should('have.text', 'No Pain').and('be.visible');
                    cy.get('#mesh_awareness').should('have.text', 'Yes').and('be.visible');
                    cy.get('#seroma').should('have.text', 'Yes').and('be.visible');
                    cy.get('#infection').should('have.text', 'Yes').and('be.visible');
                    cy.get('#numbness').should('have.text', 'Yes').and('be.visible');
                    cy.get('#recurrence').should('have.text', 'Yes').and('be.visible');
                    cy.get('#further_surgery_need').should('have.text', 'Yes').and('be.visible');
                    cy.contains('Patient recovering well').scrollIntoView().click().should('be.visible');
                    cy.get('#primary_surgeon').should('have.text', 'John Doe');
                    cy.get('#follow_up_comments').should('have.text', 'Patient recovering well').and('be.visible');

                });

                it('should navigate back to patient details epsiode tab', () => {
                    cy.get('main > div > div > button > svg').first().click();
                    cy.url().should('include', '/patients/1/101?tab=episodes');
                    cy.url().should('not.include', '/episodes/888');
                });
            });
        });

        describe('Write Scenarios', () => {
            beforeEach(() => {
                cy.window().then((win) => {
                    win.localStorage.setItem('token-registry', 'fake-token');
                });

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

                cy.intercept('GET', `**/medical-personnel/**`, {
                    statusCode: 200,
                    body: {
                        results: [
                            { id: 1, user: { first_name: 'John', last_name: 'Doe' }, level: 'Consultant' },
                            { id: 2, user: { first_name: 'Jane', last_name: 'Smith' }, level: 'Consultant' }
                        ]
                    }
                }).as('getMedicalPersonnel');
            });

            it('should allow adding a new Discharge', () => {
                cy.intercept('GET', `**/episodes/${episodeId}/discharge/`, {
                    statusCode: 200,
                    body: {}
                }).as('getDischargeEmpty');

                cy.intercept('GET', `**/episodes/${episodeId}/follow-ups/`, {
                    statusCode: 200,
                    body: []
                }).as('getFollowUpsEmpty');

                cy.intercept('POST', '**/discharges/', {
                    statusCode: 201,
                    body: { id: 10 }
                }).as('addDischarge');

                cy.visit(`/patients/1/101/episodes/${episodeId}`);
                cy.wait(['@getEpisode', '@getDischargeEmpty', '@getFollowUpsEmpty', '@getMedicalPersonnel']);

                // Expand Add Discharge
                cy.contains('Add Discharge').click();

                // Fill form
                cy.get('#discharge_date').type('2023-01-16');
                cy.selectMuiOption('#aware_of_mesh-select', 'Yes');
                cy.get('#discharge_duration').type('2');
                cy.get('#infection-none').check();
                cy.get('#comments').type('Discharged with no issues');

                // Submit
                cy.contains('button', 'Save Discharge').click();

                cy.wait('@addDischarge').then((interception) => {
                    expect(interception.request.body).to.include({
                        episode_id: 888,
                        date: '2023-01-16',
                        discharge_duration: 2,
                        aware_of_mesh: true,
                        comments: 'Discharged with no issues',
                        infection: 'None'
                    });
                });
            });

            it('should allow adding a new Follow Up', () => {
                cy.intercept('GET', `**/episodes/${episodeId}/discharge/`, {
                    statusCode: 200,
                    body: {
                        id: 10,
                        infection: 'None',
                        date: '2023-01-16',
                        aware_of_mesh: true,
                    }
                }).as('getDischarge');

                cy.intercept('GET', `**/episodes/${episodeId}/follow-ups/`, {
                    statusCode: 200,
                    body: []
                }).as('getFollowUpsEmpty');

                cy.intercept('POST', '**/follow-ups/', {
                    statusCode: 201,
                    body: { id: 51 }
                }).as('addFollowUp');

                cy.visit(`/patients/1/101/episodes/${episodeId}`);
                cy.wait(['@getEpisode', '@getDischarge', '@getFollowUpsEmpty', '@getMedicalPersonnel']);

                // Expand Add New Follow Up
                cy.contains('Add Follow Up').click();

                // Fill form
                cy.get('#follow-up-date').type('2023-02-15');

                // Add Surgeon
                cy.selectMuiOption('#primary_attendee', 'John Doe');

                cy.selectMuiOption('#pain_severity-select', 'No Pain');
                cy.selectMuiOption('#mesh_awareness-select', 'Yes');
                cy.selectMuiOption('#seroma-select', 'Yes');
                cy.selectMuiOption('#infection-select', 'Yes');
                cy.selectMuiOption('#numbness-select', 'Yes');
                cy.selectMuiOption('#recurrence-select', 'Yes');
                cy.selectMuiOption('#further_surgery_need-select', 'Yes');

                cy.get('#surgery_comments_box').type('Everything looks good');

                // Submit
                cy.get('button').contains('Save Follow Up').click();

                cy.wait('@addFollowUp').then((interception) => {
                    expect(interception.request.body).to.deep.include({
                        episode_id: 888,
                        date: '2023-02-15',
                        pain_severity: 'No Pain',
                        mesh_awareness: true,
                        seroma: true,
                        infection: true,
                        numbness: true,
                        recurrence: true,
                        further_surgery_need: true,
                        surgery_comments_box: 'Everything looks good',
                    });
                    expect(interception.request.body.attendee_ids).to.include(1);
                });
            });
        });
    });

    describe('Input Validation', () => {
        beforeEach(() => {
            cy.window().then((win) => {
                win.localStorage.setItem('token-registry', 'fake-token');
            });

            cy.intercept('GET', `**/episodes/${episodeId}/`, {
                statusCode: 200,
                body: {
                    id: 888,
                    episode_type: 'Primary Inguinal',
                    surgery_date: '2023-01-15',
                    surgeons: [],
                    diathermy_used: false,
                    antibiotic_used: false,
                }
            }).as('getEpisode');

            cy.intercept('GET', `**/medical-personnel/**`, {
                statusCode: 200,
                body: {
                    results: [
                        { id: 1, user: { first_name: 'John', last_name: 'Doe' }, level: 'Consultant' },
                    ]
                }
            }).as('getMedicalPersonnel');

            cy.intercept('GET', `**/episodes/${episodeId}/discharge/`, {
                statusCode: 200,
                body: {}
            }).as('getDischargeEmpty');

            cy.intercept('GET', `**/episodes/${episodeId}/follow-ups/`, {
                statusCode: 200,
                body: []
            }).as('getFollowUpsEmpty');

            cy.visit(`/patients/1/101/episodes/${episodeId}`);
            cy.wait(['@getEpisode', '@getDischargeEmpty', '@getFollowUpsEmpty']);
        });

        describe('Discharge', () => {
            beforeEach(() => {
                cy.contains('Add Discharge').click();
            });

            it('should validate Discharge Date is required', () => {
                cy.get('#discharge_date').focus().blur();
                cy.contains('Discharge date is required. Please select a date.').should('exist');
            });

            it('should validate Antibiotics given on discharge is required', () => {
                cy.get('#aware_of_mesh-select').focus().blur();
                cy.contains('Antibiotics given on discharge is required.').should('exist');
            });

            it('should validate Discharge Duration is required when Antibiotics are given', () => {
                cy.selectMuiOption('#aware_of_mesh-select', 'Yes');
                cy.get('#discharge_duration').focus().blur();
                cy.contains('Discharge duration is required.').should('exist');
            });

            it('should validate Post-operative complications are required', () => {
                // Blur does not work for checkboxes in the same way, so we click Save to trigger validation
                cy.contains('button', 'Save Discharge').click();
                cy.contains("Please record the post-operative complication above. If there wasn't any then select the option 'None'").should('exist');
            });

            it('should show error when discharge date is in the future', () => {
                const futureDate = new Date();
                futureDate.setDate(futureDate.getDate() + 1);
                const futureDateStr = futureDate.toISOString().split('T')[0];

                cy.get('#discharge_date').type(futureDateStr).blur();
                cy.contains('Discharge date cannot be set in the future.').should('exist');
            });

            it('should validate an empty Discharge form', () => {
                cy.contains('button', 'Save Discharge').click();
                cy.contains('Discharge date is required. Please select a date.').should('exist');
                cy.contains('Antibiotics given on discharge is required.').should('exist');
                cy.contains("Please record the post-operative complication above. If there wasn't any then select the option 'None'").should('exist');
            });
        });

        describe('Follow-up', () => {
            beforeEach(() => {
                cy.contains('Add Follow Up').click();
                cy.wait('@getMedicalPersonnel');
            });

            it('should validate Follow-up Date is required', () => {
                cy.get('#follow-up-date').focus().blur();
                cy.contains('Follow up date is required. Please select a date.').should('exist');
            });

            it('should validate Main Attendee is required', () => {
                cy.contains('Add Follow Up').parents('.MuiAccordion-root').within(() => {
                    cy.contains('button', 'Save Follow Up').click();
                });
                cy.contains('Main Attendee is required.').should('exist');
            });

            it('should validate Pain Severity is required', () => {
                cy.get('#pain_severity-select').focus().blur();
                cy.contains('Pain severity is required.').should('exist');
            });

            it('should validate Mesh Awareness is required', () => {
                cy.get('#mesh_awareness-select').focus().blur();
                cy.contains('Mesh awareness is required.').should('exist');
            });

            it('should validate Seroma is required', () => {
                cy.get('#seroma-select').focus().blur();
                cy.contains('Seroma is required.').should('exist');
            });

            it('should validate Infection is required', () => {
                cy.get('#infection-select').focus().blur();
                cy.contains('Infection is required.').should('exist');
            });

            it('should validate Numbness is required', () => {
                cy.get('#numbness-select').focus().blur();
                cy.contains('Numbness is required.').should('exist');
            });

            it('should validate Recurrence is required', () => {
                cy.get('#recurrence-select').focus().blur();
                cy.contains('Recurrence is required.').should('exist');
            });

            it('should validate Need for further surgery? is required', () => {
                cy.get('#further_surgery_need-select').focus().blur();
                cy.contains('Need for further surgery? is required.').should('exist');
            });

            it('should show error when follow-up date is in the future', () => {
                const futureDate = new Date();
                futureDate.setDate(futureDate.getDate() + 1);
                const futureDateStr = futureDate.toISOString().split('T')[0];

                cy.get('#follow-up-date').type(futureDateStr).blur();
                cy.contains('Follow up date cannot be set in the future.').should('exist');
            });

            it('should validate an empty Follow-up form', () => {
                cy.contains('Add Follow Up').parents('.MuiAccordion-root').within(() => {
                    cy.contains('button', 'Save Follow Up').click();

                    cy.contains('Follow up date is required. Please select a date.').should('exist');
                    cy.contains('Main Attendee is required.').should('exist');
                    cy.contains('Pain severity is required.').should('exist');
                    cy.contains('Mesh awareness is required.').should('exist');
                    cy.contains('Seroma is required.').should('exist');
                    cy.contains('Infection is required.').should('exist');
                    cy.contains('Numbness is required.').should('exist');
                    cy.contains('Recurrence is required.').should('exist');
                    cy.contains('Need for further surgery? is required.').should('exist');
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
                    primary_surgeon: {
                        id: 1,
                        user: {
                            email: 'surgeon1@example.com',
                            first_name: 'John',
                            last_name: 'Doe'
                        },
                        level: 'Consultant'
                    },
                    secondary_surgeon: {
                        id: 2,
                        user: {
                            email: 'surgeon2@example.com',
                            first_name: 'Jane',
                            last_name: 'Smith'
                        },
                        level: 'Registrar'
                    }
                }
            }).as('getEpisodeMultipleSurgeons');

            cy.reload();
            cy.wait('@getEpisodeMultipleSurgeons');

            cy.get('main > div > div > div:nth-child(2) > h3 > button').click();
            cy.contains('Test surgery comments').scrollIntoView().click().should('be.visible');

            cy.get('#primary_surgeon').should('have.text', 'John Doe').should('be.visible');
            cy.get('#secondary_surgeon').should('have.text', 'Jane Smith').should('be.visible');
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
                    primary_surgeon: null
                }
            }).as('getEpisodeMinimal');

            cy.reload();
            cy.wait('@getEpisodeMinimal');

            // Should still display without errors
            cy.contains('Episode Details').should('be.visible');
            cy.get('main > div > div > div:nth-child(2) > h3 > button').click(); // Open Surgery section
            cy.get('#antibiotic_used').should('have.text', 'No');
            cy.get('#antibiotic_type').should('have.text', '—');
            cy.get('#primary_surgeon').should('have.text', 'Not recorded');
            cy.get('#secondary_surgeon').should('have.text', 'None');
            cy.get('#tertiary_surgeon').should('have.text', 'None');
        });
    });

    describe('Error Handling', () => {
        beforeEach(() => {
            cy.window().then((win) => {
                win.localStorage.setItem('token-registry', 'fake-token');
            });

            cy.intercept('GET', `**/episodes/${episodeId}/`, {
                statusCode: 200,
                body: {
                    id: 888,
                    episode_type: 'Primary Inguinal',
                    surgery_date: '2023-01-15',
                    primary_surgeon: null,
                    diathermy_used: false,
                    antibiotic_used: false,
                }
            }).as('getEpisode');

            cy.intercept('GET', `**/medical-personnel/**`, {
                statusCode: 200,
                body: {
                    results: [
                        { id: 1, user: { first_name: 'John', last_name: 'Doe' }, level: 'Consultant' },
                    ]
                }
            }).as('getMedicalPersonnel');

            cy.intercept('GET', `**/episodes/${episodeId}/discharge/`, {
                statusCode: 200,
                body: {}
            }).as('getDischargeEmpty');

            cy.intercept('GET', `**/episodes/${episodeId}/follow-ups/`, {
                statusCode: 200,
                body: []
            }).as('getFollowUpsEmpty');

            cy.visit(`/patients/1/101/episodes/${episodeId}`);
            cy.wait(['@getEpisode', '@getDischargeEmpty', '@getFollowUpsEmpty']);
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

        it('should show error notification when Discharge fails with 500', () => {
            cy.intercept('POST', '**/discharges/', {
                statusCode: 500,
                body: { detail: 'Internal Server Error' }
            }).as('addDischargeError');

            cy.contains('Add Discharge').click();
            cy.get('#discharge_date').type('2023-01-16');
            cy.selectMuiOption('#aware_of_mesh-select', 'No');
            cy.get('#infection-none').check();
            cy.contains('button', 'Save Discharge').click();

            cy.wait('@addDischargeError');
            cy.contains('[data-testid="notification-alert"]', 'Internal Server Error').should('be.visible');
        });

        it('should show error notification when Follow Up fails with 400 validation error', () => {
            cy.intercept('POST', '**/follow-ups/', {
                statusCode: 400,
                body: {
                    date: ['Invalid date format'],
                    pain_severity: ['Severity is required']
                }
            }).as('addFollowUpError');

            cy.contains('Add Follow Up').click();
            cy.get('#follow-up-date').type('2023-02-15');
            cy.selectMuiOption('#primary_attendee', 'John Doe');
            cy.selectMuiOption('#pain_severity-select', 'No Pain');
            cy.selectMuiOption('#mesh_awareness-select', 'Yes');
            cy.selectMuiOption('#seroma-select', 'Yes');
            cy.selectMuiOption('#infection-select', 'Yes');
            cy.selectMuiOption('#numbness-select', 'Yes');
            cy.selectMuiOption('#recurrence-select', 'Yes');
            cy.selectMuiOption('#further_surgery_need-select', 'Yes');
            cy.get('button').contains('Save Follow Up').click();

            cy.wait('@addFollowUpError');
            cy.contains('[data-testid="notification-alert"]', 'Invalid date format Severity is required').should('be.visible');
        });
    });
});
