import * as React from 'react';

export const SectionContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <div className="section-container animated">{children}</div>;
};
