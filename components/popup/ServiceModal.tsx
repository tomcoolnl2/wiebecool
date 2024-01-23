import * as React from 'react';
import { AppContext } from '@/context/Context';
import { ModalContainer } from './ModalContainer';
import { ServiceModal } from '../../model';

export const ServiceModalComponent: React.FC = () => {
	//
	const { serviceModal, setServiceModal } = React.useContext(AppContext);

	if (!serviceModal) {
		return null;
	}

	return (
		<ModalContainer<ServiceModal> nullValue={setServiceModal}>
			<div className="service_popup_informations w-full h-auto clear-both float-left">
				<div className="image">
					<img src="assets/img/thumbs/4-2.jpg" alt="" width={undefined} />
					<div
						className="main"
						data-img-url={serviceModal.image}
						style={{ backgroundImage: `url(${serviceModal.image})` }}
					/>
				</div>
				<div className="main_title">
					<h3>{serviceModal.name}</h3>
				</div>
				<div className="descriptions w-full float-left">
					{serviceModal.text.map((text, i) => (
						<p className={serviceModal.text.length - 1 == i ? '' : 'mb-[15px]'} key={i}>
							{text}
						</p>
					))}
				</div>
			</div>
		</ModalContainer>
	);
};
