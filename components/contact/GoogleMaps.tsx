import * as React from 'react';
import { fetchContentfulData, generateGoogleMapsAddress } from '@/lib';
import AddressQuery from '@/graphql/Address.gql';

export const GoogleMaps = async () => {
	const { address } = await fetchContentfulData(AddressQuery, { sysID: 'VYrkgFK6dR1V81lIJqez2' });
	return (
		address && (
			<div className="map_wrap w-full float-left clear-both h-auto mb-[50px]">
				<div className="mapouter">
					<div className="gmap_canvas">
						<iframe
							width="100%"
							height={355}
							id="gmap_canvas"
							src={`https://maps.google.com/maps?q=${generateGoogleMapsAddress(
								address.postalAddress
							)},+Netherlands&t=&z=13&ie=UTF8&iwloc=&output=embed`}
						/>
					</div>
				</div>
			</div>
		)
	);
};
