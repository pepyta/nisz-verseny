import { Card, CardContent, Dialog, DialogContent, Grid, Input, TextField, Typography, useTheme, withStyles } from "@material-ui/core";
import { Dispatch, SetStateAction, useState } from "react";
import Fuse from "fuse.js";
import { usePosts } from "@components/providers/PostsProvider";
import PostItem from "@components/posts/PostItem";
import Link from "next/link";
import Image from "next/image";
import { useQuestions } from "@components/providers/QuestionsProvider";
import { GetPostsResponseType } from "@pages/api/posts/get";
import { GetQuestionsResponseType } from "@pages/api/questions/get";
import QuestionCard from "@components/questions/QuestionCard";

const SearchDialog = ({ open, setOpen }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const theme = useTheme();
    const { posts } = usePosts();
    const { questions } = useQuestions();
    const [search, setSearch] = useState("");

    const generize = (posts: GetPostsResponseType, questions: GetQuestionsResponseType) => {
        const resp: ({
            title: string;
            content: string;
            author: string;
            categories: string[];
            type: "POST";
            original: GetPostsResponseType[0];
        } | {
            title: string;
            content: string;
            author: string;
            categories: string[];
            type: "QUESTION";
            original: GetQuestionsResponseType[0];
        })[] = [];

        posts.forEach((post) => {
            resp.push({
                title: post.title,
                content: post.content+"",
                author: post.author.name,
                type: "POST",
                categories: post.PostCategoryConnector.map(({ category }) => category.name),
                original: post,
            });
        });

        questions.forEach((question) => {
            resp.push({
                title: question.title,
                content: question.content+"",
                author: question.user.name,
                type: "QUESTION",
                categories: question.QuestionCategoryConnector.map(({ category }) => category.name),
                original: question,
            });
        });

        return resp;
    };

    const fuse = new Fuse(generize(posts, questions), {
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
                                        {result.item.type === "POST" ? (
                                            <PostItem post={result.item.original} showReactions={false} />
                                        ) : (
                                            <QuestionCard question={result.item.original} />
                                        )}    
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