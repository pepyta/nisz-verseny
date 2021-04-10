import { Button, DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import React from "react";

const PostDelete = () => {
    const [open, setOpen] = React.useState(false);

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
                <Button onClick={handleClose} color="primary">
                    Igen
            </Button>
                <Button onClick={handleClose} color="primary">
                    Nem
            </Button>
            </DialogActions>
        </Dialog>
    )

}

export default PostDelete;