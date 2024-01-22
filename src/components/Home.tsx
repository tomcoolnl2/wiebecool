import * as React from 'react';
import { SectionContainer } from './SectionContainer';

const socialIcon = [
	// {
	// 	id: 1,
	// 	iconName: 'icon-facebook-squared',
	// 	link: 'https://www.facebook.com/',
	// },
	// {
	// 	id: 2,
	// 	iconName: 'icon-twitter-squared',
	// 	link: 'https://twitter.com/',
	// },
	// {
	// 	id: 3,
	// 	iconName: 'icon-behance-squared',
	// 	link: 'https://www.behance.net/',
	// },
	// {
	// 	id: 4,
	// 	iconName: 'icon-linkedin-squared',
	// 	link: 'https://www.linkedin.com/',
	// },
	{
		id: 5,
		iconName: 'icon-instagram-3',
		link: 'https://www.instagram.com/wiebecoolbeeldhouwer/',
	},
];

export const Home = () => {
	return (
		<SectionContainer name={'home'}>
			<div className="container">
				<div className="home_page w-full min-h-[100vh] clear-both flex items-center justify-center relative">
					<div className="home_content flex items-center">
						<div className="avatar min-w-[300px] min-h-[300px] relative rounded-full" data-type="circle">
							{' '}
							{/* data-type values are: "wave", "circle", "square"*/}
							<div
								className="image absolute inset-0 bg-no-repeat bg-center bg-cover"
								data-img-url="assets/img/_new/wiebe_cool_beeldhouwer.png"
							/>
						</div>
						<div className="details ml-[80px]">
							<h1 className="name font-extrabold uppercase mb-[14px]">
								Wiebe <span className="text-slate-300">Cool</span>
							</h1>
							<h2 className="subtitle">Welkom op mijn site!</h2>
							<p className="job font-montserrat font-medium max-w-[450px] mb-[25px]">
								Wanneer je meer wilt weten:
								<br />
								<a href="tel:0031628979316" target="_blank">
									0031628979316
								</a>
								<br />
								<br />
								Bezoekadres:
								<br />
								<a
									href="https://www.google.com/maps/place/Venkel+25,+8252+CH+Dronten,+Netherlands/"
									target="_blank"
								>
									Venkel 25, 8252 CH Dronten
								</a>
							</p>
							<nav className="social w-full float-left  mb-[25px]">
								<ul className="m-0 list-none">
									{socialIcon.map((item) => (
										<li key={item.id}>
											<a
												className="text-black text-[20px] transition-all duration-300 hover:text-black"
												href={item.link}
												target="_blank"
											>
												<i className={item.iconName} />
											</a>
										</li>
									))}
								</ul>
							</nav>
							<br />
							<p className="job font-montserrat font-medium max-w-[450px] mb-[25px]">
								Sinds eind 2022 ben ik lid van{' '}
								<a href="https://www.galeriedronten.nl/" target="_blank">
									Kunstvereniging Galerie Dronten
								</a>
								. Wij hebben als vereniging een prachtige gelerieruimte aan{' '}
								<a
									href="https://www.google.com/maps/place/De+Redepassage+6-8,+8254+KD+Dronten,+Netherlands/"
									target="_blank"
								>
									De Redepassage 6-8, 8252 HE
								</a>{' '}
								in het winkelcentrum van Dronten.
								<br />
								Daar staan altijd drie van mijn beelden.
								<br />
								<br />
								Wekelijks geopend op woensdag, donderdag, vrijdag en zaterdag van 10.00 tot 17.00 uur.
							</p>
						</div>
					</div>
				</div>
			</div>
		</SectionContainer>
	);
};
