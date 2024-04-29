import { Avatar, Box, Button } from '@mui/material';

export default function WordPressSingleSitePanel({ site }) {
    console.log(site);
    if (!site) {
        return <Box>Select a site to see more information ...</Box>;
    }
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
            <Button
                size='small'
                variant='bggradient'
                color='secondary'
                onClick={() => console.log('Posts')}
            >
                Posts
            </Button>
        </Box>
    );
}
