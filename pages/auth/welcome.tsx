import 'emoji-mart-next/css/emoji-mart.css';
import UserWrapper from "@lib/client/wrapper/user";
import { Button, Card, CardContent, Container, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import { signIn, useSession } from "next-auth/client";
import { useSnackbar } from "notistack";
import { FormEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Picker } from 'emoji-mart-next'

const WelcomeScreen = () => {
    const [session] = useSession();
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [documentAvailable, setDocumentavailable] = useState(false);

    useEffect(() => {
        setDocumentavailable(true);
    }, []);

    if(!session) router.push("/auth/signin");

    const classes = useStyles();

    return (
        <Container maxWidth="sm">
            <Grid
                container
                alignContent={"center"}
                alignItems={"center"}
                className={classes.container}
            > 
                <Grid item>
                        <Card >
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" component="h2">
                                            Jó látni téged!
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        Válassz ki magadnak egy profilképet, amit majd mások is láthatnak!
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Picker set='apple' style={{ width: "100%" }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            type={"submit"}
                                            fullWidth
                                            variant="contained"
                                        >
                                            Kiválasztás
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

const useStyles = makeStyles(() => ({
    container: {
        minHeight: "100vh",
    }
}));

export default WelcomeScreen;
