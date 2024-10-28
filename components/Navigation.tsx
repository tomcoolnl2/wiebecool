'use client';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationPageEntry } from '@/model';
import { hrefBuilder } from '@/lib';
import React from 'react';

interface NavigationLinkProps {
	item: NavigationPageEntry;
	slug: string;
	path: string[];
	useHrefBuilder: boolean;
	onClick?: (event: Event) => void;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ useHrefBuilder, item, slug, path, onClick }) => {
	//
	const href = useHrefBuilder ? hrefBuilder(item.page.__typename, slug) : `/${slug}`;

	const currentPage = React.useMemo(() => (!path.length && href === '/') || path.slice(-1)[0] === slug, [path, href, slug]);

	return (
		<Link className={`navigation-link${currentPage ? ' active' : ''}`} href={href} role="link" onClick={(e) => onClick?.(e as unknown as Event)}>
			{item.name}
		</Link>
	);
};

interface NavigationItemProps {
	item: NavigationPageEntry;
	useHrefBuilder: boolean;
	onClick?: (event: Event) => void;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ item, onClick, useHrefBuilder }) => {
	const pathname = usePathname();
	const path = pathname ? pathname.split('/').filter(Boolean) : [];
	const slug = item.page.slug.replace('/', '');
	return (
		<li className="navigation-item">
			<NavigationLink useHrefBuilder={useHrefBuilder} item={item} slug={slug} path={path} onClick={onClick} />
			{item.subNavigation instanceof Array && (
				<Navigation items={item.subNavigation} className="sub-navigation" useHrefBuilder onClick={onClick} />
			)}
		</li>
	);
};

interface NavigationProps {
	items: NavigationPageEntry[];
	className?: string | { [key: string]: boolean };
	useHrefBuilder?: boolean;
	onClick?: (event: Event) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ items, useHrefBuilder = false, className = '', onClick }) => {
	return (
		<ul className={classNames(className, 'w-full')}>
			{items.map((item) => (
				<NavigationItem key={item.page.sys.id} item={item} onClick={onClick} useHrefBuilder={useHrefBuilder} />
			))}
		</ul>
	);
};
