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
		cy.get('.detail-cards-collection').should('exist');
	});

	it('should ensure correct display of sculptures', () => {
		cy.get('.card').should('have.length.greaterThan', 0);
	});

	it('should ensure correct display of sculptures and test URL params', () => {
		//
		cy.get('a[href="?filter=steen"]').click({ force: true });
		cy.url().should('include', '/collectie?filter=steen');

		cy.url().then((url) => {
			const searchParams = new URLSearchParams(new URL(url).search);
			const orderParam = searchParams.get('order');
			expect(orderParam).to.eq('z-a');
		});

		cy.get('.card').should('have.length.greaterThan', 0);
	});
});
