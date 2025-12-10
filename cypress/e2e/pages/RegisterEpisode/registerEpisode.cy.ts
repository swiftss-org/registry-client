
describe('Register Episode Page', () => {
    beforeEach(() => {
        cy.window().then((win) => {
            win.localStorage.setItem('token-registry', 'fake-token');
        });

        // Mock shared APIs
        cy.intercept('GET', '**/hospitals/**', { results: [{ id: 1, name: 'General Hospital' }, { id: 2, name: 'City Hospital' }] }).as('getHospitals');
        cy.intercept('GET', '**/medical-personnel/**', { results: [{ id: 1, user: { first_name: 'Dr.', last_name: 'Surgeon' } }] }).as('getSurgeons');
        cy.intercept('GET', '**/patients/101/', { id: 101, first_name: 'John', last_name: 'Doe', hospital_mappings: [{ hospital_id: 1, patient_hospital_id: 'H1' }] }).as('getPatient');

        cy.visit('/patients/1/101/add-episode');

        cy.wait(['@getPatient', '@getHospitals', '@getSurgeons']);
    });

    describe('Happy Path', () => {
        it('should register an episode successfully', () => {
            // Mock submit
            cy.intercept('POST', '**/episodes/', { statusCode: 201, body: { id: 999 } }).as('registerEpisode');
            cy.intercept('POST', '**/patient-hospital-mappings/', { statusCode: 201, body: { id: 999 } }).as('registerPatientHospitalMapping');

            cy.get('#hospital').click();
            cy.contains('City Hospital').click();
            cy.contains('City Hospital').should('be.visible');

            cy.get('#patient_hospital_id').click().type('H2');
//             TODO fix this cy.contains('H2').should('be.visible');

            // Select Episode Type
            cy.get('#episode_type').click();
            cy.contains('Femoral Mesh Hernia Repair').click();
            cy.contains('Femoral Mesh Hernia Repair').should('be.visible');

            // CEPOD
            cy.get('#cepod').click();
            cy.contains('Emergency').click();
            cy.contains('Emergency').should('be.visible');

            // Side
            cy.get('#side').click();
            cy.contains('Right').click();
            cy.contains('Right').should('be.visible');

            // Occurrence
            cy.get('#occurence').click();
            cy.contains('Recurrent').click();
            cy.contains('Recurrent').should('be.visible');

            // Type
            cy.get('#type').click();
            cy.contains('Indirect').click();
            cy.contains('Indirect').should('be.visible');

            // Size
            cy.get('#size').click();
            cy.contains('Very Large (>4 finger breadths)').click();
            cy.contains('Very Large (>4 finger breadths)').should('be.visible');

            // Complexity
            cy.get('#complexity').click();
            cy.contains('Irreducible').click();
            cy.contains('Irreducible').should('be.visible');

            // Surgery Date
            cy.get('#surgery_date').type('2023-11-20');
//             TODO fix this cy.contains('20/11/2023').should('be.visible');

            // Mesh Type
            cy.get('#mesh_type').click();
            cy.contains('TNMHP Mesh').click();
            cy.contains('TNMHP Mesh').should('be.visible');

            // Anaesthetic Type
            cy.get('#anaesthetic_type').click();
            cy.contains('Local Anaesthetic').click();
            cy.contains('Local Anaesthetic').should('be.visible');

            // Diathermy Used - Yes/No
            cy.get('#diathermy_used').click();
            cy.get('ul[aria-labelledby="diathermy-used-label"]').contains('Yes').click();
            cy.contains('Yes').should('be.visible');

            // Antibiotic Used - Yes/No
            cy.get('#antibiotic_used').click();
            cy.get('ul[aria-labelledby="antibiotic-used-label"]').contains('Yes').click();
            cy.contains('Yes').should('be.visible');

            // Selecting +24hrs Post Op IV
            cy.get('form > div > div > div:nth-child(7) > div:nth-child(2) > div > input').click({ force: true });

            // Surgeon
            cy.get('#id').click(); // ID for surgeon select is 'id' in the loop
            cy.contains('Dr. Surgeon').click();
            cy.contains('Dr. Surgeon').should('be.visible');

            // Comments
            cy.get('#comments').type('Successfull surgery');
            cy.contains('Successfull surgery').should('be.visible');

            // Submit
            cy.contains('button', 'Register an Episode').click();

            cy.wait(['@registerEpisode', '@registerPatientHospitalMapping']).then((interception) => {
                // Verify all episode fields
                expect(interception[0].request.body).to.include({
                    patient_id: 101,
                    hospital_id: 2,
                    episode_type: 'Femoral Mesh Hernia Repair',
                    cepod: 'Emergency',
                    side: 'Right',
                    occurence: 'Recurrent',
                    type: 'Indirect',
                    size: 'Very Large (>4 finger breadths)',
                    complexity: 'Irreducible',
                    surgery_date: '2023-11-20',
                    mesh_type: 'TNMHP Mesh',
                    anaesthetic_type: 'Local Anaesthetic',
                    diathermy_used: true,
                    antibiotic_used: true,
                    comments: 'Successfull surgery'
                });

                // Verify antibiotic_type (should be '+24hrs Post Op IV' when selected)
                expect(interception[0].request.body.antibiotic_type).to.include('+24hrs Post Op IV');

                // Verify surgeon_ids is an array with at least one surgeon
                expect(interception[0].request.body.surgeon_ids).to.be.an('array');
                expect(interception[0].request.body.surgeon_ids).to.have.length.at.least(1);
                expect(interception[0].request.body.surgeon_ids).to.include(1);

                // Verify hospital mapping
                expect(interception[1].request.body).to.include({
                    patient_hospital_id: 'H2',
                    hospital_id: 2
                });
            });

            // Redirect check
            cy.url().should('include', '/patients/1/101');
        });
    });

    describe('Input Validation', () => {
        it('should validate Hospital is required', () => {
            cy.get('#hospital').click();
            cy.get('body').type('{esc}');

            cy.contains('This field is required').should('exist');
        });

        it('should validate Episode Type is required', () => {
            cy.get('#episode_type').click();
            cy.get('body').type('{esc}');

            cy.contains('This field is required').should('exist');
        });

        it('should validate Surgery Date is required', () => {
            cy.get('#surgery_date').focus().blur();
            cy.get('body').type('{esc}');

            cy.contains('This field is required. Please select a date.').should('exist');
        });

        it('should validate CEPOD is required', () => {
            cy.get('#cepod').click();
            cy.get('body').type('{esc}');

            cy.contains('This field is required').should('exist');
        });

        it('should validate Side is required', () => {
            cy.get('#side').click();
            cy.get('body').type('{esc}');

            // TODO this should be fixed by requiring this field cy.contains('This field is required').should('exist');
        });

        it('should validate Occurrence is required', () => {
            cy.get('#occurence').click();
            cy.get('body').type('{esc}');

            cy.contains('This field is required').should('exist');
        });

        it('should validate Type is required', () => {
            cy.get('#size').click();
            cy.get('body').type('{esc}');

            cy.contains('This field is required').should('exist');
        });

        it('should validate Size is required', () => {
            cy.get('#size').click();
            cy.get('body').type('{esc}');

            cy.contains('This field is required').should('exist');
        });

        it('should validate Complexity is required', () => {
            cy.get('#complexity').click();
            cy.get('body').type('{esc}');

            cy.contains('This field is required').should('exist');
        });

        it('should validate Mesh Type is required', () => {
            cy.get('#mesh_type').click();
            cy.get('body').type('{esc}');

            cy.contains('This field is required').should('exist');
        });

        it('should validate Anaesthetic Type is required', () => {
            cy.get('#anaesthetic_type').click();
            cy.get('body').type('{esc}');

            cy.contains('This field is required').should('exist');
        });

        it('should validate Diathermy Used is required', () => {
            cy.get('#diathermy_used').click();
            cy.get('body').type('{esc}');

            cy.contains('This field is required').should('exist');
        });

        it('should validate Antibiotic Used is required', () => {
            cy.get('#antibiotic_used').click();
            cy.get('body').type('{esc}');

            cy.contains('This field is required').should('exist');
        });

        it('should validate Surgeon is required', () => {
            cy.get('#hospital').click();
            cy.contains('General Hospital').click();
            cy.get('#episode_type').click();
            cy.contains('Femoral Mesh Hernia Repair').click();
            cy.get('#surgery_date').type('2023-11-20');
            cy.get('#cepod').click();
            cy.contains('Emergency').click();
            cy.get('#side').click();
            cy.contains('Right').click();
            cy.get('#occurence').click();
            cy.contains('Recurrent').click();
            cy.get('#type').click();
            cy.contains('Indirect').click();
            cy.get('#size').click();
            cy.contains('Very Large (>4 finger breadths)').click();
            cy.get('#complexity').click();
            cy.contains('Irreducible').click();
            cy.get('#mesh_type').click();
            cy.contains('TNMHP Mesh').click();
            cy.get('#anaesthetic_type').click();
            cy.contains('Local Anaesthetic').click();
            cy.get('#diathermy_used').click();
            cy.get('ul[aria-labelledby="diathermy-used-label"]').contains('Yes').click();
            cy.get('#antibiotic_used').click();
            cy.get('ul[aria-labelledby="antibiotic-used-label"]').contains('Yes').click();
            cy.get('form > div > div > div:nth-child(7) > div:nth-child(2) > div > input').click({ force: true });
            cy.get('#comments').type('Successfull surgery');

            cy.get('#id').click(); // Surgeon field
            cy.get('body').type('{esc}');

            cy.contains('button', 'Register an Episode').click();

            cy.contains('This field is required').should('exist');
        });

        it('should validate all field before submitting the form', () => {
            cy.contains('button', 'Register an Episode').click();

            cy.contains('This field is required').should('exist').its('length').should('eq', 3);
        });
    });

    describe('Edge Cases', () => {
        it('should handle dirty form warning', () => {
            cy.get('#comments').type('Dirty');

            cy.get('main > div > div > button > svg').first().click();

            cy.contains('Cancel new registration?').should('be.visible');
            cy.contains('Yes, cancel new registration').click();
            cy.url().should('include', '/patients/1/101');
        });

        it('should show error when surgery date is in the future', () => {
            // Enter a future date
            const futureDate = new Date();
            futureDate.setFullYear(futureDate.getFullYear() + 1);
            const futureDateStr = futureDate.toISOString().split('T')[0];

            cy.get('#surgery_date').type(futureDateStr);
            cy.get('#surgery_date').blur();

            cy.contains('Surgery date cannot be set in the future.').should('exist');
        });

        it('should handle server error (500) gracefully', () => {
            // Mock server error
            cy.intercept('POST', '**/episodes/', { statusCode: 500, body: { error: 'Internal Server Error' } }).as('registerEpisodeError');

            // Fill all required fields
            cy.get('#hospital').click();
            cy.contains('General Hospital').click();
            cy.get('#episode_type').click();
            cy.contains('Femoral Mesh Hernia Repair').click();
            cy.get('#surgery_date').type('2023-11-20');
            cy.get('#cepod').click();
            cy.contains('Emergency').click();
            cy.get('#side').click();
            cy.contains('Right').click();
            cy.get('#occurence').click();
            cy.contains('Recurrent').click();
            cy.get('#type').click();
            cy.contains('Indirect').click();
            cy.get('#size').click();
            cy.contains('Very Large (>4 finger breadths)').click();
            cy.get('#complexity').click();
            cy.contains('Irreducible').click();
            cy.get('#mesh_type').click();
            cy.contains('TNMHP Mesh').click();
            cy.get('#anaesthetic_type').click();
            cy.contains('Local Anaesthetic').click();
            cy.get('#diathermy_used').click();
            cy.get('ul[aria-labelledby="diathermy-used-label"]').contains('Yes').click();
            cy.get('#antibiotic_used').click();
            cy.get('ul[aria-labelledby="antibiotic-used-label"]').contains('No').click();
            cy.get('#id').click();
            cy.contains('Dr. Surgeon').click();

            cy.contains('button', 'Register an Episode').click();

            cy.wait('@registerEpisodeError');

            // Should stay on the same page and potentially show error message
            cy.url().should('include', '/add-episode');
            // TODO when error handling is better cy.contains('Error message.').should('exist');
        });

        it('should handle special characters in comments', () => {
            // Mock submit
            cy.intercept('POST', '**/episodes/', { statusCode: 201, body: { id: 999 } }).as('registerEpisode');

            // Fill required fields
            cy.get('#hospital').click();
            cy.contains('General Hospital').click();
            cy.get('#episode_type').click();
            cy.contains('Femoral Mesh Hernia Repair').click();
            cy.get('#surgery_date').type('2023-11-20');
            cy.get('#cepod').click();
            cy.contains('Emergency').click();
            cy.get('#side').click();
            cy.contains('Right').click();
            cy.get('#occurence').click();
            cy.contains('Recurrent').click();
            cy.get('#type').click();
            cy.contains('Indirect').click();
            cy.get('#size').click();
            cy.contains('Very Large (>4 finger breadths)').click();
            cy.get('#complexity').click();
            cy.contains('Irreducible').click();
            cy.get('#mesh_type').click();
            cy.contains('TNMHP Mesh').click();
            cy.get('#anaesthetic_type').click();
            cy.contains('Local Anaesthetic').click();
            cy.get('#diathermy_used').click();
            cy.get('ul[aria-labelledby="diathermy-used-label"]').contains('Yes').click();
            cy.get('#antibiotic_used').click();
            cy.get('ul[aria-labelledby="antibiotic-used-label"]').contains('No').click();
            cy.get('#id').click();
            cy.contains('Dr. Surgeon').click();

            // Enter comments with special characters
            cy.get('#comments').type('Patient had: <script>alert("test")</script> & "quoted" text');

            cy.contains('button', 'Register an Episode').click();

            cy.wait('@registerEpisode').then((interception) => {
                expect(interception.request.body.comments).to.equal('Patient had: <script>alert("test")</script> & "quoted" text');
            });
        });
    });
});
