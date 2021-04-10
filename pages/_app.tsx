import CategoryProvider from '@components/providers/CategoryProvider';
import PostsProvider from '@components/providers/PostsProvider';
import IconProvider from '@components/providers/IconProvider';
import UserProvider from '@components/providers/UserProvider';
import { createMuiTheme, CssBaseline, NoSsr, ThemeProvider } from '@material-ui/core';
import { Provider } from 'next-auth/client';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from "next/head";
import { SnackbarProvider } from 'notistack';
import { useRouter } from 'next/router';
import Navbar from '@components/navbar';
import { Fragment } from 'react';

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
    const router = useRouter();

    const Wrapper = ["/auth/signin", "/auth/register", "/auth/welcome", "/categories/[id]"].includes(router.pathname) ? Fragment : Navbar;

    return (
        <Provider session={pageProps.session}>
            <NoSsr>
                <CssBaseline />
                <UserProvider>
                    <CategoryProvider>
                        <PostsProvider>
                            <SnackbarProvider>
                                <ThemeProvider theme={theme}>
                                    <Head>
                                        <meta charSet="utf-8" />
                                        <title>Verseny</title>

                                        <link
                                            rel="stylesheet"
                                            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                                        />
                                        <link
                                            rel="stylesheet"
                                            href="https://fonts.googleapis.com/icon?family=Material+Icons"
                                        />
                                    </Head>
                                    <IconProvider>
                                        <Wrapper>    
                                            <Component {...pageProps} />
                                        </Wrapper>
                                    </IconProvider>
                                </ThemeProvider>
                            </SnackbarProvider>
                        </PostsProvider>
                    </CategoryProvider>
                </UserProvider>
            </NoSsr>
        </Provider>
    );
};

export default MyApp
