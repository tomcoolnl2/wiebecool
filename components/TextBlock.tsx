import * as React from 'react';
import { processRichText } from '@/lib';
import { RenderComponentItem } from '@/components';

export interface TextBlock {
	__typename: 'TextBlock';
	description: any;
	title: string | null;
}

interface Props {
	item: RenderComponentItem;
}

export const TextBlockComponent: React.FC<Props> = ({ item }) => {
	const { title = null, description } = item as TextBlock;
	return (
		<div className="rich-text-block">
			{title && <h3>{title}</h3>}
			{processRichText(description.json)}
		</div>
	);
};
