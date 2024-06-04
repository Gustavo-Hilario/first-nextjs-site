'use client';

import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Link from 'next/link';

import profilePulga from '../public/profilePulga.jpeg';

import AnimatedCursor from './components/animatedCursor';
import ImageMove from './components/imageMove';
import PortExpFlipcards from './components/portExpFlipcards';

export default function HomeContent() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <AnimatedCursor />
            <Box component='section' textAlign={'center'} my={2}>
                <Typography
                    variant={isMobile ? 'h3' : 'h1'}
                    textAlign={'center'}
                >
                    Gustavo Hilario
                </Typography>
                <Typography variant='h4' color={'text.secondary'}>
                    Based in Lima
                </Typography>
            </Box>
            {/* Email / Image / Name */}
            <Grid
                container
                component='section'
                textAlign={'center'}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    xs: {
                        minHeight: '50vh',
                    },
                    lg: {
                        minHeight: '80vh',
                    },
                }}
            >
                <Grid item xs={12} lg={3}>
                    <Typography variant='h5' textAlign={'center'}>
                        <Link
                            href='mailto:info@gustavohilario.com'
                            className='copy-link-effect'
                        >
                            info@gustavohilario.com
                        </Link>
                    </Typography>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <ImageMove
                        image={profilePulga}
                        alt='Profile'
                        isMobile={isMobile}
                        translate={{ x: 42, y: -62, margin: 20 }}
                    />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <Typography variant='h5' textAlign={'center'}>
                        Gustavo Hilario
                    </Typography>
                </Grid>
            </Grid>

            {/* Work Experience */}
            <Box
                component='section'
                sx={{
                    minHeight: '100vh',
                }}
            >
                <Typography variant='h1'>Work Experience</Typography>

                <Typography variant='body1' sx={{ mb: 3 }}>
                    This is a personal website to showcase my work and projects.
                </Typography>
                <PortExpFlipcards />
            </Box>
            <Box
                component='section'
                sx={{
                    minHeight: '50vh',
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
                    minHeight: '50vh',
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
