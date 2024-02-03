import Image from 'next/image';
import { Metadata } from 'next';
import * as React from 'react';
import { fetchAboutPage, fetchSeoMetaData, generateSchema } from '@/lib';
import {
	type RenderComponentItem,
	RenderComponent,
	SectionContainer,
	ContactDetails,
	SectionTitle,
	SchemaTag,
} from '@/components';
import { AboutPage, SchemaType } from '@/model';

export async function generateMetadata(): Promise<Metadata> {
	const { seoMetaData } = await fetchSeoMetaData('4nI3oprys4FZujusjxmQcz');
	return seoMetaData;
}

export default async function About() {
	const aboutPage: AboutPage = await fetchAboutPage();
	const hero = aboutPage.bannerImage;
	const blocks = aboutPage.buildingBlocksCollection?.items || [];
	const jsonLd = generateSchema(aboutPage, SchemaType.ABOUT_PAGE);
	return (
		<SectionContainer name={'about'}>
			<SchemaTag schema={jsonLd} />
			<div className="container">
				<div className="about-page page">
					<SectionTitle pageName={aboutPage.name} title={aboutPage.title} />
					<div className="shadow-lg w-full h-80 relative mb-[35px]">
						<Image src={hero.url} alt={hero.description} fill priority />
					</div>
					{blocks.map((item: RenderComponentItem, i: number) => (
						<RenderComponent key={i} item={item} />
					))}
					<aside className="text-block pt-5 pb-8 mt-8 text-center">
						<ContactDetails />
					</aside>
				</div>
			</div>
		</SectionContainer>
	);
}
