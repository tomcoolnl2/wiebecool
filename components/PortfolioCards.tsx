import * as React from 'react';
import Image from 'next/image';
import { formatStatus } from '@/lib/utils';
import { type RenderComponentItem } from './hoc/RenderComponent';

interface PortFolioImage {
	url: string;
	description: string | null;
}

interface PortfolioCard {
	sys: { id: string };
	slug: string;
	title: string;
	status: string;
	imagesCollection: {
		items: PortFolioImage[];
	};
}

export interface PortfolioCards {
	__typename: 'PortfolioCards';
	detailPagesCollection: {
		items: PortfolioCard[];
	};
}

interface Props {
	item: RenderComponentItem;
}

export const PortfolioCardsComponent: React.FC<Props> = ({ item }) => {
	//
	const {
		detailPagesCollection: { items: cards = [] },
	} = item as PortfolioCards;

	return (
		<aside className="product-cards flex flex-row flex-wrap justify-center md:justify-between gap-0 md:gap-3 items-center mt-8 transition-all duration-300">
			{cards.map((card: PortfolioCard) => (
				<article
					key={card.sys.id}
					className="product-card cursor-pointer w-full md:w-1/2 max-w-md overflow-hidden shadow-lg relative mb-6"
				>
					<a href={`/werk${card.slug}`} className="block">
						<div className="image relative overflow-hidden">
							<Image
								className="w-full"
								src={card.imagesCollection.items[0].url + '?w=450'}
								alt={card.imagesCollection.items[0].description || 'Wiebe Cool | Beeldhouwer'}
								width={450}
								height={450}
							/>
						</div>
						<div className="details w-full px-10 pt-9 pb-7">
							<p className="extra block relative text-white text-opacity-75 text-[13px] font-montserrat mb-6">
								Wiebe Cool / {formatStatus(card.status)}
							</p>
							<h1 className="title font-bold text-xl mb-6">{card.title}</h1>
							<div className="read-more">
								<span>
									<span>Lees verder</span>
								</span>
							</div>
						</div>
					</a>
				</article>
			))}
		</aside>
	);
};
