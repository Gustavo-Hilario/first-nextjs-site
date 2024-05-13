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

        // Attach user to the request for downstream usage
        req.user = session.user;
        console.log('User:', session.user);
        return NextResponse.next();
    },
});

export const config = {
    matcher: '/api/pokemon',
};
