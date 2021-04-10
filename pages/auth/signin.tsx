import { Button, Card, CardContent, Container, Grid, makeStyles, TextField, Typography, Paper} from "@material-ui/core";
import { signIn, useSession } from "next-auth/client";
import { useSnackbar } from "notistack";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/router";

const SigninPage = () => {
    const [session] = useSession();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const router = useRouter();

    if(session) router.push("/");

    const login: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        try {
            setDisabled(true);

            await signIn("credentials", {
                email,
                password,
            });

            router.push("/");
        } catch (e) {
            enqueueSnackbar(e.message, {
                variant: "error",
            });
            setDisabled(false);
        }
    };

    const classes = useStyles();

    return (
        <Paper className={classes.paperContainer} >
            <Container maxWidth="sm">
                <Grid
                    container
                    alignContent={"left"}
                    alignItems={"center"}
                    className={classes.container}
                > 
                    <Grid item>
                        <form onSubmit={login}>
                            <Card className={classes.item}>
                                <CardContent className={classes.cardContent}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" component="h2" >
                                                Bejelentkezés
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label={"Email cím"}
                                                type="email"
                                                value={email}
                                                onChange={({ target: { value } }) => setEmail(value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                type={"password"}
                                                label={"Jelszó"}
                                                value={password}
                                                onChange={({ target: { value } }) => setPassword(value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                type={"submit"}
                                                fullWidth
                                                disabled={disabled}
                                                variant="contained"
                                            >
                                                {"Bejelentkezés"}
                                            </Button>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button
                                                color="primary"
                                                fullWidth
                                            >
                                                {"Regisztráció"}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    );
};

const useStyles = makeStyles(() => ({
    paperContainer: {
        backgroundImage: 'url(../img/background/login_background.png)',
        backgroundSize: "cover",
    },
    container: {
        minHeight: "100vh",
    },
    cardContent: {
        backgroundColor: "#f7f9fb",
    },
    item: {
        marginTop: "auto",
        marginBottom: "auto",
    }
}));

export default SigninPage;
