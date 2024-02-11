import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import { SchemaType } from '@/model';
import { fetchHomePage, fetchHomePageSeoMetaData, generateSchema, processRichText } from '@/lib';
import { SectionContainer, ContactDetails, SchemaTag, type RenderComponentItem, RenderComponent } from '@/components';
import '@/css/pages/home-page.css';

export async function generateMetadata(): Promise<Metadata> {
	return await fetchHomePageSeoMetaData();
}

export default async function Home() {
	const homePage = await fetchHomePage();
	const jsonLd = generateSchema(homePage, SchemaType.HOME_PAGE);
	const blocks = homePage.buildingBlocksCollection?.items || [];
	return (
		<SectionContainer>
			<SchemaTag schema={jsonLd} />
			<div className="container">
				<div className="home-page page">
					<div className="home-content">
						<Image
							src={homePage.mugshot.url}
							alt={homePage.mugshot.description}
							width={homePage.mugshot.width}
							height={homePage.mugshot.height}
							className="avatar"
						/>
						<div className="content">
							<h1 className="name">{homePage.title}</h1>
							{homePage.subtitle && <h2 className="subtitle">{homePage.subtitle}</h2>}
							<div className="rich-text-block-border max-w-[450px]">
								{processRichText(homePage.description.json)}
							</div>
							<ContactDetails showInsta={false} showAddress={false} />
							{blocks.map((item: RenderComponentItem, i: number) => (
								<RenderComponent key={i} item={item} />
							))}
						</div>
					</div>
				</div>
			</div>
		</SectionContainer>
	);
}
