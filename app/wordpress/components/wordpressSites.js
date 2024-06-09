import { cookies } from 'next/headers';
import Link from 'next/link';

import { Button } from '@mui/material';

import WordPressSitesContainer from './wordpressSitesContainer';

const wordPressComBaseUrl = 'https://public-api.wordpress.com/rest/v1.1';

async function fetchWordPressComSites(token) {
    const response = await fetch(`${wordPressComBaseUrl}/me/sites`, {
        method: 'GET',
        site_visibility: 'visible',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(`Failed to fetch sites: ${response.statusText}`);
    }
}

export default async function WordPressSites() {
    // LEARN More about NextJS cookies and how cookies work in general
    const cookieStore = cookies();
    const wordpressComToken = cookieStore.get('wordpresscom_token').value;

    const sites = await fetchWordPressComSites(wordpressComToken);

    return (
        <>
            {!wordpressComToken && (
                <Link
                    href={`https://public-api.wordpress.com/oauth2/authorize?client_id=${process.env.WORDPRESS_CLIENT_ID}&redirect_uri=${process.env.WORDPRESS_REDIRECT_URI}&response_type=code&scope=${process.env.WORDPRESS_SCOPE}`}
                >
                    <Button size='small' variant='bggradient' color='secondary'>
                        WordPress.com Authorization
                    </Button>
                </Link>
            )}

            {wordpressComToken && (
                <WordPressSitesContainer wordPressComSites={sites} />
            )}
        </>
    );
}
