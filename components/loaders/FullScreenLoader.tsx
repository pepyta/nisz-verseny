import { CircularProgress, Grid, makeStyles } from "@material-ui/core";

const FullScreenLoader = () => {
    const classes = useStyles();
    
    return (
        <Grid container className={classes.container} alignItems={"center"} justifyContent={"center"} justifyItems={"center"} alignContent={"center"}>
            <Grid item>
                <CircularProgress />
            </Grid>
        </Grid>
    );  
};

const useStyles = makeStyles((theme) => ({
    container: {
        minWidth: "100vw",
        minHeight: "100vh",
        position: "fixed",
        bottom: 0,
        right: 0,
        top: 0,
        left: 0,
        zIndex: 1500,
        backgroundColor: theme.palette.background.default,
    }   
}));

export default FullScreenLoader;