'use client';
import React from 'react';
import { hasCookie, setCookie } from 'cookies-next';
import '@/css/components/cookie-bar.css';

export const CookieBar: React.FC = () => {
	//
	const [showConsent, setShowConsent] = React.useState(true);

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
			<button className="button mx-auto" onClick={acceptCookie}>
				Accepteer Cookies
			</button>
		</div>
	);
};
