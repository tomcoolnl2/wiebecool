import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import * as React from 'react';
import { PageParams, PageType, ReWriteRule, SchemaType, Slug } from '@/model';
import {
	ensureLeadingSlash,
	fetchCollectionPage,
	fetchSeoMetaDataBySlug,
	generateSchema,
	processRichText,
} from '@/lib';
import { SchemaTag, SectionContainer, PageHeader } from '@/components';
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

export default async function CollectionPage({ params }: PageParams) {
	const slug = ensureLeadingSlash(params?.slug?.[0] || collectionBaseUrl);
	const path = slug === collectionBaseUrl ? collectionBaseUrl : collectionBaseUrl + slug;
	const collectionPage = await fetchCollectionPage(slug as Slug);
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
					<div className="collection">
						{collectionPage.collection.map((item) => (
							<figure
								key={item.sys.id}
								className="collection-item image-container image-container-bordered"
							>
								{item.imageCollection.items.map((img) => (
									<Link
										key={item.sys.id + '-img'}
										href={ReWriteRule[PageType.DetailPage] + ensureLeadingSlash(item.slug)}
										title={img.title}
									>
										<Image
											src={img.url + '?w=300'}
											title={img.title}
											alt={img.description}
											width={400}
											height={400}
											className="image-centered image-zoomable"
											priority
										/>
										<figcaption className="image-caption">{item.title}</figcaption>
									</Link>
								))}
							</figure>
						))}
					</div>
				</div>
			</div>
		</SectionContainer>
	);
}
