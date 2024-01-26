import { Metadata, ResolvingMetadata } from 'next';
import { fetchContentfulData } from '@/lib/api';
import { ensureLeadingSlash, parseSeoMetaDataQuery } from '@/lib/utils';
import { SectionContainer } from '@/components/page/SectionContainer';

type Props = {
	params: { slug: string };
};

const metaDataQuery = (slug: string): string => `
	query GetMetaDataBySlug {
		detailPageCollection(where: { slug: "${slug}" }, limit: 1) {
			items {
				seoMetaData {
          			title
					description
					keywords
				}
			}
		}
	}
`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	//
	const slug = ensureLeadingSlash(params.slug);
	const query = metaDataQuery(slug);
	const {
		detailPageCollection: {
			items: [{ seoMetaData }],
		},
	} = await fetchContentfulData(query);

	return {
		...seoMetaData,
		alternates: {
			canonical: `https://wiebecool.nl/werk${slug}`,
		},
	};
}

const pageQuery = (slug: string): string => `
	query GetPageBySlug {
		detailPageCollection(where: {slug: "${slug}"}, limit: 1) {
		  items {
			name
			title
			description
			status
			creationDate
			imagesCollection {
			  items {
				url
				description
			  }
			}
		  }
		}
	  }
`;

export default async function DetailPage({ params }: Props) {
	//
	const slug = ensureLeadingSlash(params.slug);
	const query = pageQuery(slug);
	const {
		detailPageCollection: {
			items: [detailPage],
		},
	} = await fetchContentfulData(query);

	console.log(params.slug, detailPage);

	return <SectionContainer name={'detail'}>My Post: {params.slug}</SectionContainer>;
}
