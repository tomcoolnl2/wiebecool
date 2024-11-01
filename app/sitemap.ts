import { MetadataRoute } from 'next';
import { PageType, ReWriteRule, SitemapItem, SitemapItemResponse, Slug } from '@/model';
import { buildUrl, fetchGlobalConfig, fetchSitemap } from '@/lib';

class SiteMapEntry implements SitemapItem {
	//
	public url: string;

	constructor(
		public baseUrl: string,
		public slug: Slug,
		public lastModified: string,
		public changeFrequency: SitemapItem['changeFrequency'],
		public priority: number,
		path: Slug | '' = ''
	) {
		this.url = buildUrl(baseUrl, this.slug, path).href;
	}
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	//
	const [{ baseUrl }, { homePage, aboutPages, collectionPages, detailPages, contactPage }] = await Promise.all([
		fetchGlobalConfig(),
		fetchSitemap(),
	]);

	const homePageEntry = new SiteMapEntry(baseUrl, homePage.slug, homePage.sys.publishedAt, 'monthly', 1);

	const aboutPageEntries = aboutPages.map(
		(entry: SitemapItemResponse) => new SiteMapEntry(baseUrl, entry.slug, entry.sys.publishedAt, 'monthly', 1)
	);

	const collectionPageEntries = collectionPages.map((entry: SitemapItemResponse) => {
		const path = entry.slug === ReWriteRule[PageType.CollectionPage] ? '' : ReWriteRule[PageType.CollectionPage];
		return new SiteMapEntry(baseUrl, entry.slug, entry.sys.publishedAt, 'monthly', 0.9, path);
	});

	const detailPageEntries = detailPages.map((entry: SitemapItemResponse) => {
		return new SiteMapEntry(baseUrl, `${ReWriteRule[PageType.DetailPage]}${entry.slug}`, entry.sys.publishedAt, 'monthly', 0.9);
	});

	const contactPageEntry = new SiteMapEntry(baseUrl, contactPage.slug, contactPage.sys.publishedAt, 'yearly', 0.8);

	return [homePageEntry, ...aboutPageEntries, ...collectionPageEntries, ...detailPageEntries, contactPageEntry];
}
