import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { DetailPageResponse, ItemImage, PageType, ReWriteRule, SchemaType, Slug } from '@/model';
import { fetchDetailPage, fetchSeoMetaDataBySlug, generateSchema } from '@/lib';
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
	const seoMetaData = await fetchSeoMetaDataBySlug(slug as Slug);

	return {
		...seoMetaData,
		alternates: {
			canonical: `${baseUrl}${ReWriteRule[PageType.DetailPage]}${slug}`,
		},
	};
}

export default async function DetailPage({ params }: PageProps) {
	const slug = ensureLeadingSlash(params.slug[0]);
	const detailPage = await fetchDetailPage(slug as Slug);
	const detailPageImg = detailPage.imageCollection.items[0] as ItemImage;
	const jsonLd = generateSchema(detailPage, SchemaType.SCULPTURE, detailPageImg);
	return (
		<SectionContainer name={'detail'}>
			<SchemaTag schema={jsonLd} />
			<div className="container">
				<div className="detail-page page">
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
