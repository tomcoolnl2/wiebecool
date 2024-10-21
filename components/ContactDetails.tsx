import * as React from 'react';
import { faPhoneSquare, faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { generateGoogleMapsAddress } from '@/lib';
import { ShareInstagram } from '@/components';
import { Address, Artist } from '@/model';

interface ContactDetailsContent {
	artist: Artist;
	address: Address;
}

interface Props {
	showInsta?: boolean;
	showAddress?: boolean;
	showCTAs?: boolean;
	subject?: string;
	content: ContactDetailsContent;
}

export const ContactDetails: React.FC<Props> = ({ showInsta = false, showAddress = true, showCTAs = true, subject, content }) => {
	const { artist, address } = content;
	const subjectParams = subject ? `?subject=${encodeURIComponent(subject)}` : '';

	return (
		<aside className="contact-details">
			{showInsta && (
				<div className="insta">
					<ShareInstagram size="2xl" />
				</div>
			)}
			{showCTAs && (
				<div className="contact-details-ctas">
					<h3>Meer weten?</h3>
					<ul>
						<li>
							<FontAwesomeIcon icon={faPhoneSquare} size={'lg'} />
							<a href={`tel:${artist.telephone}`}>{artist.telephone.replace('0316', '6')}</a>
						</li>
						<li>
							<FontAwesomeIcon icon={faEnvelopeSquare} size={'lg'} />
							<a href={`/contact${subjectParams}#form`}>Contact pagina</a>
						</li>
					</ul>
				</div>
			)}
			{showAddress && (
				<>
					{'Bezoekadres:'}
					<br />
					<a href={`https://www.google.com/maps/place/${generateGoogleMapsAddress(address)}/`} target="_blank" rel="noopener noreferrer">
						{address.streetAddress}, {address.zipCode} {address.city}
					</a>
				</>
			)}
		</aside>
	);
};
