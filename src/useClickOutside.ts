import * as React from 'react';

export type UseClickOutsideProps = (event: MouseEvent) => void;

export const useClickOutside = (handler: UseClickOutsideProps) => {
	//
	const domNode = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		const maybeHandler = (event: MouseEvent) => {
			if (domNode.current && !domNode.current.contains(event.target as Node)) {
				handler(event);
			}
		};

		document.addEventListener('mousedown', maybeHandler);

		return () => {
			document.removeEventListener('mousedown', maybeHandler);
		};
	}, [handler]);

	return domNode;
};
