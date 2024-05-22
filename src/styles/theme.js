'use client';

import { createTheme } from '@mui/material/styles';
import { teko, josefin } from './fonts';

const background = {
    default: '#0d0016',
    paper: '#0d0016',
    dashnav: '#190648',
    dashcontent: '#26105D',
    hovernavlinks: '#571811',
};

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#6687fd',
        },
        secondary: {
            main: '#a45800',
        },
        background,
        text: {
            primary: '#edd6f9',
            secondary: 'rgba(26,115,35,0.7)',
        },
    },

    typography: {
        fontSize: 16,
        fontFamily: josefin.style.fontFamily,
    },

    components: {
        // Name of the component
        MuiTypography: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    color: '#edd6f9',
                    fontFamily: teko.style.fontFamily,
                },
            },
        },
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
                {
                    props: { variant: 'navlinksbuttons' },
                    style: {
                        textTransform: 'none',
                        background:
                            'linear-gradient(135deg, rgba(237,214,249,1) 0%, rgba(9,9,121,1) 50%, rgba(2,121,145,1) 100%)',
                        '&:hover': {
                            background: background.hovernavlinks,
                        },
                    },
                },
            ],
        },
    },
});

export default theme;
