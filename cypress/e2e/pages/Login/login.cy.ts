
describe('Login Page', () => {
    describe('Happy Path', () => {
        it('should successfully login with valid credentials', () => {
            cy.intercept('POST', '**/sign-in/', {
                statusCode: 200,
                body: {
                    token: 'fake-jwt-token',
                    user: {
                        email: 'test@example.com',
                        username: 'testuser',
                        is_staff: false,
                        is_superuser: false
                    }
                }
            }).as('signIn');

            cy.visit('/login');
            // Remove error overlay if present (hack for lint warnings)
            cy.get('body > iframe').then(($iframe) => {
                $iframe.remove();
            });

            cy.get('#username').type('testuser');
            cy.get('#currentPassword').type('password123');

            cy.get('input[type="checkbox"]').check({ force: true });

            cy.get('button[type="submit"]').click();

            cy.wait('@signIn').then((interception) => {
                expect(interception.request.body).to.include({
                    username: 'testuser',
                    password: 'password123',
                    rememberMe: true
                });
            });

            cy.url().should('include', '/landing');
        });

        it('should be able to login after a failed attempt', () => {
            cy.intercept('POST', '**/sign-in/', {
                statusCode: 401,
                body: { detail: 'Invalid credentials' }
            }).as('signInFail');


            cy.visit('/login');
            // Remove error overlay if present (hack for lint warnings)
            cy.get('body > iframe').then(($iframe) => {
                $iframe.remove();
            });

            cy.get('#username').type('wronguser');
            cy.get('#currentPassword').type('wrongpassword');
            cy.get('button[type="submit"]').click();

            cy.wait('@signInFail');

            cy.contains('Invalid credential combination.').should('be.visible');

            cy.intercept('POST', '**/sign-in/', {
                statusCode: 200,
                body: {
                    token: 'fake-jwt-token',
                    user: {
                        email: 'test@example.com',
                        username: 'testuser',
                        is_staff: false,
                        is_superuser: false
                    }
                }
            }).as('signIn');

            cy.reload();
            // Remove error overlay if present (hack for lint warnings)
            cy.get('body > iframe').then(($iframe) => {
                $iframe.remove();
            });

            cy.get('#username').type('testuser');
            cy.get('#currentPassword').type('password123');
            cy.get('button[type="submit"]').click();

            cy.wait('@signIn');

            cy.url().should('include', '/landing');
        })
    });

    describe('Input Validation', () => {
        it('should show error on invalid credentials', () => {
            // Mock the Login API failure
            cy.intercept('POST', '**/sign-in/', {
                statusCode: 401,
                body: { detail: 'Invalid credentials' }
            }).as('signInFail');

            cy.visit('/login');
            // Remove error overlay if present (hack for lint warnings)
            cy.get('body > iframe').then(($iframe) => {
                $iframe.remove();
            });

            cy.get('#username').type('wronguser');
            cy.get('#currentPassword').type('wrongpass');
            cy.get('button[type="submit"]').click();

            cy.wait('@signInFail');

            // Expect notification or error message
            cy.contains('Invalid credential combination.').should('be.visible');
        });

        it('should be able to dismiss error message after a failed login', () => {
            // Mock the Login API failure
            cy.intercept('POST', '**/sign-in/', {
                statusCode: 401,
                body: { detail: 'Invalid credentials' }
            }).as('signInFail');

            cy.visit('/login');
            // Remove error overlay if present (hack for lint warnings)
            cy.get('body > iframe').then(($iframe) => {
                $iframe.remove();
            });

            cy.get('#username').type('wronguser');
            cy.get('#currentPassword').type('wrongpass');
            cy.get('button[type="submit"]').click();

            cy.wait('@signInFail');

            // Expect notification or error message
            cy.contains('Invalid credential combination.').should('be.visible');

            cy.get('span[data-testid="notification-close"]').click();

            cy.contains('Invalid credential combination.').should('not.exist');
        });

        it('should require username and password', () => {
            cy.visit('/login');
            // Remove error overlay if present (hack for lint warnings)
            cy.get('body > iframe').then(($iframe) => {
                $iframe.remove();
            });
            cy.get('button[type="submit"]').click();

            cy.contains('Invalid credential combination.').should('be.visible');
        });
    });

    describe('Edge Cases', () => {
        it('should redirect when there is already an auth token', () => {
            cy.window().then((win) => {
                win.localStorage.setItem('token-registry', 'fake-token');
            });

            cy.visit('/login');

            cy.url().should('include', '/landing');
        });
    });

    describe('UI Elements', () => {
        it('should display all login elements', () => {
            cy.visit('/login');
            // Remove error overlay if present (hack for lint warnings)
            cy.get('body > iframe').then(($iframe) => {
                $iframe.remove();
            });

            cy.get('main').contains('Welcome!');
            cy.get('main').contains('Please sign in using your credentials to access your account.');
            cy.get('#username').should('be.visible');
            cy.get('#currentPassword').should('be.visible');
            cy.get('main').contains('Remember Me').should('be.visible');
            cy.get('button[type="submit"]').should('be.visible');
        });
    });
});
