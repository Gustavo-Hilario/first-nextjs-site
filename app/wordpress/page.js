import { cookies } from 'next/headers';

import Header from '../components/header';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import Link from 'next/link';

import WordPressAllSitesPanel from './components/wordpressAllSitesPanel';
import WordPressSingleSitePanel from './components/wordpressSingleSitePanel';

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

    const wordPressComSites = await fetchWordPressComSites(wordpressComToken);

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
                <Container
                    maxWidth={'lg'}
                    sx={{
                        mt: 0,
                        pt: 2,
                    }}
                >
                    <Grid
                        container
                        spacing={2}
                        rowSpacing={3}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        sx={{ mt: 0 }}
                    >
                        <Grid
                            item
                            sm={12}
                            md={8}
                            sx={{
                                px: 2,
                                backgroundColor: 'background.dashnav',
                                boxShadow: 3,
                                borderRadius: 3,
                            }}
                        >
                            {
                                // Pass the sites to the WordPressSitesPanel component
                                wordPressComSites && (
                                    <WordPressAllSitesPanel
                                        sites={wordPressComSites}
                                    />
                                )
                            }
                        </Grid>

                        <Grid
                            item
                            sm={12}
                            md={4}
                            sx={{
                                px: 2,
                                backgroundColor: 'background.dashcontent',
                                boxShadow: 3,
                                borderRadius: 3,
                            }}
                        >
                            WordPress.com Sidebar
                            <WordPressSingleSitePanel />
                        </Grid>
                    </Grid>
                    {/* Create a floating button to scroll to top or bottom */}
                    <Fab
                        color='primary'
                        aria-label='add'
                        sx={{
                            position: 'fixed',
                            bottom: 16,
                            right: 16,
                        }}
                    >
                        <KeyboardArrowDownRoundedIcon />
                    </Fab>
                </Container>
            )}
        </>
    );
}
