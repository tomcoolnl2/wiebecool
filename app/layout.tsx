import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import { Montserrat, Mulish, Poppins } from 'next/font/google';
import * as React from 'react';
import { Cursor } from '@/components/page/Cursor';
import { SiteNavigation } from '@/components/page/SiteNavigation';
import { Footer } from '@/components/page/Footer';

const PreLoader = dynamic(() => import('@/components/PreLoader'), { ssr: false });

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

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<html lang="nl">
			<body className={`dark ${montserrat.variable} ${mulish.variable} ${poppins.variable} font-mulish`}>
				<PreLoader />
				<div className="site-wrapper">
					<SiteNavigation />
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
