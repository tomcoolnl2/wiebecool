import Link from 'next/link';
import Image from 'next/image';
import * as React from 'react';
import { ItemImage } from '@/model';

interface Props {
	id: string;
	href: string;
	title: string;
	img: ItemImage;
}

export const Card: React.FC<Props> = ({ id, href, title, img }) => {
	return (
		<figure key={id} className="card image-container image-container-bordered">
			<Link key={id + '-img'} href={href} title={img.title}>
				<Image
					src={img.url + '?w=300'}
					title={img.title}
					alt={img.description}
					width={img.width || 400}
					height={img.height || 400}
					className="card-image image-centered image-zoomable"
					priority
				/>
				<figcaption className="image-caption">{title}</figcaption>
			</Link>
		</figure>
	);
};
