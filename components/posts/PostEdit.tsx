import { usePosts } from "@components/providers/PostsProvider";
import PostsWrapper from "@lib/client/wrapper/posts";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { GetPostsResponseType } from "@pages/api/posts/get";
import { useSnackbar } from "notistack";
import { Dispatch, SetStateAction, useState } from "react";
import { PostForm } from "./PostCreation";

const PostEdit = ({ open, setOpen, post }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>>; post: GetPostsResponseType[0] }) => {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content+"");
    const [categories, setCategories] = useState(post.PostCategoryConnector.map(({ category }) => category.id));
    const [disabled, setDisabled] = useState(false);

    const { editPost } = usePosts();
    
    const { enqueueSnackbar } = useSnackbar();
    const wrapper = new PostsWrapper();

    const onSubmit = async () => {
        try {
            setDisabled(true);

            const resp = await wrapper.edit({
                id: post.id,
                title,
                content,
                categories,
            });

            console.log(resp.data);
            editPost(resp.data);
            enqueueSnackbar(resp.message, { variant: "success" });
            setOpen(false);
        } catch(e) {
            enqueueSnackbar(e.message, {
                variant: "error",
            });
        }
        setDisabled(false);
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Bejegyzés szerkesztése</DialogTitle>
            <DialogContent>
                <PostForm disabled={disabled} title={title} setTitle={setTitle} content={content} setContent={setContent} categories={categories} setCategories={setCategories} onSubmit={onSubmit} />
            </DialogContent>
        </Dialog>
    );
};

export default PostEdit;