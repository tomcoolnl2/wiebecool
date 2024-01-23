import * as React from 'react';

const socialIcon = [
	// {
	// 	id: 1,
	// 	iconName: 'icon-facebook-squared',
	// 	link: 'https://www.facebook.com/',
	// },
	// {
	// 	id: 2,
	// 	iconName: 'icon-twitter-squared',
	// 	link: 'https://twitter.com/',
	// },
	// {
	// 	id: 3,
	// 	iconName: 'icon-behance-squared',
	// 	link: 'https://www.behance.net/',
	// },
	// {
	// 	id: 4,
	// 	iconName: 'icon-linkedin-squared',
	// 	link: 'https://www.linkedin.com/',
	// },
	{
		id: 5,
		iconName: 'icon-instagram-3',
		link: 'https://www.instagram.com/wiebecoolbeeldhouwer/',
	},
];

export const SocialMediaLinks: React.FC<{ size?: number }> = ({ size = 20 }) => {
	return (
		<nav className="social w-full">
			{socialIcon.map((item) => (
				<a key={item.id} className={`text-[${size}px]`} href={item.link} target="_blank">
					<i className={item.iconName} />
				</a>
			))}
		</nav>
	);
};
