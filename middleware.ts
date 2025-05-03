import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Allow access to /signin and /register pages without authentication
    if (!token && (req.nextUrl.pathname === "/signin" || req.nextUrl.pathname === "/register")) {
        return NextResponse.next();
    }

    // Redirect unauthenticated users trying to access other pages to /signin
    if (!token) {
        const signinUrl = new URL("/signin", req.url);
        signinUrl.searchParams.set("callbackUrl", req.nextUrl.pathname); // Add redirect URL
        return NextResponse.redirect(signinUrl);
    }

    // Allow authenticated users to proceed
    return NextResponse.next();
}

// Apply middleware to all routes except static files
export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|api).*)",
    ],
};