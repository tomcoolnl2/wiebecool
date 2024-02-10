//
describe('Collection Page Tests', () => {
	//
	beforeEach(() => {
		cy.visit('/collectie');
	});

	it('should allow users to access the collection page', () => {
		cy.url().should('include', '/collectie');
	});

	it('contains SEO metadata', () => {
		cy.testSeoMetaData();
	});

	it('includes JSON-LD schema for structured data', () => {
		cy.testSchemaMetaData();
	});

	it('loads correctly', () => {
		cy.get('.page-header').should('exist');
		cy.get('nav[aria-label="breadcrumbs"]').should('exist');
		cy.get('.rich-text-block').should('exist');
		cy.get('.rich-text-block').should('exist');
		cy.get('.collection').should('exist');
	});

	it('should ensure correct display of sculptures', () => {
		cy.get('.card').should('have.length.greaterThan', 0);
	});
});
