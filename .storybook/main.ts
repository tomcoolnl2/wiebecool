import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
	// core: {
	// 	builder: 'webpack5',
	// },
	stories: ['../**/*.stories.@(js|jsx|ts|tsx)'],
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
	// typescript: {
	// 	check: false,
	// 	checkOptions: {},
	// 	reactDocgen: false,
	// 	reactDocgenTypescriptOptions: {
	// 		shouldExtractLiteralValuesFromEnum: true,
	// 		propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
	// 	},
	// },
	webpackFinal: async (config) => {
		// Exclude .gql and .graphql files from being processed
		config.module?.rules?.push({
			test: /\.(graphql|gql)$/,
			loader: 'ignore-loader', // This will ignore these files
		});

		return config;
	},
};
export default config;
