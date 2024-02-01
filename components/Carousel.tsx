'use client';
import * as React from 'react';
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
			{description && <div className="richt-text-block">{processRichText(description.json)}</div>}
			<div className="carousel mb-10">
				<Swiper
					style={style}
					spaceBetween={10}
					navigation={true}
					thumbs={{ swiper: thumbsSwiper }}
					modules={[Navigation, Thumbs]}
					className="carousel-main"
				>
					{description && <div className="richt-text-block">{processRichText(description.json)}</div>}
					{imageCollection.items.map((slide) => {
						return (
							<SwiperSlide key={slide.sys.id} tag="figure" className="carousel-main-slide">
								<img className="carousel-main-image" src={slide.url} alt={slide.title} />
								{showDescription && slide.description && (
									<figcaption className="carousel-slide-description">{slide.description}</figcaption>
								)}
							</SwiperSlide>
						);
					})}
				</Swiper>
				{imageCollection.items.length > 1 && (
					<Swiper
						style={style}
						onSwiper={setThumbsSwiper}
						spaceBetween={10}
						slidesPerView={4.25}
						watchSlidesProgress={true}
						modules={[Navigation, Thumbs]}
						className="carousel-thumbnails"
					>
						{imageCollection.items.map((slide) => {
							return (
								<SwiperSlide
									key={slide.sys.id + '-thumb'}
									className="image-container image-container-square"
								>
									<img className="zoomable-centered-image" src={slide.url} alt={slide.title} />
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
