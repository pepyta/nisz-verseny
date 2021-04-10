import FullScreenLoader from "@components/loaders/FullScreenLoader";
import { Card, CardActionArea, CardContent, Container, Grid, Typography, Button } from "@material-ui/core";
import { usePosts } from "@components/providers/PostsProvider";
import Head from 'next/head'
import { useRouter } from "next/router";

export default function Post() {
    const router = useRouter();
    const id = parseInt(router.query.id + "");
    const { posts, loaded } = usePosts();

    const post = posts.find((post) => post.id === id);

    if (loaded && !post) router.push("/");
    if (!post) return (<FullScreenLoader />);

    return (
        <Container maxWidth="lg">
            <Grid item xs={8}>
                <Typography variant="h4">
                    {post.title}

                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="body2">
                    {`${post.author.image} ${post.author.name}`}
                </Typography>
            </Grid>

            <Typography variant="body1">
                {post.content}
            </Typography>
            <Button variant="contained" color="primary" href="../index.tsx">
                Kezdőoldalra!
            </Button>
        </Container>
    )
}