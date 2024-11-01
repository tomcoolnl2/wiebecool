//
describe('Sitemap Test', () => {
	//
	it('loads and validates the sitemap XML file', () => {
		//
		cy.request({
			url: '/sitemap.xml',
			headers: {
				'Content-Type': 'text/xml; charset=utf-8',
				'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
			},
		}).then((response) => {
			// Parse XML response
			const xml = Cypress.$.parseXML(response.body);
			const urls = Cypress.$(xml)
				.find('url loc')
				.map(function () {
					return Cypress.$(this).text();
				})
				.get();

			expect(urls).to.include.members([
				'https://wiebecool.nl/',
				'https://wiebecool.nl/over-mij',
				'https://wiebecool.nl/collectie',
				'https://wiebecool.nl/collectie/steen',
				'https://wiebecool.nl/collectie/hout',
				'https://wiebecool.nl/werk/poes',
				'https://wiebecool.nl/werk/ijsbeer',
				'https://wiebecool.nl/contact',
			]);
		});
	});
});
