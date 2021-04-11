import { PostForm } from "@components/posts/PostCreation";
import { useQuestions } from "@components/providers/QuestionsProvider";
import QuestionCard from "@components/questions/QuestionCard";
import QuestionsWrapper from "@lib/client/wrapper/questions";
import { Container, Dialog, DialogContent, DialogTitle, Fab, Grid, Tab, Tabs } from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";
import { useSession } from "next-auth/client";
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
            <Fab color="primary" variant="extended" onClick={() => setOpen(true)} style={{ position: "fixed", bottom: 32, right: 32 }}>
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

    const [selected, setSelected] = useState<"ALL" | "MY" | "SOLVED" | "OPEN">("ALL");
    const [session] = useSession();


    return (
        <Fragment>
            <QuestionCreation />
            <Container maxWidth="sm">
                <Tabs scrollButtons="auto" value={selected} onChange={(e, val) => setSelected(val)}>
                    <Tab value={"ALL"} label={"Összes"} />
                    <Tab value={"MY"} label={"Saját kérdések"} />
                    <Tab value={"SOLVED"} label={"Megoldottak"} />
                    <Tab value={"OPEN"} label={"Nyitottak"} />
                </Tabs>
                <Grid container spacing={2}>
                    {(selected == "MY" ? questions.filter((el) => el.user.email === session.user.email) : selected == "SOLVED" ? questions.filter((el) => el.answers.some(({ marked }) => marked)) : selected == "OPEN" ? questions.filter((el) => !el.answers.some(({ marked }) => marked)) : questions).map((question) => (
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