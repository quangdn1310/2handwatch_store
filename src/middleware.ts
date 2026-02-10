import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Check if the current path is a dashboard path
    // We need to account for the locale prefix: /(vi|en)/dashboard
    const isDashboardPath = pathname.includes('/dashboard');

    if (isDashboardPath) {
        const token = req.cookies.get('token')?.value;

        if (!token) {
            // Redirect to login if no token
            // Get locale from pathname safely
            const locale = pathname.split('/')[1] || 'vi';
            const loginUrl = new URL(`/${locale}/login`, req.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return intlMiddleware(req);
}

export const config = {
    // Match only internationalized pathnames
    // and exclude some static files
    matcher: [
        '/',
        '/(vi|en)/:path*',
        // Exclude static assets
        '/((?!api|_next/static|_next/image|images|favicon.ico).*)'
    ]
};
