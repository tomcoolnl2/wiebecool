'use client';
import * as React from 'react';
import { tokyo } from '@/lib/utils';
import { AppContext } from '@/context/Context';
import { Cursor } from '@/components/Cursor';
import { Mobile } from '@/components/Mobile';
import { Sidebar } from '@/components/Sidebar';
import { PreLoader } from '@/components/PreLoader';
import { ImageView } from '@/components/popup/ImageView';
import { ProductDetailComponent } from '@/components/popup/ProductDetailModal';
import { ServiceModalComponent } from '@/components/popup/ServiceModal';
import { DetailsModalComponent } from '@/components/popup/DetailsModal';

export default function Template({ children }: { children: React.ReactNode }) {
	//
	React.useEffect(() => {
		tokyo.dataImage();
		tokyo.imageToSvg();
		tokyo.customCursor();
	}, []);

	const { modal, serviceModal, productModal, portfolioDetailsModal } = React.useContext(AppContext);

	React.useEffect(() => {
		console.log(modal, serviceModal, productModal, portfolioDetailsModal);
	}, [modal, serviceModal, productModal, portfolioDetailsModal]);

	return (
		<>
			<PreLoader />
			<ImageView />
			{modal && serviceModal && <ServiceModalComponent />}
			{modal && productModal && <ProductDetailComponent />}
			{modal && portfolioDetailsModal && <DetailsModalComponent />}
			<div className="tokyo_tm_all_wrap">
				<Mobile />
				<Sidebar />
				<div className="rightpart w-full min-h-[100vh] float-left relative bg-[#f8f8f8] pl-[450px]">
					<div className="rightpart_in relative w-full float-left clear-both border-solid border-[#ebebeb] border-l min-h-[100vh]">
						{children}
					</div>
				</div>
				<Cursor />
			</div>
		</>
	);
}
