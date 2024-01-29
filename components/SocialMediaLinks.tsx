import classNames from 'classnames';
import Link from 'next/link';
import * as React from 'react';

const socialIcon = [
	{
		id: 1,
		iconName: 'icon-instagram-3',
		link: 'https://www.instagram.com/wiebecoolbeeldhouwer/',
	},
];

interface Props {
	className?: string | { [key: string]: boolean };
	size?: number;
}

export const SocialMediaLinks: React.FC<Props> = ({ className = '', size = 20 }) => {
	return (
		<div role="list" className={classNames('w-full', className)}>
			{socialIcon.map((item) => (
				<Link key={item.id} className={`text-[${size}px]`} href={item.link} target="_blank">
					{/* <i className={item.iconName} /> */}
					Instagram
				</Link>
			))}
		</div>
	);
};
