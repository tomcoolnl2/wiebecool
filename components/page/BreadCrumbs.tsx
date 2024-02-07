'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PageType, ReWriteRule, SchemaType } from '@/model';
import { generateSchema } from '@/lib';
import { SchemaTag } from '@/components';

export const BreadCrumbs: React.FC = () => {
	const path = usePathname().split('/').filter(Boolean);
	if (!path.length) {
		return;
	}
	const lastItem = path.pop();
	const jsonLd = generateSchema({ parents: path, current: lastItem! }, SchemaType.BREADCRUMBS);
	return (
		<nav aria-label="breadcrumbs">
			<SchemaTag schema={jsonLd} />
			<ol className="list-none">
				<li className="inline-block">
					<Link href="/" title="Home - Wiebe Cool | Beelhouwer">
						<FontAwesomeIcon icon={faHome} size="xs" />
					</Link>
				</li>
				{path.map((item) => (
					<li key={item} className="breadcrumb-item inline-block">
						<FontAwesomeIcon icon={faChevronRight} size="2xs" className="arrow" />
						<Link href={ReWriteRule[PageType.CollectionPage]}>{item.replace(/-/g, ' ')}</Link>
					</li>
				))}
				{lastItem && (
					<li className="breadcrumb-item inline-block current">
						<FontAwesomeIcon icon={faChevronRight} size="2xs" className="arrow" />
						<a href={`/${lastItem}`} aria-current="location">
							{lastItem.replace(/-/g, ' ')}
						</a>
					</li>
				)}
			</ol>
		</nav>
	);
};
