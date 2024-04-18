import { createTheme } from '@mui/material/styles';

let theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: '#f44336',
        },
        background: {
            default: '#fff',
        },
    },
});

export default theme;
