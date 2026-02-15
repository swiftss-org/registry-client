describe('Statistics Journey (Real DB)', () => {
    const hospitalId = 1; // Royal London Hospital
    const adminEmail = 'admin@admin.com';
    const adminPassword = 'Password123!';

    before(() => {
        // Reset and load database
        cy.task('db:reset');
        cy.task('db:load');

        // Update admin password to known value
        const passwordHash = 'pbkdf2_sha256$260000$standard_salt$jj9zR2+HgM4f1spN0tFkRpU0Ws0yixPEa4KuYClUXsU=';
        cy.task('db:query', `UPDATE auth_user SET password = '${passwordHash}' WHERE id = 1`);

        // Ensure admin has Royal London Hospital (id=1) as preferred hospital
        // First delete any existing preference to be safe, then insert
        cy.task('db:query', `DELETE FROM registry_preferredhospital WHERE medical_personnel_id = 1`);
        cy.task('db:query', `INSERT INTO registry_preferredhospital (medical_personnel_id, hospital_id) VALUES (1, ${hospitalId})`);
    });

    it('should verify statistics on landing page', () => {
        // 1. Login
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

        cy.contains('Number of episodes: 7').should('be.visible');
        cy.contains('Last episode: 30/12/2025').should('be.visible');
        cy.get('[data-testid="unlinked-patients-table"]').should('contain', 'SAfsg adsgeger');
        cy.get('[data-testid="unlinked-patients-table"]').should('contain', 'tjytujtuyj rbrthrt');
    });
});