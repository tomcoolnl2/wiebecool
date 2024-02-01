import Image from 'next/image';
import { Metadata } from 'next';
import * as React from 'react';
import { fetchContentfulData } from '@/lib';
import {
	type RenderComponentItem,
	RenderComponent,
	SectionContainer,
	ContactDetails,
	SectionTitle,
} from '@/components';

import AboutPageQuery from '@/graphql/AboutPage.gql';
import MetaDataQuery from '@/graphql/MetaData.gql';

export async function generateMetadata(): Promise<Metadata> {
	const { seoMetaData } = await fetchContentfulData(MetaDataQuery, { sysID: '4nI3oprys4FZujusjxmQcz' });
	return seoMetaData;
}

export default async function About() {
	//
	const { aboutPage } = await fetchContentfulData(AboutPageQuery, { sysID: '3LaYVXJtqbtQYH38PqSkeQ' });
	const hero = aboutPage.bannerImage;
	const blocks = aboutPage.buildingBlocksCollection?.items || [];

	return (
		<SectionContainer name={'about'}>
			<div className="container">
				<div className="about-page pb-10 pt-24">
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
