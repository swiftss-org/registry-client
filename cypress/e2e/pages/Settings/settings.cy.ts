
describe('Settings Page', () => {
    beforeEach(() => {
        cy.window().then((win) => {
            win.localStorage.setItem('token-registry', 'fake-token');
        });
        cy.visit('/settings');
    });

    describe('Change Password', () => {
        it('should change password successfully', () => {
            // Mock API
            cy.intercept('PUT', '**/change-password/', {
                statusCode: 200,
                body: { token: 'new-token' }
            }).as('changePassword');

            // Fill form
            cy.get('#old_password').type('oldPass123');
            cy.get('#new_password1').type('newPass123');
            cy.get('#new_password2').type('newPass123');

            // Submit
            cy.get('#change-password-button').click();

            cy.wait('@changePassword').then((interception) => {
                expect(interception.request.body).to.include({
                    old_password: 'oldPass123',
                    new_password1: 'newPass123',
                    new_password2: 'newPass123'
                });
            });

            cy.url().should('include', '/landing');
            // TODO fix Notificaitons - cy.contains('Password changed successfully').should('exist');
        });

        it('should handle errors', () => {
            cy.intercept('PUT', '**/change-password/', {
                statusCode: 400,
                body: { old_password: ['Wrong password'] }
            }).as('changePasswordFail');

            cy.get('#old_password').type('wrongPass');
            cy.get('#new_password1').type('newPass123');
            cy.get('#new_password2').type('newPass123');

            cy.get('#change-password-button').click();

            cy.wait('@changePasswordFail');

            cy.contains('Wrong password').should('be.visible');
        });

        it('should password fields be required', () => {
            cy.get('#change-password-button').click();

            cy.contains('Old password is required').should('be.visible');
            cy.contains('New password is required').should('be.visible');
            cy.contains('Please confirm your new password').should('be.visible');
        });

        it('should verify if user want to leave dirty form', () => {
            cy.get('#old_password').type('oldPass123');

            cy.get('main > div > div > button').click();

            cy.contains('Are you sure you want to leave this page?').should('be.visible');
        });
    });
});
