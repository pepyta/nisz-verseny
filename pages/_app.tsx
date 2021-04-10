import { createMuiTheme, CssBaseline, NoSsr, ThemeProvider } from '@material-ui/core';
import { Provider } from 'next-auth/client';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from "next/head";
import { SnackbarProvider } from 'notistack';

const theme = createMuiTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                variant: "filled",
            },
        },
    },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <Provider session={pageProps.session}>
            <SnackbarProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Head>
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
                    <NoSsr>
                        <Component {...pageProps} />
                    </NoSsr>
                </ThemeProvider>
            </SnackbarProvider>
        </Provider>
    );
};

export default MyApp
