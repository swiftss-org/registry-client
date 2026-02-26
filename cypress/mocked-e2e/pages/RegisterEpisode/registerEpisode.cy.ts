
describe('Register Episode Page', () => {
    beforeEach(() => {
        cy.window().then((win) => {
            win.localStorage.setItem('token-registry', 'fake-token');
        });

        // Mock shared APIs
        cy.intercept('GET', '**/hospitals/**', { results: [{ id: 1, name: 'General Hospital' }, { id: 2, name: 'City Hospital' }] }).as('getHospitals');
        cy.intercept('GET', '**/medical-personnel/**', { results: [{ id: 1, user: { first_name: 'Dr.', last_name: 'Surgeon' } }] }).as('getSurgeons');
        cy.intercept('GET', '**/patients/101/', { id: 101, first_name: 'John', last_name: 'Doe', hospital_mappings: [{ hospital_id: 2, patient_hospital_id: 2 }] }).as('getPatient');

        cy.visit('/patients/1/101/add-episode');

        cy.wait(['@getPatient', '@getHospitals', '@getSurgeons']);
    });

    describe('Happy Path', () => {
        it('should register an episode successfully', () => {
            // Mock submit
            cy.intercept('POST', '**/episodes/', { statusCode: 201, body: { id: 999 } }).as('registerEpisode');
            cy.intercept('POST', '**/patient-hospital-mappings/', { statusCode: 201, body: { id: 999 } }).as('registerPatientHospitalMapping');

            cy.selectMuiOption('#hospital', 'General Hospital');
            cy.contains('General Hospital').should('be.visible');

            cy.get('#patient_hospital_id').click().type('234');
            cy.get('#patient_hospital_id').should('have.value', '234');

            // Select Episode Type
            cy.selectMuiOption('#episode_type', 'Femoral Mesh Hernia Repair');
            cy.contains('Femoral Mesh Hernia Repair').should('be.visible');

            // CEPOD
            cy.selectMuiOption('#cepod', 'Emergency');
            cy.contains('Emergency').should('be.visible');

            // Side
            cy.selectMuiOption('#side', 'Right');
            cy.contains('Right').should('be.visible');

            // Occurrence
            cy.selectMuiOption('#occurence', 'Recurrent');
            cy.contains('Recurrent').should('be.visible');

            // Type
            cy.selectMuiOption('#type', 'Indirect');
            cy.contains('Indirect').should('be.visible');

            // Size
            cy.selectMuiOption('#size', 'Very Large (>4 finger breadths)');
            cy.contains('Very Large (>4 finger breadths)').should('be.visible');

            // Complexity
            cy.selectMuiOption('#complexity', 'Irreducible');
            cy.contains('Irreducible').should('be.visible');

            // Surgery Date
            cy.get('#surgery_date').type('2023-11-20');
            cy.get('#surgery_date').should('be.visible').should('have.value', '2023-11-20');

            // Mesh Type
            cy.selectMuiOption('#mesh_type', 'TNMHP Mesh');
            cy.contains('TNMHP Mesh').should('be.visible');

            // Anaesthetic Type
            cy.selectMuiOption('#anaesthetic_type', 'Local Anaesthetic');
            cy.contains('Local Anaesthetic').should('be.visible');

            // Diathermy Used - Yes/No
            cy.selectMuiOption('#diathermy_used', 'Yes');
            cy.contains('Yes').should('be.visible');

            // Antibiotic Used - Yes/No
            cy.selectMuiOption('#antibiotic_used', 'Yes');
            cy.contains('Yes').should('be.visible');

            // Selecting +24hrs Post Op IV
            cy.get('#_24hrs_post_op_iv').check();

            // Surgeon
            cy.selectMuiOption('#surgeon-selector-0', 'Dr. Surgeon');
            cy.contains('Dr. Surgeon').should('be.visible');

            // Comments
            cy.get('#comments').type('Successfull surgery', { delay: 2 });
            cy.contains('Successfull surgery').should('be.visible');

            // Submit
            cy.contains('button', 'Register an Episode').click();

            cy.wait(['@registerEpisode', '@registerPatientHospitalMapping']).then((interception) => {
                // Verify all episode fields
                expect(interception[0].request.body).to.include({
                    patient_id: 101,
                    hospital_id: 1,
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
                    patient_hospital_id: 234,
                    hospital_id: 1
                });
            });

            // Redirect check
            cy.url().should('include', '/patients/1/101');
            cy.contains('button[role="tab"]', 'Episodes').should('have.attr', 'aria-selected', 'true');
        });

        it('should pre-select the hospital of the patient', () => {
            cy.get('#hospital').contains('City Hospital').should('be.visible');
        });

        it('should not show the Patient Hospital Id field when the selected hospital is already assigned to the patient', () => {
            cy.get('#hospital').contains('City Hospital').should('be.visible');
            cy.get('#patient_hospital_id').should('not.exist');
        });
    });

    describe('Input Validation', () => {
        it('should validate Hospital is required', () => {
            cy.intercept('GET', '**/patients/101/', { id: 101, first_name: 'John', last_name: 'Doe', hospital_mappings: [] }).as('getPatientWithoutHospitals');
            cy.visit('/patients/1/101/add-episode');

            cy.wait('@getPatientWithoutHospitals');

            cy.get('#hospital').focus().blur();

            cy.contains('Hospital field is required').should('exist');
        });

        it('should validate CEPOD is required', () => {
            cy.get('#cepod').focus().blur();

            cy.contains('CEPOD field is required').should('exist');
        });

        it('should validate Side is required', () => {
            cy.get('#side').focus().blur();

            cy.contains('Side field is required').should('exist');
        });

        it('should validate Occurrence is required', () => {
            cy.get('#occurence').focus().blur();

            cy.contains('Occurrence field is required').should('exist');
        });

        it('should validate Type is required', () => {
            cy.get('#type').focus().blur();

            cy.contains('Type field is required').should('exist');
        });

        it('should validate Size is required', () => {
            cy.get('#size').focus().blur();

            cy.contains('Size field is required').should('exist');
        });

        it('should validate Complexity is required', () => {
            cy.get('#complexity').focus().blur();

            cy.contains('Complexity field is required').should('exist');
        });

        it('should validate Surgery Date is required', () => {
            cy.get('#surgery_date').focus().blur();

            cy.contains('Surgery Date field is required. Please select a date.').should('exist');
        });

        it('should validate Mesh Type is required', () => {
            cy.get('#mesh_type').focus().blur();

            cy.contains('Mesh Type field is required').should('exist');
        });

        it('should validate Anaesthetic Type is required', () => {
            cy.get('#anaesthetic_type').focus().blur();

            cy.contains('Anaesthetic Type field is required').should('exist');
        });

        it('should validate Diathermy Used is required', () => {
            cy.get('#diathermy_used').focus().blur();

            cy.contains('Diathermy Used field is required').should('exist');
        });

        it('should validate Antibiotic Used is required', () => {
            cy.get('#antibiotic_used').focus().blur();

            cy.contains('Prophylactic antibiotics field is required').should('exist');
        });

        it('should validate Surgeon is required', () => {
            cy.selectMuiOption('#episode_type', 'Femoral Mesh Hernia Repair');
            cy.get('#surgery_date').type('2023-11-20');
            cy.selectMuiOption('#cepod', 'Emergency');
            cy.selectMuiOption('#side', 'Right');
            cy.selectMuiOption('#occurence', 'Recurrent');
            cy.selectMuiOption('#type', 'Indirect');
            cy.selectMuiOption('#size', 'Very Large (>4 finger breadths)');
            cy.selectMuiOption('#complexity', 'Irreducible');
            cy.selectMuiOption('#mesh_type', 'TNMHP Mesh');
            cy.selectMuiOption('#anaesthetic_type', 'Local Anaesthetic');
            cy.selectMuiOption('#diathermy_used', 'Yes');
            cy.selectMuiOption('#antibiotic_used', 'Yes');
            cy.get('#_24hrs_post_op_iv').check();
            cy.get('#comments').type('Successfull surgery');

            cy.get('#surgeon-0').click();
            cy.get('body').click();
            cy.get('.MuiPopover-root').should('not.exist');

            cy.contains('button', 'Register an Episode').click();

            cy.contains('Surgeon field is required').should('exist');
        });

        it('should validate all field before submitting the form', () => {
            cy.selectMuiOption('#hospital', 'General Hospital');

            cy.contains('button', 'Register an Episode').click();

            cy.contains('Patient Hospital ID field is required').should('exist');
            cy.contains('Episode Type field is required').should('exist');
            cy.contains('CEPOD field is required').should('exist');
            cy.contains('Side field is required').should('exist');
            cy.contains('Occurrence field is required').should('exist');
            cy.contains('Type field is required').should('exist');
            cy.contains('Size field is required').should('exist');
            cy.contains('Complexity field is required').should('exist');
            cy.contains('Surgery Date field is required. Please select a date.').should('exist');
            cy.contains('Mesh Type field is required').should('exist');
            cy.contains('Anaesthetic Type field is required').should('exist');
            cy.contains('Diathermy Used field is required').should('exist');
            cy.contains('Prophylactic antibiotics field is required').should('exist');
            cy.contains('Surgeon field is required').should('exist');
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
            cy.selectMuiOption('#episode_type', 'Femoral Mesh Hernia Repair');
            cy.get('#surgery_date').type('2023-11-20');
            cy.selectMuiOption('#cepod', 'Emergency');
            cy.selectMuiOption('#side', 'Right');
            cy.selectMuiOption('#occurence', 'Recurrent');
            cy.selectMuiOption('#type', 'Indirect');
            cy.selectMuiOption('#size', 'Very Large (>4 finger breadths)');
            cy.selectMuiOption('#complexity', 'Irreducible');
            cy.selectMuiOption('#mesh_type', 'TNMHP Mesh');
            cy.selectMuiOption('#anaesthetic_type', 'Local Anaesthetic');
            cy.selectMuiOption('#diathermy_used', 'Yes');
            cy.selectMuiOption('#antibiotic_used', 'No');
            cy.selectMuiOption('#surgeon-selector-0', 'Dr. Surgeon');
            cy.get('#comments').type('Successfull surgery');

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
            cy.selectMuiOption('#episode_type', 'Femoral Mesh Hernia Repair');
            cy.get('#surgery_date').type('2023-11-20');
            cy.selectMuiOption('#cepod', 'Emergency');
            cy.selectMuiOption('#side', 'Right');
            cy.selectMuiOption('#occurence', 'Recurrent');
            cy.selectMuiOption('#type', 'Indirect');
            cy.selectMuiOption('#size', 'Very Large (>4 finger breadths)');
            cy.selectMuiOption('#complexity', 'Irreducible');
            cy.selectMuiOption('#mesh_type', 'TNMHP Mesh');
            cy.selectMuiOption('#anaesthetic_type', 'Local Anaesthetic');
            cy.selectMuiOption('#diathermy_used', 'Yes');
            cy.selectMuiOption('#antibiotic_used', 'No');
            cy.selectMuiOption('#surgeon-selector-0', 'Dr. Surgeon');

            // Enter comments with special characters
            cy.get('#comments').type('Patient had: <script>alert("test")</script> & "quoted" text');

            cy.contains('button', 'Register an Episode').click();

            cy.wait('@registerEpisode').then((interception) => {
                expect(interception.request.body.comments).to.equal('Patient had: <script>alert("test")</script> & "quoted" text');
            });
        });
    });
});
