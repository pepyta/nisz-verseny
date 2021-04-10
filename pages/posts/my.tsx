import FullScreenLoader from "@components/loaders/FullScreenLoader";
import { Card, CardActionArea, CardContent, Container, Grid, Typography, Button } from "@material-ui/core";
import { usePosts } from "@components/providers/PostsProvider";
import Head from 'next/head'
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import PostItem from "@components/posts/PostItem";

export default function Post() {
    const [session] = useSession();
    const router = useRouter();
    const { posts } = usePosts();

    return (
        <Container maxWidth="sm">
            <Grid container spacing={2}>
                {posts.filter(({ author }) => author.email === session.user.email).map((post) => (
                    <Grid item xs={12}>
                        <PostItem post={post} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}