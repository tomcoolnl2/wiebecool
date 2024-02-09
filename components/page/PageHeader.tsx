import * as React from 'react';
import { BreadCrumbs } from '@/components/page/BreadCrumbs';

export const PageHeader: React.FC<{ title: string; path: string; subtitle?: string }> = ({ title, path, subtitle }) => {
	return (
		<div className="page-header">
			<BreadCrumbs path={path} />
			<h1 className="page-header-title">{title}</h1>
			{subtitle && <h2 className="page-header-subtitle">{subtitle}</h2>}
		</div>
	);
};
