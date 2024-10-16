import Link from 'next/link';
import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PageType, ReWriteRule, SchemaType } from '@/model';
import { artist, generateSchema } from '@/lib';
import { SchemaTag } from '@/components';

export const BreadCrumbs: React.FC<{ path: string }> = ({ path }) => {
	const crumbs = path.split('/').filter(Boolean);
	const current = crumbs.pop();
	const jsonLd = generateSchema({ content: { parents: crumbs, current: current! }, schemaType: SchemaType.BREADCRUMBS });
	return (
		<nav aria-label="breadcrumbs">
			<SchemaTag schema={jsonLd} />
			<ol className="list-none">
				<li className="breadcrumb-item">
					<Link href="/" title={`Home - ${artist.description}`}>
						<FontAwesomeIcon icon={faHome} size="xs" />
					</Link>
				</li>
				{crumbs.map((crumb) => (
					<li key={crumb} className="breadcrumb-item">
						<FontAwesomeIcon icon={faChevronRight} size="2xs" className="arrow" />
						<Link href={ReWriteRule[PageType.CollectionPage]}>{crumb.replace(/-/g, ' ')}</Link>
					</li>
				))}
				{current && (
					<li className="breadcrumb-item current">
						<FontAwesomeIcon icon={faChevronRight} size="2xs" className="arrow" />
						<a href={`/${current}`} aria-current="location">
							{current.replace(/-/g, ' ')}
						</a>
					</li>
				)}
			</ol>
		</nav>
	);
};
