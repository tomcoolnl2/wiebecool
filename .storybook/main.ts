import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
	stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-onboarding',
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@chromatic-com/storybook',
		'@storybook/addon-interactions',
	],
	framework: {
		name: '@storybook/nextjs',
		options: {},
	},
	webpackFinal: async (config) => {
		// Ignore .gql and .graphql files
		config.module?.rules?.push({
			test: /\.(graphql|gql)$/,
			loader: 'ignore-loader',
		});

		// Add MDX loader
		config.module?.rules?.push({
			test: /\.mdx$/,
			use: [
				{
					loader: '@mdx-js/loader',
					options: {
						providerImportSource: '@mdx-js/react',
					},
				},
			],
		});

		return config;
	},
};

export default config;
