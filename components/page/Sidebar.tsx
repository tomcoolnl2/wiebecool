import { usePathname } from 'next/navigation';
import * as React from 'react';
import Link from 'next/link';
import { MenuItem } from '@/model';
import { SocialMediaLinks } from '../SocialMediaLinks';

const menuItems: MenuItem[] = [
	{ id: 1, name: 'Home', href: '/' },
	{ id: 2, name: 'Missie', href: '/over-mij' },
	{ id: 3, name: 'Werk', href: '/werk' },
	{ id: 4, name: 'Contact', href: '/contact' },
];

interface Props {
	mobileNavigationIsOpen: boolean;
	openMobileNavigation: (value: boolean) => void;
}

export const Sidebar: React.FC<Props> = ({ mobileNavigationIsOpen, openMobileNavigation }) => {
	//
	const path = usePathname().split('/').filter(Boolean);

	return (
		<aside
			className={`sidebar h-[100vh] fixed flex z-[12] bg-white${mobileNavigationIsOpen ? ' mobile-open' : ''}`}
		>
			<div className="sidebar-inner w-full h-auto">
				<nav className="menu w-full" role="navigation">
					<ul className="m-0 list-none">
						{menuItems.map((item) => {
							return (
								<li
									className={`mb-3 w-full ${
										path.includes(item.href.replace('/', '')) ? 'active' : ''
									}`}
									key={item.id}
								>
									<Link
										className="capitalize inline-block font-medium font-montserrat"
										href={item.href}
										role="link"
										onClick={() => openMobileNavigation(false)}
									>
										{item.name}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
				<SocialMediaLinks size={11} />
			</div>
		</aside>
	);
};
