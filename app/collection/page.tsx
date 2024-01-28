import { Metadata } from 'next';
import * as React from 'react';
import { fetchContentfulData } from '@/lib/api';
import { SectionContainer } from '@/components/page/SectionContainer';
import { SectionTitle } from '@/components/page/SectionTitle';

import DetailPagesByTagIDs from '@/graphql/DetailPagesByTagIDs.gql';
import CollectionPageQuery from '@/graphql/CollectionPage.gql';
import MetaDataQuery from '@/graphql/MetaData.gql';

export async function generateMetadata(): Promise<Metadata> {
	const { seoMetaData } = await fetchContentfulData(MetaDataQuery, { sysID: '4t5dOaAjpOJfBvz8OKwkPF' });
	return seoMetaData;
}

export default async function CollectionPage() {
	//
	const { collectionPage } = await fetchContentfulData(CollectionPageQuery, { sysID: '2l4HrRXbjqjHOjnmaewXf' });

	let collection = [];
	if (collectionPage.tags?.length) {
		const { detailPageCollection } = await fetchContentfulData(DetailPagesByTagIDs, {
			tagIDs: [collectionPage.tags[0]],
		});
		collection = detailPageCollection;
	}

	// console.log(collection);

	return (
		<SectionContainer name={'portfolio'}>
			<div className="container">
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
			</div>
		</SectionContainer>
	);
}
