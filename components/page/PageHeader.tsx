import * as React from 'react';
import { BreadCrumbs } from '@/components/page/BreadCrumbs';

interface Props {
	title: string;
	path: string;
	subtitle?: string;
}

export const PageHeader: React.FC<Props> = ({ title, path, subtitle }) => {
	return (
		<div className="page-header">
			<BreadCrumbs path={path} />
			<h1 className="page-header-title">{title}</h1>
			{subtitle && <h2 className="page-header-subtitle">{subtitle}</h2>}
		</div>
	);
};
