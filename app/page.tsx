import { Metadata } from 'next';
import Image from 'next/image';
import * as React from 'react';
import { fetchContentfulData, processRichText } from '@/lib';
import { SectionContainer, SocialMediaLinks, ContactDetails } from '@/components';

import HomePageQuery from '@/graphql/HomePage.gql';
import MetaDataQuery from '@/graphql/MetaData.gql';

export async function generateMetadata(): Promise<Metadata> {
	const { seoMetaData } = await fetchContentfulData(MetaDataQuery, { sysID: '70FCDbDpk8iLUWWHAU76Ge' });
	return seoMetaData;
}

export default async function Home() {
	//
	const { homePage } = await fetchContentfulData(HomePageQuery, { sysID: '7bjsm9rIwR5janeyF5XK2n' });

	return (
		<SectionContainer name={'home'}>
			<div className="container">
				<div className="home-page pb-10 pt-24">
					<div className="home_content flex items-center">
						<div className="avatar relative rounded-full inner-border">
							<Image
								src={homePage.mugshot.url}
								alt={homePage.mugshot.description}
								width={homePage.mugshot.width}
								height={homePage.mugshot.height}
							/>
						</div>
						<div className="details ml-[80px]">
							<h1 className="name font-poppins text-[55px] font-extrabold uppercase mb-[14px]">
								{homePage.title}
							</h1>
							{homePage.subtitle && <h2 className="font-poppins subtitle mb-3">{homePage.subtitle}</h2>}
							<div className="job font-montserrat font-medium max-w-[450px] mb-[25px] border-solid border-[#DFDFDF] border-b pb-[31px]">
								{processRichText(homePage.introduction.json)}
							</div>
							<SocialMediaLinks />
							<br />
							<ContactDetails />
						</div>
					</div>
				</div>
			</div>
		</SectionContainer>
	);
}
