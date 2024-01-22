import * as React from 'react';
import { AppContext } from '../Context';
import { tokyo } from '../utils';
import { SectionContainer } from './SectionContainer';

const detailData = [
	{
		id: 1,
		thumbnail: 'assets/img/portfolio/7.jpg',
		title: 'Selena Gomez',
		text: [
			'We live in a world where we need to move quickly and iterate on our ideas as flexibly as possible. Building mockups strikes the ideal balance between true-life representation of the end product and ease of modification.',
			"Mockups are useful both for the creative phase of the project - for instance when you're trying to figure out your user flows or the proper visual hierarchy - and the production phase when they will represent the target product. Making mockups a part of your creative and development process allows you to quickly and easily ideate.",
		],
		client: 'Alvaro Morata',
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
				id: 3,
				iconName: 'icon-behance-squared',
				link: 'https://www.behance.net/',
			},
			{
				id: 4,
				iconName: 'icon-linkedin-squared',
				link: 'https://www.linkedin.com/',
			},
		],
		bigImage: 'assets/img/portfolio/1.jpg',
		images: ['assets/img/portfolio/2.jpg', 'assets/img/portfolio/3.jpg'],
	},
	{
		id: 2,
		thumbnail: 'assets/img/portfolio/8.jpg',
		title: 'Ave Simone',
		text: [
			'We live in a world where we need to move quickly and iterate on our ideas as flexibly as possible. Building mockups strikes the ideal balance between true-life representation of the end product and ease of modification.',
			"Mockups are useful both for the creative phase of the project - for instance when you're trying to figure out your user flows or the proper visual hierarchy - and the production phase when they will represent the target product. Making mockups a part of your creative and development process allows you to quickly and easily ideate.",
		],
		client: 'Alvaro Morata',
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
				id: 3,
				iconName: 'icon-behance-squared',
				link: 'https://www.behance.net/',
			},
			{
				id: 4,
				iconName: 'icon-linkedin-squared',
				link: 'https://www.linkedin.com/',
			},
		],
		bigImage: 'assets/img/portfolio/1.jpg',
		images: ['assets/img/portfolio/2.jpg', 'assets/img/portfolio/3.jpg'],
	},
];

export const Portfolio = () => {
	//
	React.useEffect(() => {
		tokyo.portfolioHover();
		tokyo.dataImage();
	}, []);

	const { setPortfolioDetailsModal, modalToggle } = React.useContext(AppContext);

	return (
		<SectionContainer name={'portfolio'}>
			<div className="container">
				<div className="tokyo_tm_portfolio w-full h-auto clear-both float-left px-0 pt-[100px] pb-[40px]">
					<div className="list_wrapper w-full h-auto clear-both float-left">
						<ul className="portfolio_list gallery_zoom ml-[-40px] list-none">
							<li className="vimeo mb-[40px] float-left w-1/3 pl-[40px] item__">
								<div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
									<div
										className="entry tokyo_tm_portfolio_animation_wrap"
										data-title="Teresa Butler"
										data-category="Vimeo"
									>
										<a className="popup-vimeo" href="https://vimeo.com/337293658">
											<img
												className="opacity-0 min-w-full"
												src="assets/img/thumbs/1-1.jpg"
												alt="image"
											/>
											<div
												className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
												data-img-url="assets/img/portfolio/5.jpg"
											/>
										</a>
									</div>
								</div>
							</li>
							<li className="youtube mb-[40px] float-left w-1/3 pl-[40px] item__">
								<div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
									<div
										className="entry tokyo_tm_portfolio_animation_wrap"
										data-title="Ashley Flores"
										data-category="Youtube"
									>
										<a className="popup-youtube" href="https://www.youtube.com/watch?v=7e90gBu4pas">
											<img
												className="opacity-0 min-w-full"
												src="assets/img/thumbs/1-1.jpg"
												alt="image"
											/>
											<div
												className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
												data-img-url="assets/img/portfolio/6.jpg"
											/>
										</a>
									</div>
								</div>
							</li>
							<li className="soundcloud mb-[40px] float-left w-1/3 pl-[40px] item__">
								<div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
									<div
										className="entry tokyo_tm_portfolio_animation_wrap"
										data-title="Derek Smith"
										data-category="Soundcloud"
									>
										<a
											className="soundcloude_link mfp-iframe audio"
											href="https://w.soundcloud.com/player/?visual=true&url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F159967086&show_artwork=true&maxwidth=1020&maxheight=1000&auto_play=1"
										>
											<img
												className="opacity-0 min-w-full"
												src="assets/img/thumbs/1-1.jpg"
												alt="image"
											/>
											<div
												className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
												data-img-url="assets/img/portfolio/4.jpg"
											/>
										</a>
									</div>
								</div>
							</li>
							<li className="image mb-[40px] float-left w-1/3 pl-[40px] item__">
								<div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
									<div
										className="entry tokyo_tm_portfolio_animation_wrap"
										data-title="Gloria Jenkins"
										data-category="Image"
									>
										<a className="zoom" href="assets/img/portfolio/3.jpg">
											<img
												className="opacity-0 min-w-full"
												src="assets/img/thumbs/1-1.jpg"
												alt="image"
											/>
											<div
												className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
												data-img-url="assets/img/portfolio/3.jpg"
											/>
										</a>
									</div>
								</div>
							</li>
							<li className="detail mb-[40px] float-left w-1/3 pl-[40px] item__">
								<div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
									<div
										className="entry tokyo_tm_portfolio_animation_wrap"
										data-title="Selena Gomez"
										data-category="Detail"
									>
										<a
											className="popup_info"
											href="#"
											onClick={() => {
												setPortfolioDetailsModal(detailData[0]);
												modalToggle(true);
											}}
										>
											<img
												className="opacity-0 min-w-full"
												src="assets/img/thumbs/1-1.jpg"
												alt="image"
											/>
											<div
												className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
												data-img-url="assets/img/portfolio/7.jpg"
											/>
										</a>
									</div>
								</div>
							</li>
							<li className="detail mb-[40px] float-left w-1/3 pl-[40px] item__">
								<div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
									<div
										className="entry tokyo_tm_portfolio_animation_wrap"
										data-title="Ave Simone"
										data-category="Detail"
									>
										<a
											className="popup_info"
											href="#"
											onClick={() => {
												setPortfolioDetailsModal(detailData[1]);
												modalToggle(true);
											}}
										>
											<img
												className="opacity-0 min-w-full"
												src="assets/img/thumbs/1-1.jpg"
												alt="image"
											/>
											<div
												className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
												data-img-url="assets/img/portfolio/8.jpg"
											/>
										</a>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</SectionContainer>
	);
};
