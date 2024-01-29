//
export enum PageType {
	HomePage = 'HomePage',
	AboutPage = 'AboutPage',
	CollectionPage = 'CollectionPage',
	ContactPage = 'ContactPage',
	DetailPage = 'DetailPage',
}

export const ReWriteRule = {
	[PageType.CollectionPage]: '/collectie',
	[PageType.DetailPage]: '/werk',
};
