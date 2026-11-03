import { NextResponse, type NextRequest } from 'next/server';

/**
 * Redirects capitalized /werk and /collectie URLs (old links such as /Werk/Portret-van-Sarah) to lowercase.
 * Route folders and Contentful slugs are lowercase, so these would otherwise end up as a 404, and where
 * routing matches case-insensitively, as a 404 cached for that URL. Redirecting here keeps them out of the
 * ISR cache entirely. Runs after the redirects in next.config.js, so explicit legacy redirects like
 * /Werk/Hout still win.
 */
export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const lowercase = pathname.toLowerCase();
	// Checked here, not only in the matcher: Vercel matches the matcher case-insensitively, so lowercase
	// URLs reach the proxy too, and redirecting them would loop.
	if (pathname === lowercase || !/^\/(werk|collectie)(\/|$)/.test(lowercase)) {
		return NextResponse.next();
	}
	const url = request.nextUrl.clone();
	url.pathname = lowercase;
	return NextResponse.redirect(url, 308);
}

export const config = {
	// Paths containing an uppercase letter. Only a pre-filter: case-sensitive in `next dev`/`next start`, not on Vercel.
	matcher: ['/((?!_next/).*[A-Z].*)'],
};
