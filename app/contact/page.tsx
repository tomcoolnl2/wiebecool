import { Metadata } from 'next';
import * as React from 'react';
import { PageType, SchemaType } from '@/model';
import { processRichText, generateSchema, fetchContactPage, fetchSeoMetaData } from '@/lib';
import { ContactForm, GoogleMaps, SchemaTag, SectionContainer, PageHeader } from '@/components';
import '@/css/pages/contact-page.css';

export async function generateMetadata(): Promise<Metadata> {
	const { seoMetaData } = await fetchSeoMetaData('6Giq0hPzdDxxtohDi6kucy');
	return seoMetaData;
}

export default async function Contact() {
	const contactPage = await fetchContactPage();
	const jsonLd = generateSchema(contactPage, SchemaType.CONTACT_PAGE);
	return (
		<SectionContainer>
			<SchemaTag schema={jsonLd} />
			<div className="container">
				<div className="contact-page page">
					<PageHeader title={contactPage.title} pageType={PageType.ContactPage} />
					<GoogleMaps address={contactPage.address} />
					<div className="rich-text-block-border">{processRichText(contactPage.description.json)}</div>
					<ContactForm buttonText={contactPage.submitButtonText} />
				</div>
			</div>
		</SectionContainer>
	);
}
