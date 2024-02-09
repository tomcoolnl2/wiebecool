//
describe('About Page Test', () => {
	//
	beforeEach(() => {
		cy.visit('/over-mij');
	});

	it('contains SEO metadata', () => {
		cy.testSeoMetaData();
	});

	it('loads correctly with sculptor content', () => {
		cy.get('.page-header').should('exist');
		cy.get('nav[aria-label="breadcrumbs"]').should('exist');
		cy.get('nav[aria-label="breadcrumbs"]').should('exist');
		cy.get('.hero-banner').should('exist');
		cy.get('.rich-text-block-border').should('not.be.empty');
	});

	it('includes JSON-LD schema for structured data', () => {
		cy.testSchemaMetaData();
	});
});
