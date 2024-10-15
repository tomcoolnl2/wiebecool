import Image from 'next/image';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { Metadata } from 'next';
import * as React from 'react';
import { AboutPage, PageType, ReWriteRule, SchemaType } from '@/model';
import { fetchAboutPage, fetchSeoMetaData, generateSchema, ContentfulSysID } from '@/lib';
import {
	type RenderComponentItem,
	RenderComponent,
	SectionContainer,
	PageHeader,
	SchemaTag,
	ContactDetailsV2,
} from '@/components';
import '@/css/pages/about-page.css';

export async function generateMetadata(): Promise<Metadata> {
	try {
		const { seoMetaData } = await fetchSeoMetaData(ContentfulSysID.aboutPage.seoMetaData);
		return seoMetaData;
	} catch (error) {
		notFound();
	}
}

export default async function About() {
	//
	let content, artist, address;
	try {
		const data: AboutPage = await fetchAboutPage();
		({ content, artist, address } = data);
	} catch (error) {
		notFound();
	}

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
					<ContactDetailsV2 showInsta showAddress={false} content={{ artist, address }} />
				</div>
			</div>
		</SectionContainer>
	);
}
