import { BLOCKS, INLINES, Document } from '@contentful/rich-text-types';

export const mockRichTextParagraph: Document = {
	nodeType: BLOCKS.DOCUMENT,
	data: {},
	content: [
		{
			nodeType: BLOCKS.PARAGRAPH,
			content: [
				{
					nodeType: 'text',
					value: 'Hello world',
					marks: [],
					data: {},
				},
			],
			data: {},
		},
	],
};

export const mockRichTextWithHyperLink: Document = {
	nodeType: BLOCKS.DOCUMENT,
	data: {},
	content: [
		{
			nodeType: BLOCKS.PARAGRAPH,
			content: [
				{
					nodeType: 'text',
					value: 'Hello',
					marks: [],
					data: {},
				},
				{
					nodeType: INLINES.HYPERLINK,
					content: [
						{
							nodeType: 'text',
							value: 'world',
							marks: [],
							data: {},
						},
					],
					data: {
						uri: 'https://example.com',
					},
				},
			],
			data: {},
		},
	],
};
