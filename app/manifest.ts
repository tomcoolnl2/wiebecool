import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Wiebe Cool - Beeldhouwer',
		short_name: 'Wiebe Cool',
		description: 'Wiebe Cool - Beeldhouwer',
		start_url: '/',
		display: 'standalone',
		background_color: '#222',
		theme_color: '#222',
		icons: [
			{
				src: '/favicon.ico',
				sizes: 'any',
				type: 'image/x-icon',
			},
			{
				src: '/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png',
			},
		],
	};
}
