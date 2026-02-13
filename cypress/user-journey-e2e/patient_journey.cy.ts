describe('Patient Journey (Real DB)', () => {
    const timestamp = Math.floor(Date.now() / 1000);
    const testPatient = {
        firstName: 'Real',
        lastName: 'Patient ' + timestamp,
        hospital: 'General Hospital',
        nationalId: timestamp % 1000000000,
        hospitalId: (timestamp + 1) % 1000000000,
        yob: '1985',
        month: '10',
        day: '20',
        phone: '123456789',
        address: '123 E2E Street'
    };

    before(() => {
        // Reset the database before the suite
        cy.task('db:reset');
        cy.task('db:load');
    });

    it('should register a new patient and verify them in the directory', () => {
        // Verify Data was loaded
        cy.task('db:query', 'SELECT username FROM auth_user').then((registeredUsers) => {
            console.log('Registered Users in the DB:', registeredUsers);
        });

        // 1. Login
        cy.visit('/login');
        cy.get('#username').type('admin@admin.com');
        cy.get('#password').type('admin'); // Assuming 'admin' is the password for the seeded user
        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/landing');

        // 2. Navigate to Register Patient
        cy.visit('/patients/register');

        // 3. Fill the form
        cy.selectMuiOption('#hospital', testPatient.hospital);

        cy.get('#first_name').type(testPatient.firstName);
        cy.get('#last_name').type(testPatient.lastName);

        cy.get('#year_of_birth').type(testPatient.yob);
        cy.get('#month_of_birth').type(testPatient.month);
        cy.get('#day_of_birth').type(testPatient.day);

        cy.get('#national_id').type(testPatient.nationalId.toString());
        cy.get('#patient_hospital_id').type(testPatient.hospitalId.toString());

        cy.get('input[value="Male"]').check();

        cy.get('#phone1').type(testPatient.phone);
        cy.get('#address').type(testPatient.address);

        // 4. Submit
        cy.contains('button', 'Add new patient').click();

        // 5. Verify redirection to Patient Directory
        cy.url().should('match', /\/patients$/);

        // 6. Ensure the correct hospital is selected in the filter
        // The filter shows the hospital name. We click it to open and select General Hospital.
        cy.get('main').contains('Hospital').parent().click();
        cy.get('[role="listbox"]').contains(testPatient.hospital).click();

        // 7. Verify patient appears in the directory
        cy.contains(testPatient.firstName).should('be.visible');
        cy.contains(testPatient.lastName).should('be.visible');

        // 8. Click on the patient to go to details
        cy.contains(`${testPatient.firstName} ${testPatient.lastName}`).click();

        // 9. Verify details page
        cy.url().should('match', /\/patients\/\d+$/);
        cy.contains(testPatient.firstName).should('be.visible');
        cy.contains(testPatient.lastName).should('be.visible');
        cy.contains(testPatient.nationalId.toString()).should('be.visible');
        cy.contains(testPatient.address).should('be.visible');
    });
});
