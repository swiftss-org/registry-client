// Login as lead surgeon
// Register new episode for an existing patient
// Verify the new episode on the Episode details page
// Add a new Discharge to the episode
// Verify the saved discharge on the Episode Details page
// Add a new Follow Up to the episode
// Verify the followup on the Episode Details page
describe('Episode Journey (Real DB)', () => {
    const timestamp = Math.floor(Date.now() / 1000);
    const hospitalId = 1; // Royal London Hospital (from test_data.json)
    const patientId = 1; // Szabolcs Szilagyi (from test_data.json)
    const patientName = 'Szabolcs Szilagyi';

    // Test Data
    const episodeData = {
        hospital: 'General Hospital',
        date: '2026-02-12',
        occurence: 'Primary',
        episode_type: 'Inguinal Mesh Hernia Repair',
        type: 'Direct',
        cepod: 'Planned',
        side: 'Left',
        size: 'Medium',
        complexity: 'Irreducible',
        meshType: 'TNMHP',
        anaesthetic: 'Local Anaesthetic',
        comments: `Test Surgery ${timestamp}`,
        antibiotic_used: 'Yes',
        antibioticType: '+24hrs Post Op IV',
        diathermy_used: 'Yes',
    };

    const dischargeData = {
        date: '2026-02-13',
        infection: 'Bleeding,Urinary Retention',
        awareOfMesh: 'Yes',
        discharge_duration: 39,
        comments: `Discharged well ${timestamp}`
    };

    const followUpData = {
        date: '2026-02-14',
        painSeverity: 'Severe',
        meshAwareness: 'Yes',
        seroma: 'Yes',
        infection: 'Yes',
        numbness: 'Yes',
        recurrence: 'Yes',
        furtherSurgery: 'Yes',
        comments: `Recovered well ${timestamp}`
    };

    before(() => {
        // Reset and load the database before the suite
        cy.task('db:reset');
        cy.task('db:load');
    });

    it('should register a new episode, discharge, and follow-up and verify them in the episode details', () => {
        // Intercept requests for stability
        cy.intercept('POST', '**/episodes/').as('createEpisode');
        cy.intercept('POST', '**/discharges/').as('createDischarge');
        cy.intercept('POST', '**/follow-ups/').as('createFollowUp');

        // 1. Setup dynamic surgeon account
        const surgeonEmail = `surgeon_${timestamp}@hospital.com`;
        const surgeonPassword = 'SurgeonPassword123!';

        cy.task('db:createUser', {
            username: surgeonEmail,
            password: surgeonPassword,
            firstName: 'Test',
            lastName: 'Surgeon',
            hospitalId: hospitalId,
            isStaff: true,
            isActive: true,
            medicalPersonnelLevel: 'LEAD_SURGEON'
        });

        // 2. Login
        cy.visit('/login', {
            onBeforeLoad(win) {
                win.localStorage.clear();
                win.sessionStorage.clear();
            },
        });

        cy.get('#username', { timeout: 10000 }).should('be.visible').type(surgeonEmail);
        cy.get('#password').type(surgeonPassword);
        cy.get('button[type="submit"]').click();

        // Wait for login to complete (url change to landing)
        cy.url().should('include', '/landing', { timeout: 15000 });

        // 3. Navigate to the existing patient's details
        // We can go directly via URL since we know the ID from test_data.json
        cy.visit(`/patients/${hospitalId}/${patientId}`);

        // Verify we are on the correct page
        cy.contains(patientName).should('be.visible');

        // 4. Register new episode
        cy.contains('button', 'Register new episode').click();
        cy.url().should('include', '/add-episode');

        // Fill Episode Form
        cy.get('input[type="date"]').type(episodeData.date);

        cy.selectMuiOption('#hospital', episodeData.hospital);
        cy.get('#patient_hospital_id').type('123456')

        cy.selectMuiOption('#episode_type', episodeData.episode_type);
        cy.selectMuiOption('#cepod', episodeData.cepod);
        cy.selectMuiOption('#side', episodeData.side);
        cy.selectMuiOption('#occurence', episodeData.occurence);
        cy.selectMuiOption('#type', episodeData.type);

        cy.selectMuiOption('#size', episodeData.size);
        cy.selectMuiOption('#complexity', episodeData.complexity);
        cy.selectMuiOption('#mesh_type', episodeData.meshType);
        cy.selectMuiOption('#anaesthetic_type', episodeData.anaesthetic);

        // Toggle checkboxes
        cy.selectMuiOption('#diathermy_used', episodeData.diathermy_used);
        cy.selectMuiOption('#antibiotic_used', episodeData.antibiotic_used);
        cy.get('#_24hrs_post_op_iv').check();

        cy.selectMuiOption('#surgeon-selector-0', 'Test Surgeon');
        cy.get('#AddIcon').click();
        cy.selectMuiOption('#surgeon-selector-1', 'Admin Ad');

        cy.get('#comments').type(episodeData.comments);

        // Submit Episode
        cy.contains('button', 'Register an Episode').click();

        // Wait for creation
        cy.wait('@createEpisode').its('response.statusCode').should('eq', 201);

        // 5. Verify the new episode on the Episode details page
        cy.url().should('match', /patients\/1\/1\?tab=episodes$/, { timeout: 10000 });

        // Click on the episode to go to its details (usually by date or type)
        cy.contains(episodeData.date).click();

        // Now on Episode Details page
        cy.url().should('include', '/episodes/');
        cy.contains(episodeData.episode_type).should('be.visible');
        cy.contains(episodeData.date).should('be.visible');
        // Open Surgery accordion
        cy.get('[data-testid="surgery-summary"]').click();
        // Verify all the surgery details on the screen
        cy.contains(episodeData.cepod).should('exist');
        cy.contains(episodeData.side).should('exist');
        cy.contains(episodeData.occurence).should('exist');
        cy.contains(episodeData.type).should('exist');
        cy.contains(episodeData.size).should('exist');
        cy.contains(episodeData.complexity).should('exist');
        cy.contains(episodeData.meshType).should('exist');
        cy.contains(episodeData.anaesthetic).should('exist');
        cy.contains(episodeData.diathermy_used).should('exist');
        cy.contains(episodeData.antibiotic_used).should('exist');
        cy.contains(episodeData.antibioticType).should('exist');
        cy.contains('Test Surgeon').should('exist');
        cy.contains('Admin Ad').should('exist');
        cy.contains(episodeData.comments).should('exist');

        // 6. Add a new Discharge
        cy.contains('button', 'Add New Discharge').click();

        // Fill Discharge Form (often a modal or inline form)
        cy.get('#discharge_date').type(dischargeData.date);
        cy.selectMuiOption('#aware_of_mesh-select', dischargeData.awareOfMesh);
        cy.get('#discharge_duration').type(dischargeData.discharge_duration)
        cy.contains('Bleeding').click();
        cy.contains('Urinary Retention').click();
        cy.get('#comments').type(dischargeData.comments);

        // Submit Discharge
        cy.contains('button', 'Save changes').click();

        // Wait for request
        cy.wait('@createDischarge').its('response.statusCode').should('eq', 201);

        // Click on the episode to go to its details
        cy.wait(1000);
        cy.contains(episodeData.date).click();
        // Open Discharge accordion
        cy.get('[data-testid="discharge-summary"]').click();

        // 7. Verify the saved discharge on the Episode Details page
        cy.contains(dischargeData.date).should('be.visible');
        cy.contains(dischargeData.discharge_duration).should('exist');
        cy.contains(dischargeData.comments).should('exist');
        cy.contains(dischargeData.infection).should('exist');

        // 8. Add a new Follow Up
        cy.contains('button', 'Add New Follow Up').click();

        // Fill Follow Up Form
        cy.get('#follow-up-date').type(followUpData.date);

        // Select attendees (usually defaults to current user, but good to check)
        cy.contains('Add Surgeon').click();
        cy.selectMuiOption('#surgeon-0', 'Test Surgeon');

        cy.selectMuiOption('#pain_severity-select', followUpData.painSeverity);
        cy.selectMuiOption('#mesh_awareness-select', followUpData.meshAwareness);
        cy.selectMuiOption('#seroma-select', followUpData.seroma);
        cy.selectMuiOption('#infection-select', followUpData.infection);
        cy.selectMuiOption('#numbness-select', followUpData.numbness);
        cy.selectMuiOption('#recurrence-select', followUpData.recurrence);
        cy.selectMuiOption('#further_surgery_need-select', followUpData.furtherSurgery);

        cy.get('#surgery_comments_box').type(followUpData.comments);

        // Submit Follow Up
        cy.contains('button', 'Save changes').click();

        // Wait for request
        cy.wait('@createFollowUp').its('response.statusCode').should('eq', 201);

        // Click on the episode to go to its details
        cy.wait(1000);
        cy.contains(episodeData.date).click();
        // Open Follow-Up accordion
        cy.get('[data-testid="follow-up-summary-0"]').click();

        // 9. Verify the followup on the Episode Details page
        cy.contains(followUpData.date).should('be.visible');
        cy.contains(followUpData.painSeverity).should('be.visible');
        cy.contains(followUpData.comments).should('exist');
    });
});
