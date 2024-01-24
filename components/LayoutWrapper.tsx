'use client';
import * as React from 'react';
import { tokyo } from '@/lib/utils';
import { AppContext } from '@/context/Context';
import { Cursor } from '@/components/Cursor';
import { Mobile } from '@/components/Mobile';
import { Sidebar } from '@/components/Sidebar';
import { PreLoader } from '@/components/PreLoader';
// import { ImageView } from '@/components/popup/ImageView';
import { ProductDetailComponent } from '@/components/popup/ProductDetailModal';
import { DetailsModalComponent } from '@/components/popup/DetailsModal';
import { MenuItem } from '@/model';

const menuItems: MenuItem[] = [
	{ id: 1, name: 'Home', href: '/' },
	{ id: 2, name: 'Missie', href: '/about' },
	{ id: 3, name: 'Werk', href: '/portfolio' },
	{ id: 4, name: 'Contact', href: '/contact' },
];

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
	//
	React.useEffect(() => {
		tokyo.dataImage();
		tokyo.imageToSvg();
		tokyo.customCursor();
	}, []);

	const { modal, productModal, portfolioDetailsModal } = React.useContext(AppContext);
	return (
		<>
			<PreLoader />
			{/* <ImageView /> */}
			{modal && productModal && <ProductDetailComponent />}
			{modal && portfolioDetailsModal && <DetailsModalComponent />}
			<div className="site-wrapper">
				<Mobile menuItems={menuItems} />
				<Sidebar menuItems={menuItems} />
				<main className="rightpart w-full min-h-[100vh] float-left relative bg-[#f8f8f8] pl-[450px]">
					<div className="rightpart_in relative w-full float-left clear-both border-solid border-[#ebebeb] border-l min-h-[100vh]">
						{children}
					</div>
				</main>
				<Cursor />
			</div>
		</>
	);
}
