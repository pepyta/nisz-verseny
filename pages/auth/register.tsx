import UserWrapper from "@lib/client/wrapper/user";
import { Button, Card, CardContent, Container, Grid, makeStyles, TextField, Typography, Paper } from "@material-ui/core";
import { signIn } from "next-auth/client";
import { useSnackbar } from "notistack";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/router";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [disabled, setDisabled] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const wrapper = new UserWrapper();

    const router = useRouter();

    const register: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if(error) return;

        try {
            setDisabled(true);

            const resp = await wrapper.register({
                name,
                email,
                password,
            });

            enqueueSnackbar(resp.message, {
                variant: "success",
            });

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

    const error = !validateEmail(email) ? "Nem valós email cím!" : password.length < 6 ? "Túl rövid jelszó!" : password !== passwordAgain ? "A két jelszó nem egyezik!" : null;

    const classes = useStyles();

    return (
        <Paper className={classes.paperContainer} >
        <Container maxWidth="sm">
            <Grid
                container
                alignContent={"center"}
                alignItems={"center"}
                className={classes.container}
            > 
                <Grid item>
                    <form onSubmit={register}>
                        <Card className={classes.item}>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" component="h2">
                                            Regisztráció
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
                                            label={"Publikus név"}
                                            value={name}
                                            onChange={({ target: { value } }) => setName(value)}
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
                                        <TextField
                                            fullWidth
                                            type={"password"}
                                            label={"Jelszó újra"}
                                            value={passwordAgain}
                                            onChange={({ target: { value } }) => setPasswordAgain(value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            type={"submit"}
                                            fullWidth
                                            disabled={!!error || disabled}
                                            variant="contained"
                                        >
                                            {error || "Regisztrálás"}
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
        backgroundImage: 'url(../img/background/register_background.png)',
        backgroundSize: "cover",
    },
    container: {
        minHeight: "100vh",
    },
    item: {
        marginTop: "auto",
        marginBottom: "auto",
    }
}));

export default RegisterPage;

/*
https://stackoverflow.com/a/46181
*/
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};