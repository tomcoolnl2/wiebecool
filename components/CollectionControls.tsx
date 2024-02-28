import Link from 'next/link';
import { faSortAlphaAsc, faSortAlphaDesc, faFilterCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OrderType, type Tag } from '@/model';
import { formatSearchParams } from '@/lib';

interface Props {
	path: string;
	tags: Tag[];
	sortOrder: OrderType | null;
	filter: string | null;
	sortingEnabled: boolean;
	sortingDisabled: boolean;
	filteringEnabled: boolean;
}

export const CollectionControls: React.FC<Props> = ({
	path,
	tags,
	sortOrder,
	filter,
	sortingEnabled,
	sortingDisabled,
	filteringEnabled,
}) => (
	<nav role="navigation" className={`collection-controls${sortingEnabled ? ' with-sorting' : ''}`}>
		{filteringEnabled ? (
			<ul>
				<li className="collection-filter-item">
					<Link
						href={path + formatSearchParams(sortOrder, null)}
						className={filter === null ? ' active' : ''}
						scroll={false}
					>
						All
					</Link>
				</li>
				{tags.map((tag) => (
					<li key={tag.id} className="collection-filter-item">
						<Link
							href={formatSearchParams(sortOrder, tag.id)}
							className={tag.id === filter ? ' active' : ''}
							scroll={false}
						>
							{tag.name}
						</Link>
					</li>
				))}
			</ul>
		) : null}
		{sortingEnabled ? (
			<>
				<div className={`collection-order-item${sortingDisabled ? ' disabled' : ''}`}>
					{sortOrder === OrderType.PAGE_TITLE_ASC ? (
						<Link href={formatSearchParams(OrderType.PAGE_TITLE_DESC, filter)} scroll={false}>
							<FontAwesomeIcon icon={faSortAlphaDesc} />
						</Link>
					) : (
						<Link href={formatSearchParams(OrderType.PAGE_TITLE_ASC, filter)} scroll={false}>
							<FontAwesomeIcon icon={faSortAlphaAsc} />
						</Link>
					)}
				</div>
				<div className="collection-order-reset">
					<Link href={path} scroll={false}>
						<FontAwesomeIcon icon={faFilterCircleXmark} />
					</Link>
				</div>
			</>
		) : null}
	</nav>
);
