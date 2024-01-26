import Image from 'next/image';
import { Metadata } from 'next';
import * as React from 'react';
import { Product } from '@/model';
import { parseSeoMetaDataQuery } from '@/lib/utils';
import { fetchContentfulData } from '@/lib/api';
import { SectionContainer } from '@/components/page/SectionContainer';
import { SectionTitle } from '@/components/page/SectionTitle';
import { ContactDetails } from '@/components/ContactDetails';
import { RenderComponent, type RenderComponentItem } from '@/components/hoc/RenderComponent';

const products2: Product[] = [
	{
		id: 3,
		title: 'DE ORKNEY FAMILY',
		subtitle:
			'Een prachtig compact stuk zwarte limestone gevonden op het strand van een van de Orkney eilanden, Schotland. Na noeste arbeid ontstond de  Orkney familie; Vader, moeder, kind. Gestileerd , abstract. De voet is een afgebroken, middeleeuwse  kerktegel uit de omgeving van Kampen, vol sporen uit het verleden. € 475,-',
		image: 'img/products/orkney-familie-wiebe-cool-beeldhouwer.jpeg',
		alt: 'DE ORKNEY FAMILY - Wiebe Cool Beeldhouwer',
	},
	{
		id: 4,
		title: 'PIM',
		subtitle:
			'Dagelijks ontvangt deze Pim, zelf gegoten in brons, het daglicht en de zonneschijn in grote dankbaarheid! ',
		image: 'img/products/pim-wiebe-cool-beeldhouwer.jpeg',
		alt: 'PIM - Wiebe Cool Beeldhouwer',
	},
];

export async function generateMetadata(): Promise<Metadata> {
	const pageSeoQuery = parseSeoMetaDataQuery('70FCDbDpk8iLUWWHAU76Ge');
	const { seoMetaData } = await fetchContentfulData(pageSeoQuery);
	return seoMetaData;
}

const pageQuery = `
	query AboutPage {
		aboutPage(id: "3LaYVXJtqbtQYH38PqSkeQ") {
			slug
			title
			name
			bannerImage {
				width
				height
				url
				description
			}
			buildingBlocksCollection {
				items {
					__typename
					... on TextBlock {
						title
						description {
							json
						}
					}
				}
			}
		}
	}
`;

export default async function About() {
	//
	const { aboutPage } = await fetchContentfulData(pageQuery);
	const hero = aboutPage.bannerImage;
	const blocks = aboutPage.buildingBlocksCollection?.items || [];

	console.log(aboutPage.buildingBlocksCollection);
	return (
		<SectionContainer name={'about'}>
			<div className="container">
				<div className="about-page w-full h-auto clear-both float-left py-[100px] px-0">
					<div className="section-title w-full h-auto clear-both float-left mb-[62px]">
						<div className="title_flex w-full h-auto clear-both flex justify-between items-end">
							<SectionTitle pageName={aboutPage.name} title={aboutPage.title} />
						</div>
					</div>
					<div className="w-full h-80 clear-both float-left relative mb-[35px]">
						<Image src={hero.url} alt={hero.description} fill priority />
					</div>
					{blocks.map((item: RenderComponentItem) => (
						<RenderComponent item={item} />
					))}
					<div className="about-text w-full pb-[31px] mb-[30px]">
						<ContactDetails />
					</div>
				</div>
			</div>
		</SectionContainer>
	);
}
