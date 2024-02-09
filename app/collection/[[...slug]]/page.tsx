import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import * as React from 'react';
import { PageType, ReWriteRule, SchemaType, Slug } from '@/model';
import {
	baseUrl,
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

type Props = {
	params: { slug: string };
};

const collectionBaseUrl = ReWriteRule[PageType.CollectionPage];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	//
	let slug = params?.slug?.[0] || collectionBaseUrl;
	slug = ensureLeadingSlash(slug);
	const seoMetaData = await fetchSeoMetaDataBySlug(slug as Slug);

	const canonical = {
		alternates: {
			canonical: `${ReWriteRule[PageType.CollectionPage]}${
				slug === ReWriteRule[PageType.CollectionPage] ? '' : slug
			}`,
		},
	};

	const response = {
		...seoMetaData,
		...canonical,
	};

	return response;
}

export default async function CollectionPage({ params }: Props) {
	let slug = params?.slug?.[0] || collectionBaseUrl;
	slug = ensureLeadingSlash(slug);
	const collectionPage = await fetchCollectionPage(slug as Slug);
	const jsonLd = generateSchema(collectionPage, SchemaType.COLLECTION);
	return (
		<SectionContainer>
			<SchemaTag schema={jsonLd} />
			<div className="container">
				<div className="collection-page page">
					<PageHeader
						pageType={PageType.CollectionPage}
						title={collectionPage.title}
						subtitle={collectionPage.subtitle}
					/>
					{collectionPage.description && (
						<div className="rich-text-block">{processRichText(collectionPage.description.json)}</div>
					)}
					<div className="collection">
						{collectionPage.collection.map((item) => (
							<figure
								key={item.sys.id}
								className="shadow-slate-800 shadow-lg image-container image-container-bordered aspect-square"
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
