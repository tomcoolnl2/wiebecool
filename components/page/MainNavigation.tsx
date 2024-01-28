'use client';
import Link from 'next/link';
import * as React from 'react';
import { NavigationPageEntry } from '@/model/navigation';
import { SocialMediaLinks } from '../SocialMediaLinks';
import { Navigation } from '../Navigation';

interface MainNavigation {
	title: string;
	navigation: NavigationPageEntry[];
}

export const MainNavigation: React.FC<MainNavigation> = ({ title, navigation }) => {
	//
	const [isMobileOpen, toggleMobile] = React.useState<boolean>(false);

	return (
		<>
			<header className="top-bar z-30 absolute top-1 left-0">
				<Link href="/" className="visually-hidden">
					<h1>Wiebe Cool</h1>
					<h2>Beeldhouwer</h2>
				</Link>
				<div
					className={`cursor-pointer hamburger--slider hamburger${isMobileOpen ? ' is-active' : ''}`}
					onClick={() => toggleMobile(!isMobileOpen)}
				>
					<div className="hamburger-box w-[30px]">
						<div className="hamburger-inner" />
					</div>
				</div>
			</header>
			<nav className={`main-navigation${isMobileOpen ? ' mobile-open' : ''}`}>
				<h1 className="visually-hidden">{title}</h1>
				<Navigation items={navigation} className={['navigation']} onClick={() => toggleMobile(false)} />
			</nav>
			<SocialMediaLinks size={11} />
		</>
	);
};
