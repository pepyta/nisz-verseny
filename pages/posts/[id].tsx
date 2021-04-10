import FullScreenLoader from "@components/loaders/FullScreenLoader";
import { Card, CardActionArea, CardContent, makeStyles, Container, Grid, Typography, Button } from "@material-ui/core";
import { usePosts } from "@components/providers/PostsProvider";
import Head from 'next/head';
import { useRouter } from "next/router";
import MarkdownIt from "markdown-it";
import Tag from "@components/tags/Tag";

const md = new MarkdownIt();

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
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Card className={classes.cardContent}>
                        <CardContent>
                            <Typography variant="h5" component="h2" className={classes.header}>
                                {post.title}
                            </Typography>
                            <div dangerouslySetInnerHTML={{ __html: md.render(post.content + "") }} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card className={classes.cardContent}>
                                <CardContent>
                                    <Typography variant="h1" textAlign={"center"} gutterBottom>
                                        {post.author.image}
                                    </Typography>
                                    <Typography variant="h6" textAlign={"center"}>
                                        {post.author.name}
                                    </Typography>
                                    <Typography variant="caption" textAlign={"center"} component="div">
                                        {post.author.email}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card>

                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        Címkék
                                    </Typography>
                                    <Grid container spacing={1}>

                                        {post.PostCategoryConnector.map(({ category }) => (
                                            <Grid item>
                                                <Tag category={category} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

const useStyles = makeStyles(() => ({
    header: {
        textAlign: "left",
        fontWeight: "bold",
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