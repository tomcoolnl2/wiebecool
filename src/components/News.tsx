import * as React from 'react';
import { SectionContainer } from './SectionContainer';
import { SectionTitle } from './SectionTitle';
import { ProductCards } from './product/ProductCards';
import { Product } from '../model';

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
		title: 'Why every photographer should shoot film, even in 2022',
		subtitle: 'Paola Atkins',
		image: 'assets/img/news/3.jpg',
		alt: 'Notenhout  €400,-',
	},
	{
		id: 4,
		title: 'Stay creative in lockdown with these fun photo projects',
		subtitle: 'Kevin Stone',
		image: 'assets/img/news/4.jpg',
		alt: 'Notenhout  €400,-',
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
