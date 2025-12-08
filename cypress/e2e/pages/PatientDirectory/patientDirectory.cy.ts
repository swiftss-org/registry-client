
describe('Patient Directory Page', () => {
    beforeEach(() => {
        cy.window().then((win) => {
            win.localStorage.setItem('token-registry', 'fake-token');
        });

        // Mock APIs
        cy.intercept('GET', '**/hospitals/**', {
            statusCode: 200,
            body: {
                results: [
                    { id: 1, name: 'General Hospital' },
                    { id: 2, name: 'City Hospital' }
                ],
                count: 2
            }
        }).as('getHospitals');

        cy.intercept('GET', '**/preferred-hospital/**', {
            statusCode: 200,
            body: { hospital: { id: 1, name: 'General Hospital' } }
        }).as('getPreferredHospital');

        cy.intercept('GET', '**/patients/**', (req) => {
            // Check params
            const { hospital_id, search_term, ordering } = req.query;

            let patients = [
                { id: 101, full_name: 'John Doe', created_at: '2023-01-01', year_of_birth: 1980, gender: 'Male', national_id: '123456789', patient_hospital_id: 'H1', hospital_mappings: [{ hospital_id: 1, patient_hospital_id: 'H1' }] },
                { id: 102, full_name: 'Jane Smith', created_at: '2023-03-01', year_of_birth: 1990, gender: 'Female', national_id: '987654321', patient_hospital_id: 'H2', hospital_mappings: [{ hospital_id: 1, patient_hospital_id: 'H2' }] },
                { id: 103, full_name: 'Test Patient', created_at: '2023-02-01', year_of_birth: 1980, gender: 'Male', national_id: '112233445', patient_hospital_id: 'H1', hospital_mappings: [{ hospital_id: 1, patient_hospital_id: 'H1' }] },
            ];

            // Filter by search term (searches full_name, gender, and national_id)
            if (search_term && String(search_term).trim() !== '') {
                const searchLower = String(search_term).toLowerCase();
                patients = patients.filter(patient =>
                    patient.full_name.toLowerCase().includes(searchLower) ||
                    patient.gender.toLowerCase().includes(searchLower) ||
                    patient.national_id.toLowerCase().includes(searchLower)
                );
            }

            // Filter by hospital_id
            if (hospital_id == '2') {
                patients = [];
            }

            // Sort patients based on ordering parameter
            if (ordering === 'full_name') {
                patients.sort((a, b) => a.full_name.localeCompare(b.full_name));
            } else if (ordering === '-full_name') {
                patients.sort((a, b) => b.full_name.localeCompare(a.full_name));
            } else if (ordering === 'created_at') {
                patients.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
            } else if (ordering === '-created_at') {
                patients.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            } else {
                patients.sort((a, b) => a.full_name.localeCompare(b.full_name));
            }

            // Return filtered and sorted results
            req.reply({
                statusCode: 200,
                body: {
                    results: patients,
                    count: patients.length
                }
            });
        }).as('getPatients');

        cy.visit('/patients');

        cy.wait(['@getPatients', '@getHospitals', '@getPreferredHospital']);
        // Remove error overlay if present (hack for lint warnings)
        cy.get('body > iframe').then(($iframe) => {
            $iframe.remove();
        });
    });

    it('should display patients list', () => {
        cy.contains('Patients directory').should('be.visible');
        cy.contains('Center').should('be.visible');
        cy.contains('General Hospital').should('be.visible');
        cy.contains('Patients 1-3 out of 3').should('be.visible');
        cy.contains('John Doe').parent().within(() => {
            cy.contains('John Doe').should('be.visible');
            cy.contains('Male').should('be.visible');
            cy.contains('123456789').should('be.visible');
            cy.contains('H1').should('be.visible');
        });
        cy.contains('Jane Smith').parent().within(() => {
            cy.contains('Jane Smith').should('be.visible');
            cy.contains('Female').should('be.visible');
            cy.contains('987654321').should('be.visible');
            cy.contains('H2').should('be.visible');
        });
        cy.contains('Test Patient').parent().within(() => {
            cy.contains('Test Patient').should('be.visible');
            cy.contains('Male').should('be.visible');
            cy.contains('112233445').should('be.visible');
            cy.contains('H1').should('be.visible');
        });
    });

    it('should filter by hospital', () => {
        // Change hospital filter
        cy.contains('General Hospital').click();
        cy.get('[data-testid="ictinus_list_item_0"] div').click();

        cy.wait('@getPatients');

        // Second hospital does not have patients
        // TODO activate it after the UI is better cy.contains('No patients to show').should('be.visible');
    });

    it('should navigate to register patient', () => {
        cy.get('main button[data-testid="icon-button"]').click();
        cy.url().should('include', '/patients/register');
    });

    it('should sort the patients by name back and forth', () => {
        cy.get('main > div > div > svg').click();
        cy.get('input[value="full_name"]').check();

        cy.contains('John Doe').parent().parent().parent().then(($rows) => {
            cy.wrap($rows).children().eq(0).contains('Jane Smith').should('exist');
            cy.wrap($rows).children().eq(1).contains('John Doe').should('exist');
            cy.wrap($rows).children().eq(2).contains('Test Patient').should('exist');
        });

        cy.get('main > div > div > svg').click();
        cy.get('input[value="-full_name"]').check();

        cy.contains('John Doe').parent().parent().parent().then(($rows) => {
            cy.wrap($rows).children().eq(0).contains('Test Patient').should('exist');
            cy.wrap($rows).children().eq(1).contains('John Doe').should('exist');
            cy.wrap($rows).children().eq(2).contains('Jane Smith').should('exist');
        });
    });

    it('should sort the patients by date back and forth', () => {
        cy.get('main > div > div > svg').click();
        cy.get('input[value="created_at"]').check();

        cy.contains('John Doe').parent().parent().parent().then(($rows) => {
            cy.wrap($rows).children().eq(0).contains('John Doe').should('exist');
            cy.wrap($rows).children().eq(1).contains('Test Patient').should('exist');
            cy.wrap($rows).children().eq(2).contains('Jane Smith').should('exist');
        });

        cy.get('main > div > div > svg').click();
        cy.get('input[value="-created_at"]').check();

        cy.contains('John Doe').parent().parent().parent().then(($rows) => {
            cy.wrap($rows).children().eq(0).contains('Jane Smith').should('exist');
            cy.wrap($rows).children().eq(1).contains('Test Patient').should('exist');
            cy.wrap($rows).children().eq(2).contains('John Doe').should('exist');
        });
    });

    it('should search for a patient by name', () => {
        cy.get('input[data-testid="search-field"]').type('John Doe').type('{enter}');
        cy.contains('John Doe').should('exist')
        cy.contains('Jane Smith').should('not.exist')
        cy.contains('Test Patient').should('not.exist')
    });

    it('should search for a patient by gender', () => {
        cy.get('input[data-testid="search-field"]').type('Male').type('{enter}');
        cy.contains('John Doe').should('exist')
        cy.contains('Test Patient').should('exist')
        cy.contains('Jane Smith').should('not.exist')
    });

    it('should search for a patient by national id', () => {
        cy.get('input[data-testid="search-field"]').type('123456789').type('{enter}');
        cy.contains('John Doe').should('exist')
        cy.contains('Test Patient').should('not.exist')
        cy.contains('Jane Smith').should('not.exist')
    });

    it('should navigate to patient details on card click', () => {
        // Prevent uncaught exceptions from failing the test
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        cy.contains('John Doe').click();
        cy.url().should('include', '/patients/1/101');
    });
});
