import { PostForm } from "@components/posts/PostCreation";
import { useQuestions } from "@components/providers/QuestionsProvider";
import QuestionCard from "@components/questions/QuestionCard";
import QuestionsWrapper from "@lib/client/wrapper/questions";
import { Container, Dialog, DialogContent, DialogTitle, Fab, Grid } from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import { Fragment, useState } from "react";

export const QuestionCreation = () => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState([]);
    const [disabled, setDisabled] = useState(false);

    const wrapper = new QuestionsWrapper();

    const { enqueueSnackbar } = useSnackbar();
    const { addQuestion } = useQuestions();

    const create = async () => {
        try {
            setDisabled(true);

            const resp = await wrapper.create({
                title,
                content,
                categories,
            });

            addQuestion(resp.data);
            setOpen(false);
            setTitle("");
            setContent("");
            setCategories([]);
            enqueueSnackbar(resp.message, {
                variant: "success",
            });
        } catch(e){
            enqueueSnackbar(e.message, {
                variant: "error",
            });
        }

        setDisabled(false);
    };

    return (
        <Fragment>
            <Fab variant="extended" onClick={() => setOpen(true)} style={{ position: "fixed", bottom: 32, right: 32 }}>
                <AddRounded /> Kérdés létrehozása
            </Fab>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>
                    Kérdés létrehozása
                </DialogTitle>
                <DialogContent>
                    <PostForm title={title} setTitle={setTitle} content={content} setContent={setContent} disabled={disabled} onSubmit={create} categories={categories} setCategories={setCategories} />
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};

const QuestionsPage = () => {
    const { questions } = useQuestions();

    return (
        <Fragment>
            <QuestionCreation />
            <Container maxWidth="sm">
                <Grid container spacing={2}>
                    {questions.map((question) => (
                        <Grid item xs={12}>
                            <QuestionCard question={question} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Fragment>
    );
};

export default QuestionsPage;