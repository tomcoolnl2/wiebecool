'use client';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface PortalProps {
	id?: string | null;
	key?: string | null | undefined;
	children: React.ReactNode;
}

export const Portal: React.FC<PortalProps> = ({ id = null, key, children }) => {
	//
	const [mounted, setMounted] = React.useState<boolean>(false);
	const [element, setElement] = React.useState<Element | null>(null);

	React.useEffect(() => {
		setElement(!id ? document.body : document.getElementById(id));
		setMounted(true);
		return () => setMounted(false);
	}, []);

	React.useEffect(() => {
		if (mounted && element) {
			const portal = document.createElement('div');
			element.appendChild(portal);

			return () => {
				element.removeChild(portal);
			};
		}
	}, [id, mounted, element]);

	return mounted && element ? ReactDOM.createPortal(children, element, key) : null;
};
