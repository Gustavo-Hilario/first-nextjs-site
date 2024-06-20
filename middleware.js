// middleware.js
import {
    withMiddlewareAuthRequired,
    getSession,
} from '@auth0/nextjs-auth0/edge';
import { NextResponse } from 'next/server';

export default withMiddlewareAuthRequired({
    // This middleware will run if a user is authenticated
    middleware: async (req) => {
        const res = NextResponse.next();
        const session = await getSession(req, res);

        // console.log('User from Middleware:', session?.user);

        // If the user is authenticated, include the user ID in the response headers
        if (session?.user) {
            // console.log('User:', session.user);
            res.headers.set('x-user-id', session.user.sub); // safely include user identifier
            return res;
        }

        return new Response('Unauthorized', { status: 401 });
    },
});

export const config = {
    matcher: ['/api/user', '/api/pokemon', '/api/wordpress/site/fav'],
    // '/api/wordpress/site/fav' is commented out
};
