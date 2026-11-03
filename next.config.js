/** /** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
	reactStrictMode: true,
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
		qualities: [75, 80],
	},
	async redirects() {
		return [
			{
				source: '/home',
				destination: '/',
				permanent: true,
			},
			{
				source: '/about',
				destination: '/over-mij',
				permanent: true,
			},
			{
				source: '/collection/:slug*',
				destination: '/collectie/:slug*',
				permanent: true,
			},
			{
				source: '/detail/:slug*',
				destination: '/werk/:slug*',
				permanent: true,
			},
			{
				source: '/werk',
				destination: '/collectie',
				permanent: true,
			},
			{
				source: '/Missie',
				destination: '/over-mij',
				permanent: true,
			},
			{
				source: '/Werk/Hout',
				destination: '/collectie/hout',
				permanent: true,
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

module.exports = withBundleAnalyzer(nextConfig);
