'use client';
import * as React from 'react';
import { SectionContainer } from '../../src/components/SectionContainer';
import { SectionTitle } from '../../src/components/SectionTitle';
import { ProductCards } from '../../src/components/ProductCards';
import { ContactDetails } from '../../src/components/ContactDetails';
import { Product } from '../../src/model';

const products1: Product[] = [
	{
		id: 1,
		title: 'HOOP',
		subtitle: 'Notenhout  €400,-',
		image: 'assets/img/_new/products/hoop-wiebe-cool-beeldhouwer.jpeg',
		alt: 'HOOP - Wiebe Cool Beeldhouwer',
	},
	{
		id: 2,
		title: 'DE LACHENDE ENGEL',
		subtitle: 'Naar de lachende engel van de kathedraal in Reims  - Frans zandsteen  €325,-',
		image: 'assets/img/_new/products/lachende-engel-wiebe-cool-beeldhouwer.jpeg',
		alt: 'DE LACHENDE ENGEL - Wiebe Cool Beeldhouwer',
	},
];

const products2: Product[] = [
	{
		id: 3,
		title: 'DE ORKNEY FAMILY',
		subtitle:
			'Een prachtig compact stuk zwarte limestone gevonden op het strand van een van de Orkney eilanden, Schotland. Na noeste arbeid ontstond de  Orkney familie; Vader, moeder, kind. Gestileerd , abstract. De voet is een afgebroken, middeleeuwse  kerktegel uit de omgeving van Kampen, vol sporen uit het verleden. € 475,-',
		image: 'assets/img/_new/products/orkney-familie-wiebe-cool-beeldhouwer.jpeg',
		alt: 'DE ORKNEY FAMILY - Wiebe Cool Beeldhouwer',
	},
	{
		id: 4,
		title: 'PIM',
		subtitle:
			'Dagelijks ontvangt deze Pim, zelf gegoten in brons, het daglicht en de zonneschijn in grote dankbaarheid! ',
		image: 'assets/img/_new/products/pim-wiebe-cool-beeldhouwer.jpeg',
		alt: 'PIM - Wiebe Cool Beeldhouwer',
	},
];

export default function About() {
	return (
		<SectionContainer name={'about'}>
			<div className="container">
				<div className="tokyo_tm_about w-full h-auto clear-both float-left py-[100px] px-0">
					<div className="tokyo_tm_title w-full h-auto clear-both float-left mb-[62px]">
						<div className="title_flex w-full h-auto clear-both flex justify-between items-end">
							<SectionTitle pageName={'Over mij'} title={'Mijn missie'} />
						</div>
					</div>
					<div className="author-image w-full h-auto clear-both float-left relative mb-[35px]">
						<img
							className="min-w-full"
							src="assets/img/_new/werkplaats.png"
							alt="Wiebe Cool Beeldhouwer Werkplaats"
						/>
					</div>
					<div className="about_title w-full h-auto clear-both float-left border-solid border-[#DFDFDF] border-b pb-[20px] mb-[30px]">
						<h3 className="text-[22px] font-bold">
							Wiebe Cool <span>(1950)</span>
						</h3>
						<span>Beeldhouwer</span>
					</div>
					<div className="about_text w-full h-auto clear-both float-left border-solid border-[#DFDFDF] border-b pb-[31px] mb-[30px]">
						<h4 className="mb-[22px]">Over beelden in steen en hout:</h4>
						<p className="mb-[11px]">
							<q>
								Keer op keer ervaar ik het als een uitdaging om een stuk steen of 'dood' hout tot leven
								te wekken, zo te bewerken dat het gaat spreken, dat het een beeld wordt dat een ander
								raakt. Ik vind het machtig om aardse materie om te zetten in een bezield beeld.
							</q>
						</p>
						<p className="mb-[11px]">
							Vele reizen door Europa voerden me langs Megalithische, Griekse en Romeinse beelden en
							bouwwerken, Keltische en middeleeuwse kunst en een groot aantal kathedralen. Inspirerende
							reizen naar inspirerende plekken waarvan ik impressies vastlegde in mijn beelden.
						</p>
					</div>
					<ProductCards products={products1} />
					<div className="about_text w-full h-auto clear-both float-left pb-[31px] mb-[30px]">
						<p className="mb-[11px]">
							Overal vandaan sleep ik stenen mee naar huis en leg daarin de opgedane indrukken vast.
							Meesters zoals Rodin, Barbara Hepworth of Henry Moore boeien me zeer. Deze beeldhouwers
							hebben ongelooflijk mooi werk nagelaten dat mij meerdere keren al heeft geïnspireerd.
						</p>
						<p className="mb-[22px]">
							De laatste tijd werk ik het liefst in steen, maar ook hout- en bronswerk heb ik in het
							verleden uitgebreid verkend. Abstract of figuratief werken; beiden doe ik graag. In de loop
							der jaren heb ik een voorliefde ontwikkeld voor impressionistische portretten. (zie{' '}
							<a href="#portfolio">werk/portretten</a>)
						</p>
						<q className="mb-[22px]">
							In musea kijk ik vooral naar beelden en dan loop ik er het liefst een paar keer omheen, op
							zoek naar schoonheid in steen, brons of hout.
						</q>
					</div>
					<ProductCards products={products2} />
					<div className="about_text w-full h-auto clear-both float-left border-solid border-[#DFDFDF] border-b pb-[31px] mb-[30px]">
						<p className="mb-[11px]">
							Nadere kennismaking voor een opdracht kan telefonisch of via mijn{' '}
							<a href="#contact">e-mailadres</a>, graag nodig ik mensen uit om langs te komen in Dronten
							om te kijken wat er allemaal staat en om een en ander nader te bespreken.
						</p>
					</div>
					<div className="about_text w-full h-auto clear-both float-left pb-[31px] mb-[30px]">
						<ContactDetails />
					</div>
				</div>
			</div>
		</SectionContainer>
	);
}
