import { MetadataRoute } from 'next';
import { PageType, ReWriteRule, Sitemap, SitemapItem, SitemapItemResponse, Slug } from '@/model';
import { buildUrl, fetchSitemap } from '@/lib';

class SiteMapEntry implements SitemapItem {
	//
	public url: string;

	constructor(
		public slug: Slug,
		public lastModified: string,
		public changeFrequency: SitemapItem['changeFrequency'],
		public priority: number,
		path: Slug | '' = ''
	) {
		this.url = buildUrl(this.slug, path).href;
	}
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	//
	const { homePage, aboutPages, collectionPages, detailPages, contactPage }: Sitemap = await fetchSitemap();

	const homePageEntry = new SiteMapEntry(homePage.slug, homePage.sys.publishedAt, 'monthly', 1);

	const aboutPageEntries = aboutPages.map(
		(entry: SitemapItemResponse) => new SiteMapEntry(entry.slug, entry.sys.publishedAt, 'monthly', 1)
	);

	const collectionPageEntries = collectionPages.map((entry: SitemapItemResponse) => {
		const path = entry.slug === ReWriteRule[PageType.DetailPage] ? '' : ReWriteRule[PageType.CollectionPage];
		return new SiteMapEntry(entry.slug, entry.sys.publishedAt, 'monthly', 0.9, path);
	});

	const detailPageEntries = detailPages.map((entry: SitemapItemResponse) => {
		return new SiteMapEntry(
			`${ReWriteRule[PageType.DetailPage]}${entry.slug}`,
			entry.sys.publishedAt,
			'monthly',
			0.9
		);
	});

	const contactPageEntry = new SiteMapEntry(contactPage.slug, contactPage.sys.publishedAt, 'yearly', 0.8);

	return [homePageEntry, ...aboutPageEntries, ...collectionPageEntries, ...detailPageEntries, contactPageEntry];
}
