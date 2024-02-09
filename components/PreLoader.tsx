'use client';
import * as React from 'react';
import { useDetectMobile } from '@/hooks';

export const PreLoader = () => {
	//
	const preloaderRef = React.useRef<HTMLDivElement | null>(null);
	const isMobile = useDetectMobile();
	React.useEffect(() => {
		const preloader = preloaderRef.current;
		if (preloader) {
			if (!isMobile) {
				setTimeout(() => {
					preloader.classList.add('preloaded');
				}, 800);
				setTimeout(function () {
					preloader.remove();
				}, 2000);
			}
		}
	}, [preloaderRef, isMobile]);

	return (
		!isMobile && (
			<div className="preloader" ref={preloaderRef}>
				<div className="preloader-line"></div>
			</div>
		)
	);
};

export default PreLoader;
