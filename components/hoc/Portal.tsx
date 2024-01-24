import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface PortalProps {
	container?: Element | DocumentFragment | null;
	key?: string | null | undefined;
	children: React.ReactNode;
}

export const Portal: React.FC<PortalProps> = ({ container = document?.body || null, key, children }) => {
	//
	if (!container) {
		return null;
	}

	const [mounted, setMounted] = React.useState<boolean>(false);

	React.useEffect(() => {
		setMounted(true);
		return () => setMounted(false);
	}, []);

	return mounted ? ReactDOM.createPortal(children, container, key) : null;
};
