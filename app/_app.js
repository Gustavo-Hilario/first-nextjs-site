import { Provider } from 'react-redux';
import { store } from '../store/index';

import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/styles/theme';

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </Provider>
    );
}

export default MyApp;
