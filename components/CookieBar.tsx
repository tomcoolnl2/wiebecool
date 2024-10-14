'use client';
import React from 'react';
import { hasCookie, setCookie } from 'cookies-next';
import { Button } from './Button';

export const CookieBar: React.FC = () => {
	//
	const [showConsent, setShowConsent] = React.useState<boolean>(true);

	React.useEffect(() => {
		setShowConsent(hasCookie('localConsent'));
	}, []);

	const acceptCookie = React.useCallback(() => {
		setShowConsent(true);
		setCookie('localConsent', 'true', {});
	}, []);

	if (showConsent) {
		return null;
	}

	return (
		<div className="cookie-bar">
			<Button onClick={acceptCookie} centered>
				Accepteer Cookies
			</Button>
		</div>
	);
};
