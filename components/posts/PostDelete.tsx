import { usePosts } from "@components/providers/PostsProvider";
import PostsWrapper from "@lib/client/wrapper/posts";
import { Button, DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import { GetPostsResponseType } from "@pages/api/posts/get";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { Dispatch, SetStateAction, useState } from "react";

const PostDelete = ({ open, setOpen, post }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>>; post: GetPostsResponseType[0] }) => {
    const wrapper = new PostsWrapper();
    const { enqueueSnackbar } = useSnackbar();
    const [disabled, setDisabled] = useState(false);
    const { posts, removePost } = usePosts();
    const router = useRouter();

    const remove = async () => {
        try {
            setDisabled(true);
            const resp = await wrapper.delete(post.id);
            enqueueSnackbar(resp.message, { variant: "success" });
            removePost(post.id);
            router.push("/");
            handleClose();
        } catch(e) {
            enqueueSnackbar(e.message, {
                variant: "error",
            });
        }

        setDisabled(false);
    };

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Törlés"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Biztos vagy benne hogy törlöd a posztot?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Nem</Button>
                {/* @ts-ignore */}
                <Button onClick={remove} color="error">Igen</Button>
            </DialogActions>
        </Dialog>
    )

}

export default PostDelete;