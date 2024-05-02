import { useState, useEffect, useRef } from 'react';
import {
    Avatar,
    Box,
    Button,
    Typography,
    TablePagination,
} from '@mui/material';
import Link from 'next/link';

import fetchingSitePosts from '../../api/wordpress/route';
import { set } from 'mongoose';

// Function to fetch posts from a WordPress.com site
const fetchWordPressComSitePosts = async (
    siteID,
    setSitePosts,
    postPage,
    rowsPerPage,
    setPostPage,
    setLoadingSitePosts
) => {
    if (!siteID) return alert('No site ID provided');

    setLoadingSitePosts(true);

    try {
        const response = await fetch(
            `/api/wordpress/sites/${siteID}/posts/?number=${rowsPerPage}&page=${postPage}`,
            {
                method: 'POST',
            }
        );

        if (response.ok) {
            setLoadingSitePosts(false);
            // setPostPage(postPage + 1);
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

    // Each fetch request will return 20 posts per page
    // const [numberOfPostsDisplayed, setNumberOfPostsDisplayed] = useState(20);
    const [postPage, setPostPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        setSitePosts({});
        setPostPage(1);
        setRowsPerPage(10);
    }, [site]);

    useEffect(() => {
        fetchWordPressComSitePosts(
            site.ID,
            setSitePosts,
            postPage,
            rowsPerPage,
            setPostPage,
            setLoadingSitePosts
        );
    }, [postPage, rowsPerPage]);

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
        setPostPage(1);
    };

    console.log(sitePosts);
    console.log(postPage);
    console.log(rowsPerPage);

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
                    onClick={() =>
                        setPostPage(postPage + 1) &&
                        fetchWordPressComSitePosts(
                            site.ID,
                            setSitePosts,
                            postPage,
                            rowsPerPage,
                            setPostPage,
                            setLoadingSitePosts
                        )
                    }
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
                />
            )}

            {(sitePosts.found && (
                <Box>
                    <h3>Posts</h3>
                    {sitePosts.posts.map((post) => (
                        <Box key={post.ID}>
                            <a href={post.URL} target='_blank'>
                                <Typography>
                                    <h4>{post.title}</h4>
                                </Typography>
                            </a>
                        </Box>
                    ))}
                </Box>
            )) ||
                'No posts found'}
        </Box>
    );
}
