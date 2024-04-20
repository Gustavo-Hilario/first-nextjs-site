'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#6687fd',
        },
        secondary: {
            main: '#00af2e',
        },
        background: {
            default: '#0d0016',
            paper: '#060112',
        },
        text: {
            primary: '#edd6f9',
        },
    },
});

export default theme;
