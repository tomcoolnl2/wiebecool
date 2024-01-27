'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import * as React from 'react';
import { NavigationPageEntry } from '@/model/navigation';
import { SocialMediaLinks } from '../SocialMediaLinks';

interface NavigationLinkProps {
	item: NavigationPageEntry;
	openMobileNavigation: (value: boolean) => void;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ item, openMobileNavigation }) => {
	//
	const path = usePathname().split('/').filter(Boolean);
	const slug = item.page.slug.replace('/', '');

	return (
		<li className="mb-5 w-full">
			<Link
				className={`capitalize inline-block font-medium font-montserrat hover:text-white${
					path.includes(slug) ? ' text-white' : ' text-gray-300'
				}`}
				href={item.page.slug}
				role="link"
				onClick={() => openMobileNavigation(false)}
			>
				{item.name}
			</Link>
		</li>
	);
};

interface MainNavigation {
	title: string;
	navigation: NavigationPageEntry[];
}

export const MainNavigation: React.FC<MainNavigation> = ({ title, navigation }) => {
	//
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
				<h1 className="visually-hidden">{title}</h1>
				<ul role="navigation" className="navigation w-full">
					{navigation.map((item) => (
						<NavigationLink
							key={item.page.sys.id}
							item={item}
							openMobileNavigation={openMobileNavigation}
						/>
					))}
				</ul>
				<SocialMediaLinks size={11} />
			</nav>
		</>
	);
};

export default MainNavigation;
