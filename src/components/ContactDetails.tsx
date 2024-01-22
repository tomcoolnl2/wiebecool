import * as React from 'react';

export const ContactDetails: React.FC = () => {
	return (
		<p className="job font-montserrat font-medium max-w-[450px] mb-[25px]">
			Wanneer je meer wilt weten:
			<br />
			<a href="tel:0031628979316" target="_blank">
				0031628979316
			</a>
			<br />
			<br />
			Bezoekadres:
			<br />
			<a href="https://www.google.com/maps/place/Venkel+25,+8252+CH+Dronten,+Netherlands/" target="_blank">
				Venkel 25, 8252 CH Dronten
			</a>
		</p>
	);
};
