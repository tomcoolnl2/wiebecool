'use client';
import dynamic from 'next/dynamic';

const CarouselDynamic = dynamic(() => import('@/components/Carousel'), { ssr: false });

export default CarouselDynamic;
