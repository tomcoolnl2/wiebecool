import * as React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import { Montserrat, Mulish, Poppins } from 'next/font/google';
import { fetchArtist, fetchGlobalConfig, fetchMainNavigation } from '@/lib';
import { PreLoader, MainNavigation, Cursor, Background, CookieBar } from '@/components';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@/css/globals.css';

config.autoAddCss = false;

const montserrat = Montserrat({
	subsets: ['latin'],
	variable: '--font-montserrat',
});

const mulish = Mulish({
	subsets: ['latin'],
	variable: '--font-mulish',
});

const poppins = Poppins({
	weight: '900',
	subsets: ['latin'],
	variable: '--font-poppins',
});

export async function generateMetadata(): Promise<Metadata> {
	const [{ baseUrl }, artist] = await Promise.all([fetchGlobalConfig(), fetchArtist()]);
	return {
		metadataBase: new URL(baseUrl),
		title: artist.description,
		description: artist.description,
		applicationName: artist.description,
		referrer: 'origin',
		openGraph: {
			images: '/opengraph-image.jpg',
		},
	};
}

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
	const [{ locale }, { title, navigation }, artist] = await Promise.all([fetchGlobalConfig(), fetchMainNavigation(), fetchArtist()]);
	return (
		<html lang={locale}>
			<body className={`${montserrat.variable} ${mulish.variable} ${poppins.variable}`}>
				<PreLoader />
				<div className="site-wrapper">
					<MainNavigation title={title} navigation={navigation} artist={artist} />
					<div className="main-content">
						<Background />
						<main className="main-content-inner">{children}</main>
					</div>
				</div>
				<CookieBar />
				<Cursor />
				<Analytics />
			</body>
		</html>
	);
};

export default RootLayout;
