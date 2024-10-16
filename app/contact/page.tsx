import { headers } from 'next/headers';
import * as React from 'react';
import { useFetchData } from '@/hooks';
import { PageType, ReWriteRule, SchemaType } from '@/model';
import { processRichText, generateSchema, fetchContactPage } from '@/lib';
import { ContactForm, SchemaTag, SectionContainer, PageHeader, ContactDetails } from '@/components';
import '@/css/pages/contact-page.css';

export async function generateMetadata() {
	const { seoMetaData } = await useFetchData(fetchContactPage);
	return seoMetaData;
}

export default async function Contact() {
	const { content, artist, address } = await useFetchData(fetchContactPage);
	const path = headers().get('next-url') || ReWriteRule[PageType.ContactPage];
	const jsonLd = generateSchema({ content, artist, schemaType: SchemaType.CONTACT_PAGE });
	return (
		<SectionContainer>
			<SchemaTag schema={jsonLd} />
			<div className="container">
				<div className="contact-page page">
					<PageHeader title={content.title} path={path} />
					<div className="rich-text-block">{processRichText(content.description.json)}</div>
					<div className="rich-text-block-border">
						<ContactDetails showCTAs={false} showInsta content={{ artist, address }} />
					</div>
					<ContactForm formIntro={content.formIntro} buttonText={content.submitButtonText} />
				</div>
			</div>
		</SectionContainer>
	);
}
