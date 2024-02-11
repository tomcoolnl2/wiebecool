import * as React from 'react';
import { fetchContactDetails, generateGoogleMapsAddress } from '@/lib';
import { ShareInstagram } from '@/components';

export const ContactDetails: React.FC<{ showInsta?: boolean }> = async ({ showInsta = false }) => {
	const { artist, address } = await fetchContactDetails();
	return (
		<aside className="contact-details">
			{showInsta && (
				<div className="mb-10">
					<ShareInstagram size="2xl" />
				</div>
			)}
			Wanneer je meer wilt weten:
			<br />
			<a href={`tel:${artist.telephone}`}>{artist.telephone}</a>
			<br />
			<br />
			Bezoekadres:
			<br />
			<a
				href={`https://www.google.com/maps/place/${generateGoogleMapsAddress(address)}/`}
				target="_blank"
				rel="noopener noreferrer"
			>
				{address.streetAddress}, {address.zipCode} {address.city}
			</a>
		</aside>
	);
};
