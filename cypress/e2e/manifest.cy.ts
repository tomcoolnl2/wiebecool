//
describe('Manifest Test', () => {
	it('loads and validates the manifest JSON file', () => {
		cy.request({
			url: '/manifest.webmanifest',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
			},
		}).then((response) => {
			//
			expect(response.status).to.eq(200);

			const manifest = response.body;

			expect(manifest).to.have.property('name').and.to.include('Wiebe Cool');
			expect(manifest).to.have.property('short_name').and.to.include('Wiebe Cool');
			expect(manifest).to.have.property('description');
			expect(manifest).to.have.property('start_url', '/');
			expect(manifest).to.have.property('display', 'standalone');
			expect(manifest).to.have.property('background_color', '#000');
			expect(manifest).to.have.property('theme_color', '#d4d4d4');
			expect(manifest).to.have.property('icons').and.to.be.an('array');

			const icon = manifest.icons[0];
			expect(icon).to.have.property('src', '/favicon.ico');
			expect(icon).to.have.property('sizes', 'any');
			expect(icon).to.have.property('type', 'image/x-icon');
		});
	});
});
