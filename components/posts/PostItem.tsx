import 'emoji-mart-next/css/emoji-mart.css';
import Tag from "@components/tags/Tag";
import { Card, CardActionArea, CardActions, Grow, CardContent, Grid, Typography, IconButton, Zoom, ThemeProvider, createMuiTheme, StyledEngineProvider, Button } from "@material-ui/core";
import { GetPostsResponseType } from "@pages/api/posts/get";
import { useRouter } from "next/router";
import { Picker } from 'emoji-mart-next'
import { Fragment, useState } from "react";
import { AddRounded } from "@material-ui/icons";
import PostsWrapper from "@lib/client/wrapper/posts";
import { usePosts } from "@components/providers/PostsProvider"; 
import { Reaction } from '.prisma/client';
import { CreateReactionResponseType } from '@pages/api/posts/react';
import { useSession } from 'next-auth/client';

const PostItem = ({ post, showReactions = true }: { post: GetPostsResponseType[0]; showReactions?: boolean }) => {
    const router = useRouter();
    const [show, setShow] = useState(false);

    const { posts, editPost } = usePosts();
    const [session] = useSession();

    const wrapper = new PostsWrapper();

    const map: Map<string, CreateReactionResponseType[]> = new Map();

    post.reactions.forEach((reaction) => {
        map.set(reaction.emoji, [...(map.has(reaction.emoji) ? map.get(reaction.emoji) : []), reaction]);
    });

    const addReaction = async (emoji: string) => {
        const resp = await wrapper.react(post.id, emoji);

        if(resp.message === "created") {
            editPost({
                ...post,
                reactions: [
                    ...post.reactions,
                    resp.data,
                ],
            });
        } else {
            editPost({
                ...post,
                reactions: [...post.reactions].filter((el) => !(el.user.email === session.user.email && emoji === el.emoji)),
            })
        };
    };

    return (
        <Fragment>
            <div style={{ display: show ? "block" : "none", position: "fixed", zIndex: 1500, }}>
                <Picker onSelect={({ native }) => {
                        setShow(false);
                        addReaction(native);
                    }} set='twitter' />
            </div>
            <Card>
                <CardActionArea onClick={() => router.push(`/posts/${post.id}`)}>
                    <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom noWrap>
                            {post.title}
                        </Typography>
                        <Typography gutterBottom noWrap>
                            {(post.content + "").replaceAll(/\n/g, " ").replaceAll(/[^ 0-9a-zA-Zöüóőúéáűí,.]/g, " ")}
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
                {showReactions && (
                    <CardActions>
                        <Grid container spacing={2} alignItems={"center"}>
                            {Array.from(map).map(([key, arr]) => (
                                    <Grid item>
                                        <Button onClick={() => addReaction(key)} color={arr.some((el) => el.user.email === session.user.email) ? "primary" : "secondary"} variant="outlined">
                                            {arr.length} {key}
                                        </Button>
                                    </Grid>

                            ))}
                            <Grid item>
                                <Button variant="outlined" onClick={() => setShow(true)}>
                                    <AddRounded />
                                </Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                )}
            </Card>
        </Fragment>
    );
};

export default PostItem;