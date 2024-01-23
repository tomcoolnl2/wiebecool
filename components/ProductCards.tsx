import * as React from 'react';
import Image from 'next/image';
import { Product } from '@/model';
import { AppContext } from '@/context/Context';

export const ProductCards: React.FC<{ products: Product[] }> = ({ products }) => {
	//
	const { setProductModal } = React.useContext(AppContext);

	return (
		<ul className="product-cards list-none">
			{products.map((item: Product) => (
				<li className="mb-[50px] float-left w-1/2 pl-[50px]" key={item.id}>
					<div className="list_inner w-full clear-both float-left h-auto relative">
						<div className="image relative overflow-hidden">
							<Image className="min-w-full" src={`/${item.image}`} alt="image" width={420} height={262} />
							<a className="product-cards-full-link" href="#" onClick={() => setProductModal(item)} />
						</div>
						<div className="details w-full float-left px-[40px] pt-[30px] pb-[25px] bg-white transition-all duration-300">
							<h3 className="title mb-[10px] leading-[1.4]">
								<a
									className="text-black text-[18px] font-semibold inline-block transition-all duration-300 hover:text-black"
									href="#"
									onClick={() => setProductModal(item)}
								>
									{item.title}
								</a>
							</h3>
							<div className="extra flex items-center justify-between mb-[25px] relative">
								<p className="date font-montserrat text-[13px] text-[#767676]">
									<a
										className="text-[#767676] transition-all duration-300 hover:text-black"
										href="#"
										onClick={() => setProductModal(item)}
									>
										{item.subtitle}
									</a>
								</p>
							</div>

							<div className="tokyo_tm_read_more">
								<a href="#" onClick={() => setProductModal(item)}>
									<span>Read More</span>
								</a>
							</div>
						</div>
					</div>
				</li>
			))}
		</ul>
	);
};
