//
describe('About Page Test', () => {
	//
	beforeEach(() => {
		cy.visit('/about');
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

	it('verifies external links', () => {
		cy.get('a[target="_blank"]').each(($link) => {
			const href = $link.attr('href');
			cy.wrap($link).should('have.attr', 'target', '_blank');
			cy.wrap($link).should('have.attr', 'rel', 'noopener noreferrer');
			cy.wrap(href).should('match', /^https?:\/\//); // Matches http:// or https://
		});
	});
});
