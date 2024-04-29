import { cookies } from 'next/headers';

import Header from '../components/header';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Link from 'next/link';

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

export default async function WordPressComPage() {
    // LEARN More about NextJS cookies and how cookies work in general
    const cookieStore = cookies();
    const wordpressComToken = cookieStore.get('wordpresscom_token').value;

    const sites = await fetchWordPressComSites(wordpressComToken);

    const siteTitles = sites.sites.map((site) => site.name);

    console.log(siteTitles);

    return (
        <>
            <Header />

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
                <Grid
                    container
                    sx={{
                        flexWrap: 'nowrap',
                        gap: 1,
                    }}
                >
                    <Grid
                        item
                        sm={12}
                        md={8}
                        sx={{
                            minHeight: { md: 'calc(100vh - 100px)' },
                            m: 2,
                            p: 2,
                            backgroundColor: 'background.dashnav',
                            boxShadow: 3,
                            borderRadius: 3,
                        }}
                    >
                        <div>
                            <h2>
                                Hello there! This will be a WordPress.com page
                            </h2>
                            {sites &&
                                sites.sites.map((site) => (
                                    <div key={site.ID}>
                                        <h3>{site.name}</h3>
                                        <p>{site.URL}</p>
                                    </div>
                                ))}
                        </div>
                    </Grid>

                    <Grid
                        item
                        sm={12}
                        md={4}
                        sx={{
                            minHeight: { md: 'calc(100vh - 100px)' },
                            m: 2,
                            p: 2,
                            backgroundColor: 'background.dashcontent',
                            boxShadow: 3,
                            borderRadius: 3,
                        }}
                    >
                        WordPress.com Sidebar
                    </Grid>
                </Grid>
            )}
        </>
    );
}
