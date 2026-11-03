import { Metadata } from 'next';
import * as React from 'react';
import { type CollectionPage, OrderType, type PageParams, PageType, ReWriteRule, SchemaType } from '@/model';
import { fetchData, ensureLeadingSlash, fetchCollectionPage, fetchSitemap, generateSchema, processRichText } from '@/lib';
import { SchemaTag, SectionContainer, PageHeader, CollectionCards } from '@/components';
import '@/css/pages/collection-page.css';

// Revalidate periodically since this is a statically-generated route but the
// underlying Contentful content (new/edited artwork) can change between builds.
export const revalidate = 3600; // 1hr

const collectionBaseUrl = ReWriteRule[PageType.CollectionPage];

export async function generateStaticParams() {
	const { collectionPages } = await fetchSitemap();
	return collectionPages.map((page) => {
		const bareSlug = page.slug.replace(/^\//, '');
		const isRoot = ensureLeadingSlash(bareSlug) === collectionBaseUrl;
		return { slug: isRoot ? [] : [bareSlug] };
	});
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
	const resolvedParams = await params;
	const slug = ensureLeadingSlash(resolvedParams?.slug?.[0] || collectionBaseUrl);
	const { seoMetaData } = await fetchData(() => fetchCollectionPage(slug, OrderType.PUBLISHED_FIRST_DESC));
	return {
		...seoMetaData,
		alternates: {
			canonical: `${ReWriteRule[PageType.CollectionPage]}${slug === ReWriteRule[PageType.CollectionPage] ? '' : slug}`,
		},
	};
}

export default async function CollectionPage({ params }: PageParams) {
	//
	const resolvedParams = await params;
	const slug = ensureLeadingSlash(resolvedParams?.slug?.[0] || collectionBaseUrl);
	const path = slug === collectionBaseUrl ? collectionBaseUrl : collectionBaseUrl + slug;
	const { content } = await fetchData(() => fetchCollectionPage(slug, OrderType.PAGE_TITLE_ASC));
	const jsonLd = await generateSchema({ content, schemaType: SchemaType.COLLECTION });

	return (
		<SectionContainer>
			<SchemaTag schema={jsonLd} />
			<div className="container">
				<div className="collection-page page">
					<PageHeader title={content.title} path={path} subtitle={content.subtitle} />
					{content.description && <div className="rich-text-block">{processRichText(content.description.json)}</div>}
					<CollectionCards
						path={path}
						cards={content.cards}
						tags={content.contentfulMetadata.tags ?? []}
						sortingEnabled={content.sortingEnabled}
						filteringEnabled={content.filteringEnabled}
					/>
				</div>
			</div>
		</SectionContainer>
	);
}
