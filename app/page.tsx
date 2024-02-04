import { Metadata } from 'next';
import Image from 'next/image';
import * as React from 'react';
import { fetchHomePage, fetchSeoMetaData, generateSchema, processRichText } from '@/lib';
import { SectionContainer, SocialMediaLinks, ContactDetails, SchemaTag } from '@/components';
import { SchemaType } from '@/model';

export async function generateMetadata(): Promise<Metadata> {
	const { seoMetaData } = await fetchSeoMetaData('CPkjAJlRTW3qlGNp8CqJm');
	return seoMetaData;
}

export default async function Home() {
	const homePage = await fetchHomePage();
	const jsonLd = generateSchema(homePage, SchemaType.HOME_PAGE);
	return (
		<SectionContainer name={'home'}>
			<SchemaTag schema={jsonLd} />
			<div className="container">
				<div className="home-page page">
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
							<h1 className="name font-poppins font-light text-[55px] uppercase mb-5">
								{homePage.title}
							</h1>
							{homePage.subtitle && <h2 className="subtitle font-light mb-4">{homePage.subtitle}</h2>}
							<div className="font-montserrat font-medium max-w-[450px] mb-[25px] border-solid border-[#DFDFDF] border-b pb-[31px]">
								{processRichText(homePage.description.json)}
							</div>
							<SocialMediaLinks size="2xl" />
							<br />
							<br />
							<ContactDetails />
						</div>
					</div>
				</div>
			</div>
		</SectionContainer>
	);
}
