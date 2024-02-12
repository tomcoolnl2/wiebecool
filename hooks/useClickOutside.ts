import * as React from 'react';

export type UseClickOutsideProps = (event: Event) => void;

export const useClickOutside = <T extends HTMLElement>(
	ref: React.RefObject<T>,
	handler: UseClickOutsideProps
): React.RefObject<T> => {
	//
	React.useEffect(() => {
		const maybeHandler = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				handler(event);
			}
		};

		document.addEventListener('mousedown', maybeHandler);

		return () => {
			document.removeEventListener('mousedown', maybeHandler);
		};
	}, [ref, handler]);

	return ref;
};
