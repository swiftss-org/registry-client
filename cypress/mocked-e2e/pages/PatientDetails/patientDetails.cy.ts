
describe('Patient Details Page', () => {
    beforeEach(() => {
        cy.window().then((win) => {
            win.localStorage.setItem('token-registry', 'fake-token');
        });

        // Mock APIs
        cy.intercept('GET', '**/patients/101/', {
            statusCode: 200,
            body: {
                id: 101,
                full_name: 'John Doe',
                national_id: '123456789',
                age: 42,
                day_of_birth: '01',
                month_of_birth: '01',
                year_of_birth: '1980',
                gender: 'Male',
                hospital_mappings: [{ hospital_id: 1, patient_hospital_id: 'H123' }],
                episodes: [
                    { id: 1, surgery_date: '2023-01-01', episode_type: 'Inguinal Hernia', patient_id: 101, hospital_id: 1 },
                    { id: 2, surgery_date: '2023-01-02', episode_type: 'Appendectomy', patient_id: 101, hospital_id: 1 },
                ],
                phone_1: '123456789',
                phone_2: '987654321',
                address: '123 Main St, Anytown, USA',
            }
        }).as('getPatient');

        cy.intercept('GET', '**/hospitals/1/', {
            statusCode: 200,
            body: { id: 1, name: 'General Hospital' }
        }).as('getHospital');

        cy.visit('/patients/1/101');

        cy.wait(['@getPatient', '@getHospital']);
    });

    it('should display patient details', () => {
        cy.contains('Patient Details').should('be.visible');

        // Default tab: General Information
        cy.contains('General Information').should('have.css', 'border-bottom-color'); // active tab check might vary

        // Check content from GeneralInformation (assuming it shows name etc)
        cy.get('#full_name').should('have.text', 'John Doe');
        cy.get('#gender').should('have.text', 'Male');
        cy.get('#year_of_birth').should('have.text', '1980');
        cy.get('#month_of_birth').should('have.text', '01');
        cy.get('#age').should('have.text', '42');
        cy.get('#national_id').should('have.text', '123456789');
        cy.get('#hospital').should('have.text', 'General Hospital');
        cy.get('#patient_hospital_id').should('have.text', 'H123');
        cy.get('#phone_1').should('have.text', '123456789');
        cy.get('#phone_2').should('have.text', '987654321');
        cy.get('#address').should('have.text', '123 Main St, Anytown, USA');
    });

    it('should display episode list tab', () => {
        // Switch to Episodes tab
        cy.contains('Episodes').click();

        // Check content (EpisodeList)
        cy.contains('Appendectomy').should('be.visible');
        cy.contains('2023-01-02').should('be.visible');
        cy.contains('Inguinal Hernia').should('be.visible');
        cy.contains('2023-01-01').should('be.visible');
    });

    it('should visit the episode from the episode list tab', () => {
        // Switch to Episodes tab
        cy.contains('Episodes').click();

        // Check content (EpisodeList)
        cy.contains('Appendectomy').click();

        cy.url().should('include', '/patients/1/101/episodes/2');
    });

    it('should return to directory on back', () => {
        // Back arrow
        cy.get('main > div > div > button > svg').first().click();

        cy.url().should('include', '/patients');
        cy.url().should('not.include', '/101');
    });

    it('should navigate to register episode', () => {
        cy.contains('button', 'Register new episode').click();

        cy.url().should('include', '/add-episode');
    });

    describe('Edge cases', () => {
        it('should display no episodes message when no episodes are found', () => {
            cy.intercept('GET', '**/patients/101/', {
                statusCode: 200,
                body: {
                    id: 101,
                    full_name: 'John Doe',
                    national_id: '123456789',
                    age: 42,
                    day_of_birth: '01',
                    month_of_birth: '01',
                    year_of_birth: '1980',
                    gender: 'Male',
                    hospital_mappings: [{ hospital_id: 1, patient_hospital_id: 'H123' }],
                    episodes: [],
                    phone_1: '123456789',
                    phone_2: '987654321',
                    address: '123 Main St, Anytown, USA',
                }
            }).as('getPatientWithoutEpisodes');

            cy.reload();
            cy.wait(['@getPatientWithoutEpisodes']);

            cy.contains('Episodes').click();
            cy.contains('There are no episodes to display').should('be.visible');
        });

        it('should handle optional fields gracefully', () => {
            cy.intercept('GET', '**/patients/102/', {
                statusCode: 200,
                body: {
                    id: 102,
                    hospital_mappings: [],
                    episodes: []
                }
            }).as('getPatientWithMinimalFields');

            cy.visit('/patients/1/102');
            cy.wait('@getPatientWithMinimalFields');

            cy.get('#full_name').should('have.text', '—');
            cy.get('#gender').should('have.text', '—');
            cy.get('#year_of_birth').should('have.text', '—');
            cy.get('#month_of_birth').should('have.text', '—');
            cy.get('#age').should('have.text', '—');
            cy.get('#national_id').should('have.text', '—');
            cy.get('#hospital').should('have.text', 'General Hospital');
            cy.get('#patient_hospital_id').should('have.text', '—');
            cy.get('#phone_1').should('have.text', '—');
            cy.get('#phone_2').should('have.text', '—');
            cy.get('#address').should('have.text', '—');
        });
    });
});
