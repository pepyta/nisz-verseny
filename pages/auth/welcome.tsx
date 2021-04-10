import 'emoji-mart-next/css/emoji-mart.css';
import UserWrapper from "@lib/client/wrapper/user";
import { Button, Card, CardContent, Container, Grid, Grow, makeStyles, TextField, Typography } from "@material-ui/core";
import { signIn, useSession } from "next-auth/client";
import { useSnackbar } from "notistack";
import { FormEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Picker } from 'emoji-mart-next'
import IconWrapper from '@lib/client/wrapper/icon';
import { useIcon } from '@components/providers/IconProvider';

const WelcomeScreen = () => {
    const [session, loaded] = useSession();
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [selected, setSelected] = useState("😀");
    const [disabled, setDisabled] = useState(false);
    const [show, setShow] = useState(false);

    const classes = useStyles();

    const wrapper = new IconWrapper();
    const { icon, setIcon } = useIcon();

    const set = async () => {
        try {
            setDisabled(true);
            const resp = await wrapper.set(selected);
            
            enqueueSnackbar(resp.message, { variant: "success" });
            setIcon(selected);
            router.push("/");
        } catch(e) {
            setDisabled(false);
            enqueueSnackbar(e.message, {
                variant: "error",
            });
        }
    };

    return (
        <Container maxWidth="sm">
            <Grow in={show}>
                <div className={classes.picker}>
                    <Picker onSelect={({ native }) => {
                        setSelected(native);
                        setShow(false);
                    }} set='twitter' style={{ width: "100%" }} />
                </div>
            </Grow>    
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
                                    <Typography variant="h5" component="h2">Jó látni téged!</Typography>
                                </Grid>

                                <Grid item xs={12}>Válassz ki magadnak egy profilképet, amit majd mások is láthatnak!</Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item style={{ fontSize: "30px", cursor: "pointer" }} onClick={() => setShow(true)}>
                                            {selected}
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body1">
                                                <b>{session.user.name}</b>
                                            </Typography>
                                            <Typography variant="body2">
                                                {session.user.email}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        onClick={set}
                                        disabled={disabled}
                                        type={"submit"}
                                        fullWidth
                                        variant="contained"
                                    >Kiválasztás</Button>
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
    },
    picker: {
        position: "fixed",
        width: 552,
        maxWidth: "calc(100% - 16px)",
    },
}));

export default WelcomeScreen;
