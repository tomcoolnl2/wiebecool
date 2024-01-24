'use client';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { MenuItem } from '@/model';
import { AppContext } from '@/context/Context';
import { Cursor } from '@/components/Cursor';
import { Mobile } from '@/components/Mobile';
import { Sidebar } from '@/components/Sidebar';
import { PreLoader } from '@/components/PreLoader';

const ProductDetailComponent = dynamic(() => import('@/components/popup/ProductDetailModal'), { ssr: false });
const DetailsModalComponent = dynamic(() => import('@/components/popup/DetailsModal'), { ssr: false });

const menuItems: MenuItem[] = [
	{ id: 1, name: 'Home', href: '/' },
	{ id: 2, name: 'Missie', href: '/about' },
	{ id: 3, name: 'Werk', href: '/portfolio' },
	{ id: 4, name: 'Contact', href: '/contact' },
];

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
	//
	const { modal, productModal, portfolioDetailsModal } = React.useContext(AppContext);
	return (
		<>
			<PreLoader />
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
