import Image from 'next/image';
import { headers } from 'next/headers';
import { Metadata } from 'next';
import * as React from 'react';
import { PageType, ReWriteRule, SchemaType } from '@/model';
import { fetchAboutPage, fetchSeoMetaData, generateSchema } from '@/lib';
import {
	type RenderComponentItem,
	RenderComponent,
	SectionContainer,
	ContactDetails,
	PageHeader,
	SchemaTag,
} from '@/components';
import '@/css/pages/about-page.css';

export async function generateMetadata(): Promise<Metadata> {
	const { seoMetaData } = await fetchSeoMetaData('4nI3oprys4FZujusjxmQcz');
	return seoMetaData;
}

export default async function About() {
	const path = headers().get('next-url') || ReWriteRule[PageType.AboutPage];
	const aboutPage = await fetchAboutPage();
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
							src={hero.url}
							alt={hero.description}
							priority
							className="image-centered"
							width={1200}
							height={500}
						/>
					</div>
					{blocks.map((item: RenderComponentItem, i: number) => (
						<RenderComponent key={i} item={item} />
					))}
					<aside>
						<ContactDetails />
					</aside>
				</div>
			</div>
		</SectionContainer>
	);
}
