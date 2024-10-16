import Image from 'next/image';
import { headers } from 'next/headers';
import * as React from 'react';
import { useFetchData } from '@/hooks';
import { PageType, ReWriteRule, SchemaType } from '@/model';
import { fetchAboutPage, generateSchema } from '@/lib';
import { type RenderComponentItem, RenderComponent, SectionContainer, PageHeader, SchemaTag, ContactDetails } from '@/components';
import '@/css/pages/about-page.css';

export async function generateMetadata() {
	const { seoMetaData } = await useFetchData(fetchAboutPage);
	return seoMetaData;
}

export default async function About() {
	const { content, artist, address } = await useFetchData(fetchAboutPage);
	const path = headers().get('next-url') || ReWriteRule[PageType.AboutPage];
	const jsonLd = generateSchema({ content, artist }, SchemaType.ABOUT_PAGE);
	const hero = content.bannerImage;
	const blocks = content.buildingBlocksCollection?.items || [];
	return (
		<SectionContainer>
			<SchemaTag schema={jsonLd} />
			<div className="container">
				<div className="about-page page">
					<PageHeader title={content.title} path={path} />
					<div className="hero-banner image-container image-container-bordered">
						<Image src={hero.url + '?w=950&h=350'} alt={hero.description} priority className="image-centered" width={944} height={350} />
					</div>
					{blocks.map((item: RenderComponentItem, i: number) => (
						<RenderComponent key={i} item={item} />
					))}
					<ContactDetails showInsta showAddress={false} content={{ artist, address }} />
				</div>
			</div>
		</SectionContainer>
	);
}
