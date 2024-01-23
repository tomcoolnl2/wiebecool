import * as React from 'react';
import { AppContext } from '../Context';

export const SectionContainer = ({ name, children }) => {
	const { nav, animation } = React.useContext(AppContext);
	return (
		<div id={name} className={`tokyo_tm_section ${name == nav ? `animated active ${animation}` : ''}`}>
			{children}
		</div>
	);
};
