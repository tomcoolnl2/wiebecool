'use client';
import * as React from 'react';
import { useDetectMobile } from '@/hooks';

export const PreLoader = () => {
	//
	const isMobile = useDetectMobile();
	const [isPreloaded, setIsPreloaded] = React.useState(false);
	const [isVisible, setIsVisible] = React.useState(true);

	React.useEffect(() => {
		if (isMobile) {
			return;
		}
		const preloadedTimeout = setTimeout(() => setIsPreloaded(true), 800);
		const removeTimeout = setTimeout(() => setIsVisible(false), 2000);
		return () => {
			clearTimeout(preloadedTimeout);
			clearTimeout(removeTimeout);
		};
	}, [isMobile]);

	return (
		!isMobile &&
		isVisible && (
			<div className={`preloader${isPreloaded ? ' preloaded' : ''}`}>
				<div className="preloader-line"></div>
			</div>
		)
	);
};

export default PreLoader;
