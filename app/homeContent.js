'use client';

import { useState } from 'react';

import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';

import Link from 'next/link';
import Tilt from 'react-parallax-tilt';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import profilePulga from '../public/profilePulga.jpeg';

import AnimatedCursor from './components/animatedCursor';
import ImageMove from './components/imageMove';
import PortExpFlipcards from './components/portExpFlipcards';
import PortSkills from './components/portSkills';
import PortLangs from './components/portLangs';

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
                    gap: isMobile ? '20px' : '0',
                }}
            >
                <Grid item xs={12} lg={3}>
                    <Typography variant='h5' textAlign={'center'}>
                        <Link
                            href='mailto:info@gustavohilario.com'
                            className='copy-link-effect'
                            onClick={(e) => {
                                navigator.clipboard.writeText(
                                    'mailto:info@gustavohilario.com'
                                );

                                toast.success('🦄 Email saved!', {
                                    position: 'top-right',
                                    autoClose: 1000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: 'dark',
                                });
                            }}
                        >
                            info@gustavohilario.com
                        </Link>
                        <ToastContainer />
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
                <Typography
                    variant='h1'
                    sx={{
                        textAlign: 'center',
                        mt: 3,
                    }}
                >
                    My Journey
                </Typography>
                <Typography variant='body1' sx={{ textAlign: 'center', mb: 3 }}>
                    This is a personal website to showcase my work and projects.
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        gap: '1rem',
                        my: 3,
                    }}
                    color={'text.secondary'}
                >
                    <FiberManualRecordRoundedIcon />
                    <FiberManualRecordRoundedIcon />
                    <FiberManualRecordRoundedIcon />
                </Box>

                <PortExpFlipcards />
            </Box>

            {/* SKILLS */}
            <Box
                component='section'
                sx={{
                    minHeight: '50vh',
                }}
            >
                <Typography variant='h1' textAlign='center'>
                    Skills
                </Typography>
                <Typography
                    variant='body1'
                    textAlign='center'
                    mb={4}
                    color={'text.secondary'}
                >
                    I am passionate about learning new technologies and tools 🚀
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        my: 3,
                    }}
                >
                    <PortSkills />
                </Box>
            </Box>

            {/* LANGUAGES */}
            <Box
                component='section'
                sx={{
                    minHeight: '50vh',
                }}
            >
                <Typography variant='h1' textAlign='center'>
                    Languages
                </Typography>
                <Typography
                    variant='body1'
                    textAlign='center'
                    mb={4}
                    color={'text.secondary'}
                >
                    The languages I know and the list is always growing 🇫🇷🚀
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        width: '100%',
                        gap: '2rem',
                    }}
                >
                    <PortLangs />
                </Box>
            </Box>
        </>
    );
}
