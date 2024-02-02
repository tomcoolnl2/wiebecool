import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PageType, ReWriteRule, NavigationPageEntry, Slug } from '@/model';
import { ensureLeadingSlash } from '@/lib';

function hrefBuilder(typename: PageType, slug: string): Slug {
	const formattedSlug: Slug = ensureLeadingSlash(slug);
	switch (typename) {
		case PageType.CollectionPage:
			return (ReWriteRule[PageType.CollectionPage] + formattedSlug) as Slug;
		case PageType.DetailPage:
			return (ReWriteRule[PageType.DetailPage] + formattedSlug) as Slug;
		default:
			return formattedSlug;
	}
}

interface NavigationLinkProps {
	item: NavigationPageEntry;
	slug: string;
	path: string[];
	useHrefBuilder: boolean;
	onClick?: () => void;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ useHrefBuilder, item, slug, path, onClick }) => {
	const href = useHrefBuilder ? hrefBuilder(item.page.__typename, slug) : `/${slug}`;
	return (
		<Link
			className={`navigation-link${path.slice(-1)[0] === slug ? ' text-[#b7950b]' : ' text-gray-300'}`}
			href={href}
			role="link"
			onClick={() => onClick?.()}
		>
			{item.name}
		</Link>
	);
};

interface NavigationItemProps {
	item: NavigationPageEntry;
	useHrefBuilder: boolean;
	onClick?: () => void;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ item, onClick, useHrefBuilder }) => {
	const path = usePathname().split('/').filter(Boolean);
	const slug = item.page.slug.replace('/', '');
	return (
		<li className="mb-5 w-full">
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
	onClick?: () => void;
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
