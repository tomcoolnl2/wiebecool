import dynamic from 'next/dynamic';
import * as React from 'react';
import { Cursor } from '@/components/page/Cursor';
import { Sidebar } from '@/components/page/Sidebar';
import { PreLoader } from '@/components/PreLoader';
import { TopBar } from '@/components/page/TopBar';
import { Footer } from './Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
	//
	const [mobileNavigationIsOpen, openMobileNavigation] = React.useState<boolean>(false);

	return (
		<>
			<PreLoader />
			<div className="site-wrapper">
				<TopBar mobileNavigationIsOpen={mobileNavigationIsOpen} openMobileNavigation={openMobileNavigation} />
				<Sidebar mobileNavigationIsOpen={mobileNavigationIsOpen} openMobileNavigation={openMobileNavigation} />
				<main className="main-content w-full min-h-[100vh] float-left relative bg-[#f8f8f8]">
					<div className="main-content-in relative w-full float-left clear-both border-solid border-[#ebebeb] border-l min-h-[100vh]">
						{children}
					</div>
				</main>
				<Footer />
				<Cursor />
			</div>
		</>
	);
}
