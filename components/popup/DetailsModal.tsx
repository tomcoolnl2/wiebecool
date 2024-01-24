import * as React from 'react';
import { PortfolioItem } from '@/model';
import { AppContext } from '@/context/Context';
import { ModalContainer } from './ModalContainer';

export const DetailsModalComponent: React.FC = () => {
	//
	const { portfolioDetailsModal, setPortfolioDetailsModal } = React.useContext(AppContext);

	if (!portfolioDetailsModal) {
		return null;
	}

	return (
		<ModalContainer<PortfolioItem> nullValue={setPortfolioDetailsModal}>
			<div className="popup_details">
				<div className="top_image">
					{/* THUMB */}
					<img src={portfolioDetailsModal.thumbnail} alt="image" />
					<div
						className="main"
						data-img-url={portfolioDetailsModal.thumbnail}
						style={{
							backgroundImage: `url(${portfolioDetailsModal.thumbnail})`,
						}}
					/>
				</div>
				<div className="portfolio_main_title">
					<h3>{portfolioDetailsModal.title}</h3>
					<span>{portfolioDetailsModal.category}</span>
					<div />
				</div>
				<div className="main_details w-full h-auto clear-both flex mb-[90px]">
					<div className="textbox w-[70%] pr-[40px]">
						{portfolioDetailsModal.text.map((text, i) => (
							<p className={portfolioDetailsModal.text.length - 1 == i ? '' : 'mb-[20px]'} key={i}>
								{text}
							</p>
						))}
					</div>
					<div className="detailbox w-[30%] pl-[40px]">
						<ul className="list-none">
							<li className="mb-[8px] w-full float-left">
								<span className="first font-bold block text-black mb-[3px]">Client</span>
								<span>{portfolioDetailsModal.client}</span>
							</li>
							<li className="mb-[8px] w-full float-left">
								<span className="first font-bold block text-black mb-[3px]">Category</span>
								<span>
									<a className="text-[#767676] transition-all duration-300 hover:text-black" href="#">
										{portfolioDetailsModal.category}
									</a>
								</span>
							</li>
							<li className="mb-[8px] w-full float-left">
								<span className="first font-bold block text-black mb-[3px]">Date</span>
								<span>{portfolioDetailsModal.date}</span>
							</li>
							<li className="w-full float-left">
								<span className="first font-bold block text-black mb-[3px]">Share</span>
								<ul className="share list-none relative top-[7px]">
									{portfolioDetailsModal.share.map((social) => (
										<li className="mr-[10px] inline-block" key={social.id}>
											<a className="text-black text-[18px]" href={social.link}>
												<i className={social.iconName} />
											</a>
										</li>
									))}
								</ul>
							</li>
						</ul>
					</div>
				</div>
				<div className="additional_images w-full h-auto clear-both float-left">
					<ul className="ml-[-30px] list-none">
						<li className="mb-[30px] float-left w-1/2 pl-[30px]">
							<div className="list_inner w-full h-auto clear-both float-left relative">
								<div className="my_image relative">
									<img
										className="opacity-0 min-w-full"
										src={portfolioDetailsModal.bigImage}
										alt="image"
									/>
									{/*  THUMB */}
									<div
										className="main absolute inset-0 bg-no-repeat bg-center bg-cover"
										data-img-url={portfolioDetailsModal.bigImage}
										style={{
											backgroundImage: `url(${portfolioDetailsModal.bigImage})`,
										}}
									/>
								</div>
							</div>
						</li>
						{portfolioDetailsModal.images.map((img, i) => (
							<li key={i} className="mb-[30px] float-left w-1/2 pl-[30px]">
								<div className="list_inner w-full h-auto clear-both float-left relative">
									<div className="my_image relative">
										<img
											className="opacity-0 min-w-full"
											src={img} // THUMB
											alt="image"
										/>
										<div
											className="main absolute inset-0 bg-no-repeat bg-center bg-cover"
											data-img-url={img}
											style={{
												backgroundImage: `url(${img})`,
											}}
										/>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</ModalContainer>
	);
};

export default DetailsModalComponent;
