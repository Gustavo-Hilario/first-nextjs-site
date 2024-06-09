import { Box, Typography, CircularProgress } from '@mui/material';

export default function Loading() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <Typography variant='h4'>
                Loading your WordPress.com sites...
            </Typography>
            <CircularProgress color='secondary' />
        </Box>
    );
}
