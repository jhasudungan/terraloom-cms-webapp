import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    
    // Get the token from cookies (adjust based on your cookie name)
    const token = request.cookies.get('token')?.value;
    
    // Define protected routes - add your actual protected routes here
    const protectedRoutes = [
        '/dashboard', 
        '/category', 
        '/product',
        '/user',
        '/profile'];

    const isProtectedRoute = protectedRoutes.some(route => 
        request.nextUrl.pathname.startsWith(route)
    );
    
    // If accessing a protected route without token, redirect to login
    if (isProtectedRoute && !token) {
        const loginUrl = new URL('/', request.url);
        // Store the original URL to redirect back after login
        loginUrl.searchParams.set('redirect', request.nextUrl.pathname + request.nextUrl.search);
        return NextResponse.redirect(loginUrl);
    }
    
    // Verify token validity for protected routes
    if (isProtectedRoute && token) {
        try {
            
            // Basic JWT structure check
            const parts = token.split('.');
            if (parts.length !== 3) {
                throw new Error('Invalid token format');
            }

            // verify token
            const secret = new TextEncoder().encode(process.env.CMS_JWT_SECRET);
            await jwtVerify(token, secret); 
            
        } catch (error) {
            // Invalid token, redirect to login and clear cookies
            const loginUrl = new URL('/', request.url);
            loginUrl.searchParams.set('message', 'Invalid session, please login again');
            const response = NextResponse.redirect(loginUrl);
            
            // Clear invalid cookies
            response.cookies.delete('token');
            
            return response;
        }
    }
    
    // If user is already logged in and tries to access login page, redirect to dashboard
    if (request.nextUrl.pathname === '/' && token) {
        try {
            const parts = token.split('.');
            if (parts.length === 3) {
                const payload = JSON.parse(atob(parts[1]));
                const currentTime = Math.floor(Date.now() / 1000);
                
                // Only redirect if token is still valid
                if (!payload.exp || payload.exp > currentTime) {
                    return NextResponse.redirect(new URL('/dashboard', request.url));
                }
            }
        } catch (error) {
            // Invalid token, let them access login page
        }
    }
    
    return NextResponse.next();
}

// Configure which routes the middleware runs on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - login (auth pages)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}