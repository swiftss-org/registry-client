
describe('Register Episode Page', () => {
    beforeEach(() => {
        cy.window().then((win) => {
            win.localStorage.setItem('token-registry', 'fake-token');
        });

        // Mock shared APIs
        cy.intercept('GET', '**/hospitals/**', { results: [{ id: 1, name: 'General Hospital' }, { id: 2, name: 'City Hospital' }] }).as('getHospitals');
        cy.intercept('GET', '**/medical-personnel/**', {
            results: [
                { id: 1, user: { first_name: 'Dr.', last_name: 'Surgeon' } },
                { id: 2, user: { first_name: 'Assistant', last_name: 'Surgeon' } },
                { id: 3, user: { first_name: 'Junior', last_name: 'Surgeon' } },
            ]
        }).as('getSurgeons');
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
            cy.get('#hospital').should('contain', 'General Hospital');

            cy.get('#patient_hospital_id').click().type('0234');
            cy.get('#patient_hospital_id').should('have.value', '0234');

            // Select Episode Type
            cy.selectMuiOption('#episode_type', 'Femoral Mesh Hernia Repair');
            cy.get('#episode_type').should('contain', 'Femoral Mesh Hernia Repair');

            // CEPOD
            cy.selectMuiOption('#cepod', 'Emergency');
            cy.get('#cepod').should('contain', 'Emergency');

            // Side
            cy.selectMuiOption('#side', 'Right');
            cy.get('#side').should('contain', 'Right');

            // Occurrence
            cy.selectMuiOption('#occurence', 'Recurrent');
            cy.get('#occurence').should('contain', 'Recurrent');

            // Type
            cy.selectMuiOption('#type', 'Indirect');
            cy.get('#type').should('contain', 'Indirect');

            // Size
            cy.selectMuiOption('#size', 'Very Large (>4 finger breadths)');
            cy.get('#size').should('contain', 'Very Large (>4 finger breadths)');

            // Complexity
            cy.selectMuiOption('#complexity', 'Irreducible');
            cy.get('#complexity').should('contain', 'Irreducible');

            // Surgery Date
            cy.get('#surgery_date').type('2023-11-20');
            cy.get('#surgery_date').should('be.visible').should('have.value', '2023-11-20');

            // Mesh Type
            cy.selectMuiOption('#mesh_type', 'TNMHP Mesh');
            cy.get('#mesh_type').should('contain', 'TNMHP Mesh');

            // Anaesthetic Type
            cy.selectMuiOption('#anaesthetic_type', 'Local Anaesthetic');
            cy.get('#anaesthetic_type').should('contain', 'Local Anaesthetic');

            // Diathermy Used - Yes/No
            cy.selectMuiOption('#diathermy_used', 'Yes');
            cy.get('#diathermy_used').should('contain', 'Yes');

            // Antibiotic Used - Yes/No
            cy.selectMuiOption('#antibiotic_used', 'Yes');
            cy.get('#antibiotic_used').should('contain', 'Yes');

            // Selecting +24hrs Post Op IV
            cy.get('#_24hrs_post_op_iv').check();

            // Surgeon
            cy.selectMuiOption('#primary_surgeon', 'Dr. Surgeon');
            cy.get('#primary_surgeon').should('contain', 'Dr. Surgeon');

            // Comments
            cy.get('#comments').type('Successfull surgery', { delay: 2 });
            cy.contains('Successfull surgery').should('be.visible');

            // Submit
            cy.contains('button', 'Save Episode').click();

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
                    patient_hospital_id: '0234',
                    hospital_id: 1
                });
            });

            // Redirect check
            cy.url().should('include', '/patients/1/101');
            cy.contains('button[role="tab"]', 'Episodes').should('have.attr', 'aria-selected', 'true');

            // Verify notification
            cy.contains('[data-testid="notification-alert"]', 'Episode has been successfully saved').should('be.visible');
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

        it('should validate Patient Hospital ID is required when hospital is not assigned to the patient', () => {
            cy.intercept('GET', '**/patients/101/', { id: 101, first_name: 'John', last_name: 'Doe', hospital_mappings: [] }).as('getPatientWithoutHospitals');
            cy.visit('/patients/1/101/add-episode');

            cy.wait('@getPatientWithoutHospitals');

            cy.selectMuiOption('#hospital', 'General Hospital');
            cy.contains('General Hospital').should('be.visible');

            cy.get('#patient_hospital_id').focus().blur();

            cy.contains('Patient Hospital ID field is required').should('exist');
        });

        it('should validate Patient Hospital ID is a number', () => {
            cy.intercept('GET', '**/patients/101/', { id: 101, first_name: 'John', last_name: 'Doe', hospital_mappings: [] }).as('getPatientWithoutHospitals');
            cy.visit('/patients/1/101/add-episode');

            cy.wait('@getPatientWithoutHospitals');

            cy.selectMuiOption('#hospital', 'General Hospital');
            cy.contains('General Hospital').should('be.visible');

            cy.get('#patient_hospital_id').type('abc');
            cy.get('#patient_hospital_id').blur();

            cy.contains('Patient Hospital ID field must be a number').should('exist');
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

        it('should validate Main Operating Surgeon is required', () => {
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

            cy.contains('button', 'Save Episode').click();

            cy.contains('Main Operating Surgeon field is required').should('exist');
        });

        it('should validate all field before submitting the form', () => {
            cy.selectMuiOption('#hospital', 'General Hospital');

            cy.contains('button', 'Save Episode').click();

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
            cy.contains('Main Operating Surgeon field is required').should('exist');
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
            cy.selectMuiOption('#primary_surgeon', 'Dr. Surgeon');
            cy.get('#comments').type('Successfull surgery');

            cy.contains('button', 'Save Episode').click();

            cy.wait('@registerEpisodeError');

            // Should stay on the same page and show error message
            cy.url().should('include', '/add-episode');
            cy.contains('[data-testid="notification-alert"]', 'Internal Server Error').should('be.visible');
        });

        it('should handle field-specific server errors correctly', () => {
            // Mock field errors
            cy.intercept('POST', '**/episodes/', {
                statusCode: 400,
                body: {
                    surgery_date: ['Date must be valid'],
                    anaesthetic_type: ['Type must be set']
                }
            }).as('registerEpisodeFieldErrors');

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
            cy.selectMuiOption('#primary_surgeon', 'Dr. Surgeon');
            cy.get('#comments').type('Surgery with errors');

            cy.contains('button', 'Save Episode').click();

            cy.wait('@registerEpisodeFieldErrors');

            // Verify notification contains both error messages
            cy.contains('[data-testid="notification-alert"]', 'Date must be valid Type must be set').should('be.visible');
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
            cy.selectMuiOption('#primary_surgeon', 'Dr. Surgeon');

            // Enter comments with special characters
            cy.get('#comments').type('Patient had: <script>alert("test")</script> & "quoted" text');

            cy.contains('button', 'Save Episode').click();

            cy.wait('@registerEpisode').then((interception) => {
                expect(interception.request.body.comments).to.equal('Patient had: <script>alert("test")</script> & "quoted" text');
            });
        });
    });

    describe('Surgeon Selection Filtering', () => {
        it('should filter out already selected surgeons from other surgeon fields', () => {
            // Select Primary Surgeon
            cy.selectMuiOption('#primary_surgeon', 'Dr. Surgeon');
            cy.get('#primary_surgeon').should('contain', 'Dr. Surgeon');

            // Open Secondary Surgeon and check that Dr. Surgeon is not available
            cy.get('#secondary_surgeon').click();
            cy.get('[role="listbox"]').should('not.contain', 'Dr. Surgeon');
            cy.get('[role="listbox"]').should('contain', 'Assistant Surgeon');
            cy.get('[role="listbox"]').should('contain', 'Junior Surgeon');

            // Select Assistant Surgeon as Secondary
            cy.get('[role="listbox"]').contains('Assistant Surgeon').click();
            cy.get('#secondary_surgeon').should('contain', 'Assistant Surgeon');

            // Open Tertiary Surgeon and check that both Dr. Surgeon and Assistant Surgeon are not available
            cy.get('#tertiary_surgeon').click();
            cy.get('[role="listbox"]').should('not.contain', 'Dr. Surgeon');
            cy.get('[role="listbox"]').should('not.contain', 'Assistant Surgeon');
            cy.get('[role="listbox"]').should('contain', 'Junior Surgeon');

            // Close the listbox
            cy.get('body').click();
            cy.get('.MuiPopover-root').should('not.exist');
        });

        it('should allow a surgeon to be re-selected if they are deselected from another field', () => {
            // Select Primary and Secondary Surgeons
            cy.selectMuiOption('#primary_surgeon', 'Dr. Surgeon');
            cy.selectMuiOption('#secondary_surgeon', 'Assistant Surgeon');

            // Deselect Secondary Surgeon
            cy.get('#secondary_surgeon').click();
            cy.get('[role="listbox"]').contains('None').click();
            cy.get('.MuiPopover-root').should('not.exist');

            // Now Assistant Surgeon should be available in Tertiary Surgeon
            cy.get('#tertiary_surgeon').click();
            cy.get('[role="listbox"]').should('contain', 'Assistant Surgeon');
            cy.get('[role="listbox"]').should('not.contain', 'Dr. Surgeon');

            // Close
            cy.get('body').click();
        });
    });
});
