import * as React from 'react';

export const useDetectMobile = () => {
	const [isMobile, setIsMobile] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (typeof window === 'undefined') {
			setIsMobile(false);
		}
		setIsMobile(window.navigator && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(window.navigator.userAgent));
	}, []);

	return isMobile;
};
