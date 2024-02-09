//
describe('Navigation Test', () => {
	//
	it('navigates between all pages seamlessly', () => {
		// Visit the homepage
		cy.visit('/');

		// Test navigation links in the header
		cy.get('.navigation-link').contains('Home').click({ force: true });
		cy.url().should('include', '/');

		cy.get('.navigation-link').contains('Missie').click({ force: true });
		cy.url().should('include', '/over-mij');

		cy.get('.navigation-link').contains('Werk').click({ force: true });
		cy.url().should('include', '/collectie');

		// Test navigation links in the collection sub-navigation
		cy.get('.sub-navigation').contains('Houten Beelden').click({ force: true });
		cy.url().should('include', '/collectie/hout');

		cy.get('.sub-navigation').contains('Portret van Sarah').click({ force: true });
		cy.url().should('include', '/werk/portret-van-sarah');

		cy.get('.sub-navigation').contains('Beelden van Steen').click({ force: true });
		cy.url().should('include', '/collectie/steen');

		// Test navigation back to homepage from footer
		cy.get('.navigation-link').contains('Home').click({ force: true });
		cy.url().should('include', '/');
	});

	it('should display navigation above breakpoint', () => {
		// Set viewport size to a size above the breakpoint
		cy.viewport(1100, 600);
		cy.visit('/');
		cy.get('.main-navigation').should('be.visible');
	});

	it('should hide navigation beneath breakpoint', () => {
		// Set viewport size to a size below the breakpoint
		cy.viewport(700, 600); // Adjust the width and height as needed
		cy.visit('/');
		cy.get('.main-navigation').should('not.be.visible');
	});
});
