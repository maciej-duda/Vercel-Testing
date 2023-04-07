describe('Login Tests', () => {
    beforeEach(() => {
        cy.visit('/index.html'); 
      });

    it('Type correct credentials and check if user is redirected to the dashboard', () => {
      cy.fixture('user_data.json').then((testData) => {
  
        cy.get('[data-testid="login-input"]').type(testData.validUser.user_id);
        cy.get('[data-testid="password-input"]').type(testData.validUser.password);
        cy.get('[data-testid="login-button"]').click();
  
        cy.url().should('include', '/pulpit.html');
      });
    });
  });