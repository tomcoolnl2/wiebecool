//
describe('Contact Page Tests', () => {
	//
	beforeEach(() => {
		cy.visit('/contact');
	});

	it('should allow users to access the contact page', () => {
		cy.url().should('include', '/contact');
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
		cy.get('.contact-details').should('exist');
	});

	it('should display error messages for empty form submissions', () => {
		// Submit the form with invalid input data (e.g., without filling out required fields)
		cy.get('button[type="submit"]').click();
		// Assert that error messages are displayed for each invalid input
		cy.contains('Vul een naam in.').should('be.visible');
	});

	it('should display error messages for partially empty form submissions', () => {
		// Fill out the form with valid input data
		cy.get('input[name="name"]').type('John Doe');
		// Submit the form with invalid input data (e.g., without filling out all required fields)
		cy.get('button[type="submit"]').click();
		// Assert that error messages are displayed for each invalid input
		cy.contains('Verkeerd email adres.').should('be.visible');
	});

	it('should display error messages for faulty email address', () => {
		// Fill out the form with valid input data
		cy.get('input[name="name"]').type('John Doe');
		cy.get('input[name="email"]').type('john$example.com');
		// Submit the form with invalid input data (e.g., with a invalid email address)
		cy.get('button[type="submit"]').click();
		// Assert that error messages are displayed for each invalid input
		cy.contains('Verkeerd email adres.').should('be.visible');
	});

	it('should display error messages for empty message', () => {
		// Fill out the form with valid input data
		cy.get('input[name="name"]').type('John Doe');
		cy.get('input[name="email"]').type('test@email.com');
		// Submit the form with invalid input data (e.g., without filling out all required fields)
		cy.get('button[type="submit"]').click();
		// Assert that error messages are displayed for each invalid input
		cy.contains('Vul een vraag in.').should('be.visible');
	});

	it('should submit the contact form with valid inputs', () => {
		// Fill out the form with valid input data
		cy.get('input[name="name"]').type('John Doe');
		cy.get('input[name="email"]').type('test@email.com');
		cy.get('textarea[name="message"]').type('This is a test message');
		// Submit the form
		cy.get('button[type="submit"]').click();
		// Assert that the form submission is successful
		cy.wait(1000);
		cy.contains('Bericht verstuurd. Bedankt!').should('be.visible');
	});
});
