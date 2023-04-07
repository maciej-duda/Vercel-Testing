describe('Login Tests', () => {
    beforeEach(() => {
        cy.visit('/index.html'); 
      });

    it('Type correct credentials and check if user is redirected to the dashboard', () => {
      cy.fixture('user_data.json').then((testData) => {
        // check if we're on expected page and structure is loaded
        cy.url().should('include', '/pulpit.html');
        cy.contains("Wersja demonstracyjna serwisu Demobank");
        //
        cy.get('[data-testid="login-input"]').type(testData.validUser.user_id);
        cy.get('[data-testid="password-input"]').type(testData.validUser.password);
        cy.get('[data-testid="login-button"]').click();
        cy.url().should('include', '/pulpit.html');
      });
    });

    it('Checks error message for empty fields', () => {
        // check if we're on expected page and structure is loaded
        cy.url().should('include', '/pulpit.html');
        cy.contains("Wersja demonstracyjna serwisu Demobank");
        //
        cy.get('[data-testid="login-input"]').click();
        cy.get('[data-testid="password-input"]').click();
        cy.get('[data-testid="error-login-id"]').contains("pole wymagane");
        cy.get('[data-testid="login-input"]').click();
        cy.get('[data-testid="error-login-password"]').contains("pole wymagane");
      });
    });
