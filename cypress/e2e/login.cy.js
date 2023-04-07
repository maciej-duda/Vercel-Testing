describe('Login Tests', () => {
    beforeEach(() => {
        cy.visit('https://demo-bank.vercel.app/'); 
      });

    it('Type correct credentials and check if user is redirected to the dashboard', () => {
      cy.fixture('user_data.json').then((testData) => {
        cy.visit('https://demo-bank.vercel.app/');
  
        cy.get('[data-testid="login-input"]').type(testData.user.user_id);
        cy.get('[data-testid="password-input"]').type(testData.user.password);
        cy.get('[data-testid="login-button"]').click();
  
        cy.url().should('include', '/pulpit.html');
      });
    });
  });