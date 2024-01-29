import Link from 'next/link';
import * as React from 'react';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

interface Props {
	size?: FontAwesomeIconProps['size'];
}

export const SocialMediaLinks: React.FC<Props> = ({ size = 'sm' }) => {
	return (
		<Link href="https://www.instagram.com/wiebecoolbeeldhouwer/" target="_blank">
			<FontAwesomeIcon icon={faInstagram} size={size} />
		</Link>
	);
};
