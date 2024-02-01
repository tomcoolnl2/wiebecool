'use client';
import * as React from 'react';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import '@/css/components/carousel.css';

const amount = 10;

export const Carousel: React.FC = () => {
	//
	const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperClass | null>(null);

	const style = {
		'--swiper-navigation-color': '#fff',
		'--swiper-pagination-color': '#fff',
	} as React.CSSProperties;

	return (
		<div className="carousel">
			<Swiper
				style={style}
				spaceBetween={10}
				navigation={true}
				thumbs={{ swiper: thumbsSwiper }}
				modules={[Navigation, Thumbs]}
				className="carousel-main"
			>
				{Array.from({ length: amount }, (_, i) => (i += 1)).map((nr) => {
					return (
						<SwiperSlide key={nr} tag="figure" className="carousel-slide">
							<img
								className="carousel-main-image"
								src={`https://swiperjs.com/demos/images/nature-${nr}.jpg`}
							/>
							{/* if description is available */}
							<figcaption className="carousel-slide-description">Description of Image {nr}</figcaption>
						</SwiperSlide>
					);
				})}
			</Swiper>
			{amount > 1 && (
				<Swiper
					style={style}
					onSwiper={setThumbsSwiper}
					spaceBetween={10}
					slidesPerView={4.25}
					watchSlidesProgress={true}
					modules={[Navigation, Thumbs]}
					className="carousel-thumbnails"
				>
					{Array.from({ length: amount }, (_, i) => (i += 1)).map((nr) => {
						return (
							<SwiperSlide key={nr} className="image-container image-container-square">
								<img
									className="zoomable-centered-image" // contentful image generator
									src={`https://swiperjs.com/demos/images/nature-${nr}.jpg`}
								/>
							</SwiperSlide>
						);
					})}
				</Swiper>
			)}
		</div>
	);
};

export default Carousel;
