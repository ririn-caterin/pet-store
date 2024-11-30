import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get('next-auth.session-token')?.value;
    const protectedPages = ['/services'];
    const loginPage = '/login';
    const { pathname } = request.nextUrl;

    if (!currentUser && protectedPages.some(page => pathname.startsWith(page))) {
        return NextResponse.redirect(new URL(loginPage, request.url));
    }

    if (currentUser && pathname.startsWith(loginPage)) {
        return NextResponse.redirect(new URL('/', request.url)); 
    }

    return NextResponse.next();
}