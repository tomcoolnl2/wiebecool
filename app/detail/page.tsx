import * as React from 'react';
import { AppContext } from '@/components/context/Context';
import { SectionContainer } from '@/components/SectionContainer';
import { SectionTitle } from '@/components/SectionTitle';

const detailData = {
	id: 1,
	thumbnail: 'img/portfolio/wiebe_1.jpg',
	title: 'Wiebe Cool',
	text: ['Lipsum dolor et si amet.'],
	client: 'Wiebe Cool',
	date: 'October 22, 2022',
	category: 'Detail',
	share: [
		{
			id: 1,
			iconName: 'icon-facebook-squared',
			link: 'https://www.facebook.com/',
		},
		{
			id: 2,
			iconName: 'icon-twitter-squared',
			link: 'https://twitter.com/',
		},
		{
			id: 4,
			iconName: 'icon-linkedin-squared',
			link: 'https://www.linkedin.com/',
		},
	],
	bigImage: 'img/portfolio/wiebe_1.jpg',
	images: ['img/portfolio/wiebe_1.jpg', 'img/portfolio/wiebe_1.jpg'],
};

export default function DetailPage() {
	//
	return (
		<SectionContainer name={'detail'}>
			<div className="container">
				<div className="detail-page w-full h-auto clear-both float-left px-0 pt-[100px] pb-[40px]">
					<div className="section-title w-full h-auto clear-both float-left mb-[62px]">
						<div className="title_flex w-full h-auto clear-both flex justify-between items-end">
							<SectionTitle pageName={'Werk'} title={'Mijn Werk'} />
						</div>
					</div>
					<div className="popup_details">
						<div className="top_image">
							{/* THUMB */}
							<img src={detailData.thumbnail} alt="image" />
							<div
								className="main"
								style={{
									backgroundImage: `url(${detailData.thumbnail})`,
								}}
							/>
						</div>
						<div className="portfolio_main_title">
							<h3>{detailData.title}</h3>
							<span>{detailData.category}</span>
							<div />
						</div>
						<div className="main_details w-full h-auto clear-both flex mb-[90px]">
							<div className="textbox w-[70%] pr-[40px]">
								{detailData.text.map((text, i) => (
									<p className={detailData.text.length - 1 == i ? '' : 'mb-[20px]'} key={i}>
										{text}
									</p>
								))}
							</div>
							<div className="detailbox w-[30%] pl-[40px]">
								<ul className="list-none">
									<li className="mb-[8px] w-full float-left">
										<span className="first font-bold block text-black mb-[3px]">Client</span>
										<span>{detailData.client}</span>
									</li>
									<li className="mb-[8px] w-full float-left">
										<span className="first font-bold block text-black mb-[3px]">Category</span>
										<span>
											<a
												className="text-[#767676] transition-all duration-300 hover:text-black"
												href="#"
											>
												{detailData.category}
											</a>
										</span>
									</li>
									<li className="mb-[8px] w-full float-left">
										<span className="first font-bold block text-black mb-[3px]">Date</span>
										<span>{detailData.date}</span>
									</li>
									<li className="w-full float-left">
										<span className="first font-bold block text-black mb-[3px]">Share</span>
										<ul className="share list-none relative top-[7px]">
											{detailData.share.map((social) => (
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
												src={detailData.bigImage}
												alt="image"
											/>
											{/*  THUMB */}
											<div
												className="main absolute inset-0 bg-no-repeat bg-center bg-cover"
												style={{
													backgroundImage: `url(${detailData.bigImage})`,
												}}
											/>
										</div>
									</div>
								</li>
								{detailData.images.map((img, i) => (
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
				</div>
			</div>
		</SectionContainer>
	);
}
