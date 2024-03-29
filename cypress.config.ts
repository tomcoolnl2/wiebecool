import { defineConfig } from 'cypress';

export default defineConfig({
	projectId: 'nhah3u',
	e2e: {
		baseUrl: 'http://localhost:3000',
		excludeSpecPattern: '*/*/**/spec.cy.ts',
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});
