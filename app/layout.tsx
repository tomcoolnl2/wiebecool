import * as React from 'react';
import { Metadata } from 'next';
import { Montserrat, Mulish, Poppins } from 'next/font/google';
import { creator, fetchMainNavigation, locale } from '@/lib';
import { PreLoader, MainNavigation, Cursor, Background } from '@/components';

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

export const metadata: Metadata = {
	title: creator.description,
	description: creator.description,
	applicationName: creator.description,
	referrer: 'origin',
};

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
	//
	const { title, navigation } = await fetchMainNavigation();

	return (
		<html lang={locale}>
			<body className={`${montserrat.variable} ${mulish.variable} ${poppins.variable} font-mulish`}>
				<PreLoader />
				<div className="site-wrapper">
					<MainNavigation title={title} navigation={navigation} />
					<div className="main-content">
						<main className="main-content-inner">{children}</main>
					</div>
				</div>
				<Cursor />
				<Background />
			</body>
		</html>
	);
};

export default RootLayout;
