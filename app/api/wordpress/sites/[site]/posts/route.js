'use server';

import { cookies } from 'next/headers';

export async function POST(request, { params }) {
    const site = params.site;
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page');
    const number = searchParams.get('number');
    console.log(page);
    const wordpressComToken = cookies().get('wordpresscom_token')?.value;

    if (!wordpressComToken) {
        return Response.json({
            error: 'No WordPress.com token found. Authorize the application again',
        });
    }

    const response = await fetch(
        `https://public-api.wordpress.com/rest/v1.1/sites/${site}/posts/?number=${number}&page=${page}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${wordpressComToken}`,
            },
        }
    );

    if (!response.ok) {
        return Response.json({ error: 'Failed to fetch posts' });
    }

    const data = await response.json();

    return Response.json(data);
}
