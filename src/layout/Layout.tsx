import * as React from 'react';
import { tokyo } from '../utils';
import { AppContext } from '../Context';
import { Cursor } from '../layout/Cursor';
import { Mobile } from '../layout/Mobile';
import { Sidebar } from '../layout/Sidebar';
import { ImageView } from '../components/popup/ImageView';
import { MediaPopup } from '../components/popup/MediaPopup';
import { ProductDetailComponent } from '../components/popup/ProductDetailModal';
import { ServiceModalComponent } from '../components/popup/ServiceModal';
import { DetailsModalComponent } from '../components/popup/DetailsModal';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	//
	React.useEffect(() => {
		tokyo.dataImage();
		tokyo.imageToSvg();
		tokyo.customCursor();
	}, []);

	const { modal, serviceModal, productModal, portfolioDetailsModal } = React.useContext(AppContext);

	return (
		<>
			<MediaPopup />
			<ImageView />
			{modal && serviceModal && <ServiceModalComponent />}
			{modal && productModal && <ProductDetailComponent />}
			{modal && portfolioDetailsModal && <DetailsModalComponent />}
			<div className="tokyo_tm_all_wrap">
				{/* <div id="preloader">
					<div className="loader_line" />
				</div> */}
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
};
