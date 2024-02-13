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

	it('should update the filter URL params', () => {
		//
		cy.get('a[href="?filter=steen"]').click({ force: true });
		cy.url().should('include', '/collectie?filter=steen');

		cy.url().then((url) => {
			const searchParams = new URLSearchParams(new URL(url).search);
			const orderParam = searchParams.get('filter');
			expect(orderParam).to.eq('steen');
		});

		cy.get('.card').should('have.length.greaterThan', 0);
	});

	it('should update the "order" URL params', () => {
		//
		cy.get('a[href="?order=z-a"]').click({ force: true });
		cy.url().should('include', '/collectie?order=z-a');

		cy.url().then((url) => {
			const searchParams = new URLSearchParams(new URL(url).search);
			const orderParam = searchParams.get('order');
			expect(orderParam).to.eq('z-a');
		});

		cy.get('.card').should('have.length.greaterThan', 0);
	});

	it('should update the "filter" and "order" URL params', () => {
		//
		cy.get('.collection-order-item a[href="?order=z-a"]').click({ force: true });
		// filter links should be updated with the order in the params
		cy.get('.collection-filter-item a[href="?order=z-a&filter=steen"]').click({ force: true });

		cy.url().should('include', '/collectie?order=z-a&filter=steen');

		cy.url().then((url) => {
			const searchParams = new URLSearchParams(new URL(url).search);
			const orderParam = searchParams.get('order');
			const filterParam = searchParams.get('filter');
			expect(orderParam).to.eq('z-a');
			expect(filterParam).to.eq('steen');
		});

		cy.get('.card').should('have.length.greaterThan', 0);
	});

	it("should remove 'filter' URL param when selecting 'All' from the filter", () => {
		//
		cy.get('.collection-order-item a[href="?order=z-a"]').click({ force: true });
		cy.get('.collection-filter-item a[href="?order=z-a&filter=steen"]').click({ force: true });

		cy.get('.collection-filter-item a').contains('All').click({ force: true });

		cy.location('search').should('contain', 'order=z-a');
		cy.location('search').should('not.contain', 'filter=steen');

		cy.get('.card').should('have.length.greaterThan', 0);
	});

	it("should remove 'order' and 'filter' URL params when selecting 'All' from the filter", () => {
		//
		cy.get('.collection-order-item a[href="?order=z-a"]').click({ force: true });
		cy.get('.collection-filter-item a[href="?order=z-a&filter=steen"]').click({ force: true });

		cy.get('.collection-order-reset a[href="/collectie"]').click({ force: true });

		cy.location('search').should('not.contain', 'order=z-a');
		cy.location('search').should('not.contain', 'filter=steen');

		cy.get('.card').should('have.length.greaterThan', 0);
	});
});
