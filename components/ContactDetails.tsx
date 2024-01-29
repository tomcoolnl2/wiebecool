import * as React from 'react';
import { fetchContentfulData, generateGoogleMapsAddress } from '@/lib';
import AddressQuery from '@/graphql/Address.gql';

export const ContactDetails: React.FC = async () => {
	//
	const { address } = await fetchContentfulData(AddressQuery, { sysID: 'VYrkgFK6dR1V81lIJqez2' });

	return (
		<p className="font-montserrat font-medium mb-6">
			{address.phoneNumberText}
			<br />
			<a href={`tel:${address.phoneNumber}`} target="_blank">
				{address.phoneNumber}
			</a>
			<br />
			<br />
			{address.postalAddressText}
			<br />
			<a
				href={`https://www.google.com/maps/place/${generateGoogleMapsAddress(address.postalAddress)}/`}
				target="_blank"
			>
				{address.postalAddress}
			</a>
		</p>
	);
};
