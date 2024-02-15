import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import * as React from 'react';
import { CollectionPage, OrderType, PageParams, PageType, ReWriteRule, SchemaType, Slug } from '@/model';
import {
	ensureLeadingSlash,
	fetchCollectionPage,
	fetchSeoMetaDataBySlug,
	generateSchema,
	processRichText,
} from '@/lib';
import { SchemaTag, SectionContainer, PageHeader, DetailCardsCollection, CollectionControls } from '@/components';
import '@/css/pages/collection-page.css';

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = 3600; // 1hr

const collectionBaseUrl = ReWriteRule[PageType.CollectionPage];

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
	try {
		const slug = ensureLeadingSlash(params?.slug?.[0] || collectionBaseUrl);
		const seoMetaData = await fetchSeoMetaDataBySlug(slug as Slug);
		const response = {
			...seoMetaData,
			alternates: {
				canonical: `${ReWriteRule[PageType.CollectionPage]}${
					slug === ReWriteRule[PageType.CollectionPage] ? '' : slug
				}`,
			},
		};
		return response;
	} catch (error) {
		notFound();
	}
}

export default async function CollectionPage({ params, searchParams }: PageParams) {
	//
	const slug = ensureLeadingSlash(params?.slug?.[0] || collectionBaseUrl);
	const path = slug === collectionBaseUrl ? collectionBaseUrl : collectionBaseUrl + slug;
	const sortOrder = (searchParams?.order as OrderType) ?? null;

	let collectionPage: CollectionPage;
	try {
		collectionPage = await fetchCollectionPage(slug as Slug, sortOrder);
	} catch (error) {
		notFound();
	}

	const jsonLd = generateSchema(collectionPage, SchemaType.COLLECTION);

	const filter = searchParams?.filter ?? null;
	let cards = collectionPage.cards.filter((card) => card.contentfulMetadata.tags.find((tag) => tag.id === filter));
	if (!cards.length) {
		cards = collectionPage.cards;
	}

	return (
		<SectionContainer>
			<SchemaTag schema={jsonLd} />
			<div className="container">
				<div className="collection-page page">
					<PageHeader title={collectionPage.title} path={path} subtitle={collectionPage.subtitle} />
					{collectionPage.description && (
						<div className="rich-text-block">{processRichText(collectionPage.description.json)}</div>
					)}
					{collectionPage.sortingEnabled || collectionPage.filteringEnabled ? (
						<CollectionControls
							path={path}
							tags={collectionPage.contentfulMetadata.tags ?? []}
							sortOrder={sortOrder}
							filter={filter as string}
							sortingEnabled={collectionPage.sortingEnabled}
							sortingDisabled={cards.length < 2}
							filteringEnabled={collectionPage.filteringEnabled}
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
