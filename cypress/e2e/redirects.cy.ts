//
describe('Redirects', () => {
	//
	const { baseUrl } = Cypress.config();

	it('should redirect from /home to /', () => {
		cy.request('/home').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.isOkStatusCode).to.be.true;
			expect(response.redirects![0]).to.eq(`308: ${baseUrl}/`);
		});
	});

	it('should redirect from /about to /over-mij', () => {
		cy.request('/about').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.isOkStatusCode).to.be.true;
			expect(response.redirects![0]).to.eq(`308: ${baseUrl}/over-mij`);
		});
	});

	it('should redirect from /werk to /collectie', () => {
		cy.request('/werk').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.isOkStatusCode).to.be.true;
			expect(response.redirects![0]).to.eq(`308: ${baseUrl}/collectie`);
		});
	});

	it('should redirect from /Missie to /over-mij', () => {
		cy.request('/Missie').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.isOkStatusCode).to.be.true;
			expect(response.redirects![0]).to.eq(`308: ${baseUrl}/over-mij`);
		});
	});

	it('should redirect from /Werk/Portret-van-Sarah/ to /werk/portret-van-sarah', () => {
		cy.request('/Werk/Portret-van-Sarah').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.isOkStatusCode).to.be.true;
		});
	});

	it('should redirect from /Werk/Hout to /collectie/hout', () => {
		cy.request('/Werk/Hout').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.isOkStatusCode).to.be.true;
			expect(response.redirects![0]).to.eq(`308: ${baseUrl}/collectie/hout`);
		});
	});

	it('should redirect from /Werk to /collectie', () => {
		cy.request('/Werk').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.isOkStatusCode).to.be.true;
			expect(response.redirects![0]).to.eq(`308: ${baseUrl}/collectie`);
		});
	});
});
