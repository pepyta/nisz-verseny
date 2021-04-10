import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { ExitToAppRounded } from "@material-ui/icons";
import { signout } from "next-auth/client";
import { Fragment, useState } from "react";

const LogoutButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <Divider />
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm">
                <DialogTitle>
                    Biztosan ki szeretnél jelentkenzi?
                </DialogTitle>
                <DialogContent>
                    Amennyiben kijelentkezel nem fogsz tudni bizonyos funkciókat használni.
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Mégse</Button>
                    <Button onClick={() => signout()}>Kijelentkezés</Button>
                </DialogActions>
            </Dialog>
            <ListItem onClick={() => setOpen(true)} button key={"logout-button"}>
                <ListItemIcon>
                    <ExitToAppRounded fontSize="small" />
                </ListItemIcon>
                <ListItemText>Kijelentkezés</ListItemText>
            </ListItem>
        </Fragment>
    );
};

export default LogoutButton;