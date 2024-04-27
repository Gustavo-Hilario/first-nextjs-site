import { cookies } from 'next/headers';

export async function GET(request) {
    // Get the auth code from the request
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');

    // Check if the auth code is valid
    if (!code) {
        // Return an error response
        return Response.json({ error: 'Invalid code' });
    }

    // Getting the token to access the WordPress.com API on behalf of the user
    try {
        const tokenResponse = await fetch(
            'https://public-api.wordpress.com/oauth2/token',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                // LEARN: SERIALIZING THE BODY BASED ON THE CONTENT-TYPE
                // JSON => JSON.stringify AND WWW-FORM-URLENCODED => new URLSearchParams
                body: new URLSearchParams({
                    client_id: process.env.WORDPRESS_CLIENT_ID,
                    client_secret: process.env.WORDPRESS_CLIENT_SECRET,
                    redirect_uri: process.env.WORDPRESS_REDIRECT_URI,
                    code: code,
                    grant_type: 'authorization_code',
                }).toString(),
            }
        );

        const data = await tokenResponse.json();

        if (!tokenResponse.ok) {
            throw new Error(
                data.error_description || 'Failed to fetch access token'
            );
        }

        // LEARN: NextJS cookies
        cookies().set('wordpresscom_token', data.access_token);
        return Response.redirect(`http://localhost:3000/wordpress`);
    } catch (error) {
        console.error(error);
        return Response.json({ error: 'Error getting token' });
    }
}
