import * as React from 'react';
import { PageType } from '@/model';
import { BreadCrumbs } from '@/components/page/BreadCrumbs';

export const PageHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => {
	return (
		<div className="page-header">
			<BreadCrumbs />
			<h1 className="page-header-title">{title}</h1>
			{subtitle && <h2 className="page-header-subtitle">{subtitle}</h2>}
		</div>
	);
};
