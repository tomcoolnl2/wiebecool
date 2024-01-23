'use client';
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

export default function Template({ children }: { children: React.ReactNode }) {
	//
	React.useEffect(() => {
		tokyo.dataImage();
		tokyo.imageToSvg();
		tokyo.customCursor();
	}, []);

	const { modal, serviceModal, productModal, portfolioDetailsModal } = React.useContext(AppContext);

	return (
		<AppProvider>
			<PreLoader />
			<MediaPopup />
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
		</AppProvider>
	);
}
