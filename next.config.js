/** /** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

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
				source: '/',
				destination: '/home',
			},
			{
				source: '/over-mij',
				destination: '/about',
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
				source: '/Werk/Portret-van-Sarah',
				destination: '/werk/portret-van-sarah',
				permanent: true,
			},
			{
				source: '/Werk/Hout',
				destination: '/collectie/hout',
				permanent: true,
			},
			{
				source: '/Werk', // other old pages
				destination: '/collectie',
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
