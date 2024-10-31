import classNames from 'classnames';
import * as React from 'react';
import { faPhoneSquare, faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatPhoneNumber, formatGoogleMapsAddress } from '@/lib';
import { Address, Artist } from '@/model';

// to prevent circular deps; storybook will not work with this
const ShareInstagram = React.lazy(() => import('@/components/ShareInstagram'));

export interface Props {
	showInsta?: boolean;
	showAddress?: boolean;
	showCTAs?: boolean;
	subject?: string;
	artist: Artist;
	className?: string | string[] | { [key: string]: boolean };
}

export const ContactDetails: React.FC<Props> = ({ showInsta = false, showAddress = true, showCTAs = true, subject, artist, className }) => {
	//
	const subjectParams = subject ? `?subject=${encodeURIComponent(subject)}` : '';

	return (
		<aside className={classNames('contact-details', className)}>
			{showInsta && <div className="insta">{<ShareInstagram size="2xl" />}</div>}
			{showCTAs && (
				<div className="contact-details-ctas">
					<h3>Meer weten?</h3>
					<ul>
						<li>
							<FontAwesomeIcon icon={faPhoneSquare} size={'lg'} />
							<a href={`tel:${artist.telephone}`}>{formatPhoneNumber(artist.telephone)}</a>
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
					<a
						href={`https://www.google.com/maps/place/${formatGoogleMapsAddress(artist.address)}/`}
						target="_blank"
						rel="noopener noreferrer"
					>
						{artist.address.streetAddress}, {artist.address.zipCode} {artist.address.city}
					</a>
				</>
			)}
		</aside>
	);
};
