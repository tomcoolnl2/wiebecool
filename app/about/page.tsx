import Image from 'next/image';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { Metadata } from 'next';
import * as React from 'react';
import { AboutPage, PageType, ReWriteRule, SchemaType } from '@/model';
import { fetchAboutPage, fetchSeoMetaData, generateSchema } from '@/lib';
import {
	type RenderComponentItem,
	RenderComponent,
	SectionContainer,
	PageHeader,
	SchemaTag,
	ContactDetails,
} from '@/components';
import '@/css/pages/about-page.css';

export async function generateMetadata(): Promise<Metadata> {
	try {
		const { seoMetaData } = await fetchSeoMetaData('4nI3oprys4FZujusjxmQcz');
		return seoMetaData;
	} catch (error) {
		notFound();
	}
}

export default async function About() {
	//
	let aboutPage: AboutPage;
	try {
		aboutPage = await fetchAboutPage();
	} catch (error) {
		notFound();
	}

	const path = headers().get('next-url') || ReWriteRule[PageType.AboutPage];
	const jsonLd = generateSchema(aboutPage, SchemaType.ABOUT_PAGE);
	const hero = aboutPage.bannerImage;
	const blocks = aboutPage.buildingBlocksCollection?.items || [];

	return (
		<SectionContainer>
			<SchemaTag schema={jsonLd} />
			<div className="container">
				<div className="about-page page">
					<PageHeader title={aboutPage.title} path={path} />
					<div className="hero-banner image-container image-container-bordered">
						<Image
							src={hero.url + '?w=950&h=350'}
							alt={hero.description}
							priority
							className="image-centered"
							width={944}
							height={350}
						/>
					</div>
					{blocks.map((item: RenderComponentItem, i: number) => (
						<RenderComponent key={i} item={item} />
					))}
					<ContactDetails showInsta showCTAs={false} />
				</div>
			</div>
		</SectionContainer>
	);
}
