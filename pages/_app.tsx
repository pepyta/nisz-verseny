import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from "next/head";

const theme = createMuiTheme({});

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <ThemeProvider theme={theme}>
            <Head>
                <CssBaseline />
                <meta charSet="utf-8" />
                <title>
                    Verseny    
                </title>

                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
            </Head>    
            <Component {...pageProps} />
        </ThemeProvider>
    );
};

export default MyApp
