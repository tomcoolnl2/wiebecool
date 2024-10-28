import * as React from 'react';
import { ReWriteRule, PageType, DetailCollectionItem } from '@/model';
import { Card, CardMotion } from '@/components';
import { ensureLeadingSlash } from '@/lib';
import { randomUUID } from 'crypto';

interface Props {
	cards: DetailCollectionItem[];
	omitWhen?: number | null;
}

export const DetailCardsCollection: React.FC<Props> = ({ cards, omitWhen = null }) => {
	if (!cards.length || (omitWhen !== null && cards.length < omitWhen)) {
		return null;
	}
	return (
		<ul className="detail-cards-collection">
			{cards.map((card, i) => {
				const delay = 0.25 + (i / (cards.length - 1)) * 0.75;
				const { id } = card.sys;
				const href = ReWriteRule[PageType.DetailPage] + ensureLeadingSlash(card.slug);
				const img = card.imageCollection.items[0];
				return (
					<li key={randomUUID()}>
						{/* randomUUID key on re-render makes sure animations will work on all items when a collection updates */}
						<CardMotion delay={delay} card={<Card id={id} href={href} title={card.title} img={img} />} />
					</li>
				);
			})}
		</ul>
	);
};
