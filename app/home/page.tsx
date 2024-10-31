import Image from 'next/image';
import React from 'react';
import { SchemaType } from '@/model';
import { fetchData, fetchHomePage, generateSchema, processRichText } from '@/lib';
import { type RenderComponentItem, SectionContainer, ContactDetails, SchemaTag, RenderComponent } from '@/components';
import '@/css/pages/home-page.css';

export async function generateMetadata() {
	return (await fetchData(fetchHomePage)).seoMetaData;
}

export default async function Home() {
	const { content, artist, address } = await fetchData(fetchHomePage);
	const jsonLd = await generateSchema({ content, artist, schemaType: SchemaType.HOME_PAGE });
	const blocks = content.buildingBlocksCollection?.items || [];
	return (
		<SectionContainer>
			<SchemaTag schema={jsonLd} />
			<div className="container">
				<div className="home-page page">
					<div className="home-content">
						<Image
							src={content.mugshot.url + '?w=256&h=256'}
							alt={content.mugshot.description || artist.name}
							width={content.mugshot.width}
							height={content.mugshot.height}
							className="avatar"
						/>
						<div className="content">
							<h1 className="name">{content.title}</h1>
							{content.subtitle && <h2 className="subtitle">{content.subtitle}</h2>}
							<div className="rich-text-block-border max-w-[450px]">{processRichText(content.description.json)}</div>
							<ContactDetails showInsta={false} showAddress={false} content={{ artist, address }} />
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
