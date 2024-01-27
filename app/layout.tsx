import { Metadata } from 'next';
import { Montserrat, Mulish, Poppins } from 'next/font/google';
import * as React from 'react';
import { fetchContentfulData } from '@/lib/api';
import { PreLoader } from '@/components/PreLoader';
import { Cursor } from '@/components/page/Cursor';
import { MainNavigation } from '@/components/page/MainNavigation';
import { Footer } from '@/components/page/Footer';
import MainNavigationQuery from '@/graphql/MainNavigation.gql';
import '../css/globals.css';

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
	title: 'Wiebe Cool | Beeldhouwer',
	description: 'Wiebe Cool | Beeldhouwer',
	applicationName: 'Wiebe Cool | Beeldhouwer',
	referrer: 'origin',
};

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
	//
	const {
		navigation: {
			title,
			navigationItemsCollection: { items: navigation },
		},
	} = await fetchContentfulData(MainNavigationQuery, { sysID: '5bRsPaSUeUrD7QB5m868iu' });

	// foreach navigation -> fetch subnavigation
	// console.log(navigation);

	return (
		<html lang="nl">
			<body className={`dark ${montserrat.variable} ${mulish.variable} ${poppins.variable} font-mulish`}>
				<PreLoader />
				<div className="site-wrapper">
					<MainNavigation title={title} navigation={navigation} />
					<main className="main-content w-full min-h-[100vh] relative bg-[#f8f8f8]">
						<div className="main-content-inner relative w-full border-solid border-[#ebebeb] border-l min-h-[100vh]">
							{children}
						</div>
					</main>
					<Footer />
				</div>
				<Cursor />
			</body>
		</html>
	);
};

export default RootLayout;
