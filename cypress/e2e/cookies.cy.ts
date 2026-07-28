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

	it('should persist the consent cookie beyond the browser session', () => {
		// a session cookie (no maxAge/expires) is wiped when the browser closes,
		// silently undoing an already-accepted consent - assert it's long-lived
		cy.contains('Accepteer Cookies').click();
		cy.getCookie('localConsent').then((cookie) => {
			const oneWeekFromNow = Date.now() / 1000 + 60 * 60 * 24 * 7;
			expect(cookie?.expiry).to.be.a('number').and.be.greaterThan(oneWeekFromNow);
		});
	});
});
