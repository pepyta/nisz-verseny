import Tag from "@components/tags/Tag";
import { Card, CardActionArea, CardContent, Grid, Typography } from "@material-ui/core";
import { GetPostsResponseType } from "@pages/api/posts/get";
import { useRouter } from "next/router";

const PostItem = ({ post }: { post: GetPostsResponseType[0] }) => {
    const router = useRouter();

    return  (

        <Card>
            <CardActionArea onClick={() => router.push(`/posts/${post.id}`)}>
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom noWrap>
                        {post.title}
                    </Typography>
                    <Typography gutterBottom noWrap>
                        {(post.content+"").replaceAll(/[^ 0-9a-zA-Zöüóőúéáűí,.-]/g, "")}
                    </Typography>
                    <Typography gutterBottom>    
                        {`${post.author.image} ${post.author.name}`}
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
        </Card>
    );
};

export default PostItem;