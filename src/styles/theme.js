import { createTheme } from '@mui/material/styles';

let theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#bcc5e6',
        },
        secondary: {
            main: '#009825',
        },
        background: {
            default: '#2b4600',
            paper: '#060112',
        },
        text: {
            primary: '#edd6f9',
        },
    },
});

export default theme;
