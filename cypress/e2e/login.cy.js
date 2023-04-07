describe('Login Tests', () => {
    beforeEach(() => {
        cy.visit('/index.html'); 
        cy.url().should('include', '/index.html');
        cy.contains("Wersja demonstracyjna serwisu Demobank");
      });

    it('Type correct credentials and check if user is redirected to the dashboard', () => {
      cy.fixture('user_data.json').then((testData) => {
        cy.get('[data-testid="login-input"]').type(testData.validUser.user_id);
        cy.get('[data-testid="password-input"]').type(testData.validUser.password);
        cy.get('[data-testid="login-button"]').click();
        cy.url().should('include', '/pulpit.html');
      });
    });

    it('Checks error message for empty fields', () => {
        cy.get('[data-testid="login-input"]').click();
        cy.get('[data-testid="password-input"]').click();
        cy.get('[data-testid="error-login-id"]').contains("pole wymagane");
        cy.get('[data-testid="login-input"]').click();
        cy.get('[data-testid="error-login-password"]').contains("pole wymagane");
      });

    it('Checks if button is disabled when no data is provided or wrong data is provided', () => {
      cy.fixture('user_data.json').then((testData) => {
        cy.get('[data-testid="login-button"]').should('be.disabled');
        cy.get('[data-testid="login-input"]').type(testData.invalidUser.user_id);
        cy.get('[data-testid="password-input"]').type(testData.invalidUser.password);
        cy.get('[data-testid="login-button"]').should('be.disabled');
      });
    });

    it('Checks error message for username and password that doesnt match requirements', () => {
        cy.fixture('user_data.json').then((testData) => {
          cy.get('[data-testid="login-input"]').type(testData.invalidUser.user_id);
          cy.get('[data-testid="password-input"]').type(testData.invalidUser.password);
          cy.get('[data-testid="login-input"]').click();
          cy.get('[data-testid="error-login-id"]').contains("identyfikator ma min. 8 znaków");
          cy.get('[data-testid="error-login-password"]').contains("hasło ma min. 8 znaków");
        });
      });

  });