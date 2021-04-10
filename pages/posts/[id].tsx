import FullScreenLoader from "@components/loaders/FullScreenLoader";
import { Card, CardActionArea, CardContent, makeStyles, Container, Grid, Typography, Button, IconButton, Menu, MenuItem, ListItemIcon } from "@material-ui/core";
import { usePosts } from "@components/providers/PostsProvider";
import Head from 'next/head';
import { useRouter } from "next/router";
import MarkdownIt from "markdown-it";
import Tag from "@components/tags/Tag";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PostDelete from "../../components/posts/PostDelete"
import { useState } from "react";
import { EditRounded, MoreVertRounded } from "@material-ui/icons";

const md = new MarkdownIt();

export default function Post() {
    const [deleteOpen, setDeleteOpen] = useState(false);

    const router = useRouter();
    const id = parseInt(router.query.id + "");
    const { posts, loaded } = usePosts();
    const post = posts.find((post) => post.id === id);

    const [anchorEl, setAnchorEl] = useState<Element>();

    if (loaded && !post) router.push("/");
    if (!post) return (<FullScreenLoader />);

    const classes = useStyles();

    return (
        <Container maxWidth="lg" >
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Card className={classes.cardContent}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item style={{ width: "calc(100% - 64px)" }}>
                                    <Typography variant="h5" component="h2" className={classes.header}>
                                        {post.title}
                                    </Typography>
                                </Grid>
                                <Grid item style={{ width: 48 }}>
                                    <IconButton style={{ marginLeft: "auto" }} onClick={(e) => setAnchorEl(e.currentTarget)}>
                                        <MoreVertRounded />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <div dangerouslySetInnerHTML={{ __html: md.render(post.content + "") }} />
                        </CardContent>
                    </Card>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        <MenuItem onClick={() => { }}>
                            <ListItemIcon>
                                <EditRounded fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="inherit" noWrap>Szerkesztés</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => setDeleteOpen(true)}>
                            <ListItemIcon>
                                <DeleteIcon fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="inherit" noWrap>Törlés</Typography>
                        </MenuItem>
                    </Menu>
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
            <PostDelete open={deleteOpen} setOpen={setDeleteOpen} />
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