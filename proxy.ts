import { NextResponse, type NextRequest } from 'next/server';

/**
 * Redirects capitalized /werk and /collectie URLs (old links such as /Werk/Portret-van-Sarah) to lowercase.
 * Rewrites match case-insensitively, so without this the page would look up the capitalized slug in
 * Contentful, miss, and cache a 404 for that URL. Redirecting here keeps it out of the ISR cache entirely.
 * Runs after the redirects in next.config.js, so explicit legacy redirects like /Werk/Hout still win.
 */
export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	if (!/^\/(werk|collectie)(\/|$)/i.test(pathname)) {
		return NextResponse.next();
	}
	const url = request.nextUrl.clone();
	url.pathname = pathname.toLowerCase();
	return NextResponse.redirect(url, 308);
}

export const config = {
	// Only paths containing an uppercase letter, so regular (lowercase) traffic never invokes the proxy.
	matcher: ['/((?!_next/).*[A-Z].*)'],
};
