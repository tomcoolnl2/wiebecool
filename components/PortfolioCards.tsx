import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { artist } from '@/lib';
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
								alt={card.imageCollection.items[0].title || artist.description}
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
};
