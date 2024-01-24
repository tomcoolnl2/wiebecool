'use client';

import * as React from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	//
	React.useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div>
			<h2>Oeps!</h2>
			<button onClick={() => reset()}>Probeer nog eens...</button>
		</div>
	);
}
