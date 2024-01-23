import * as React from 'react';
import { tokyo } from '@/lib/utils';

export const PreLoader = () => {
	React.useEffect(() => {
		tokyo.preloader();
	}, []);

	return (
		<div id="preloader">
			<div className="loader_line"></div>
		</div>
	);
};
