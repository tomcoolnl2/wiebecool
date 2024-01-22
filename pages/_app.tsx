import * as React from 'react';
import { AppProvider } from '../src/Context';
import { PreLoader } from '../src/layout/PreLoader';
import '../src/styles/globals.css';

export default function App({ Component, pageProps }) {
	return (
		<AppProvider>
			<PreLoader />
			<Component {...pageProps} />
		</AppProvider>
	);
}
