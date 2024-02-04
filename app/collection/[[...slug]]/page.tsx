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
import { SchemaTag, SectionContainer, SectionTitle } from '@/components';

type Props = {
	params: { slug: string };
};

// /work serves as the base for both collections and detail pages
const collectionBaseUrl = ReWriteRule[PageType.DetailPage];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	//
	let slug = params?.slug?.[0] || collectionBaseUrl;
	slug = ensureLeadingSlash(slug);
	const seoMetaData = await fetchSeoMetaDataBySlug(slug as Slug);

	const canonical =
		slug !== collectionBaseUrl
			? {
					alternates: {
						canonical: `${baseUrl}${ReWriteRule[PageType.CollectionPage]}${slug}`,
					},
			  }
			: {};

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
		<SectionContainer name={'collection'}>
			<SchemaTag schema={jsonLd} />
			<div className="container">
				<div className="collection-page page">
					<SectionTitle pageName={collectionPage.name} title={collectionPage.title} />
					{collectionPage.subtitle && <h2 className="mb-5">{collectionPage.subtitle}</h2>}
					{collectionPage.description && (
						<div className="rich-text-block">{processRichText(collectionPage.description.json)}</div>
					)}
					<div className="collection">
						{collectionPage.collection.map((item) => (
							<div key={item.sys.id} className="image-container image-container-bordered aspect-square">
								{item.imageCollection.items.map((img) => (
									<Link
										key={item.sys.id + '-img'}
										href={collectionBaseUrl + ensureLeadingSlash(item.slug)}
										title={img.title}
									>
										<Image
											src={img.url + '?w=300'}
											title={img.title}
											alt={img.description}
											width={400}
											height={400}
											className="zoomable-centered-image"
											priority
										/>
									</Link>
								))}
							</div>
						))}
					</div>
				</div>
			</div>
		</SectionContainer>
	);
}
