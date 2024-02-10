import * as React from 'react';
import { processRichText } from '@/lib';
import { RenderComponentItem } from '@/components';
import type { TextBlockResponse } from '@/model';

interface Props {
	item: RenderComponentItem;
}

export const TextBlock: React.FC<Props> = ({ item }) => {
	const { title = null, description } = item as TextBlockResponse;
	return (
		<div className="rich-text-block">
			{title && <h3>{title}</h3>}
			{processRichText(description.json)}
		</div>
	);
};
