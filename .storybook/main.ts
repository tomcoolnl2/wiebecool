import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
	stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
        '@storybook/addon-onboarding',
        '@storybook/addon-links',
        '@chromatic-com/storybook',
        '@storybook/addon-docs',
        '@storybook/addon-mcp'
    ],
	framework: {
		name: '@storybook/nextjs-vite',
		options: {},
	},
	viteFinal: async (config) => {
		// .gql/.graphql files are transitively imported via lib/api.ts but never
		// executed in Storybook - stub them out instead of letting Vite/Rollup
		// try (and fail) to parse GraphQL syntax as JavaScript.
		config.plugins ??= [];
		config.plugins.push({
			name: 'ignore-gql',
			transform(_code, id) {
				if (/\.(gql|graphql)$/.test(id)) {
					return { code: 'export default {};', map: null };
				}
			},
		});
		return config;
	},
};

export default config;
