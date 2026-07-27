import * as React from 'react';

export const useDetectMobile = () => {
	const [isMobile, setIsMobile] = React.useState<boolean>(false);

	React.useEffect(() => {
		// Deferred to an effect: window.navigator isn't available during SSR,
		// so this can't be computed during render without a hydration mismatch.
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setIsMobile(window.navigator && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(window.navigator.userAgent));
	}, []);

	return isMobile;
};
