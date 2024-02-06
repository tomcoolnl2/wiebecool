import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { creator } from '@/lib';
import { type RenderComponentItem } from './hoc/RenderComponent';
import { PageType, ReWriteRule, SysID } from '@/model';
import '@/css/components/cards.css';

interface PortFolioImage {
	url: string;
	title: string | null;
}

interface Card extends SysID {
	slug: string;
	title: string;
	imageCollection: {
		items: PortFolioImage[];
	};
}

export interface DetailCardSchema {
	__typename: 'PortfolioCards';
	detailPagesCollection: {
		items: Card[];
	};
}

interface Props {
	item: RenderComponentItem;
}

export const PortfolioCardsComponent: React.FC<Props> = ({ item }) => {
	//
	const { detailPagesCollection } = item as DetailCardSchema;
	const cards = detailPagesCollection.items || [];

	if (!cards.length) {
		return null;
	}

	return (
		<aside className="cards">
			{cards.map((card: Card, i) => (
				<article className="card" key={card.sys.id}>
					<Link href={`${ReWriteRule[PageType.DetailPage]}${card.slug}`} className="block">
						<div className="image-container aspect-square">
							<Image
								className="image-centered image-zoomable image-grayscale"
								src={card.imageCollection.items[0].url + '?w=450'}
								alt={card.imageCollection.items[0].title || creator.description}
								width={450}
								height={450}
							/>
						</div>
						<div className="card-content">
							<h2 className="card-title">{card.title}</h2>
							<button className="button">Lees meer</button>
						</div>
					</Link>
				</article>
			))}
		</aside>
	);

	// return (
	// 	<aside className="flex flex-wrap gap-8 justify-center mx-10 mb-10">
	// 		{cards.map((card: Card, i) => (
	// 			<article className="bg-slate-800 w-96">
	// 				<div className="image-container aspect-square">
	// 					<Image
	// 						className="image-centered image-zoomable image-grayscale"
	// 						src={card.imageCollection.items[0].url + '?w=450'}
	// 						alt={card.imageCollection.items[0].title || creator.description}
	// 						width={450}
	// 						height={450}
	// 					/>
	// 				</div>
	// 				<div className="p-6">
	// 					<h2 className="text-white text-lg font-medium mb-4 w-full truncate">Feature 1</h2>
	// 					<Link href={`${ReWriteRule[PageType.DetailPage]}${card.slug}`} className="button">
	// 						Lees meer
	// 					</Link>
	// 				</div>
	// 			</article>
	// 		))}
	// 	</aside>
	// );
	{
		/* return (
		<aside className="product-cards flex flex-row flex-wrap justify-center md:justify-between gap-0 md:gap-3 items-center mt-8 transition-all duration-300">
			{cards.map((card: Card) => (
				<article
					key={card.sys.id}
					className="product-card cursor-pointer w-full md:w-1/2 max-w-md overflow-hidden shadow-lg relative mb-6"
				>
					<a href={`${ReWriteRule[PageType.DetailPage]}${card.slug}`} className="block">
						<div className="image-container aspect-square">
							<Image
								className="image-centered image-zoomable image-grayscale"
								src={card.imageCollection.items[0].url + '?w=450'}
								alt={card.imageCollection.items[0].title || creator.description}
								width={450}
								height={450}
							/>
						</div>
						<div className="details w-full px-10 pt-9 pb-7">
							<p className="extra block relative text-white text-opacity-75 text-[13px] font-montserrat mb-6">
								{creator.name} / {formatStatus(card.status)}
							</p>
							<h1 className="title font-bold text-xl mb-6">{card.title}</h1>
							<button className="button">Lees meer</button>
						</div>
					</a>
				</article>
			))}
		</aside>
	); */
	}
};
