import Link from 'next/link';
import { faSortAlphaAsc, faSortAlphaDesc, faFilterCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OrderType, type Tag } from '@/model';

/**
 * Formats search parameters based on the provided order and filter values.
 * @param {OrderType | null} order - The order parameter value.
 * @param {string | null} filter - The filter parameter value.
 * @returns {string} The formatted search parameters string.
 */
function formatSearchParams(order: OrderType | null, filter: string | null): string {
	const params = new URLSearchParams();
	if (order) {
		params.set('order', order);
	}
	if (filter) {
		params.set('filter', filter);
	}
	const searchParams = params.toString();
	return searchParams ? '?' + searchParams : '';
}

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
						Alles
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
