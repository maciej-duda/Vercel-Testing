describe('Dashboard review', () => {

    beforeEach(() => {
        cy.visit('/index.html'); 
        cy.url().should('include', '/index.html');
        cy.contains('Wersja demonstracyjna serwisu Demobank');
        //use aliases for selectors
        cy.get('[data-testid="login-input"]').as('loginInput');
        cy.get('[data-testid="password-input"]').as('passwordInput');
        cy.get('[data-testid="login-button"]').as('loginButton');

        cy.fixture('user_data.json').then((testData) => {
            cy.get('@loginInput').type(testData.validUser.user_id);
            cy.get('@passwordInput').type(testData.validUser.password);
            cy.get('@loginButton').click();
            cy.url().should('include', '/pulpit.html');
        });
    });

    it('Checks basic information about customer', () => {
        cy.get('#user_name').contains('Jan Demobankowy');
        cy.get('#account_number').contains('(41 4100 1111 1111 1111 1111 0000)');
        cy.get('#money_value').contains('13159');
    });

    it('Checks information about available funds', () => {
        cy.contains('więcej').click();
        cy.contains('blokady na koncie');
        cy.get('.form-static.grid-22.grid-mt-16.grid-ms-48').contains('300');
        cy.contains('limit kredytowy do wykorzystania');
        cy.get('.form-static.grid-22.grid-mt-28.grid-ms-48').contains('10 000');
    });
});