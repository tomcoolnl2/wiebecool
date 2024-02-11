import * as React from 'react';
import { ReWriteRule, PageType, DetailCollectionItem } from '@/model';
import { Card } from '@/components';
import { ensureLeadingSlash } from '@/lib';

interface Props {
	cards: DetailCollectionItem[];
	omitWhen?: number | null;
}

export const DetailCardsCollection: React.FC<Props> = async ({ cards, omitWhen = null }) => {
	//
	if (!cards.length || (omitWhen !== null && cards.length < omitWhen)) {
		return null;
	}

	return (
		<ul className="detail-cards-collection">
			{cards.map((card) => {
				const { id } = card.sys;
				const href = ReWriteRule[PageType.DetailPage] + ensureLeadingSlash(card.slug);
				const img = card.imageCollection.items[0];
				return (
					<li key={id}>
						<Card id={id} href={href} title={card.title} img={img} />
					</li>
				);
			})}
		</ul>
	);
};
