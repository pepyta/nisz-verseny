import { Button, DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import React, { Dispatch, SetStateAction } from "react";

const PostDelete = ({ open, setOpen }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }) => {
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
                <Button onClick={handleClose} color="error">Igen</Button>
            </DialogActions>
        </Dialog>
    )

}

export default PostDelete;