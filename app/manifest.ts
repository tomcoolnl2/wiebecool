import { MetadataRoute } from 'next';
import { artist, fetchHomePageSeoMetaData } from '@/lib';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
	const seoMetaData = await fetchHomePageSeoMetaData();
	return {
		name: seoMetaData.title,
		short_name: artist.description,
		description: seoMetaData.description,
		start_url: '/',
		display: 'standalone',
		background_color: '#000',
		theme_color: '#d4d4d4',
		icons: [
			{
				src: '/favicon.ico',
				sizes: 'any',
				type: 'image/x-icon',
			},
		],
	};
}
