import * as React from 'react';

export const SectionContainer: React.FC<{ name: string; children: React.ReactNode }> = ({ name, children }) => {
	return (
		<main id={name} className="section-container animated active fadeInLeft">
			{children}
		</main>
	);
};
