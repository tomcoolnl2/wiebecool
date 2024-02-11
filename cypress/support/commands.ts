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

		/**
		 * test a form including Google's reCaptcha
		 * @example
		 * cy.solveGoogleReCAPTCHA()
		 */
		solveGoogleReCAPTCHA(): Chainable<void>;
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

// Cypress.Commands.add('solveGoogleReCAPTCHA', () => {
// 	// Wait until the iframe (Google reCAPTCHA) is totally loaded
// 	cy.wait(500);
// 	cy.get('.recaptcha iframe').then(($iframe) => {
// 		const $body = $iframe.contents().find('body');
// 		cy.wrap($body).find('.recaptcha-checkbox-border').should('be.visible').click();
// 	});
// });

const getIframeDocument = () => {
	return (
		cy
			.get('iframe[title="reCAPTCHA"')
			// Cypress yields jQuery element, which has the real
			// DOM element under property "0".
			// From the real DOM iframe element we can get
			// the "document" element, it is stored in "contentDocument" property
			// Cypress "its" command can access deep properties using dot notation
			// https://on.cypress.io/its
			.its('0.contentDocument')
			.should('exist')
	);
};

const getIframeBody = () => {
	// get the document
	return (
		getIframeDocument()
			// automatically retries until body is loaded
			.its('body')
			.should('not.be.undefined')
			// wraps "body" DOM element to allow
			// chaining more Cypress commands, like ".find(...)"
			.then(cy.wrap)
	);
};

Cypress.Commands.add('solveGoogleReCAPTCHA', () => {
	getIframeBody().find('#recaptcha-token').as('reCAPTCHAcheckbox');
	cy.get('@reCAPTCHAcheckbox').should('exist');
});
