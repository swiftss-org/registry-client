
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

            // TODO improve Notifications to users cy.contains('Password changed successfully').should('exist');
            cy.url().should('include', '/landing');
        });

        it('should handle errors', () => {
            cy.intercept('PUT', '**/change-password/', {
                statusCode: 400,
                body: { errors: { old_password: ['Wrong password'] } }
            }).as('changePasswordFail');

            cy.get('#old_password').type('wrongPass');
            cy.get('#new_password1').type('newPass123');
            cy.get('#new_password2').type('newPass123');

            cy.get('#change-password-button').click();

            cy.wait('@changePasswordFail');

            cy.contains('Wrong password').should('be.visible');
        });

        // TODO password change error handling should be improved
        it.skip('should password fields be required', () => {
            cy.get('#old_password').focus().blur();
            cy.get('#new_password1').focus().blur();
            cy.get('#new_password2').focus().blur();

            cy.get('#change-password-button').click();

            cy.contains('This field is required').should('be.visible');
        });
    });
});
