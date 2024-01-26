import * as React from 'react';
import { processRichText } from '@/lib/utils';

export interface TextBlock {
	__typename: 'TextBlock';
	description: any;
	title: string;
}

interface Props {
	item: TextBlock;
}

export const TextBlockComponent: React.FC<Props> = ({ item: { title, description } }) => {
	console.log(description);

	return (
		<div className="about-text w-full border-solid border-[#DFDFDF] border-b pb-[20px] mb-[30px]">
			<h3>{title}</h3>
			{processRichText(description.json)}
		</div>
	);
};
