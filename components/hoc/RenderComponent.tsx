import * as React from 'react';
import type { TextBlockResponse, PortfolioCardResponse } from '@/model';
// importing components separately to avoid circular dependencies
import { TextBlock as TextBlockComponent } from '@/components/TextBlock';
import { PortfolioCards as PortfolioCardsComponent } from '@/components/PortfolioCards';

export type RenderComponentItem = TextBlockResponse | PortfolioCardResponse;

interface ComponentMap {
	[key: string]: React.ComponentType<{ item: RenderComponentItem }>;
}

const ComponentMap: ComponentMap = {
	TextBlock: TextBlockComponent,
	PortfolioCards: PortfolioCardsComponent,
};

interface RenderComponentProps {
	item: RenderComponentItem;
}

export const RenderComponent: React.FC<RenderComponentProps> = ({ item }) => {
	const Component = ComponentMap[item.__typename];
	if (!Component) {
		console.error(`Component for typename ${item.__typename} not found`);
		return null;
	}
	return <Component item={item} />;
};
