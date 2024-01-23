'use client';
import Head from 'next/head';
import { Metadata } from 'next';
// import { Head, Html, Main, NextScript } from 'next/document';
import * as React from 'react';
import { tokyo } from '../src/utils';
import { AppContext, AppProvider } from '../src/Context';
import { Cursor } from '../src/layout/Cursor';
import { Mobile } from '../src/layout/Mobile';
import { Sidebar } from '../src/layout/Sidebar';
import { ImageView } from '../src/components/popup/ImageView';
import { MediaPopup } from '../src/components/popup/MediaPopup';
import { ProductDetailComponent } from '../src/components/popup/ProductDetailModal';
import { ServiceModalComponent } from '../src/components/popup/ServiceModal';
import { DetailsModalComponent } from '../src/components/popup/DetailsModal';
import { PreLoader } from '../src/layout/PreLoader';

import '../src/styles/globals.css';

// export const metadata: Metadata = {
// 	title: 'Wiebe Cool | Beeldhouwer',
// 	description: 'Wiebe Cool | Beeldhouwer',
// };

export default function RootLayout({ children }) {
	//
	React.useEffect(() => {
		tokyo.dataImage();
		tokyo.imageToSvg();
		tokyo.customCursor();
	}, []);

	const { modal, serviceModal, productModal, portfolioDetailsModal } = React.useContext(AppContext);

	return (
		<AppProvider>
			<html lang="nl">
				<Head>
					<meta charSet="UTF-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<link
						href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
						rel="stylesheet"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
						rel="stylesheet"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
						rel="stylesheet"
					/>
					<link rel="stylesheet" href="../assets/css/plugins.css" />
					<link rel="stylesheet" href="../assets/css/custom.css" />
					<link rel="stylesheet" href="../assets/css/main.css" />

					<title>Wiebe Cool | Beeldhouwer</title>
				</Head>
				<body>
					<MediaPopup />
					<ImageView />
					{modal && serviceModal && <ServiceModalComponent />}
					{modal && productModal && <ProductDetailComponent />}
					{modal && portfolioDetailsModal && <DetailsModalComponent />}
					<div className="tokyo_tm_all_wrap">
						<PreLoader />
						<Mobile />
						<Sidebar />
						<div className="rightpart w-full min-h-[100vh] float-left relative bg-[#f8f8f8] pl-[450px]">
							<div className="rightpart_in relative w-full float-left clear-both border-solid border-[#ebebeb] border-l min-h-[100vh]">
								{children}
							</div>
						</div>
						<Cursor />
					</div>
				</body>
			</html>
		</AppProvider>
	);
}
