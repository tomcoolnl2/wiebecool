'use client';
import * as React from 'react';
import { AppContext } from '@/components/context/Context';
import { SectionContainer } from '@/components/SectionContainer';
import { SectionTitle } from '@/components/SectionTitle';

const detailData = [
	{
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
	},
	{
		id: 2,
		thumbnail: 'img/portfolio/wiebe_2.jpg',
		title: 'Wiebe Cool',
		text: ['Lorem Ipsum'],
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
		bigImage: 'img/portfolio/wiebe_2.jpg',
		images: ['img/portfolio/wiebe_2.jpg', 'img/portfolio/wiebe_2.jpg'],
	},
];

export default function Portfolio() {
	//
	const { setPortfolioDetailsModal } = React.useContext(AppContext);

	return (
		<SectionContainer name={'portfolio'}>
			<div className="container">
				<div className="portfolio-page w-full h-auto clear-both float-left px-0 pt-[100px] pb-[40px]">
					<div className="section-title w-full h-auto clear-both float-left mb-[62px]">
						<div className="title_flex w-full h-auto clear-both flex justify-between items-end">
							<SectionTitle pageName={'Werk'} title={'Mijn Portfolio'} />
						</div>
					</div>
					<div className="list_wrapper w-full h-auto clear-both float-left">
						<p className="mb-[22px]">
							Jaren geleden heb ik mijzelf het beeldhouwen aangeleerd, in een vakantie, midden tussen de
							fascinerende stenen van Bretagne. Naast Megalithische, Griekse en Keltische kunst vind ik
							ook veel inspiratie in oude kathedralen en middeleeuwse beelden. <br />
							<br />
							Overal vandaan neem ik stenen mee terug uit de streken die ik bezoek en dan leg ik er thuis
							de opgedane impressies in vast. Ook meer eigentijdse meesters zoals{' '}
							<a href="https://en.wikipedia.org/wiki/Auguste_Rodin" target="_blank">
								Rodin
							</a>
							,{' '}
							<a href="https://en.wikipedia.org/wiki/Barbara_Hepworth" target="_blank">
								Barbara Hebworth
							</a>{' '}
							of{' '}
							<a href="https://en.wikipedia.org/wiki/Henry_Moore" target="_blank">
								Henry Moore
							</a>{' '}
							vind ik ongelooflijk mooi en inspirerend. In musea kijk ik vooral naar de beeldende kunst en
							loop ik er het liefst een paar keer omheen, op zoek naar de schoonheid in het stuk steen of
							hout.
							<br />
							<br />
						</p>
						<ul className="portfolio_list gallery_zoom ml-[-40px] list-none">
							<li className="image mb-[40px] float-left w-1/3 pl-[40px] item__">
								<div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
									<div
										className="entry w-full min-h-[420px]"
										data-title="Teresa Butler"
										data-category="Image"
									>
										<a
											className="popup_info"
											href="#"
											onClick={() => setPortfolioDetailsModal(detailData[0])}
										>
											<img
												className="opacity-0 absolute min-w-full"
												src="img/portfolio/wiebe_1.jpg" //THUMB
												alt="image"
											/>
											<div
												className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
												style={{
													backgroundImage: `url(img/portfolio/wiebe_1.jpg)`,
												}}
											/>
										</a>
									</div>
								</div>
							</li>
							<li className="image mb-[40px] float-left w-1/3 pl-[40px] item__">
								<div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
									<div
										className="entry w-full min-h-[420px]"
										data-title="Ashley Flores"
										data-category="Image"
									>
										<a
											className="popup_info"
											href="#"
											onClick={() => setPortfolioDetailsModal(detailData[0])}
										>
											<img
												className="opacity-0 absolute min-w-full"
												src="img/portfolio/wiebe_2.jpg" //THUMB
												alt="image"
											/>
											<div
												className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
												style={{
													backgroundImage: `url(img/portfolio/wiebe_2.jpg)`,
												}}
											/>
										</a>
									</div>
								</div>
							</li>
							<li className="image mb-[40px] float-left w-1/3 pl-[40px] item__">
								<div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
									<div
										className="entry w-full min-h-[420px]"
										data-title="Wiebe Cool"
										data-category="Image"
									>
										<a
											className="popup_info"
											href="#"
											onClick={() => setPortfolioDetailsModal(detailData[0])}
										>
											<img
												className="opacity-0 absolute min-w-full"
												src="img/portfolio/wiebe_3.jpg" //THUMB
												alt="image"
											/>
											<div
												className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
												style={{
													backgroundImage: `url(img/portfolio/wiebe_3.jpg)`,
												}}
											/>
										</a>
									</div>
								</div>
							</li>
							<li className="image mb-[40px] float-left w-1/3 pl-[40px] item__">
								<div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
									<div
										className="entry w-full min-h-[420px]"
										data-title="Wiebe Cool"
										data-category="Image"
									>
										<a
											className="popup_info"
											href="#"
											onClick={() => setPortfolioDetailsModal(detailData[0])}
										>
											<img
												className="opacity-0 absolute min-w-full"
												src="img/portfolio/wiebe_4.jpg" //THUMB
												alt="image"
											/>
											<div
												className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
												style={{
													backgroundImage: `url(img/portfolio/wiebe_4.jpg)`,
												}}
											/>
										</a>
									</div>
								</div>
							</li>
							<li className="detail mb-[40px] float-left w-1/3 pl-[40px] item__">
								<div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
									<div
										className="entry w-full min-h-[420px]"
										data-title="Wiebe Cool"
										data-category="Detail"
									>
										<a
											className="popup_info"
											href="#"
											onClick={() => setPortfolioDetailsModal(detailData[0])}
										>
											<img
												className="opacity-0 absolute min-w-full"
												src="img/portfolio/wiebe_5.jpg" //THUMB
												alt="image"
											/>
											<div
												className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
												style={{
													backgroundImage: `url(img/portfolio/wiebe_5.jpg)`,
												}}
											/>
										</a>
									</div>
								</div>
							</li>
							<li className="detail mb-[40px] float-left w-1/3 pl-[40px] item__">
								<div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
									<div
										className="entry w-full min-h-[420px]"
										data-title="Wiebe Cool"
										data-category="Detail"
									>
										<a
											className="popup_info"
											href="#"
											onClick={() => setPortfolioDetailsModal(detailData[0])}
										>
											<img
												className="opacity-0 absolute min-w-full"
												src="img/portfolio/wiebe_6.jpg" //THUMB
												alt="image"
											/>
											<div
												className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
												style={{
													backgroundImage: `url(img/portfolio/wiebe_6.jpg)`,
												}}
											/>
										</a>
									</div>
								</div>
							</li>
							<li className="detail mb-[40px] float-left w-1/3 pl-[40px] item__">
								<div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
									<div
										className="entry w-full min-h-[420px]"
										data-title="Wiebe Cool"
										data-category="Detail"
									>
										<a
											className="popup_info"
											href="#"
											onClick={() => setPortfolioDetailsModal(detailData[0])}
										>
											<img
												className="opacity-0 absolute min-w-full"
												src="img/portfolio/blanca.jpg" //THUMB
												alt="image"
											/>
											<div
												className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
												style={{
													backgroundImage: `url(img/portfolio/blanca.jpg)`,
												}}
											/>
										</a>
									</div>
								</div>
							</li>
							<li className="detail mb-[40px] float-left w-1/3 pl-[40px] item__">
								<div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
									<div
										className="entry w-full min-h-[420px]"
										data-title="Wiebe Cool"
										data-category="Detail"
									>
										<a
											className="popup_info"
											href="#"
											onClick={() => setPortfolioDetailsModal(detailData[0])}
										>
											<img
												className="opacity-0 absolute min-w-full"
												src="img/portfolio/blauwe_janus.jpg" //THUMB
												alt="image"
											/>
											<div
												className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
												style={{
													backgroundImage: `url(img/portfolio/blauwe_janus.jpg)`,
												}}
											/>
										</a>
									</div>
								</div>
							</li>
							<li className="detail mb-[40px] float-left w-1/3 pl-[40px] item__">
								<div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
									<div
										className="entry w-full min-h-[420px]"
										data-title="Wiebe Cool"
										data-category="Detail"
									>
										<a
											className="popup_info"
											href="#"
											onClick={() => setPortfolioDetailsModal(detailData[0])}
										>
											<img
												className="opacity-0 absolute min-w-full"
												src="img/portfolio/demeter.jpg" //THUMB
												alt="image"
											/>
											<div
												className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
												style={{
													backgroundImage: `url(img/portfolio/demeter.jpg)`,
												}}
											/>
										</a>
									</div>
								</div>
							</li>
							<li className="detail mb-[40px] float-left w-1/3 pl-[40px] item__">
								<div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
									<div
										className="entry w-full min-h-[420px]"
										data-title="Wiebe Cool"
										data-category="Detail"
									>
										<a
											className="popup_info"
											href="#"
											onClick={() => setPortfolioDetailsModal(detailData[0])}
										>
											<img
												className="opacity-0 absolute min-w-full"
												src="img/portfolio/sanne.jpg" //THUMB
												alt="image"
											/>
											<div
												className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
												style={{
													backgroundImage: `url(img/portfolio/sanne.jpg)`,
												}}
											/>
										</a>
									</div>
								</div>
							</li>
							<li className="detail mb-[40px] float-left w-1/3 pl-[40px] item__">
								<div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
									<div
										className="entry w-full min-h-[420px]"
										data-title="Wiebe Cool"
										data-category="Detail"
									>
										<a
											className="popup_info"
											href="#"
											onClick={() => setPortfolioDetailsModal(detailData[0])}
										>
											<img
												className="opacity-0 absolute min-w-full"
												src="img/portfolio/maria_magdalena.jpg" //THUMB
												alt="image"
											/>
											<div
												className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
												style={{
													backgroundImage: `url(img/portfolio/maria_magdalena.jpg)`,
												}}
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
}
