import Image from 'next/image';
import { Metadata } from 'next';
import * as React from 'react';
import { fetchContentfulData } from '@/lib/api';
import { SectionContainer } from '@/components/page/SectionContainer';
import { SectionTitle } from '@/components/page/SectionTitle';
import { ContactDetails } from '@/components/ContactDetails';
import { RenderComponent, type RenderComponentItem } from '@/components/hoc/RenderComponent';

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
				<div className="about-page w-full py-[100px] px-0">
					<div className="section-title w-full mb-[62px]">
						<div className="title_flex w-full flex justify-between items-end">
							<SectionTitle pageName={aboutPage.name} title={aboutPage.title} />
						</div>
					</div>
					<div className="shadow-lg w-full h-80 relative mb-[35px]">
						<Image src={hero.url} alt={hero.description} fill priority />
					</div>
					{blocks.map((item: RenderComponentItem, i: number) => (
						<RenderComponent key={i} item={item} />
					))}
					<aside className="text-block w-full pt-[31px] pb-[31px] mt-[30px] mb-[30px] border-solid border-[#DFDFDF] border-t text-center">
						<ContactDetails />
					</aside>
				</div>
			</div>
		</SectionContainer>
	);
}
