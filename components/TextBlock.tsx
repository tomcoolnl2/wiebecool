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
		<div className="text-block w-full border-solid border-[#DFDFDF] border-b pb-5 mb-10 font-montserrat">
			{title && <h3>{title}</h3>}
			{processRichText(description.json)}
		</div>
	);
};
