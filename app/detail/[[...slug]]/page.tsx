import { Metadata } from 'next';
import { fetchContentfulData } from '@/lib/api';
import { ensureLeadingSlash } from '@/lib/utils';
import { SectionContainer } from '@/components/page/SectionContainer';

import DetailPageBySlugQuery from '@/graphql/DetailPageBySlug.gql';
import MetaDataBySlugQuery from '@/graphql/MetaDataBySlug.gql';

type Props = {
	params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	//
	const slug = ensureLeadingSlash(params.slug[0]);
	const {
		detailPageCollection: {
			items: [{ seoMetaData }],
		},
	} = await fetchContentfulData(MetaDataBySlugQuery, { slug });

	return {
		...seoMetaData,
		alternates: {
			canonical: `https://www.wiebecool.nl/werk${slug}`,
		},
	};
}

export default async function DetailPage({ params }: Props) {
	//
	const slug = ensureLeadingSlash(params.slug[0]);
	const {
		detailPageCollection: {
			items: [detailPage],
		},
	} = await fetchContentfulData(DetailPageBySlugQuery, { slug });

	// console.log(detailPage);

	return <SectionContainer name={'detail'}>My Post: {params.slug}</SectionContainer>;
}
