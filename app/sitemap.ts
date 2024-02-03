import { MetadataRoute } from 'next';
import { PageType, ReWriteRule, SitemapItem, SitemapItemResponse, Slug } from '@/model';
import { buildUrl, fetchContentfulData } from '@/lib';
import SiteMapQuery from '@/graphql/Sitemap.gql';

class SiteMapEntry implements SitemapItem {
	//
	public url: URL;

	constructor(
		public slug: Slug,
		public lastModified: string,
		public changeFrequency: SitemapItem['changeFrequency'],
		public priority: number,
		path: Slug | '' = ''
	) {
		this.url = buildUrl(this.slug, path);
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
			new SiteMapEntry(entry.slug, entry.sys.publishedAt, 'monthly', 0.9, ReWriteRule[PageType.CollectionPage])
	);

	const detailPageEntries = detailPages.map(
		(entry: SitemapItemResponse) =>
			new SiteMapEntry(`${ReWriteRule[PageType.DetailPage]}${entry.slug}`, entry.sys.publishedAt, 'monthly', 0.9)
	);

	const contactPageEntry = new SiteMapEntry(contactPage.slug, contactPage.sys.publishedAt, 'yearly', 0.5);

	return [homePageEntry, ...aboutPageEntries, ...collectionPageEntries, ...detailPageEntries, contactPageEntry];
}
