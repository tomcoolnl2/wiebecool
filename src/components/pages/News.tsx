import * as React from 'react';
import { SectionContainer } from '../SectionContainer';
import { SectionTitle } from '../SectionTitle';
import { ProductCards } from '../ProductCards';
import { Product } from '../../model';

const products: Product[] = [
	{
		id: 1,
		title: 'HOOP',
		subtitle: 'Notenhout  €400,-',
		image: 'assets/img/_new/products/hoop-wiebe-cool-beeldhouwer.jpeg',
		alt: 'Notenhout  €400,-',
	},
	{
		id: 2,
		title: 'DE LACHENDE ENGEL',
		subtitle: 'Naar de lachende engel van de kathedraal in Reims  - Frans zandsteen  €325,-',
		image: 'assets/img/_new/products/lachende-engel-wiebe-cool-beeldhouwer.jpeg',
		alt: 'Notenhout  €400,-',
	},
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

export const News = () => {
	return (
		<SectionContainer name={'news'}>
			<div className="container">
				<div className="tokyo_tm_news w-full clear-both float-left h-auto pt-[100px] px-0 pb-[45px]">
					<div className="tokyo_tm_title w-full h-auto clear-both float-left mb-[62px]">
						<div className="title_flex w-full h-auto clear-both flex justify-between items-end">
							<SectionTitle pageName={'News'} title={'Latest News'} />
						</div>
					</div>
					<ProductCards products={products} />
				</div>
			</div>
		</SectionContainer>
	);
};
