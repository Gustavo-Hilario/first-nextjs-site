'use client';

import { useState } from 'react';

import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Link from 'next/link';

import profilePulga from '../public/profilePulga.jpeg';

import AnimatedCursor from './components/animatedCursor';
import ImageMove from './components/imageMove';
import PortExpFlipcards from './components/portExpFlipcards';
import Tilt from 'react-parallax-tilt';

export default function HomeContent() {
    const [tiltScale, setTiltScale] = useState(1);
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
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '90%',
                        gap: '2rem',
                    }}
                >
                    <Tilt
                        scale={tiltScale}
                        transitionSpeed={2500}
                        style={{
                            width: '400px',
                        }}
                    >
                        <div
                            className='background-stripes tilt-scale'
                            style={{
                                padding: '1rem',
                                background: 'white',
                            }}
                            onMouseEnter={(ev) => {
                                setTiltScale(1.2);
                            }}
                            onMouseLeave={(ev) => {
                                setTiltScale(1);
                            }}
                        >
                            <div className='header'>
                                <div>Scale x{tiltScale}</div>
                                <hr />
                            </div>
                        </div>
                    </Tilt>
                    <Tilt
                        className='background-stripes parallax-effect'
                        perspective={500}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '300px',
                            height: '300px',
                            backgroundColor: 'darkgreen',
                            color: 'white',
                            border: '5px solid black',
                            borderRadius: '20px',
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        <div
                            className='inner-element'
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '35px',
                                color: 'white',
                                transform: 'translateZ(60px)',
                            }}
                        >
                            <div>React</div>
                            <div>⚛️</div>
                        </div>
                    </Tilt>
                </Box>
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
