'use client';
import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { OrderType, type DetailCollectionItem, type Tag } from '@/model';
import { CollectionControls } from '@/components/CollectionControls';
import { DetailCardsCollection } from '@/components/DetailCardsCollection';

interface Props {
	path: string;
	cards: DetailCollectionItem[];
	tags: Tag[];
	sortingEnabled: boolean;
	filteringEnabled: boolean;
}

export const CollectionCards: React.FC<Props> = ({ path, cards: allCards, tags, sortingEnabled, filteringEnabled }) => {
	const searchParams = useSearchParams();
	const sortOrder = (searchParams.get('order') as OrderType) ?? null;
	const filter = searchParams.get('filter');

	let cards = allCards.filter((card) => card.contentfulMetadata.tags.find((tag) => tag.id === filter));
	if (!cards.length) {
		cards = allCards;
	}

	if (!sortOrder) {
		cards = [...cards].sort((a, b) => {
			if (a.priority && !b.priority) {
				return -1; // a comes before b
			} else if (!a.priority && b.priority) {
				return 1; // b comes before a
			} else {
				return 0; // leave them unchanged
			}
		});
	}

	return (
		<>
			{sortingEnabled || filteringEnabled ? (
				<CollectionControls
					path={path}
					tags={tags ?? []}
					sortOrder={sortOrder}
					filter={filter as string}
					sortingEnabled={sortingEnabled}
					allowSorting={cards.length >= 2}
					filteringEnabled={filteringEnabled}
				/>
			) : null}
			<section>
				<DetailCardsCollection cards={cards} />
			</section>
		</>
	);
};

export default CollectionCards;
