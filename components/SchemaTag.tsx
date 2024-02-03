import * as React from 'react';
import { Schema } from '@/model';

interface Props {
	schema: Schema;
}
export const SchemaTag: React.FC<Props> = ({ schema }) => {
	return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};
