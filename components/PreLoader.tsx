import * as React from 'react';
import { detectMobile } from '@/lib/utils';

export const PreLoader = () => {
	//
	const preloaderRef = React.useRef<HTMLDivElement | null>(null);
	const isMobile: boolean = React.useMemo(() => detectMobile(), []);

	React.useEffect(() => {
		const preloader = preloaderRef.current;
		if (preloader) {
			if (!isMobile) {
				setTimeout(() => {
					preloader.classList.add('preloaded');
				}, 800);
				setTimeout(function () {
					console.log("time's up", preloader);
					preloader.remove();
					console.log('800', preloader);
				}, 2000);
			}
		}
	}, [preloaderRef, isMobile]);

	return (
		!isMobile && (
			<div id="preloader" ref={preloaderRef}>
				<div className="loader_line"></div>
			</div>
		)
	);
};
