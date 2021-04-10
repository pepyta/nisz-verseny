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

const useStyles = makeStyles(() => ({
    container: {
        minWidth: "100vw",
        minHeight: "100vh",
    }   
}));

export default FullScreenLoader;