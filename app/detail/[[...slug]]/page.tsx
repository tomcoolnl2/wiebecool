import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import DetailPageBySlugQuery from '@/graphql/DetailPageBySlug.gql';
import MetaDataBySlugQuery from '@/graphql/MetaDataBySlug.gql';
import { DetailPageResponse, ItemImage, PageType, ReWriteRule, SchemaType } from '@/model';
import { generateSchema } from '../../../lib/schema';
import { baseUrl, ensureLeadingSlash, fetchContentfulData, processRichText } from '@/lib';
import { ContactDetails, SchemaTag, SectionContainer, SectionTitle } from '@/components';
import '@/css/pages/detail-page.css';

const Carousel = dynamic(() => import('@/components/Carousel'), { ssr: false });

type PageProps = {
	params: { slug: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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
			canonical: `${baseUrl}${ReWriteRule[PageType.ContactPage]}${slug}`,
		},
	};
}

export default async function DetailPage({ params }: PageProps) {
	//
	const slug = ensureLeadingSlash(params.slug[0]);

	const {
		detailPageCollection: { items },
	} = await fetchContentfulData(DetailPageBySlugQuery, { slug });

	const detailPage = items[0] as DetailPageResponse;
	const detailPageImg = detailPage.imageCollection.items[0] as ItemImage;
	const jsonLd = generateSchema(detailPage, detailPageImg, SchemaType.SCULPTURE);

	console.log(jsonLd);

	return (
		<SectionContainer name={'detail'}>
			<SchemaTag schema={jsonLd} />
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
