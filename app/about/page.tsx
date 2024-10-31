import Image from 'next/image';
import { headers } from 'next/headers';
import * as React from 'react';
import { PageType, ReWriteRule, SchemaType } from '@/model';
import { fetchData, fetchAboutPage, generateSchema, fetchArtist } from '@/lib';
import { type RenderComponentItem, RenderComponent, SectionContainer, PageHeader, SchemaTag, ContactDetails } from '@/components';
import '@/css/pages/about-page.css';

export async function generateMetadata() {
	return (await fetchData(fetchAboutPage)).seoMetaData;
}

export default async function About() {
	const [{ content }, artist] = await Promise.all([fetchData(fetchAboutPage), fetchArtist()]);
	const path = headers().get('next-url') || ReWriteRule[PageType.AboutPage];
	const jsonLd = await generateSchema({ content, artist, schemaType: SchemaType.ABOUT_PAGE });
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
					<ContactDetails showInsta showAddress={false} artist={artist} className="text-center" />
				</div>
			</div>
		</SectionContainer>
	);
}
