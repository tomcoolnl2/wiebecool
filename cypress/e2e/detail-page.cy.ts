//
describe('Detail Page Tests', () => {
	//
	beforeEach(() => {
		cy.visit('/collectie');
	});

	it('should allow users to access individual sculpture detail pages', () => {
		// Click on an artwork to access its detail page
		cy.get('.card a').first().click({ force: true });
		cy.url().should('include', '/werk');
	});

	it('contains SEO metadata', () => {
		cy.testSeoMetaData();
	});

	it('includes JSON-LD schema for structured data', () => {
		cy.testSchemaMetaData();
	});

	it('should test the display of sculpture details', () => {
		// Access an individual artwork detail page
		cy.get('.card a').first().click({ force: true });
		// Test if it loads correctly
		cy.get('.page-header').should('be.visible');
		cy.get('nav[aria-label="breadcrumbs"]').should('be.visible');
		cy.get('.page-header-title').should('be.visible');
		cy.get('.detail-page-main-image').should('exist');
		cy.get('.detail-page-details').should('exist');
		cy.get('.contact-details').should('exist');
		cy.get('.share-socials').should('exist');
	});
});
