import Tag from "@components/tags/Tag";
import { Card, CardActionArea, CardContent, Grid, makeStyles, Typography } from "@material-ui/core";
import { GetQuestionsResponseType } from "@pages/api/questions/get";
import Link from "next/link";

const QuestionCard = ({ question }: { question: GetQuestionsResponseType[0] }) => {
    const classes = useStyles();

    return (
        <Card>
            <Link href={`/questions/${question.id}`}>
                <CardActionArea>
                    <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom noWrap>
                            <Grid container alignItems={"center"}>
                                {question.answers.some((el) => el.marked) ? (
                                    <Grid item>
                                        <span className={classes.marked}>MEGOLDVA</span>
                                    </Grid>
                                ) : (
                                    <Grid item>
                                        <span className={classes.notMarked}>KÉRDÉS</span>
                                    </Grid>
                                )}
                                <Grid item>
                                {question.title}
                                </Grid>
                            </Grid>

                        </Typography>
                        <Typography gutterBottom>
                            {question.content}
                        </Typography>
                        <Grid container spacing={2}>
                            {question.QuestionCategoryConnector.map(({ category }) => (
                                <Grid item>
                                    <Tag category={category} />
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
    );
};

const useStyles = makeStyles((theme) => ({
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

export default QuestionCard;