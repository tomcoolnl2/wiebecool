'use client';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import Link from 'next/link';
import { SocialMediaLinks } from '../SocialMediaLinks';

interface MenuItem {
	id: number;
	name: string;
	href: string;
}

const menuItems: MenuItem[] = [
	{ id: 1, name: 'Home', href: '/' },
	{ id: 2, name: 'Missie', href: '/over-mij' },
	{ id: 3, name: 'Werk', href: '/werk' },
	{ id: 4, name: 'Contact', href: '/contact' },
];

export function getStaticProps() {
	console.log('getServerSideProps');
}

export const SiteNavigation: React.FC = () => {
	//
	const path = usePathname().split('/').filter(Boolean);
	const [mobileNavigationIsOpen, openMobileNavigation] = React.useState<boolean>(false);

	return (
		<>
			<header className="top-bar z-30 absolute top-1 left-0">
				<Link href="/" className="visually-hidden">
					<h1>Wiebe Cool</h1>
					<h2>Beeldhouwer</h2>
				</Link>
				<div
					className={`cursor-pointer hamburger--slider hamburger${
						mobileNavigationIsOpen ? ' is-active' : ''
					}`}
					onClick={() => openMobileNavigation(!mobileNavigationIsOpen)}
				>
					<div className="hamburger-box w-[30px]">
						<div className="hamburger-inner" />
					</div>
				</div>
			</header>
			<nav
				className={`main-navigation flex h-screen bg-gray-600 z-20${
					mobileNavigationIsOpen ? ' mobile-open' : ''
				}`}
			>
				<ul role="navigation" className="navigation w-full">
					{menuItems.map((item) => {
						return (
							<li
								className={`mb-5 w-full ${path.includes(item.href.replace('/', '')) ? 'active' : ''}`}
								key={item.id}
							>
								<Link
									className="capitalize inline-block font-medium font-montserrat text-gray-300 hover:text-white"
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
				<SocialMediaLinks size={11} />
			</nav>
		</>
	);
};

export default SiteNavigation;
