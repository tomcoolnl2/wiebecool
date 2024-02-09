/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable<Subject> {
		/**
		 * Test the Seo Meta Data for a Page
		 * @example
		 * cy.testSeoMetaData()
		 */
		testSeoMetaData(): Chainable<void>;

		/**
		 * Test the Seo Meta Data for a Page
		 * @example
		 * cy.testSeoMetaData()
		 */
		testSchemaMetaData(): Chainable<void>;
	}
}

Cypress.Commands.add('testSeoMetaData', () => {
	cy.title().should('exist');
	cy.title().should('not.be.empty');

	cy.get('head meta[name="description"]').should('exist');
	cy.get('head meta[name="description"]').then((description) => {
		expect(description.attr('content')).not.to.be.empty;
	});

	cy.get('head meta[name="keywords"]').should('exist');
	cy.get('head meta[name="keywords"]').then((keywords) => {
		expect(keywords.attr('content')).not.to.be.empty;
	});
});

Cypress.Commands.add('testSchemaMetaData', () => {
	cy.get('script[type="application/ld+json"]').should('exist');
});
