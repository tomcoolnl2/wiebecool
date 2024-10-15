import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import { HomePage, SchemaType } from '@/model';
import { fetchHomePage, fetchHomePageSeoMetaData, generateSchema, processRichText } from '@/lib';
import { SectionContainer, ContactDetailsV2, SchemaTag, type RenderComponentItem, RenderComponent } from '@/components';
import '@/css/pages/home-page.css';

export async function generateMetadata(): Promise<Metadata> {
	try {
		return await fetchHomePageSeoMetaData();
	} catch (error) {
		notFound();
	}
}

export default async function Home() {
	//
	let content, artist, address;
	try {
		const data: HomePage = await fetchHomePage();
		({ content, artist, address } = data);
	} catch (error) {
		notFound();
	}

	const jsonLd = generateSchema({ content, artist }, SchemaType.HOME_PAGE);
	const blocks = content.buildingBlocksCollection?.items || [];
	return (
		<SectionContainer>
			<SchemaTag schema={jsonLd} />
			<div className="container">
				<div className="home-page page">
					<div className="home-content">
						<Image
							src={content.mugshot.url + '?w=256&h=256'}
							alt={content.mugshot.description}
							width={content.mugshot.width}
							height={content.mugshot.height}
							className="avatar"
						/>
						<div className="content">
							<h1 className="name">{content.title}</h1>
							{content.subtitle && <h2 className="subtitle">{content.subtitle}</h2>}
							<div className="rich-text-block-border max-w-[450px]">
								{processRichText(content.description.json)}
							</div>
							<ContactDetailsV2 showInsta={false} showAddress={false} content={{ artist, address }} />
							<hr />
							<br />
							<h3>Nieuwste werk:</h3>
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
