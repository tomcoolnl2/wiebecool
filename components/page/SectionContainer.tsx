import * as React from 'react';

export const SectionContainer: React.FC<{ name: string; children: React.ReactNode }> = ({ name, children }) => {
	return (
		<div id={name} className="section-container animated">
			{children}
		</div>
	);
};
