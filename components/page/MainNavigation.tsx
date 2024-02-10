'use client';
import Link from 'next/link';
import * as React from 'react';
import { NavigationPageEntry } from '@/model';
import { artist } from '@/lib';
import { Navigation, SocialMediaLinks } from '@/components';

interface MainNavigation {
	title: string;
	navigation: NavigationPageEntry[];
}

export const MainNavigation: React.FC<MainNavigation> = ({ title, navigation }) => {
	//
	const [isMobileOpen, toggleMobile] = React.useState<boolean>(false);

	return (
		<>
			<header className="top-bar">
				<Link href="/" className="sr-only">
					<h1>{artist.name}</h1>
					<h2>{artist.occupation}</h2>
				</Link>
				<SocialMediaLinks size="2xl" />
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
				<h1 className="sr-only">{title}</h1>
				<Navigation items={navigation} className="navigation" onClick={() => toggleMobile(false)} />
				<div className="page-footer">
					<div className="copyright">© {new Date().getFullYear()}</div>
					<a href="/sitemap.xml">Sitemap</a>
				</div>
			</nav>
		</>
	);
};
