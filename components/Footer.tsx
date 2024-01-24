import * as React from 'react';

export const Footer: React.FC = () => {
	return (
		<footer className="page-footer float-left">
			<div className="copyright text-[12px]">© {new Date().getFullYear()}</div>
		</footer>
	);
};
