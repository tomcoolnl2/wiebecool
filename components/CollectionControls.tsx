import Link from 'next/link';
import { OrderType, type Tag } from '@/model';

interface Props {
	path: string;
	tags: Tag[];
	sortOrder: OrderType;
	filter: string;
}

export const CollectionControls: React.FC<Props> = ({ path, tags, sortOrder, filter }) => (
	<nav role="navigation" className="collection-controls">
		<ul>
			<li className="collection-filter-item">
				<Link href={path} className={filter === null ? ' active cursor-default' : ''} scroll={false}>
					All
				</Link>
			</li>
			{tags.map((tag) => (
				<li key={tag.id} className="collection-filter-item">
					<Link
						href={`?filter=${tag.id}`}
						className={tag.id === filter ? ' active cursor-default' : ''}
						scroll={false}
					>
						{tag.name}
					</Link>
				</li>
			))}
			{/* <li>{collectionPage.sortingEnabled && <DropDown sortOrder={sortOrder || null} />}</li> */}
		</ul>
	</nav>
);
