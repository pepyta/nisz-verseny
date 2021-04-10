import { usePosts } from "@components/providers/PostsProvider";
import Tag from "@components/tags/Tag";
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
                        <Card>
                            <CardActionArea onClick={() => {
                                console.log("Sasd");
                                router.push(`/posts/${post.id}`)
                            }}>
                                <CardContent>
                                    <Typography variant="h5" component="h2" gutterBottom>
                                        {post.title}
                                    </Typography>
                                    <Typography gutterBottom noWrap>
                                        {post.content}
                                    </Typography>
                                    <Typography gutterBottom>    
                                        {`${post.author.image} ${post.author.name}`}
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {post.PostCategoryConnector.map(({ category }) => (
                                            <Grid item>
                                                <Tag category={category} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default IndexPage;