import { Card, CardContent, Dialog, DialogContent, Grid, Input, TextField, Typography, useTheme, withStyles } from "@material-ui/core";
import { Dispatch, SetStateAction, useState } from "react";
import Fuse from "fuse.js";
import { usePosts } from "@components/providers/PostsProvider";
import PostItem from "@components/posts/PostItem";
import Link from "next/link";
import Image from "next/image";

const SearchDialog = ({ open, setOpen }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const theme = useTheme();
    const { posts } = usePosts();
    const [search, setSearch] = useState("");

    const fuse = new Fuse(posts.map((post) => ({
        author: post.author.name,
        title: post.title,
        content: post.content,
        categories: post.PostCategoryConnector.map(({ category }) => category),
        original: post,
    })), {
        keys: ["author", "title", "content", "categories.name"],
    });
    
    const results = fuse.search(search, { limit: 5 });

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                style: {
                    alignSelf: "flex-start",
                    backgroundColor: "transparent",
                    boxShadow: "none",
                },
            }}
        >
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            value={search}
                            onChange={({ target: { value }}) => setSearch(value)}
                            fullWidth
                            placeholder={"Keresés..."}
                            variant="outlined"
                            autoFocus
                            style={{
                                backgroundColor: "white",
                                borderRadius: theme.shape.borderRadius,
                            }}
                        />
                    </Grid>
                    {
                        search.length === 0 ? (
                            <EmptyCard text={"Kezdj el gépelni, hogy megtaláld amit keresel!"} />
                        ) : results.length === 0 ? (
                            <EmptyCard text={"Nem találtunk semmit ilyen szigorú feltételek mellett. Próbálj meg kevesebb dologra keresni!"} />
                        ) : (
                            results.map((result) => (
                                <Link href={`/posts/${result.item.original.id}`}>
                                    <Grid item xs={12} onClick={() => setOpen(false)}>
                                        <PostItem post={result.item.original} showReactions={false} />
                                    </Grid>
                                </Link>
                            ))
                        )
                    }
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

const EmptyCard = ({ text }: { text: string }) => (
    <Grid item xs={12}>
        <Card>
            <CardContent style={{ textAlign: "center" }}>
                <Image src={`/img/empty.svg`} width={160} height={160} />
                <Typography>
                    {text}
                </Typography>
            </CardContent>
        </Card>
    </Grid>
);

export default SearchDialog;