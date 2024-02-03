import * as React from 'react';
import { fetchContactDetails, generateGoogleMapsAddress } from '@/lib';
import AddressQuery from '@/graphql/Address.gql';

export const ContactDetails: React.FC = async () => {
	const { artist, address } = await fetchContactDetails();
	return (
		<p className="font-montserrat font-medium mb-6">
			Wanneer je meer wilt weten:
			<br />
			<a href={`tel:${artist.telephone}`} target="_blank">
				{artist.telephone}
			</a>
			<br />
			<br />
			Bezoekadres:
			<br />
			<a href={`https://www.google.com/maps/place/${generateGoogleMapsAddress(address)}/`} target="_blank">
				{address.streetAddress}, {address.zipCode} {address.city}
			</a>
		</p>
	);
};
