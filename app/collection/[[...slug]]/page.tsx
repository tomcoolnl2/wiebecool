import { Metadata } from 'next';
import * as React from 'react';

import { PageType, ReWriteRule } from '@/model/page';
import { fetchContentfulData } from '@/lib/api';
import { ensureLeadingSlash } from '@/lib/utils';
import { SectionContainer } from '@/components/page/SectionContainer';
import { SectionTitle } from '@/components/page/SectionTitle';

import MetaDataBySlugQuery from '@/graphql/MetaDataBySlug.gql';
import CollectionPageBySlugQuery from '@/graphql/CollectionPageBySlug.gql';
import DetailPagesByTagIDs from '@/graphql/DetailPagesByTagIDs.gql';

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

	let collection = [];
	if (collectionPage.tags?.length) {
		const { detailPageCollection } = await fetchContentfulData(DetailPagesByTagIDs, {
			tagIDs: [collectionPage.tags[0]],
		});
		collection = detailPageCollection;
	}

	console.log(collection);

	return (
		<SectionContainer name={'portfolio'}>
			<h1>slug: {slug}</h1>
			<h1>tags: {collectionPage.tags[0]}</h1>
			{/* <div className="container">
				<div className="portfolio-page w-full h-auto clear-both float-left px-0 pt-[100px] pb-[40px]">
					<div className="section-title w-full h-auto clear-both float-left mb-[62px]">
						<div className="title_flex w-full h-auto clear-both flex justify-between items-end">
							<SectionTitle pageName={'Werk'} title={'Mijn Portfolio'} />
						</div>
					</div>
					<div className="list_wrapper w-full h-auto clear-both float-left">
						<p className="mb-[22px]">
							Jaren geleden heb ik mijzelf het beeldhouwen aangeleerd, in een vakantie, midden tussen de
							fascinerende stenen van Bretagne. Naast Megalithische, Griekse en Keltische kunst vind ik
							ook veel inspiratie in oude kathedralen en middeleeuwse beelden. <br />
							<br />
							Overal vandaan neem ik stenen mee terug uit de streken die ik bezoek en dan leg ik er thuis
							de opgedane impressies in vast. Ook meer eigentijdse meesters zoals{' '}
							<a href="https://en.wikipedia.org/wiki/Auguste_Rodin" target="_blank">
								Rodin
							</a>
							,{' '}
							<a href="https://en.wikipedia.org/wiki/Barbara_Hepworth" target="_blank">
								Barbara Hebworth
							</a>{' '}
							of{' '}
							<a href="https://en.wikipedia.org/wiki/Henry_Moore" target="_blank">
								Henry Moore
							</a>{' '}
							vind ik ongelooflijk mooi en inspirerend. In musea kijk ik vooral naar de beeldende kunst en
							loop ik er het liefst een paar keer omheen, op zoek naar de schoonheid in het stuk steen of
							hout.
							<br />
							<br />
						</p>
						<ul className="portfolio_list gallery_zoom ml-[-40px] list-none">
							<li className="image mb-[40px] float-left w-1/3 pl-[40px] item__">
								<div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
									<div
										className="entry w-full min-h-[420px]"
										data-title="Teresa Butler"
										data-category="Image"
									>
										<a
											className="popup_info"
											href="#"
											// // onClick={() => setPortfolioDetailsModal(detailData[0])}
										>
											<img
												className="opacity-0 absolute min-w-full"
												src="img/portfolio/wiebe_1.jpg" //THUMB
												alt="image"
											/>
											<div
												className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
												style={{
													backgroundImage: `url(img/portfolio/wiebe_1.jpg)`,
												}}
											/>
										</a>
									</div>
								</div>
							</li>
							<li className="image mb-[40px] float-left w-1/3 pl-[40px] item__">
								<div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
									<div
										className="entry w-full min-h-[420px]"
										data-title="Ashley Flores"
										data-category="Image"
									>
										<a
											className="popup_info"
											href="#"
											// // onClick={() => setPortfolioDetailsModal(detailData[0])}
										>
											<img
												className="opacity-0 absolute min-w-full"
												src="img/portfolio/wiebe_2.jpg" //THUMB
												alt="image"
											/>
											<div
												className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
												style={{
													backgroundImage: `url(img/portfolio/wiebe_2.jpg)`,
												}}
											/>
										</a>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div> */}
		</SectionContainer>
	);
}
