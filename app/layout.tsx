import { Montserrat, Mulish, Poppins } from 'next/font/google';
import * as React from 'react';
import { Metadata } from 'next';
import { Providers } from './providers';
import LayoutWrapper from '../components/LayoutWrapper';
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
				<Providers>
					<LayoutWrapper>{children}</LayoutWrapper>
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
