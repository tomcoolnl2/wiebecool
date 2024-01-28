import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationPageEntry } from '@/model/navigation';

interface NavigationLinkProps {
	slug: string;
	path: string[];
	name: string;
	onClick?: () => void;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ name, slug, path, onClick }) => {
	return (
		<Link
			className={`navigation-link${path.includes(slug) ? ' text-white' : ' text-gray-300'}`}
			href={`/${slug}`}
			role="link"
			onClick={() => onClick?.()}
		>
			{name}
		</Link>
	);
};

interface NavigationItemProps {
	item: NavigationPageEntry;
	onClick?: () => void;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ item, onClick }) => {
	const path = usePathname().split('/').filter(Boolean);
	const slug = item.page.slug.replace('/', '');
	return (
		<li className="mb-5 w-full">
			<NavigationLink name={item.name} slug={slug} path={path} onClick={onClick} />
			{item.subNavigation instanceof Array && (
				<Navigation items={item.subNavigation} className={['sub-navigation']} />
			)}
		</li>
	);
};

interface NavigationProps {
	items: NavigationPageEntry[];
	className?: string[];
	onClick?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ items, className = [''], onClick }) => {
	return (
		<ul className={classNames(...className, 'w-full')}>
			{items.map((item) => (
				<NavigationItem key={item.page.sys.id} item={item} onClick={onClick} />
			))}
		</ul>
	);
};
