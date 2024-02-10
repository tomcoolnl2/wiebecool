import * as React from 'react';
import { ItemImage, PageType, ReWriteRule, SysID } from '@/model';
import { Card } from '@/components';
import { type RenderComponentItem } from './hoc/RenderComponent';
import '@/css/components/portfolio-cards.css';

interface PortfolioCard extends SysID {
	slug: string;
	title: string;
	imageCollection: {
		items: ItemImage[];
	};
}

export interface PortfolioCardResponse {
	__typename: 'PortfolioCards';
	detailPagesCollection: {
		items: PortfolioCard[];
	};
}

interface Props {
	item: RenderComponentItem;
}

export const PortfolioCardsComponent: React.FC<Props> = ({ item }) => {
	//
	const { detailPagesCollection } = item as PortfolioCardResponse;
	const cards = detailPagesCollection.items || [];

	if (!cards.length) {
		return null;
	}

	return (
		<aside className="portfolio-cards">
			{cards.map((card: PortfolioCard, i) => {
				const { id } = card.sys;
				const href = ReWriteRule[PageType.DetailPage] + card.slug;
				const img = card.imageCollection.items[0];
				return <Card key={id} id={id} href={href} title={card.title} img={img} />;
			})}
		</aside>
	);
};
