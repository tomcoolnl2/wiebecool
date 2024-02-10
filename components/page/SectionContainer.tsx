import * as React from 'react';

export const SectionContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <div className="section-container animate-fade-in-left">{children}</div>;
};
