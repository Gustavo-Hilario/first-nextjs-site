import PageTopArea from './components/pagetoparea';

import { Typography, Box } from '@mui/material';

export default function Home() {
    return (
        <>
            <PageTopArea />
            <Box component='section' textAlign={'center'}>
                <Typography variant='h1' textAlign={'center'}>
                    Gustavo Hilario
                </Typography>
                <Typography variant='body' color={'text.secondary'}>
                    Based in Lima
                </Typography>
            </Box>
            <Box
                component='section'
                sx={{
                    minHeight: '100vh',
                }}
            >
                <Typography variant='h1'>Work Experience</Typography>

                <Typography variant='body1'>
                    This is a personal website to showcase my work and projects.
                </Typography>
            </Box>
            <Box
                component='section'
                sx={{
                    minHeight: '100vh',
                }}
            >
                <Typography variant='h1'>Skills</Typography>
                <Typography variant='body1'>
                    This is a personal website to showcase my work and projects.
                </Typography>
            </Box>
            <Box
                component='section'
                sx={{
                    minHeight: '100vh',
                }}
            >
                <Typography variant='h1'>Languages</Typography>
                <Typography variant='body1'>
                    This is a personal website to showcase my work and projects.
                </Typography>
            </Box>
        </>
    );
}
