import { Metadata } from 'next';
import * as React from 'react';
import { type CollectionPage, OrderType, type PageParams, PageType, ReWriteRule, SchemaType } from '@/model';
import { fetchData, ensureLeadingSlash, fetchCollectionPage, generateSchema, processRichText } from '@/lib';
import { SchemaTag, SectionContainer, PageHeader, DetailCardsCollection, CollectionControls } from '@/components';
import '@/css/pages/collection-page.css';

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
// turned off because the content is not expected to change frequently
// export const revalidate = 3600; // 1hr

const collectionBaseUrl = ReWriteRule[PageType.CollectionPage];

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
	const slug = ensureLeadingSlash(params?.slug?.[0] || collectionBaseUrl);
	const { seoMetaData } = await fetchData(() => fetchCollectionPage(slug, OrderType.PUBLISHED_FIRST_DESC));
	return {
		...seoMetaData,
		alternates: {
			canonical: `${ReWriteRule[PageType.CollectionPage]}${slug === ReWriteRule[PageType.CollectionPage] ? '' : slug}`,
		},
	};
}

export default async function CollectionPage({ params, searchParams }: PageParams) {
	//
	const slug = ensureLeadingSlash(params?.slug?.[0] || collectionBaseUrl);
	const path = slug === collectionBaseUrl ? collectionBaseUrl : collectionBaseUrl + slug;
	const sortOrder = (searchParams?.order as OrderType) ?? null;
	const { content } = await fetchData(() => fetchCollectionPage(slug, OrderType.PAGE_TITLE_ASC));
	const jsonLd = await generateSchema({ content, schemaType: SchemaType.COLLECTION });

	const filter = searchParams?.filter ?? null;
	let cards = content.cards.filter((card) => card.contentfulMetadata.tags.find((tag) => tag.id === filter));
	if (!cards.length) {
		cards = content.cards;
	}

	if (!sortOrder) {
		cards = cards.sort((a, b) => {
			if (a.priority && !b.priority) {
				return -1; // a comes before b
			} else if (!a.priority && b.priority) {
				return 1; // b comes before a
			} else {
				return 0; // leave them unchanged
			}
		});
	}

	return (
		<SectionContainer>
			<SchemaTag schema={jsonLd} />
			<div className="container">
				<div className="collection-page page">
					<PageHeader title={content.title} path={path} subtitle={content.subtitle} />
					{content.description && <div className="rich-text-block">{processRichText(content.description.json)}</div>}
					{content.sortingEnabled || content.filteringEnabled ? (
						<CollectionControls
							path={path}
							tags={content.contentfulMetadata.tags ?? []}
							sortOrder={sortOrder}
							filter={filter as string}
							sortingEnabled={content.sortingEnabled}
							allowSorting={cards.length >= 2}
							filteringEnabled={content.filteringEnabled}
						/>
					) : null}
					<section>
						<DetailCardsCollection cards={cards} />
					</section>
				</div>
			</div>
		</SectionContainer>
	);
}
