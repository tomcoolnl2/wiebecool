import * as React from 'react';
import { fetchContentfulData } from '@/lib/api';
import { generateGoogleMapsAddress } from '@/lib/utils';

const addressQuery = `
	query Address {
		address(id: "VYrkgFK6dR1V81lIJqez2") {
			postalAddress
		}
	}`;

export const GoogleMaps = async () => {
	const { address } = await fetchContentfulData(addressQuery);
	return (
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
	);
};
