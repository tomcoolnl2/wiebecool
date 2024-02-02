import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import * as React from 'react';
import MetaDataBySlugQuery from '@/graphql/MetaDataBySlug.gql';
import CollectionPageBySlugQuery from '@/graphql/CollectionPageBySlug.gql';
import DetailPagesByTagIDs from '@/graphql/DetailPagesByTagIDs.gql';
import { CollectionItems, PageType, ReWriteRule } from '@/model';
import { ensureLeadingSlash, fetchContentfulData, processRichText } from '@/lib';
import { SectionContainer, SectionTitle } from '@/components';

type Props = {
	params: { slug: string };
};

// /work serves as the base for both collections and detail pages
const collectionBaseUrl = ReWriteRule[PageType.DetailPage];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	//
	let slug = params?.slug?.[0] || collectionBaseUrl;
	slug = ensureLeadingSlash(slug);

	const {
		collectionPageCollection: {
			items: [{ seoMetaData }],
		},
	} = await fetchContentfulData(MetaDataBySlugQuery, { slug });

	const canonical =
		slug !== collectionBaseUrl
			? {
					alternates: {
						canonical: `https://www.wiebecool.nl${ReWriteRule[PageType.CollectionPage]}${slug}`,
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
	//
	let slug = params?.slug?.[0] || collectionBaseUrl;
	slug = ensureLeadingSlash(slug);

	const {
		collectionPageCollection: {
			items: [collectionPage],
		},
	} = await fetchContentfulData(CollectionPageBySlugQuery, { slug });

	let collection = {} as CollectionItems;
	if (collectionPage.tags?.length) {
		const { detailPageCollection } = await fetchContentfulData(DetailPagesByTagIDs, {
			tagIDs: [collectionPage.tags[0].toLowerCase()],
		});
		collection = detailPageCollection;
	}

	return (
		<SectionContainer name={'collection'}>
			<div className="container">
				<div className="collection-page pb-10 pt-24">
					<SectionTitle pageName={collectionPage.name} title={collectionPage.title} />
					{collectionPage.subtitle && <h2 className="mb-5">{collectionPage.subtitle}</h2>}
					{collectionPage.description && (
						<div className="richt-text-block">{processRichText(collectionPage.description.json)}</div>
					)}
					<div className="collection">
						{collection.items.map((item) => (
							<div key={item.sys.id} className="image-container image-container-square">
								{item.imageCollection.items.map((img) => (
									<Link href={collectionBaseUrl + ensureLeadingSlash(item.slug)} title={img.title}>
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
