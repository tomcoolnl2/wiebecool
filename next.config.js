
/** /** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
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
				destination: '/portfolio',
			},
		];
	},
};

module.exports = nextConfig;
