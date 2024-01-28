import Link from 'next/link';
import * as React from 'react';

const socialIcon = [
	{
		id: 1,
		iconName: 'icon-instagram-3',
		link: 'https://www.instagram.com/wiebecoolbeeldhouwer/',
	},
];

export const SocialMediaLinks: React.FC<{ size?: number }> = ({ size = 20 }) => {
	return (
		<div role="list" className="social-media-links">
			{socialIcon.map((item) => (
				<Link key={item.id} className={`text-[${size}px]`} href={item.link} target="_blank">
					<i className={item.iconName} />
				</Link>
			))}
		</div>
	);
};
