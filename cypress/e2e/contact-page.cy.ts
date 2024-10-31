import { mockEmail, mockSiteContent } from '@/mock/data';

//
describe('Contact Page Tests', () => {
	//
	beforeEach(() => {
		cy.intercept('POST', `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}`, (req) => {
			req.reply({ captchaPassed: true });
		});
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
		cy.contains(mockSiteContent.page.contact.error.required).should('be.visible');
	});

	it('should display an error messages when the input value for the name field is too short', () => {
		// Fill out the form with valid input data
		cy.get('input[name="name"]').type('W', { force: true });
		// Submit the form with invalid input data (e.g., without filling out all required fields)
		cy.get('button[type="submit"]').click();
		// Assert that error messages are displayed for each invalid input
		cy.contains(mockSiteContent.page.contact.error.minLength).should('be.visible');
	});

	it('should display error messages for partially empty form submissions', () => {
		// Fill out the form with valid input data
		cy.get('input[name="name"]').type('John Doe', { force: true });
		// Submit the form with invalid input data (e.g., without filling out all required fields)
		cy.get('button[type="submit"]').click();
		// Assert that error messages are displayed for each invalid input
		cy.contains(mockSiteContent.page.contact.error.required).should('be.visible');
		// Assert that the email field has focus
		cy.get('input[name="email"]').should('have.focus');
	});

	it('should display error messages for faulty email address', () => {
		// Fill out the form with valid input data
		cy.get('input[name="name"]').type('John Doe', { force: true });
		cy.get('input[name="email"]').type('john$example.com', { force: true });
		// Submit the form with invalid input data (e.g., with a invalid email address)
		cy.get('button[type="submit"]').click();
		// Assert that error messages are displayed for each invalid input
		cy.contains(mockSiteContent.page.contact.error.email).should('be.visible');
	});

	it('should display error messages for empty message', () => {
		// Fill out the form with valid input data
		cy.get('input[name="name"]').type('John Doe', { force: true });
		cy.get('input[name="email"]').type(mockEmail, { force: true });
		// Submit the form with invalid input data (e.g., without filling out all required fields)
		cy.get('button[type="submit"]').click();
		// Assert that error messages are displayed for each invalid input
		cy.contains(mockSiteContent.page.contact.error.required).should('be.visible');
	});

	it('should submit the contact form with valid inputs', () => {
		// Fill out the form with valid input data
		cy.get('input[name="name"]').type('John Doe', { force: true });
		cy.get('input[name="email"]').type(mockEmail, { force: true });
		cy.get('textarea[name="message"]').type('This is a test message');
		// Submit the form
		cy.get('button[type="submit"]').click();
		// Assert that the form submission is successful
		cy.wait(1000);
		cy.contains(mockSiteContent.page.contact.success).should('be.visible');
	});
});
