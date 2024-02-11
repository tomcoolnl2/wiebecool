import * as React from 'react';
import { type PortfolioCardResponse, ReWriteRule, PageType } from '@/model';
import { Card } from '@/components';
import { type RenderComponentItem } from './hoc/RenderComponent';
import '@/css/components/portfolio-cards.css';

interface Props {
	item: RenderComponentItem;
}

export const PortfolioCards: React.FC<Props> = ({ item }) => {
	//
	const { detailPagesCollection } = item as PortfolioCardResponse;
	const cards = detailPagesCollection.items || [];

	if (!cards.length) {
		return null;
	}

	return (
		<aside className="portfolio-cards">
			{cards.map((card) => {
				const { id } = card.sys;
				const href = ReWriteRule[PageType.DetailPage] + card.slug;
				const img = card.imageCollection.items[0];
				return <Card key={id} id={id} href={href} title={card.title} img={img} />;
			})}
		</aside>
	);
};
