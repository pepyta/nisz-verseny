import { Answer } from ".prisma/client";
import FullScreenLoader from "@components/loaders/FullScreenLoader";
import { useQuestions } from "@components/providers/QuestionsProvider";
import Tag from "@components/tags/Tag";
import QuestionsWrapper from "@lib/client/wrapper/questions";
import { Card, CardContent, Grid, Typography, makeStyles, Tabs, Tab, TextField, InputAdornment, IconButton, FilledInput, InputLabel, FormControl, Container } from "@material-ui/core";
import { DoneRounded, SendRounded } from "@material-ui/icons";
import { CreateAnswerResponseType } from "@pages/api/questions/answer";
import MarkdownIt from "markdown-it";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useState } from "react";

const md = new MarkdownIt();

const QuestionPage = () => {
    const router = useRouter();
    const id = parseInt(router.query.id + "");
    const { questions, addAnswer, markAsAnswer } = useQuestions();
    const [selected, setSelected] = useState<"INPUT" | "PREVIEW">("INPUT");
    const [input, setInput] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [session] = useSession();

    const question = questions.find((el) => el.id === id);
    const classes = useStyles();

    const wrapper = new QuestionsWrapper();

    const send = async () => {
        try {
            setDisabled(true);
            setInput("");

            const resp = await wrapper.answer({
                content: input,
                questionId: question.id,
            });

            addAnswer(resp.data);
        } catch { }

        setDisabled(false);
    };


    const setAnswer = async (answer: CreateAnswerResponseType) => {
        try {
            setDisabled(true);
            await wrapper.mark({
                answerId: answer.id,
            });

            markAsAnswer(answer);
        } catch {}

        setDisabled(false);
    };

    if (!question) return (<FullScreenLoader />);

    const hasAnswer = question.answers.some(({ marked }) => marked);

    return (
        <Container maxWidth="sm">
            <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={2} style={{ marginBottom: 12 }}>
                                    {question.QuestionCategoryConnector.map(({ category }) => (
                                        <Grid item>
                                            <Tag category={category} />
                                        </Grid>
                                    ))}
                                </Grid>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    {question.title}
                                </Typography>
                                <div dangerouslySetInnerHTML={{ __html: md.render(question.content + "") }} />
                            </CardContent>
                        </Card>
                    </Grid>
                    {question.answers.map((answer) => (
                        <Grid item xs={12}>
                            <Card className={answer.marked ? classes.answer : ""}>
                                <CardContent>
                                    <Typography variant="body2" gutterBottom>
                                        {`${answer.user.image} ${answer.user.name} • ${new Date(answer.createdAt).toLocaleDateString()} ${new Date(answer.createdAt).toLocaleTimeString()}`}
                                        {session.user.email === question.user.email && !hasAnswer && (
                                            <IconButton disabled={disabled} onClick={() => setAnswer(answer)} className={classes.done}>
                                                <DoneRounded />
                                            </IconButton>
                                        )}
                                    </Typography>
                                    <Typography>
                                        <div dangerouslySetInnerHTML={{ __html: md.render(answer.content)}} />
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Tabs value={selected} onChange={(e, val) => setSelected(val)}>
                                            <Tab value={"INPUT"} label={"Bemenet"} />
                                            <Tab value={"PREVIEW"} label={"Előnézet"} disabled={input.length == 0} />
                                        </Tabs>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {selected === "INPUT" ? (
                                            <FormControl fullWidth variant="filled">
                                                <InputLabel htmlFor="filled-adornment-password">Ide írhatod az üzenetedet</InputLabel>
                                                <FilledInput
                                                    multiline
                                                    value={input}
                                                    disabled={hasAnswer || disabled}
                                                    onChange={({ target: { value } }) => setInput(value)}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={send} disabled={input.length === 0 || disabled}>
                                                                <SendRounded />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                        ) : (
                                            <div dangerouslySetInnerHTML={{ __html: md.render(input) }} />
                                        )}
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
        </Container>
    );
};

const useStyles = makeStyles((theme) => ({
    done: {
        color: theme.palette.success.main,
        float: "right",
    },
    answer: {
        borderWidth: 2,
        borderColor: theme.palette.success.main,
        borderStyle: "solid",
    },
    marked: {
        borderRadius: 16,
        borderColor: theme.palette.success.main,
        color: theme.palette.success.main,
        borderWidth: 1,
        borderStyle: "solid",
        fontSize: 12,
        padding: 8,
        float: "left",
        marginRight: 12,
    },
    notMarked: {
        borderRadius: 16,
        borderColor: theme.palette.info.main,
        color: theme.palette.info.main,
        borderWidth: 1,
        borderStyle: "solid",
        fontSize: 12,
        padding: 8,
        float: "left",
        marginRight: 12,
    }
}));


export default QuestionPage;