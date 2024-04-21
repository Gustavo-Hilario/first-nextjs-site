'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#6687fd',
        },
        secondary: {
            main: '#a45800',
        },
        background: {
            default: '#0d0016',
            paper: '#060112',
        },
        text: {
            primary: '#edd6f9',
            secondary: 'rgba(26,115,35,0.7)',
        },
    },

    components: {
        // Name of the component
        MuiAvatar: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    backgroundColor: '#edd6f9',
                },
            },
        },
        MuiButton: {
            variants: [
                {
                    props: { variant: 'bggradient' },
                    style: {
                        textTransform: 'none',
                        background:
                            'linear-gradient(135deg, rgba(237,214,249,1) 0%, rgba(9,9,121,1) 50%, rgba(2,121,145,1) 100%)',
                    },
                },
            ],
        },
    },
});

export default theme;
