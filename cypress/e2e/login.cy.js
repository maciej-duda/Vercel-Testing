describe('Login Tests', () => {

    beforeEach(() => {
        cy.visit('/index.html'); 
        cy.url().should('include', '/index.html');
        cy.contains("Wersja demonstracyjna serwisu Demobank");
        //use aliases for selectors
        cy.get('[data-testid="login-input"]').as('loginInput');
        cy.get('[data-testid="password-input"]').as('passwordInput');
        cy.get('[data-testid="login-button"]').as('loginButton');
      });

      it('Type correct credentials and check if user is redirected to the dashboard', () => {
        cy.fixture('user_data.json').then((testData) => {
          cy.get('@loginInput').type(testData.validUser.user_id);
          cy.get('@passwordInput').type(testData.validUser.password);
          cy.get('@loginButton').click();
          cy.url().should('include', '/pulpit.html');
        });
      });
  
      it('Checks error message for empty fields', () => {
          cy.get('@loginInput').click();
          cy.get('@passwordInput').click();
          cy.get('[data-testid="error-login-id"]').contains("pole wymagane");
          cy.get('@loginInput').click();
          cy.get('[data-testid="error-login-password"]').contains("pole wymagane");
        });
  
      it('Checks if button is disabled when no data is provided or wrong data is provided', () => {
        cy.fixture('user_data.json').then((testData) => {
          cy.get('@loginButton').should('be.disabled');
          cy.get('@loginInput').type(testData.invalidUser.user_id);
          cy.get('@passwordInput').type(testData.invalidUser.password);
          cy.get('@loginButton').should('be.disabled');
        });
      });
  
      it('Checks error message for username and password that doesnt match requirements', () => {
          cy.fixture('user_data.json').then((testData) => {
            cy.get('@loginInput').type(testData.invalidUser.user_id);
            cy.get('@passwordInput').type(testData.invalidUser.password);
            cy.get('@loginInput').click();
            cy.get('[data-testid="error-login-id"]').contains("identyfikator ma min. 8 znaków");
            cy.get('[data-testid="error-login-password"]').contains("hasło ma min. 8 znaków");
          });
        });
    });