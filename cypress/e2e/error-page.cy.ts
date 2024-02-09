//
describe('Error Handling Tests', () => {
	//
	it('should display a 404 page for a non-existent URL', () => {
		cy.request({ url: '/non-existent-page', failOnStatusCode: false }).its('status').should('equal', 404);
		cy.on('uncaught:exception', () => false);
		cy.visit('/non-existent-page', { failOnStatusCode: false });
		cy.contains('This page could not be found.').should('be.visible');
	});
});
