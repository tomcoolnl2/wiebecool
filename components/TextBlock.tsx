import * as React from 'react';
import { processRichText } from '@/lib';
import { TextBlockResponse } from '@/model';
import { RenderComponentItem } from '@/components';

interface Props {
	item: RenderComponentItem;
}

export const TextBlockComponent: React.FC<Props> = ({ item }) => {
	const { title = null, description } = item as TextBlockResponse;
	return (
		<div className="rich-text-block">
			{title && <h3>{title}</h3>}
			{processRichText(description.json)}
		</div>
	);
};
