import * as React from 'react';

export const SectionTitle: React.FC<{ pageName: string; title: string }> = ({ pageName, title }) => {
	return (
		<div className="section-title mb-16">
			<span className="inline-block bg-gray-600 uppercase py-1 px-3 font-semibold font-montserrat mb-3">
				{pageName}
			</span>
			<h1 className="font-extrabold font-montserrat text-4xl">{title}</h1>
		</div>
	);
};
