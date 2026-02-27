
describe('Register Patient Page', () => {
    beforeEach(() => {
        // Mock the hospitals API
        cy.intercept('GET', '**/hospitals/**', {
            statusCode: 200,
            body: {
                results: [
                    { id: 1, name: 'General Hospital', address: 'London' },
                    { id: 2, name: 'City Hospital', address: 'London' }
                ],
                next: null,
                previous: null,
                count: 2
            }
        }).as('getHospitals');
    });

    describe('Happy Path', () => {
        it('should successfully register a new patient when all fields are valid', () => {
            // Mock the Register API
            cy.intercept('POST', '**/patients/', {
                statusCode: 201,
                body: { id: 123 }
            }).as('registerPatient');

            // Visit the page with token pre-set
            cy.visit('/patients/register', {
                onBeforeLoad: (win) => {
                    win.localStorage.setItem('token-registry', 'fake-token');
                }
            });

            // Wait for hospitals to load
            cy.wait('@getHospitals');

            // 1. Select Hospital
            cy.selectMuiOption('#hospital', 'General Hospital');
            cy.contains('General Hospital').should('be.visible');

            // 2. Personal Details
            cy.get('#first_name').type('John');
            cy.get('#middle_name').type('D');
            cy.get('#last_name').type('Doe');

            // 3. Birth Date
            cy.get('#year_of_birth').type('1990');
            cy.get('#year_of_birth').blur();

            cy.get('#month_of_birth').type('5');
            cy.get('#month_of_birth').blur();

            cy.get('#day_of_birth').type('15');
            cy.get('#day_of_birth').blur();

            // Verify Age calculated
            const currentYear = new Date().getFullYear();
            const expectedAge = currentYear - 1990;
            cy.get('#age').should('have.value', expectedAge.toString());

            // 4. Other fields
            cy.get('#national_id').type('123456789');
            cy.get('#patient_hospital_id').type('HOSP123');

            // 5. Gender
            cy.get('input[value="Male"]').check();

            // 6. Contact Details
            cy.get('#phone1').type('5550101');
            cy.get('#phone2').type('5550102');
            cy.get('#address').type('123 Main St');

            // 7. Submit
            cy.contains('button', 'Save patient').click();

            // Verify request
            cy.wait('@registerPatient').then((interception) => {
                expect(interception.request.body).to.deep.equal({
                    address: '123 Main St',
                    age: expectedAge,
                    day_of_birth: 15,
                    full_name: 'John D Doe',
                    gender: 'male',
                    hospital_id: 1,
                    month_of_birth: 5,
                    national_id: 123456789,
                    patient_hospital_id: 123,
                    phone_1: '5550101',
                    phone_2: '5550102',
                    year_of_birth: 1990
                });
            });

            // Verify redirection
            cy.url().should('include', '/patients');
            cy.url().should('not.include', '/register');

            // Verify notification
            cy.contains('[data-testid="notification-alert"]', 'Patient has been successfully saved').should('be.visible');
        });
    });

    describe('Regression tests', () => {
        it('should omit optional numbers in the payload and send no extraneous 0s', () => {
            // Mock the Register API
            cy.intercept('POST', '**/patients/', {
                statusCode: 201,
                body: { id: 124 }
            }).as('registerPatientEmptyOptionals');

            cy.visit('/patients/register', {
                onBeforeLoad: (win) => {
                    win.localStorage.setItem('token-registry', 'fake-token');
                }
            });

            cy.wait('@getHospitals');

            // 1. Select Hospital
            cy.selectMuiOption('#hospital', 'General Hospital');

            // 2. Personal Details (No Middle Name)
            cy.get('#first_name').type('Jane');
            cy.get('#last_name').type('Smith');

            // 3. Birth Date (Year only)
            cy.get('#year_of_birth').type('1985');
            cy.get('#year_of_birth').blur();

            const currentYear = new Date().getFullYear();
            const expectedAge = currentYear - 1985;
            cy.get('#age').should('have.value', expectedAge.toString());

            // 4. Other fields (No National ID)
            cy.get('#patient_hospital_id').type('HOSP456');

            // 5. Gender
            cy.get('input[value="Female"]').check();

            // 6. Contact Details (No Phone 2, No Address)
            cy.get('#phone1').type('5559999');

            // 7. Submit
            cy.contains('button', 'Save patient').click();

            // Verify request contains no 0s where undefined is expected
            cy.wait('@registerPatientEmptyOptionals').then((interception) => {
                expect(interception.request.body).to.deep.equal({
                    hospital_id: 1,
                    full_name: 'Jane Smith',
                    year_of_birth: 1985,
                    age: expectedAge,
                    patient_hospital_id: 456,
                    gender: 'female',
                    phone_1: '5559999',
                    address: '',
                });
            });

            // Verify redirection
            cy.url().should('include', '/patients');
        });
    });

    describe('Input Validation', () => {

        it('should validate Hospital drop down is required', () => {
            cy.visit('/patients/register', {
                onBeforeLoad: (win) => {
                    win.localStorage.setItem('token-registry', 'fake-token');
                }
            });
            cy.wait('@getHospitals');

            cy.get('#hospital').focus().blur();

            cy.contains('Hospital field is required').should('exist');
        });

        it('should validate First Name is required', () => {
            cy.visit('/patients/register', {
                onBeforeLoad: (win) => {
                    win.localStorage.setItem('token-registry', 'fake-token');
                }
            });
            cy.wait('@getHospitals');

            // Select Hospital
            cy.selectMuiOption('#hospital', 'General Hospital');

            cy.get('#first_name').type('{enter}');
            cy.get('#first_name').blur();

            cy.contains('First name field is required').should('exist');
        });

        it('should validate Last Name is required', () => {
            cy.visit('/patients/register', {
                onBeforeLoad: (win) => {
                    win.localStorage.setItem('token-registry', 'fake-token');
                }
            });
            cy.wait('@getHospitals');

            // Select Hospital
            cy.selectMuiOption('#hospital', 'General Hospital');
            cy.get('#first_name').type('John');

            cy.get('#last_name').type('{enter}');
            cy.get('#last_name').blur();

            cy.contains('Last name field is required').should('exist');
        });

        it('should validate Year of Birth is required', () => {
            cy.visit('/patients/register', {
                onBeforeLoad: (win) => {
                    win.localStorage.setItem('token-registry', 'fake-token');
                }
            });
            cy.wait('@getHospitals');

            // Select Hospital
            cy.selectMuiOption('#hospital', 'General Hospital');
            cy.get('#first_name').type('John');
            cy.get('#last_name').type('Doe');

            cy.get('#year_of_birth').focus().blur();
            cy.contains('Year of birth field is required').should('exist');
        });

        it('should validate Patient Hospital ID is required', () => {
            cy.visit('/patients/register', {
                onBeforeLoad: (win) => {
                    win.localStorage.setItem('token-registry', 'fake-token');
                }
            });
            cy.wait('@getHospitals');

            // Select Hospital
            cy.selectMuiOption('#hospital', 'General Hospital');
            cy.get('#first_name').type('John');
            cy.get('#last_name').type('Doe');
            cy.get('#year_of_birth').type('1990');

            cy.get('#patient_hospital_id').focus().blur();
            cy.contains('Patient Hospital ID field is required').should('exist');
        });

        it('should validate Gender is required', () => {
            cy.visit('/patients/register', {
                onBeforeLoad: (win) => {
                    win.localStorage.setItem('token-registry', 'fake-token');
                }
            });
            cy.wait('@getHospitals');

            // Select Hospital
            cy.selectMuiOption('#hospital', 'General Hospital');
            cy.get('#first_name').type('John');
            cy.get('#last_name').type('Doe');
            cy.get('#year_of_birth').type('1990');
            cy.get('#patient_hospital_id').type('123456');
            cy.get('#phone1').type('5550101');

            // Attempt to submit without selecting gender
            cy.contains('button', 'Save patient').click();
            // Gender validation message is often custom, check utils.ts or UI
            cy.contains('Gender field is required. Please select the gender above.').should('exist');
        });

        it('should validate Phone #1 is required', () => {
            cy.visit('/patients/register', {
                onBeforeLoad: (win) => {
                    win.localStorage.setItem('token-registry', 'fake-token');
                }
            });
            cy.wait('@getHospitals');

            // Select Hospital
            cy.selectMuiOption('#hospital', 'General Hospital');
            cy.get('#first_name').type('John');
            cy.get('#last_name').type('Doe');
            cy.get('#year_of_birth').type('1990');
            cy.get('#patient_hospital_id').type('123456');
            cy.get('input[value="Male"]').check();

            cy.get('#phone1').focus().blur();
            cy.contains('Phone #1 field is required').should('exist');
        });

        it('should validate phone number input (numbers only)', () => {
            cy.visit('/patients/register', {
                onBeforeLoad: (win) => {
                    win.localStorage.setItem('token-registry', 'fake-token');
                }
            });
            cy.wait('@getHospitals');

            // Based on "parseOnlyNumbers" in code
            cy.get('#phone1').type('abc');
            cy.get('#phone1').should('have.value', '');

            cy.get('#phone1').type('123');
            cy.get('#phone1').should('have.value', '123');
        });

        it('should validate an empty submitted form', () => {
            cy.visit('/patients/register', {
                onBeforeLoad: (win) => {
                    win.localStorage.setItem('token-registry', 'fake-token');
                }
            });
            cy.wait('@getHospitals');

            cy.contains('button', 'Save patient').click();

            cy.contains('Hospital field is required').should('exist');
            cy.contains('First name field is required').should('exist');
            cy.contains('Last name field is required').should('exist');
            cy.contains('Year of birth field is required').should('exist');
            cy.contains('Patient Hospital ID field is required').should('exist');
            cy.contains('Gender field is required. Please select the gender above.').should('exist');
            cy.contains('Phone #1 field is required').should('exist');
        });
    });

    describe('Edge Cases', () => {
        it('should warn when leaving with unsaved changes', () => {
            cy.visit('/patients/register', {
                onBeforeLoad: (win) => {
                    win.localStorage.setItem('token-registry', 'fake-token');
                }
            });
            cy.wait('@getHospitals');

            // Make form dirty
            cy.get('#first_name').type('Dirty');

            // Click back button using the test id we added
            cy.get('[data-testid="back-button"]').click();

            // Check modal appears
            cy.contains('Cancel new addition?').should('exist');
            cy.contains('Are you sure you want to cancel adding a new patient?').should('exist');

            // Test cancelling the exit (stay on page)
            // Assuming there is a close button or we can click outside. 
            // If we don't know the close button selector, checking for "Yes, cancel new addition" is the confirm action.
            // Usually there is a secondary button or X. 
            // For now, let's just assert the modal is there.

            // Test confirming exit
            cy.contains('Yes, cancel new addition').click();

            // Should navigate away
            cy.url().should('include', '/patients');
            cy.url().should('not.include', '/register');
        });
    });
});
