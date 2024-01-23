import * as React from 'react';
import { Metadata } from 'next';
import { Providers } from './providers';
import Template from './template';
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
					<Template key={1}>{children}</Template>
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
