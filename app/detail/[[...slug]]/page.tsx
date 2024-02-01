import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import DetailPageBySlugQuery from '@/graphql/DetailPageBySlug.gql';
import MetaDataBySlugQuery from '@/graphql/MetaDataBySlug.gql';

import { ensureLeadingSlash, fetchContentfulData, processRichText } from '@/lib';
import { ContactDetails, SectionContainer, SectionTitle } from '@/components';
const Carousel = dynamic(() => import('@/components/Carousel'), { ssr: false });

import '@/css/pages/detail-page.css';

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

	const {
		detailPageCollection: {
			items: [detailPage],
		},
	} = await fetchContentfulData(DetailPageBySlugQuery, { slug });

	const detailPageImg = detailPage.imageCollection.items[0];

	return (
		<SectionContainer name={'collection'}>
			<div className="container">
				<div className="detail-page pb-10 pt-24">
					<SectionTitle pageName={detailPage.name} title={detailPage.title} />
					{detailPage.description && (
						<div className="richt-text-block">{processRichText(detailPage.description.json)}</div>
					)}
					<div className="detail-page-main-image image-container image-container-portrait">
						<Image
							src={detailPageImg.url + '?w=400'}
							title={detailPageImg.title}
							alt={detailPageImg.description}
							width={400}
							height={400}
							className="zoomable-centered-image"
						/>
					</div>
					{detailPage.imageCarousel?.imageCollection && <Carousel {...detailPage.imageCarousel} />}
					<aside className="text-block pt-5 pb-8 mt-8 text-center">
						<ContactDetails />
					</aside>
				</div>
			</div>
		</SectionContainer>
	);
}
