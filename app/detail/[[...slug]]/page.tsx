import { Metadata } from 'next';
import Image from 'next/image';
import { ItemImage } from '@/model';

import { ensureLeadingSlash, fetchContentfulData } from '@/lib';
import { SectionContainer, SectionTitle } from '@/components';
import DetailPageBySlugQuery from '@/graphql/DetailPageBySlug.gql';
import MetaDataBySlugQuery from '@/graphql/MetaDataBySlug.gql';

type Props = {
	params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	//
	const slug = ensureLeadingSlash(params.slug[0]);
	const {
		detailPageCollection: {
			items: [{ seoMetaData }],
		},
	} = await fetchContentfulData(MetaDataBySlugQuery, { slug });

	return {
		...seoMetaData,
		alternates: {
			canonical: `https://www.wiebecool.nl/werk${slug}`,
		},
	};
}

export default async function DetailPage({ params }: Props) {
	//
	const slug = ensureLeadingSlash(params.slug[0]);
	console.log(slug);
	const {
		detailPageCollection: {
			items: [detailPage],
		},
	} = await fetchContentfulData(DetailPageBySlugQuery, { slug });

	console.log(detailPage);

	return (
		<SectionContainer name={'collection'}>
			<div className="container">
				<div className="detail-page pb-10 pt-24">
					<SectionTitle pageName={detailPage.name} title={detailPage.title} />
					<div className="image-container">
						{detailPage.imagesCollection.items.map((img: ItemImage) => (
							<div className="image-container image-container-portrait">
								<Image
									src={img.url + '?w=400'}
									title={img.title}
									alt={img.description}
									width={400}
									height={400}
									className="zoomable-centered-image"
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</SectionContainer>
	);
}
