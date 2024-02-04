import * as React from 'react';
import { fetchContactDetails, generateGoogleMapsAddress } from '@/lib';

export const ContactDetails: React.FC = async () => {
	const { artist, address } = await fetchContactDetails();
	return (
		<p className="contact-details">
			Wanneer je meer wilt weten:
			<br />
			<a href={`tel:${artist.telephone}`} target="_blank">
				{artist.telephone}
			</a>
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
		</p>
	);
};
