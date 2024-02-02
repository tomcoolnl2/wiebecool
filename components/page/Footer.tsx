import Link from 'next/link';
import * as React from 'react';

export const Footer: React.FC = () => {
	return (
		<footer className="page-footer">
			<div className="copyright">© {new Date().getFullYear()}</div>
			<Link href="/sitemap.xml">Sitemap</Link>
		</footer>
	);
};
