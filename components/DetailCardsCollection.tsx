import * as React from 'react';
import { ReWriteRule, PageType, DetailCollectionItem } from '@/model';
import { Card, CardMotion } from '@/components';
import { ensureLeadingSlash } from '@/lib';
import { randomUUID } from 'crypto';

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
					<li key={randomUUID()}>
						<CardMotion>
							<Card id={id} href={href} title={card.title} img={img} />
						</CardMotion>
					</li>
				);
			})}
		</ul>
	);
};
