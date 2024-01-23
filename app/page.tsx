'use client';
import * as React from 'react';
import { SectionContainer } from '@/components/SectionContainer';
import { ContactDetails } from '@/components/ContactDetails';
import { SocialMediaLinks } from '@/components/SocialMediaLinks';

export default function Home() {
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
								data-img-url="img/wiebe_cool_beeldhouwer.png"
							/>
						</div>
						<div className="details ml-[80px]">
							<h1 className="name font-extrabold uppercase mb-[14px]">
								Wiebe <span className="text-slate-300">Cool</span>
							</h1>
							<h2 className="subtitle mb-[11px]">Welkom op mijn site</h2>
							<p className="job font-montserrat font-medium max-w-[450px] mb-[25px] border-solid border-[#DFDFDF] border-b pb-[31px]">
								Sinds eind 2022 ben ik lid van{' '}
								<a href="https://www.galeriedronten.nl/" target="_blank">
									Kunstvereniging Galerie Dronten
								</a>
								.
								<br />
								Wij hebben als vereniging een prachtige{' '}
								<a
									href="https://www.google.com/maps/place/De+Redepassage+6-8,+8254+KD+Dronten,+Netherlands/"
									target="_blank"
								>
									gelerieruimte
								</a>{' '}
								in het winkelcentrum van Dronten.
								<br />
								Daar staan altijd drie van mijn beelden.
								<br />
								<br />
								<a
									href="https://www.galeriedronten.nl/contact#:~:text=info%40galeriedronten.nl-,Openingstijden,-woensdag%20t/m"
									target="_blank"
								>
									Wekelijks geopend
								</a>{' '}
								op woensdag, donderdag, vrijdag en zaterdag van 10.00 tot 17.00 uur.
							</p>
							<SocialMediaLinks />
							<br />
							<ContactDetails />
						</div>
					</div>
				</div>
			</div>
		</SectionContainer>
	);
}
