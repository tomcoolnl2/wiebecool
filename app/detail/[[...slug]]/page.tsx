'use server';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { PageType, ReWriteRule, SchemaType, Slug } from '@/model';
import { fetchDetailPage, fetchSeoMetaDataBySlug, formatStatus, generateSchema, toLocaleDateString } from '@/lib';
import { baseUrl, ensureLeadingSlash, processRichText } from '@/lib';
import { ContactDetails, SchemaTag, SectionContainer, PageHeader } from '@/components';
import '@/css/pages/detail-page.css';

const Carousel = dynamic(() => import('@/components/Carousel'), { ssr: false });

type PageProps = {
	params: { slug: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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
	const detailPageImg = detailPage.imageCollection.items[0];
	const jsonLd = generateSchema(detailPage, SchemaType.SCULPTURE, detailPageImg);
	return (
		<SectionContainer>
			<SchemaTag schema={jsonLd} />
			<div className="container">
				<div className="detail-page page">
					<PageHeader title={detailPage.title} pageType={PageType.DetailPage} />
					{detailPage.description && (
						<div className="rich-text-block">{processRichText(detailPage.description.json)}</div>
					)}
					<div className="detail-page-details-wrapper">
						<div className="detail-page-main-image-wrapper">
							<div className="detail-page-main-image image-container-bordered">
								<Image
									src={detailPageImg.url + '?w=700'}
									title={detailPageImg.title}
									alt={detailPageImg.description}
									width={700}
									height={700}
								/>
							</div>
						</div>
						<div className="detail-page-details">
							<ul>
								<li>
									<span className="label">Status:</span>
									<span>{(detailPage.status && formatStatus(detailPage.status)) ?? '-'}</span>
								</li>
								<li>
									<span className="label">Datum:</span>
									<span>
										{(detailPage.creationDate && toLocaleDateString(detailPage.creationDate)) ??
											'-'}
									</span>
								</li>
								<li>
									<span className="label">Materiaal:</span>
									<span>{detailPage.material ?? '-'}</span>
								</li>
								{detailPage.dimensions && (
									<li>
										<span className="label">Dimenties:</span>
										<span>{detailPage.dimensions}</span>
									</li>
								)}
							</ul>
						</div>
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
