import { Metadata } from 'next';
import Image from 'next/image';
import * as React from 'react';
import { parseSeoMetaDataQuery, processRichText } from '@/lib/utils';
import { fetchContentfulData } from '@/lib/api';
import { SectionContainer } from '@/components/page/SectionContainer';
import { ContactDetails } from '@/components/ContactDetails';
import { SocialMediaLinks } from '@/components/SocialMediaLinks';

export async function generateMetadata(): Promise<Metadata> {
	const pageSeoQuery = parseSeoMetaDataQuery('70FCDbDpk8iLUWWHAU76Ge');
	const { seoMetaData } = await fetchContentfulData(pageSeoQuery);
	return seoMetaData;
}

const pageQuery = `
	query HomePage {
		homePage(id: "7bjsm9rIwR5janeyF5XK2n") {
			title
			subtitle
			mugshot {
				url
				description
				width
				height
			}
			introduction {
				json
			}
		}
	}
`;

export default async function Home() {
	//
	const { homePage } = await fetchContentfulData(pageQuery);

	return (
		<SectionContainer name={'home'}>
			<div className="container">
				<div className="home-page w-full min-h-[100vh] clear-both flex items-center justify-center relative">
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
							{homePage.subtitle && (
								<h2 className="font-poppins subtitle mb-[11px]">{homePage.subtitle}</h2>
							)}
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
