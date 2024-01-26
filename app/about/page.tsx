import Image from 'next/image';
import { Metadata } from 'next';
import * as React from 'react';
import { parseSeoMetaDataQuery } from '@/lib/utils';
import { fetchContentfulData } from '@/lib/api';
import { SectionContainer } from '@/components/page/SectionContainer';
import { SectionTitle } from '@/components/page/SectionTitle';
import { ContactDetails } from '@/components/ContactDetails';
import { RenderComponent, type RenderComponentItem } from '@/components/hoc/RenderComponent';

export async function generateMetadata(): Promise<Metadata> {
	const pageSeoQuery = parseSeoMetaDataQuery('70FCDbDpk8iLUWWHAU76Ge');
	const { seoMetaData } = await fetchContentfulData(pageSeoQuery);
	return seoMetaData;
}

const pageQuery = `
	query AboutPage {
		aboutPage(id: "3LaYVXJtqbtQYH38PqSkeQ") {
			slug
			title
			name
			bannerImage {
				width
				height
				url
				description
			}
			buildingBlocksCollection {
				items {
					__typename
					... on TextBlock {
						sys { id }
						title
						description {
							json
						}
					}
					... on PortfolioCards {
						detailPagesCollection {
							items {
								sys { id }
								slug
								title
								status
								imagesCollection(limit: 1) {
									items {
										url
										description
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;

export default async function About() {
	//
	const { aboutPage } = await fetchContentfulData(pageQuery);
	const hero = aboutPage.bannerImage;
	const blocks = aboutPage.buildingBlocksCollection?.items || [];

	return (
		<SectionContainer name={'about'}>
			<div className="container">
				<div className="about-page w-full py-[100px] px-0">
					<div className="section-title w-full mb-[62px]">
						<div className="title_flex w-full flex justify-between items-end">
							<SectionTitle pageName={aboutPage.name} title={aboutPage.title} />
						</div>
					</div>
					<div className="shadow-lg w-full h-80 relative mb-[35px]">
						<Image src={hero.url} alt={hero.description} fill priority />
					</div>
					{blocks.map((item: RenderComponentItem, i: number) => (
						<RenderComponent key={i} item={item} />
					))}
					<aside className="text-block w-full pt-[31px] pb-[31px] mt-[30px] mb-[30px] border-solid border-[#DFDFDF] border-t text-center">
						<ContactDetails />
					</aside>
				</div>
			</div>
		</SectionContainer>
	);
}
