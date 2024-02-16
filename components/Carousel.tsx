'use client';
import * as React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import { PageCarousel } from '@/model';
import { processRichText } from '@/lib';
import '@/css/components/carousel.css';

export const Carousel: React.FC<PageCarousel> = ({ description, showDescription, imageCollection }) => {
	//
	const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperClass | null>(null);

	const style = {
		'--swiper-navigation-color': '#fff',
		'--swiper-pagination-color': '#fff',
	} as React.CSSProperties;

	return (
		<>
			{description && <div className="rich-text-block">{processRichText(description.json)}</div>}
			<div className="carousel">
				<Swiper
					style={style}
					spaceBetween={10}
					navigation={true}
					thumbs={{ swiper: thumbsSwiper }}
					modules={[Navigation, Thumbs]}
					className="carousel-main"
				>
					{description && <div className="rich-text-block">{processRichText(description.json)}</div>}
					{imageCollection.items.map((slide) => {
						return (
							<SwiperSlide key={slide.sys.id} tag="figure" className="carousel-main-slide">
								<Image
									className="carousel-main-image"
									src={`${slide.url}?w=500`}
									alt={slide.title}
									width={500}
									height={500}
									quality={80}
									loading="lazy"
								/>
								{showDescription && slide.description && (
									<figcaption className="carousel-slide-description">{slide.description}</figcaption>
								)}
							</SwiperSlide>
						);
					})}
				</Swiper>
				{imageCollection.items.length > 1 && (
					<Swiper
						onSwiper={setThumbsSwiper}
						spaceBetween={10}
						slidesPerView={2.2}
						watchSlidesProgress={true}
						modules={[Navigation, Thumbs]}
						className="carousel-thumbnails"
						breakpoints={{
							640: { slidesPerView: 3.2 },
							1024: { slidesPerView: 4.2 },
						}}
					>
						{imageCollection.items.map((slide) => {
							return (
								<SwiperSlide key={slide.sys.id + '-thumb'} className="image-container aspect-square">
									<Image
										className="image-grayscale image-zoomable"
										src={`${slide.url}?w=${170}&h=${170}&fm=jpg&fl=progressive&fit=thumb`}
										alt={slide.title}
										width={170}
										height={170}
									/>
								</SwiperSlide>
							);
						})}
					</Swiper>
				)}
			</div>
		</>
	);
};

export default Carousel;
