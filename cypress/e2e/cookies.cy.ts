//
describe('CookieBar', () => {
	//
	beforeEach(() => {
		cy.visit('/');
	});

	it('should display the cookie consent bar initially', () => {
		cy.get('.cookie-bar').should('be.visible');
	});

	it('should hide the cookie consent bar after accepting cookies', () => {
		cy.get('.cookie-bar').should('be.visible');
		cy.contains('Accepteer Cookies').click();
		cy.get('.cookie-bar').should('not.exist');
	});

	it('should set a cookie after accepting cookies', () => {
		cy.getCookie('localConsent').should('not.exist');
		cy.contains('Accepteer Cookies').click();
		cy.getCookie('localConsent').should('have.property', 'value', 'true');
	});
});
