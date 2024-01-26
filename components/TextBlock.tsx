import * as React from 'react';
import { processRichText } from '@/lib/utils';
import { RenderComponentItem } from './hoc/RenderComponent';

export interface TextBlock {
	__typename: 'TextBlock';
	description: any;
	title: string;
}

interface Props {
	item: RenderComponentItem;
}

export const TextBlockComponent: React.FC<Props> = ({ item }) => {
	const { title, description } = item as TextBlock;
	return (
		<div className="text-block w-full border-solid border-[#DFDFDF] border-b pb-[20px] mb-[30px] font-montserrat">
			{title && <h3>{title}</h3>}
			{processRichText(description.json)}
		</div>
	);
};
