import * as React from 'react';
import { generateGoogleMapsAddress } from '@/lib';
import { Address } from '@/model';

interface Props {
	address: Address;
}

export const GoogleMaps: React.FC<Props> = async ({ address }) => {
	return (
		address && (
			<div className="map_wrap w-full mb-[50px]">
				<div className="mapouter">
					<div className="gmap_canvas">
						<iframe
							width="100%"
							height={355}
							id="gmap_canvas"
							src={`https://maps.google.com/maps?q=${generateGoogleMapsAddress(
								address
							)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
						/>
					</div>
				</div>
			</div>
		)
	);
};
