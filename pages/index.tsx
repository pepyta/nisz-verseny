import PostItem from "@components/posts/PostItem";
import { usePosts } from "@components/providers/PostsProvider";
import { Card, CardActionArea, CardContent, Container, Grid, Typography } from "@material-ui/core";
import { useRouter } from "next/router";

const IndexPage = () => {
    const { posts } = usePosts();
    const router = useRouter();

    return (
        <Container maxWidth="sm">
            <Grid spacing={2} container>
                {posts.map((post) => (
                    <Grid item xs={12}>
                        <PostItem post={post} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default IndexPage;