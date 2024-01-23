import * as React from 'react';
import { Metadata } from 'next';
import { Providers } from './providers';
import LayoutWrapper from '../components/LayoutWrapper';
import './globals.css';

export const metadata: Metadata = {
	title: 'Wiebe Cool | Beeldhouwer',
	description: 'Wiebe Cool | Beeldhouwer',
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<html lang="nl">
			<body className="dark">
				<Providers>
					<LayoutWrapper>{children}</LayoutWrapper>
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
