import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { type DetailPage, type PageParams, PageType, ReWriteRule, SchemaType } from '@/model';
import { fetchData, capitalize, fetchDetailPage, formatPrice, generateSchema, toLocaleDateString, fetchGlobalConfig, fetchArtist } from '@/lib';
import { ensureLeadingSlash, processRichText } from '@/lib';
import { ContactDetails, SchemaTag, SectionContainer, PageHeader, ShareSocials, DetailCardsCollection } from '@/components';
import '@/css/pages/detail-page.css';

const Carousel = dynamic(() => import('@/components/Carousel'), { ssr: false });

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
	const slug = ensureLeadingSlash(params.slug[0]);
	const [{ baseUrl }, { seoMetaData }] = await Promise.all([fetchGlobalConfig(), fetchData(() => fetchDetailPage(slug))]);
	return {
		...seoMetaData,
		alternates: {
			canonical: `${baseUrl}${ReWriteRule[PageType.DetailPage]}${slug}`,
		},
	};
}

export default async function DetailPage({ params }: PageParams) {
	//
	const slug = ensureLeadingSlash(params.slug[0]);
	const fetchDetailPageBySlug = () => fetchDetailPage(slug);
	const [{ baseUrl }, { content }, artist] = await Promise.all([fetchGlobalConfig(), fetchData(fetchDetailPageBySlug), fetchArtist()]);

	const detailPageImg = content.imageCollection.items[0];
	const jsonLd = await generateSchema({ content, artist, schemaType: SchemaType.SCULPTURE, img: detailPageImg });
	const path = ReWriteRule[PageType.DetailPage] + slug;
	const tags = content.contentfulMetadata.tags;
	const hashtags = tags.map((tag) => capitalize(tag.name));
	const price = (await formatPrice(content.price)) ?? '-';

	return (
		<SectionContainer>
			<SchemaTag schema={jsonLd} />
			<div className="container">
				<div className="detail-page page">
					<PageHeader title={content.title} path={path} />
					{content.description && <div className="rich-text-block">{processRichText(content.description.json)}</div>}
					<div className="detail-page-details-wrapper">
						<figure className="detail-page-main-image-wrapper">
							<div className="detail-page-main-image image-container image-container-bordered">
								<Image
									src={detailPageImg.url + '?w=620&fm=jpg&fl=progressive'}
									title={detailPageImg.title}
									alt={detailPageImg.description || content.title}
									priority
									width={700}
									height={700}
								/>
							</div>
							{content.mainImageAuthor?.name ? (
								<figcaption className="image-author">
									Foto:&nbsp;
									<a href={content.mainImageAuthor.url} target="_blank" rel="noopener noreferrer">
										{content.mainImageAuthor.name}
									</a>
								</figcaption>
							) : null}
						</figure>
						<div className="detail-page-details">
							<ul className="detail-page-detail-list">
								{content.status && (
									<li>
										<span className="label">Status:</span>
										<span>{content.status}</span>
									</li>
								)}
								{content.price && (
									<li>
										<span className="label">Prijs:</span>
										<span>{price}</span>
									</li>
								)}
								{content.creationDate && (
									<li>
										<span className="label">Datum:</span>
										<span>{toLocaleDateString(content.creationDate)}</span>
									</li>
								)}
								<li>
									<span className="label">Materiaal:</span>
									<span>{content.material ?? '-'}</span>
								</li>
								{content.dimensions && (
									<li>
										<span className="label">Afmetingen:</span>
										<span>{content.dimensions}</span>
									</li>
								)}
							</ul>
							<ContactDetails subject={content.title} showAddress={false} artist={artist} />
							<ShareSocials
								title={content.title}
								url={`${baseUrl}${path}`}
								media={detailPageImg.url}
								tags={[content.material || '', ...hashtags]}
								artist={artist}
							/>
						</div>
					</div>
					{content.imageCarousel?.imageCollection && <Carousel {...content.imageCarousel} />}
					{content.cards.length && content.cards.length > 1 ? (
						<>
							<hr />
							<aside className="related-items detail-cards-collection-4">
								<h3 className="page-header-subtitle">Anderen bekeken ook:</h3>
								<DetailCardsCollection cards={content.cards} omitWhen={2} />
							</aside>
						</>
					) : null}
				</div>
			</div>
		</SectionContainer>
	);
}
