import * as React from 'react';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

interface Props {
	title: string;
	size?: FontAwesomeIconProps['size'];
}

export const ShareInstagram: React.FC<Props> = ({ title, size = 'sm' }) => {
	return (
		<a href="https://www.instagram.com/wiebecoolbeeldhouwer/" target="_blank" title={`Instagram - ${title}`} rel="noopener noreferrer">
			<FontAwesomeIcon icon={faInstagram} size={size} />
		</a>
	);
};

export default React.memo(ShareInstagram);
