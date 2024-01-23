import * as React from 'react';

export const SectionContainer: React.FC<{ name: string; children: React.ReactNode }> = ({ name, children }) => {
	return (
		<div id={name} className="tokyo_tm_section animated active fadeInLeft">
			{children}
		</div>
	);
};
