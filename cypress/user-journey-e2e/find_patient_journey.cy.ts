describe('Find Patient Journey (Real DB)', () => {
    const timestamp = Math.floor(Date.now() / 1000);
    const hospitalId = 2; // General Hospital

    // Existing patients from test_data.json
    // PK 1: Szabolcs Szilagyi (Created: 2025-04-21)
    // PK 2: skjnskjv ksjnvksv (Created: 2025-04-25) - Hospital 1
    // PK 3: SAfsg adsgeger (Created: 2025-12-20) - Hospital 1
    // PK 4: tjytujtuyj rbrthrt (Created: 2025-12-20) - Hospital 1

    const patient1 = 'Szabolcs Szilagyi';
    const patient4 = 'tjytujtuyj rbrthrt';

    before(() => {
        // Reset the database before the suite
        cy.task('db:reset');
        cy.task('db:load');
    });

    it('should verify sorting and search functionality', () => {
        // 1. Setup dynamic admin account
        const adminEmail = `admin_${timestamp}@admin.com`;
        const adminPassword = 'AdminPassword123!';

        cy.task('db:createUser', {
            username: adminEmail,
            password: adminPassword,
            firstName: 'Dynamic',
            lastName: 'Admin',
            hospitalId: hospitalId,
            isStaff: false,
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

        cy.get('#username', { timeout: 10000 }).should('be.visible').type(adminEmail);
        cy.get('#password').type(adminPassword);
        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/landing', { timeout: 15000 });
        cy.visit('/patients');

        // General Hospital - default, preferred hospital - has no patients
        cy.contains('No patients to show').should('be.visible');
        cy.selectMuiOption('#center', 'Royal London Hospital');

        // 5. Verify Default Sorting (Newest first)
        // Patient B (New) should be before Patient A (Old)
        const nameA = patient1;
        const nameB = patient4;

        cy.contains(nameB).scrollIntoView().should('be.visible');
        cy.contains(nameA).scrollIntoView().should('be.visible');

        cy.contains(nameB).then(($pB: any) => {
            cy.contains(nameA).then(($pA: any) => {
                const pbOffset = $pB.offset();
                const paOffset = $pA.offset();
                if (pbOffset && paOffset) {
                    expect(pbOffset.top).to.be.lessThan(paOffset.top);
                }
            });
        });

        // 6. Verify Sorting Change (Oldest first)
        cy.get('[data-testid="sort-icon"]').click();
        cy.contains('Oldest to newest').click();

        // Wait for re-sort by confirming the first patient is visible
        cy.contains(nameA).should('be.visible').then(($pA: any) => {
            cy.contains(nameB).then(($pB: any) => {
                const paOffset = $pA.offset();
                const pbOffset = $pB.offset();
                if (paOffset && pbOffset) {
                    expect(paOffset.top).to.be.lessThan(pbOffset.top);
                }
            });
        });

        // 7. Verify Search
        // Search for "Old" -> Should show Patient A, hide Patient B
        cy.get('[data-testid="search-field"] input').clear().type('Szabolcs');
        cy.contains(nameA).scrollIntoView().should('be.visible');
        cy.contains(nameB).should('not.exist');

        // Search for "New" -> Should show Patient B, hide Patient A
        cy.get('[data-testid="search-field"] input').clear().type('j');
        cy.contains(nameB).scrollIntoView().should('be.visible');
        cy.contains(nameA).should('not.exist');
    });
});