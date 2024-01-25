import * as React from 'react';
import { AppContext } from '@/components/context/Context';
import { Product } from '@/model';
import { ModalContainer } from './ModalContainer';

const ProductDetailComponent: React.FC = () => {
	//
	const { productModal, setProductModal } = React.useContext(AppContext);

	if (!productModal) {
		return null;
	}

	return (
		<ModalContainer<Product> nullValue={setProductModal}>
			<div className="image relative overflow-hidden">
				<img className="min-w-full" src={productModal.image} alt="image" />
				<a className="product-cards-full-link" href="#" />
			</div>
			<div className="details w-full float-left px-[40px] pt-[30px] pb-[25px] bg-white transition-all duration-300">
				<div className="extra flex items-center justify-between mb-[25px] relative">
					<div className="short date font-montserrat text-[13px] text-[#767676]">
						<h3 className="title mb-[10px] leading-[1.4]">{productModal.title}</h3>
					</div>
				</div>
				<p className="text-[#767676] transition-all duration-300 hover:text-black">{productModal.subtitle}</p>
			</div>
		</ModalContainer>
	);
};

export default ProductDetailComponent;
