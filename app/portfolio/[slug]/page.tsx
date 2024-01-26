import { Metadata, ResolvingMetadata } from 'next';
import { fetchContentfulData } from '@/lib/api';
import { parseSeoMetaDataQuery } from '@/lib/utils';

type Props = {
	params: { slug: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
	const pageSeoQuery = parseSeoMetaDataQuery('70FCDbDpk8iLUWWHAU76Ge');
	const { seoMetaData } = await fetchContentfulData(pageSeoQuery);

	return {
		...seoMetaData,
		alternates: {
			canonical: `https://wiebecool.nl/werk/${params.slug}`,
		},
	};
}

export default async function DetailPage({ params }: Props) {
	return <div>My Post: {params.slug}</div>;
}
