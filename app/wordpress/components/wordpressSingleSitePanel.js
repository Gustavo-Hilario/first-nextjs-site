import { useState, useEffect } from 'react';
const he = require('he');

import {
    Avatar,
    Box,
    Button,
    Typography,
    TablePagination,
    Card,
    CardContent,
    CardActions,
} from '@mui/material';

const postDateOptions = {
    // weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    // second: '2-digit',
    timeZoneName: 'short',
};
// Function to fetch posts from a WordPress.com site
const fetchWordPressComSitePosts = async (
    siteID,
    setSitePosts,
    postPage,
    rowsPerPage,
    setLoadingSitePosts
) => {
    if (!siteID) return alert('No site ID provided');

    setLoadingSitePosts(true);

    try {
        // Pagination component starts at 0, but the API starts at 1
        const response = await fetch(
            `/api/wordpress/sites/${siteID}/posts/?number=${rowsPerPage}&page=${
                postPage + 1
            }`,
            {
                method: 'POST',
            }
        );

        if (response.ok) {
            setLoadingSitePosts(false);
            const data = await response.json();
            return setSitePosts(data);
        }
    } catch (error) {
        console.error(error);
        return throwError('Error fetching posts', error.message);
    }
};

export default function WordPressSingleSitePanel({ site }) {
    const [sitePosts, setSitePosts] = useState({});
    const [loadingSitePosts, setLoadingSitePosts] = useState(false);
    const [fecthPostButtonClicked, setFetchPostButtonClicked] = useState(false);

    // Each fetch request will return 10 posts per page
    const [postPage, setPostPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Reset the state when a new site is selected
    useEffect(() => {
        if (site === null || site === undefined) return;

        setSitePosts({});
        setPostPage(0);
        setRowsPerPage(10);
        fetchWordPressComSitePosts(
            site.ID,
            setSitePosts,
            0,
            10,
            setLoadingSitePosts
        );
    }, [site]);

    // Fetch posts when the site is selected
    useEffect(() => {
        let newPage;
        if (site === null || site === undefined) return;

        if (fecthPostButtonClicked === true) {
            newPage = postPage + 1;
            setPostPage(newPage);
        }

        fetchWordPressComSitePosts(
            site.ID,
            setSitePosts,
            newPage ? newPage : postPage,
            rowsPerPage,
            setLoadingSitePosts
        );

        setFetchPostButtonClicked(false);
    }, [postPage, rowsPerPage, fecthPostButtonClicked]);

    // Show a message if no site is selected
    if (!site) {
        return <Box>Select a site to see more information ...</Box>;
    }

    // Handling Pagination Component Logic
    const handleChangePage = (event, newPage) => {
        setPostPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPostPage(0);
    };

    // Learn – Why component is reloaded multiple times
    console.log('Component Reloaded');

    // console.log('Posts: ', sitePosts);
    // console.log('postPage: ', postPage);
    // console.log('rowsPerPage: ', rowsPerPage);

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    my: 2,
                    gap: 2,
                }}
            >
                <Avatar
                    alt={site.name}
                    src={
                        site.icon
                            ? site.icon.img
                            : site.logo.url
                            ? site.logo.url
                            : '/a8cLogo.png'
                    }
                />

                <h2>{site.name}</h2>
            </Box>

            <p>Description: {site.description}</p>
            <p>
                <a href={site.URL} target='_blank' rel='noreferrer'>
                    URL: {site.URL}
                </a>
            </p>
            <p>Subscribers: {site.subscribers_count}</p>
            <p>
                Plan: {`${site.plan.billing_period} ${site.plan.product_name}`}
            </p>
            <p>
                {`Total Storage:
                ${Math.floor(site.quota.space_allowed / 1000000000)} GB`}
            </p>
            <p>
                Used Storage:
                {Math.floor(site.quota.space_used / 1000000000) < 1
                    ? ' Less than 1 GB used'
                    : `${Math.floor(site.quota.space_used / 1000000000)} GB`}
            </p>
            <p>{`Total Posts: ${site.post_count}`}</p>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    my: 2,
                }}
            >
                <Button
                    size='small'
                    variant='bggradient'
                    color='secondary'
                    onClick={() => setFetchPostButtonClicked(true)}
                >
                    {loadingSitePosts ? 'Loading ...' : 'Fetch Recent Posts'}
                </Button>
            </Box>

            {sitePosts.found && (
                <TablePagination
                    component='div'
                    count={sitePosts.found}
                    page={postPage}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                />
            )}

            {(sitePosts.found && (
                <Box>
                    <Typography variant='h4'>Posts</Typography>
                    {sitePosts.posts.map((post) => (
                        <Card
                            key={post.ID}
                            sx={{
                                mb: 3,
                                '& a': {
                                    borderBottom: '1px solid #a45800',
                                },
                                '& a:hover': {
                                    borderBottom: '2px solid #a45800',
                                },
                            }}
                        >
                            <CardContent>
                                <Typography variant='h6' mb={2}>
                                    <a href={post.URL} target='_blank'>
                                        {/* LEARN: HTML Encoding and Decoding */}
                                        {he.decode(post.title)}
                                    </a>
                                </Typography>
                                <Typography variant='body1'>
                                    Author: {post.author.name}
                                </Typography>
                                <Typography variant='body1'>
                                    {/* LEARN: about working with dates on JS*/}
                                    Date:{' '}
                                    {new Intl.DateTimeFormat(
                                        'default',
                                        postDateOptions
                                    ).format(Date.parse(post.date))}
                                </Typography>
                                <Typography variant='body1'>
                                    Like: {post.author.name}
                                </Typography>
                                <Typography variant='body1'>
                                    <a href={post.URL} target='_blank'>
                                        ShortLink: {post.short_URL}
                                    </a>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size='small' variant='bggradient'>
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            )) ||
                'No posts found'}
        </Box>
    );
}
