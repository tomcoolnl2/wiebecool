import * as React from 'react';
import { fetchContentfulData } from '@/lib/api';
import { generateGoogleMapsAddress } from '@/lib/utils';

const query = `
	query Address {
		address(id: "VYrkgFK6dR1V81lIJqez2") {
			postalAddressText
			postalAddress
			phoneNumberText
			phoneNumber
		}
	}
`;

export const ContactDetails: React.FC = async () => {
	//
	const { address } = await fetchContentfulData(query);

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
