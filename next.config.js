/** /** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		webVitalsAttribution: ['CLS', 'LCP'],
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.ctfassets.net',
				port: '',
				pathname: '/**',
			},
		],
	},
	async rewrites() {
		return [
			{
				source: '/over-mij',
				destination: '/about',
			},
			{
				source: '/werk',
				destination: '/collection',
			},
			{
				source: '/werk/:slug*',
				destination: '/detail/:slug*',
			},
			{
				source: '/collectie/:slug*',
				destination: '/collection/:slug*',
			},
		];
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.(graphql|gql)$/,
			exclude: /node_modules/,
			loader: 'graphql-tag/loader',
		});
		return config;
	},
};

module.exports = nextConfig;
