import * as React from 'react';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { artist } from '@/lib';

interface Props {
	size?: FontAwesomeIconProps['size'];
}

export const ShareInstagram: React.FC<Props> = ({ size = 'sm' }) => {
	return (
		<a
			href="https://www.instagram.com/wiebecoolbeeldhouwer/"
			target="_blank"
			title={`Instagram - ${artist.description}`}
			rel="noopener noreferrer"
		>
			<FontAwesomeIcon icon={faInstagram} size={size} />
		</a>
	);
};

export default React.memo(ShareInstagram);
