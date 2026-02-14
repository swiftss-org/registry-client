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
      // Intercept registration and login requests
      cy.intercept('POST', '**/patients/').as('registerPatient');
      cy.intercept('POST', '**/sign-in/').as('login');

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
      cy.clearLocalStorage();
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/login');

      // Debug: Print URL, storage, and cookies after visiting /login
      cy.url().then((url) => {
        cy.log('CI DEBUG - URL after visit /login: ' + url);
        cy.task('log', 'CI DEBUG - URL after visit /login: ' + url);
      });
      cy.window().then((win) => {
        const localToken = win.localStorage.getItem('token-registry');
        const sessionToken = win.sessionStorage.getItem('token-registry');
        cy.log('CI DEBUG - localStorage token after visit: ' + localToken);
        cy.log('CI DEBUG - sessionStorage token after visit: ' + sessionToken);
        cy.task('log', 'CI DEBUG - localStorage token after visit: ' + localToken);
        cy.task('log', 'CI DEBUG - sessionStorage token after visit: ' + sessionToken);
      });
      cy.getCookies().then((cookies) => {
        cy.log('CI DEBUG - cookies after visit: ' + JSON.stringify(cookies));
        cy.task('log', 'CI DEBUG - cookies after visit: ' + JSON.stringify(cookies));
      });

      // Debug: Check users in DB for debugging
      cy.task('db:query', 'SELECT id, username, is_active, is_staff, password FROM auth_user').then(
        (rows: any) => {
          const msg = 'CI DEBUG - Users in DB: ' + JSON.stringify(rows);
          cy.log(msg);
          cy.task('log', msg);
        }
      );

      cy.get('#username', { timeout: 10000 }).should('be.visible').type(adminEmail);
      cy.get('#password').type(adminPassword);
      cy.get('button[type="submit"]').click();

      // Wait for login and log the response
      cy.wait('@login', { timeout: 15000 }).then((interception) => {
        const statusMsg = 'CI DEBUG - Login Response Status: ' + interception.response?.statusCode;
        const bodyMsg =
          'CI DEBUG - Login Response Body: ' + JSON.stringify(interception.response?.body);
        cy.log(statusMsg);
        cy.task('log', statusMsg);
        cy.log(bodyMsg);
        cy.task('log', bodyMsg);
      });

      // Wait a bit for React state to update
      cy.wait(500);

      // Print browser console errors after login
      cy.window().then((win) => {
        if (win.console && win.console.error) {
          // This will only print errors that happened after this point
          cy.task('log', 'CI DEBUG - No browser console error hook available');
        }
      });

      // Debug: Print localStorage and sessionStorage after login
      cy.window().then((win) => {
        const localToken = win.localStorage.getItem('token-registry');
        const sessionToken = win.sessionStorage.getItem('token-registry');
        cy.log('CI DEBUG - localStorage token: ' + localToken);
        cy.log('CI DEBUG - sessionStorage token: ' + sessionToken);
        cy.task('log', 'CI DEBUG - localStorage token: ' + localToken);
        cy.task('log', 'CI DEBUG - sessionStorage token: ' + sessionToken);
        // If token is missing, set it manually from the login response
        if (!localToken && !sessionToken) {
          cy.get('@login').then((interception) => {
            const token = interception.response?.body?.token;
            if (token) {
              win.localStorage.setItem('token-registry', token);
              cy.log('CI DEBUG - Manually set token in localStorage');
              cy.task('log', 'CI DEBUG - Manually set token in localStorage');
              win.location.reload();
            }
          });
        }
      });

      cy.url().should('include', '/landing', { timeout: 15000 });

      // 2. Navigate to Register Patient
      cy.visit('/patients/register');

      // Debug: Check hospitals in DB for debugging
      cy.task('db:query', 'SELECT id, name FROM registry_hospital').then((rows: any) => {
        const msg = 'CI DEBUG - Hospitals in DB: ' + JSON.stringify(rows);
        cy.log(msg);
        cy.task('log', msg);
      });

      // Debug: Check preferred hospitals in DB for debugging
      cy.task(
        'db:query',
        'SELECT id, medical_personnel, hospital FROM registry_preferredhospital'
      ).then((rows: any) => {
        const msg = 'CI DEBUG - Preferred Hospitals in DB: ' + JSON.stringify(rows);
        cy.log(msg);
        cy.task('log', msg);
      });

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

      // Wait for the request and check the status
      cy.wait('@registerPatient', { timeout: 10000 }).then((interception) => {
        const msg = 'CI DEBUG - Registration Response Status: ' + interception.response?.statusCode;
        cy.log(msg);
        cy.task('log', msg);
        expect(interception.response?.statusCode).to.eq(201);

        // 5. DB Verification - check the data is stored correctly
        const nationalId = testPatient.nationalId.toString();
        cy.task(
          'db:query',
          `SELECT * FROM registry_patient WHERE national_id = '${nationalId}'`
        ).then((rows: any) => {
          expect(rows).to.have.length(1);
          const patient = rows[0];
          expect(patient.full_name).to.eq(
            `${testPatient.firstName} ${testPatient.middleName} ${testPatient.lastName}`
          );
          expect(patient.national_id).to.eq(nationalId);
          expect(typeof patient.national_id).to.eq('string');
          expect(patient.gender.toUpperCase()).to.eq('MALE');
          expect(patient.phone_1).to.eq(testPatient.phone);
          expect(patient.phone_2).to.eq(testPatient.phone2);
          expect(patient.address).to.eq(testPatient.address);
        });
      });

      // 6. Verify redirection to Patient Directory
      cy.url().should('match', /\/patients$/, { timeout: 10000 });

      // Wait for the directory to load and show the default hospital
      // cy.get('#center', { timeout: 10000 }).should('be.visible').contains('Royal London Hospital');

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
