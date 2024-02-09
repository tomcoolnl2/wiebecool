describe('Navigation', () => {
	it('should navigate to the about page', () => {
		// Start from the index page
		cy.visit('/');

		// Find a link with an href attribute containing "over-mij" and click it
		cy.get('a[href*="/over-mij"]').click({ force: true });

		// The new url should include "/about"
		cy.url().should('include', '/over-mij');

		// // wait for animation to end
		// cy.wait(2000);

		// The new page should contain an h1 with "Mijn missie"
		cy.get('h1').contains('Mijn missie');
	});
});
