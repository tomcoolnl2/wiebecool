'use client';
import Link from 'next/link';
import * as React from 'react';
import { faSitemap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Artist, NavigationPageEntry } from '@/model';
import { Navigation } from '@/components';
import { useClickOutside } from '@/hooks';

// to prevent circular deps, storybook will not work with this
const ShareInstagram = React.lazy(() => import('@/components/ShareInstagram'));

export interface MainNavigation {
	title: string;
	navigation: NavigationPageEntry[];
	artist: Artist;
}

export const MainNavigation: React.FC<MainNavigation> = ({ title, navigation, artist }) => {
	//
	const [isMobileOpen, toggleMobile] = React.useState<boolean>(false);

	const closeOnOutsideClick = React.useCallback((event: Event) => {
		const target = event.target as HTMLElement;
		if (!target.classList.contains('hamburger-inner')) {
			toggleMobile(false);
		}
	}, []);

	const navRef = React.useRef<HTMLElement>(null);
	const navElement = useClickOutside<HTMLElement>(navRef, closeOnOutsideClick);

	return (
		<>
			<header className="top-bar">
				<Link href="/" className="sr-only">
					<h1>{artist.name}</h1>
					<h2>{artist.occupation}</h2>
				</Link>
				<ShareInstagram size="2xl" title={artist.description} />
				<div
					className={`cursor-pointer hamburger--slider hamburger${isMobileOpen ? ' is-active' : ''}`}
					onClick={() => toggleMobile(!isMobileOpen)}
				>
					<div className="hamburger-box w-[30px]">
						<div className="hamburger-inner" />
					</div>
				</div>
			</header>
			<nav ref={navRef} className={`main-navigation${isMobileOpen ? ' mobile-open' : ''}`}>
				<h1 className="sr-only">{title}</h1>
				<Navigation items={navigation} className="navigation" onClick={closeOnOutsideClick} />
				<div className="page-footer">
					<div className="copyright">© {new Date().getFullYear()}</div>
					<a href="/sitemap.xml" title="Sitemap">
						<FontAwesomeIcon icon={faSitemap} size={'sm'} />
					</a>
				</div>
			</nav>
		</>
	);
};
