import { useState, useEffect, useRef } from 'react';
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

import A8CLogo from '../../../public/a8c-logo.png';

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
const fetchWordPressComSitePosts = async (siteID, postControllers) => {
    if (!siteID) return alert('No site ID provided');

    try {
        // Pagination component starts at 0, but the API starts at 1
        const response = await fetch(
            `/api/wordpress/sites/${siteID}/posts/?number=${
                postControllers.current.rowsPerPage
            }&page=${postControllers.current.page + 1}`,
            {
                method: 'POST',
            }
        );

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error(error);
        return throwError('Error fetching posts', error.message);
    }
};

export default function WordPressSingleSitePanel({ site }) {
    const [sitePosts, setSitePosts] = useState({});
    const [triggerFetch, setTriggerFetch] = useState(false);
    const postControllers = useRef({
        loading: false,
        page: 0,
        rowsPerPage: 10,
    });

    useEffect(() => {
        postControllers.current = {
            loading: true,
            page: 0,
            rowsPerPage: 10,
        };

        setTriggerFetch((prev) => !prev);
    }, [site]);

    // Fetch posts when the site is selected
    useEffect(() => {
        if (site === null || site === undefined) return;

        (async () => {
            try {
                const fetchedPosts = await fetchWordPressComSitePosts(
                    site.ID,
                    postControllers
                );
                postControllers.current.loading = false;
                setSitePosts(fetchedPosts);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        })();
    }, [triggerFetch]);

    // Show a message if no site is selected
    if (!site) {
        return <Box>Select a site to see more information ...</Box>;
    }

    // Handling Pagination Component Logic
    const handleChangePage = (event, newPage) => {
        postControllers.current.page = newPage;
        postControllers.current.loading = true;
        setTriggerFetch((prev) => !prev);
    };

    const handleChangeRowsPerPage = (event) => {
        postControllers.current.rowsPerPage = parseInt(event.target.value, 10);
        postControllers.current.loading = true;
        setTriggerFetch((prev) => !prev);
    };

    function notFoundPosts(sitePosts, postControllers) {
        if (
            sitePosts.found <
            (postControllers.current.page + 1) *
                postControllers.current.rowsPerPage
        ) {
            return true;
        } else return false;
    }
    // console.log('Posts: ', sitePosts);
    // console.log('postPage: ', postControllers.current.page);
    // console.log('rowsPerPage: ', postControllers.current.rowsPerPage);

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
                            : A8CLogo.src
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
                {notFoundPosts(sitePosts, postControllers) ? (
                    <Button
                        variant='bggradient'
                        onClick={() => {
                            postControllers.current = {
                                loading: true,
                                page: 0,
                                rowsPerPage: 10,
                            };
                            setTriggerFetch((prev) => !prev);
                        }}
                    >
                        Reset
                    </Button>
                ) : (
                    <Button
                        size='small'
                        variant='bggradient'
                        color='secondary'
                        onClick={() => {
                            postControllers.current.page++;
                            postControllers.current.loading = true;

                            setTriggerFetch((prev) => !prev);
                        }}
                    >
                        {postControllers.current.loading
                            ? 'Loading ...'
                            : 'Fetch Recent Posts'}
                    </Button>
                )}
            </Box>

            {Object.keys(sitePosts).length && sitePosts.found && (
                <TablePagination
                    component='div'
                    count={sitePosts.found}
                    page={postControllers.current.page}
                    onPageChange={handleChangePage}
                    rowsPerPage={postControllers.current.rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                />
            )}

            {Object.keys(sitePosts).length && sitePosts.found !== 0 && (
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
            )}

            {notFoundPosts(sitePosts, postControllers) ? (
                <Box>
                    <Typography variant='h6'>{`Not more posts were found. `}</Typography>
                    <Typography variant='body1'>
                        {`Trying to load posts between ${
                            (postControllers.current.page + 1) *
                                postControllers.current.rowsPerPage -
                            postControllers.current.rowsPerPage
                        }-${
                            (postControllers.current.page + 1) *
                            postControllers.current.rowsPerPage
                        }. Total posts: ${site.post_count}
                        `}
                    </Typography>
                </Box>
            ) : (
                ''
            )}
        </Box>
    );
}
