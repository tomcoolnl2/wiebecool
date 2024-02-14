'use server';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { PageParams, PageType, ReWriteRule, SchemaType, Slug } from '@/model';
import {
	capitalize,
	fetchDetailPage,
	fetchSeoMetaDataBySlug,
	formatStatus,
	generateSchema,
	toLocaleDateString,
} from '@/lib';
import { baseUrl, ensureLeadingSlash, processRichText } from '@/lib';
import {
	ContactDetails,
	SchemaTag,
	SectionContainer,
	PageHeader,
	ShareSocials,
	DetailCardsCollection,
} from '@/components';
import '@/css/pages/detail-page.css';

const Carousel = dynamic(() => import('@/components/Carousel'), { ssr: false });

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
	const slug = ensureLeadingSlash(params.slug[0]);
	const seoMetaData = await fetchSeoMetaDataBySlug(slug as Slug);
	return {
		...seoMetaData,
		alternates: {
			canonical: `${baseUrl}${ReWriteRule[PageType.DetailPage]}${slug}`,
		},
	};
}

export default async function DetailPage({ params }: PageParams) {
	const slug = ensureLeadingSlash(params.slug[0]);
	const detailPage = await fetchDetailPage(slug as Slug);
	const detailPageImg = detailPage.imageCollection.items[0];
	const jsonLd = generateSchema(detailPage, SchemaType.SCULPTURE, detailPageImg);
	const path = ReWriteRule[PageType.DetailPage] + slug;
	const tags = detailPage.contentfulMetadata.tags;
	const hashtags = tags.map((tag) => capitalize(tag.name));
	return (
		<SectionContainer>
			<SchemaTag schema={jsonLd} />
			<div className="container">
				<div className="detail-page page">
					<PageHeader title={detailPage.title} path={path} />
					{detailPage.description && (
						<div className="rich-text-block">{processRichText(detailPage.description.json)}</div>
					)}
					<div className="detail-page-details-wrapper">
						<div className="detail-page-main-image-wrapper">
							<div className="detail-page-main-image image-container image-container-bordered">
								<Image
									src={detailPageImg.url + '?w=620&fm=jpg&fl=progressive'}
									title={detailPageImg.title}
									alt={detailPageImg.description}
									priority
									width={700}
									height={700}
								/>
							</div>
						</div>
						<div className="detail-page-details">
							<ul className="detail-page-detail-list">
								<li>
									<span className="label">Status:</span>
									<span>{(detailPage.status && formatStatus(detailPage.status)) ?? '-'}</span>
								</li>
								{detailPage.creationDate && (
									<li>
										<span className="label">Datum:</span>
										<span>{toLocaleDateString(detailPage.creationDate) ?? '-'}</span>
									</li>
								)}
								<li>
									<span className="label">Materiaal:</span>
									<span>{detailPage.material ?? '-'}</span>
								</li>
								{detailPage.dimensions && (
									<li>
										<span className="label">Afmetingen:</span>
										<span>{detailPage.dimensions}</span>
									</li>
								)}
							</ul>
							<ContactDetails subject={detailPage.title} showAddress={false} />
							<ShareSocials
								title={detailPage.title}
								url={`${baseUrl}${path}`}
								media={detailPageImg.url}
								tags={[detailPage.material || '', ...hashtags]}
							/>
						</div>
					</div>
					{detailPage.imageCarousel?.imageCollection && <Carousel {...detailPage.imageCarousel} />}
					{detailPage.cards.length && detailPage.cards.length > 1 ? (
						<>
							<hr />
							<aside className="related-items detail-cards-collection-4">
								<h3 className="page-header-subtitle">Anderen bekeken ook:</h3>
								<DetailCardsCollection cards={detailPage.cards} omitWhen={2} />
							</aside>
						</>
					) : null}
				</div>
			</div>
		</SectionContainer>
	);
}
