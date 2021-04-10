import FullScreenLoader from "@components/loaders/FullScreenLoader";
import { Card, CardActionArea, CardContent, makeStyles, Container, Grid, Typography, Button } from "@material-ui/core";
import { usePosts } from "@components/providers/PostsProvider";
import Head from 'next/head';
import { useRouter } from "next/router";

export default function Post() {
    const router = useRouter();
    const id = parseInt(router.query.id + "");
    const { posts, loaded } = usePosts();

    const post = posts.find((post) => post.id === id);

    if (loaded && !post) router.push("/");
    if (!post) return (<FullScreenLoader />);

    const classes = useStyles();

    return (
        <Container maxWidth="lg" >
                <Card className={classes.cardContent}>
                    <CardContent>
                        <Grid item xs={12}>
                            <Typography variant="h4" className={classes.header}>
                                {post.title}                     
                            </Typography>
                        </Grid>
                    </CardContent>
                </Card>
            <Card className={classes.cardContent}>  
                <CardContent>
                    <Grid item xs={12}>
                        <Typography variant="h5" component="h3" >
                            {post.content}                     
                        </Typography>
                    </Grid>
                </CardContent>
            </Card>
            <Card className={classes.cardContent}>  
                <CardContent>
                    <Grid item xs={12}>
                        <Typography variant="h5" component="h5" className={classes.footer}>
                            {`${post.author.image} ${post.author.name}`}                      
                        </Typography>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    )
}

const useStyles = makeStyles(() => ({
    header: {
        textAlign: "left",
        fontWeight: "fontWeightBold",
    },

    footer: {
        textAlign: "left",
    },
    
    cardContent: {
        marginTop: 3,
        marginBottom: 3,
        textAlign: "justify",
    }
}));