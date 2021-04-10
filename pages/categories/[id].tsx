import CategoryIcon from "@components/categories/CategoryIcon";
import PostItem from "@components/posts/PostItem";
import { useCategories } from "@components/providers/CategoryProvider";
import { usePosts } from "@components/providers/PostsProvider";
import { Card, CardActions, CardContent, Container, createMuiTheme, Divider, Grid, Tab, Tabs, ThemeProvider, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

const CategoryPage = () => {
    const router = useRouter();
    const id = router.query.id + "";
    const { categories } = useCategories();
    const [selected, setSelected] = useState<"POSTS" | "DISCUSSIONS">("POSTS");
    const { posts } = usePosts();

    const category = categories.find((el) => el.id === id);
    if (!category) return <Fragment />;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Container maxWidth="sm">
                    <Card>
                        <CardContent>
                            <Grid container spacing={4} alignItems={"center"}>
                                <Grid item>
                                    <CategoryIcon category={category} size={128} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h4" component="h2" gutterBottom>
                                        {category.name}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <ThemeProvider theme={createMuiTheme({ palette: { primary: { main: category.color,} }})}>
                            <Tabs
                                value={selected}
                                onChange={(e, val) => setSelected(val)}

                            >
                                <Tab value={"POSTS"} label="Bejegyzések" />
                                <Tab value={"DISCUSSIONS"} label="Beszélgetés" />
                            </Tabs>
                        </ThemeProvider>
                    </Card>
                </Container>
            </Grid>
            {selected === "POSTS" && (
                <Grid item xs={12}>
                    <Container maxWidth="sm">
                        <Grid container spacing={2}>
                            {posts.filter((post) => post.PostCategoryConnector.map(({ categoryId }) => categoryId).includes(category.id)).map((post) => (
                                <Grid item xs={12}>
                                    <PostItem post={post} />
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Grid>
            )}
        </Grid>
    );
};

export default CategoryPage;