'use client';

import { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Link from 'next/link';

export default function SignupContent() {
    useEffect(() => {
        // Check if the flag is set in localStorage
        const needsLoginNotification = localStorage.getItem(
            'needsLoginNotification'
        );
        if (needsLoginNotification === 'true') {
            // Show the notification
            toast.error('🦄 Please log in to save your Pokémon!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });

            // Clear the flag
            localStorage.removeItem('needsLoginNotification');
        }
    }, []);

    return (
        <>
            <Link href='/api/auth/login'>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <h1>Sign Up</h1>
                    <Button color='inherit'>
                        <LoginRoundedIcon />
                    </Button>
                </Box>
            </Link>
            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='dark'
            />
        </>
    );
}
