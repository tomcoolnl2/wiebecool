import { Metadata } from 'next';
import * as React from 'react';
import { processRichText, fetchContentfulData } from '@/lib';
import { ContactForm, GoogleMaps, SectionContainer, SectionTitle } from '@/components';

import ContactPageQuery from '@/graphql/ContactPage.gql';
import MetaDataQuery from '@/graphql/MetaData.gql';

export async function generateMetadata(): Promise<Metadata> {
	const { seoMetaData } = await fetchContentfulData(MetaDataQuery, { sysID: '6Giq0hPzdDxxtohDi6kucy' });
	return seoMetaData;
}

export default async function Contact() {
	const { contactPage } = await fetchContentfulData(ContactPageQuery, { sysID: '68BbqtKbBhg4PwwWHNOB2' });
	return (
		<SectionContainer name={'contact'}>
			<div className="container">
				<div className="contact-page pb-10 pt-24">
					<SectionTitle pageName={contactPage.name} title={contactPage.title} />
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
