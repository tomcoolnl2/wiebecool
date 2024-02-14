import Link from 'next/link';
import Image from 'next/image';
import * as React from 'react';
import { ItemImage } from '@/model';

interface Props {
	id: string;
	href: string;
	title: string;
	img: ItemImage;
	size?: number;
}

export const Card: React.FC<Props> = ({ id, href, title, img, size = 300 }) => {
	return (
		<figure key={id} className="card image-container image-container-bordered">
			<Link key={id + '-img'} href={href} title={img.title}>
				<Image
					src={`${img.url}?w=${size}&h=${size}&fm=jpg&fl=progressive&fit=thumb`}
					title={title}
					alt={img.title || title}
					width={size}
					height={size}
					className="card-image image-centered image-zoomable"
					quality={75}
					loading="lazy"
				/>
				<figcaption className="image-caption">{title}</figcaption>
			</Link>
		</figure>
	);
};
