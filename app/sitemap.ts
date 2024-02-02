import { MetadataRoute } from 'next';
import { PageType, ReWriteRule, SitemapItem, SitemapItemResponse } from '@/model';
import { fetchContentfulData } from '@/lib';
import SiteMapQuery from '@/graphql/Sitemap.gql';

class SiteMapEntry implements SitemapItem {
	private readonly baseUrl = 'https://wiebecool.nl';
	public url: string;
	constructor(
		slug: string,
		public lastModified: string,
		public changeFrequency: SitemapItem['changeFrequency'],
		public priority: SitemapItem['priority']
	) {
		this.url = this.baseUrl + slug;
	}
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	//
	const {
		homePageCollection: {
			items: [homePage],
		},
		aboutPageCollection: { items: aboutPages },
		collectionPageCollection: { items: collectionPages },
		detailPageCollection: { items: detailPages },
		contactPageCollection: {
			items: [contactPage],
		},
	} = await fetchContentfulData(SiteMapQuery);

	const homePageEntry = new SiteMapEntry(homePage.slug, homePage.sys.publishedAt, 'monthly', 1);

	const aboutPageEntries = aboutPages.map(
		(entry: SitemapItemResponse) => new SiteMapEntry(entry.slug, entry.sys.publishedAt, 'monthly', 1)
	);

	const collectionPageEntries = collectionPages.map(
		(entry: SitemapItemResponse) =>
			new SiteMapEntry(
				`${ReWriteRule[PageType.CollectionPage]}${entry.slug}`,
				entry.sys.publishedAt,
				'monthly',
				0.9
			)
	);

	const detailPageEntries = detailPages.map(
		(entry: SitemapItemResponse) =>
			new SiteMapEntry(`${ReWriteRule[PageType.DetailPage]}${entry.slug}`, entry.sys.publishedAt, 'monthly', 0.9)
	);

	const contactPageEntry = new SiteMapEntry(contactPage.slug, contactPage.sys.publishedAt, 'yearly', 0.5);

	return [homePageEntry, ...aboutPageEntries, ...collectionPageEntries, ...detailPageEntries, contactPageEntry];
}
