//
describe('Homepage Test', () => {
	//
	beforeEach(() => {
		cy.visit('/');
	});

	it('contains SEO metadata', () => {
		cy.testSeoMetaData();
	});

	it('loads correctly', () => {
		cy.get('.name').should('contain', 'Wiebe Cool');
		cy.get('.subtitle').should('exist');
		cy.get('.avatar').should('exist');
		cy.get('.contact-details').should('exist');
	});

	it('navigates to other pages', () => {
		cy.get('.navigation-link').contains('Contact').click({ force: true });
		cy.url().should('include', '/contact');
	});

	it('includes JSON-LD schema for structured data', () => {
		cy.testSchemaMetaData();
	});
});
