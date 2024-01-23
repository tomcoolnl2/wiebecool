'use client';
import * as React from 'react';
import { SectionContainer } from 'components/SectionContainer';
import { SectionTitle } from 'components/SectionTitle';
import { ContactForm } from 'components/ContactForm';
import { GoogleMaps } from 'components/GoogleMaps';

export default function Contact() {
	return (
		<SectionContainer name={'contact'}>
			<div className="container">
				<div className="tokyo_tm_contact w-full float-left clear-both h-auto py-[100px] px-[0px]">
					<div className="tokyo_tm_title w-full h-auto clear-both float-left mb-[62px]">
						<div className="title_flex w-full h-auto clear-both flex justify-between items-end">
							<SectionTitle pageName={'Contact'} title={'Neem gerust contact op voor meer informatie'} />
						</div>
					</div>
					<GoogleMaps />
					<ContactForm />
				</div>
			</div>
		</SectionContainer>
	);
}
