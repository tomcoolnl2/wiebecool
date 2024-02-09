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

	it('verifies external links', () => {
		cy.get('.rich-text-block-border a[target="_blank"]').each(($link) => {
			const href = $link.attr('href');
			cy.wrap($link).should('have.attr', 'target', '_blank');
			cy.wrap($link).should('have.attr', 'rel', 'noopener noreferrer');
			cy.wrap(href).should('match', /^https?:\/\//); // Matches http:// or https://
		});
	});

	it('includes JSON-LD schema for structured data', () => {
		cy.testSchemaMetaData();
	});
});
