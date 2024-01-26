import { Metadata } from 'next';
import * as React from 'react';
import { fetchContentfulData } from '@/lib/api';
import { parseSeoMetaDataQuery, processRichText } from '@/lib/utils';
import { SectionContainer } from '@/components/page/SectionContainer';
import { SectionTitle } from '@/components/page/SectionTitle';
import { ContactForm } from '@/components/contact/ContactForm';
import { GoogleMaps } from '@/components/contact/GoogleMaps';

export async function generateMetadata(): Promise<Metadata> {
	const pageSeoQuery = parseSeoMetaDataQuery('6Giq0hPzdDxxtohDi6kucy');
	const { seoMetaData } = await fetchContentfulData(pageSeoQuery);
	return seoMetaData;
}

const pageQuery = `
	query ContactPage {
		contactPage(id: "68BbqtKbBhg4PwwWHNOB2") {
			name
			title
			description {
				json
			}
			submitButtonText
		}
	}`;

export default async function Contact() {
	const { contactPage } = await fetchContentfulData(pageQuery);
	return (
		<SectionContainer name={'contact'}>
			<div className="container">
				<div className="contact-page w-full float-left clear-both h-auto py-[100px] px-[0px]">
					<div className="section-title w-full h-auto clear-both float-left mb-[62px]">
						<div className="title_flex w-full h-auto clear-both flex justify-between items-end">
							<SectionTitle pageName={contactPage.name} title={contactPage.title} />
						</div>
					</div>
					<GoogleMaps />
					<div className="font-montserrat font-medium mb-[25px] border-solid pb-[31px]">
						{processRichText(contactPage.description.json)}
					</div>
					<ContactForm buttonText={contactPage.submitButtonText} />
				</div>
			</div>
		</SectionContainer>
	);
}
