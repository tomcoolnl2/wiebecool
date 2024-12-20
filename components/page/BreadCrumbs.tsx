import Link from 'next/link';
import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SchemaType } from '@/model';
import { generateSchema } from '@/lib';
import { SchemaTag } from '@/components';

interface Props {
	path: string;
}

export const BreadCrumbs: React.FC<Props> = async ({ path }) => {
	//
	const crumbs = path.split('/').filter(Boolean);
	const current = crumbs.pop(); // Last breadcrumb is the current page
	const content = { parents: crumbs, current: current! };
	const jsonLd = await generateSchema({ content, schemaType: SchemaType.BREADCRUMBS });

	return (
		<nav aria-label="breadcrumbs">
			<SchemaTag schema={jsonLd} />
			<ol className="list-none flex space-x-2">
				<li className="breadcrumb-item">
					<Link href="/" title="Home">
						<FontAwesomeIcon icon={faHome} size="xs" />
					</Link>
				</li>
				{crumbs.map((crumb, index) => {
					const name = crumb.replace(/-/g, ' ');
					return (
						<li key={crumb} className="breadcrumb-item flex items-center">
							<FontAwesomeIcon icon={faChevronRight} size="2xs" className="mx-1 arrow" />
							<Link href={`/${crumbs.slice(0, index + 1).join('/')}`} title={name}>
								{name}
							</Link>
						</li>
					);
				})}
				{current && (
					<li className="breadcrumb-item current flex items-center">
						<FontAwesomeIcon icon={faChevronRight} size="2xs" className="mx-1 arrow" />
						<span aria-current="location">{current.replace(/-/g, ' ')}</span>
					</li>
				)}
			</ol>
		</nav>
	);
};
