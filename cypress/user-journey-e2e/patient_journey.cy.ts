describe('Patient Journey (Real DB)', () => {
    const timestamp = Math.floor(Date.now() / 1000);
    const hospitalId = 2;
    const hospitalName = 'General Hospital';
    const testPatient = {
        firstName: 'Real',
        middleName: 'Middle',
        lastName: 'Patient ' + timestamp,
        hospital: hospitalName,
        nationalId: timestamp % 1000000000,
        hospitalId: hospitalId,
        yob: '1985',
        month: '10',
        day: '20',
        phone: '123456789',
        phone2: '987654321',
        address: '123 E2E Street'
    };

    before(() => {
        // Reset the database before the suite
        cy.task('db:reset');
        cy.task('db:load');
    });

    it('should register a new patient and verify them in the directory', () => {
      // 1. Setup dynamic admin account
      const adminEmail = `admin_${timestamp}@admin.com`;
      const adminPassword = 'AdminPassword123!';

      cy.task('db:createUser', {
        username: adminEmail,
        password: adminPassword,
        firstName: 'Dynamic',
        lastName: 'Admin',
        hospitalId: hospitalId,
        isStaff: true,
        isActive: true,
      });

      // 2. Login
      cy.visit('/login', {
        onBeforeLoad(win) {
          win.localStorage.clear();
          win.sessionStorage.clear();
        },
      });

      cy.get('#username', { timeout: 10000 }).should('be.visible').type(adminEmail);
      cy.get('#password').type(adminPassword);
      cy.get('button[type="submit"]').click();

      cy.url().should('include', '/landing', { timeout: 15000 });

      // 2. Navigate to Register Patient
      cy.visit('/patients/register');

      // 3. Fill the form with ALL fields
      cy.selectMuiOption('#hospital', testPatient.hospital);

      cy.get('#first_name').type(testPatient.firstName);
      cy.get('#middle_name').type(testPatient.middleName);
      cy.get('#last_name').type(testPatient.lastName);

      cy.get('#year_of_birth').type(testPatient.yob);
      cy.get('#month_of_birth').type(testPatient.month);
      cy.get('#day_of_birth').type(testPatient.day);

      cy.get('#national_id').type(testPatient.nationalId.toString());
      cy.get('#patient_hospital_id').type(testPatient.hospitalId.toString());

      cy.get('input[value="Male"]').check();

      cy.get('#phone1').type(testPatient.phone);
      cy.get('#phone2').type(testPatient.phone2);
      cy.get('#address').type(testPatient.address);

      // 4. Submit
      cy.contains('button', 'Add new patient').click();


      // 6. Verify redirection to Patient Directory
      cy.url().should('match', /\/patients$/, { timeout: 10000 });

      // 7. Ensure the correct hospital is selected in the filter
      cy.selectMuiOption('#center', testPatient.hospital);

      // Verify the selection "stuck" and is now the test hospital
      cy.get('#center').contains(testPatient.hospital).should('be.visible');

      // 8. Verify patient appears in the directory
      cy.contains(testPatient.firstName, { timeout: 10000 }).should('be.visible');
      cy.contains(testPatient.lastName).should('be.visible');

      // 9. Click on the patient to go to details
      cy.contains(
        `${testPatient.firstName} ${testPatient.middleName} ${testPatient.lastName}`
      ).click();

      // 10. Verify details page
      cy.url().should('match', /\/patients\/\d+\/\d+$/);
      cy.contains(testPatient.firstName).should('be.visible');
      cy.contains(testPatient.middleName).should('be.visible');
      cy.contains(testPatient.lastName).should('be.visible');
      cy.contains(testPatient.nationalId.toString()).should('be.visible');
      cy.contains(testPatient.address).should('be.visible');
      cy.contains(testPatient.phone).should('be.visible');
      cy.contains(testPatient.phone2).should('be.visible');
    });
});
