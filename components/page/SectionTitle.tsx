import * as React from 'react';

export const SectionTitle: React.FC<{ pageName: string; title: string }> = ({ pageName, title }) => {
	return (
		<div className="left">
			<span className="inline-block bg-[rgba(0,0,0,.04)] uppercase py-[4px] px-[10px] font-semibold text-[12px] text-[#333] font-montserrat tracking-[0px] mb-[11px]">
				{pageName}
			</span>
			<h1 className="font-extrabold font-montserrat text-[40px]">{title}</h1>
		</div>
	);
};
