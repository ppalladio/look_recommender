import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { authRoutePrefix, authRoutes, publicRoutes } from './lib/route.config';

const { auth } = NextAuth(authConfig);
export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    console.log("🚀 ~ auth ~ isLoggedIn:", isLoggedIn)

    const isApiAuthRoute = nextUrl.pathname.startsWith(authRoutePrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return null;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL('/', nextUrl));
        }
        return null;
    }
    // trying to access protected route without being logged in, later change to redirect to signIn page
    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL('/', nextUrl));
    }

    return null;
});

export const config = {
    matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)', '/(api|trpc)(.*)'],
};
