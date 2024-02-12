import { Metadata } from 'next';
import * as React from 'react';
import { OrderType, PageParams, PageType, ReWriteRule, SchemaType, Slug } from '@/model';
import {
	ensureLeadingSlash,
	fetchCollectionPage,
	fetchSeoMetaDataBySlug,
	generateSchema,
	processRichText,
} from '@/lib';
import { SchemaTag, SectionContainer, PageHeader, DropDown, DetailCardsCollection } from '@/components';
import '@/css/pages/collection-page.css';

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = 3600; // 1hr

const collectionBaseUrl = ReWriteRule[PageType.CollectionPage];

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
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
}

export default async function CollectionPage({ params, searchParams }: PageParams) {
	const slug = ensureLeadingSlash(params?.slug?.[0] || collectionBaseUrl);
	const path = slug === collectionBaseUrl ? collectionBaseUrl : collectionBaseUrl + slug;
	const sortOrder = (searchParams?.order as OrderType) || null;
	const collectionPage = await fetchCollectionPage(slug as Slug, sortOrder);
	const jsonLd = generateSchema(collectionPage, SchemaType.COLLECTION);
	return (
		<SectionContainer>
			<SchemaTag schema={jsonLd} />
			<div className="container">
				<div className="collection-page page">
					<PageHeader title={collectionPage.title} path={path} subtitle={collectionPage.subtitle} />
					{collectionPage.description && (
						<div className="rich-text-block">{processRichText(collectionPage.description.json)}</div>
					)}
					{collectionPage.sortingEnabled && (
						<div className="collection-options">
							<DropDown sortOrder={sortOrder || null} />
						</div>
					)}
					<section>
						<DetailCardsCollection cards={collectionPage.cards} />
					</section>
				</div>
			</div>
		</SectionContainer>
	);
}
