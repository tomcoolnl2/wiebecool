import * as React from 'react';

export const GoogleMaps = () => {
	return (
		<div className="map_wrap w-full float-left clear-both h-auto mb-[50px]">
			<div className="mapouter">
				<div className="gmap_canvas">
					<iframe
						width="100%"
						height={355}
						id="gmap_canvas"
						src="https://maps.google.com/maps?q=Venkel+25,+8252+CH+Dronten,+Netherlands&t=&z=13&ie=UTF8&iwloc=&output=embed"
						frameBorder={0}
						scrolling="no"
						marginHeight={0}
						marginWidth={0}
					/>
				</div>
			</div>
		</div>
	);
};
