import { AppBar, Button, Container, Divider, Drawer, Grid, Hidden, IconButton, InputBase, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar, Typography, useMediaQuery } from "@material-ui/core";
import { ExitToAppRounded, MailRounded, MenuRounded, SearchRounded } from "@material-ui/icons";
import { useSession } from "next-auth/client"
import { Fragment, useState } from "react";
import { experimentalStyled as styled, alpha } from '@material-ui/core/styles';
import Link from "next/link";
import { useIcon } from "@components/providers/IconProvider";
import LogoutButton from "@components/navbar/LogoutButton";

const DRAWER_WIDTH = 300;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        marginTop: 64,
        width: DRAWER_WIDTH,
        flexShrink: 0,
    },
    drawerPaper: {
        width: DRAWER_WIDTH,
        boxSizing: 'border-box',
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    drawerPaperDesktop: {
        marginTop: 64,
    }
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '32ch',
            '&:focus': {
                width: '36ch',
            },
        },
    },
}));

export default function Home() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery('(min-width:600px)');
    const [session] = useSession();
    const { icon } = useIcon();

    return (
        <Fragment>
            <AppBar style={{ zIndex: 1300 }}>
                <Toolbar style={{ margin: `0 ${isDesktop ? DRAWER_WIDTH : 0}px`, }}>
                    <Hidden smUp={true}>
                        <IconButton onClick={() => setOpen(true)} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                            <MenuRounded />
                        </IconButton>
                    </Hidden>

                    <Search>
                        <SearchIconWrapper>
                            <SearchRounded />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Keresés..."
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
            <Drawer
                variant={isDesktop ? "permanent" : "temporary"}
                classes={{
                    paper: `${classes.drawerPaper} ${isDesktop && classes.drawerPaperDesktop}`,
                }}
                open={open || isDesktop}
                ModalProps={{
                    keepMounted: true,
                }}
                onClose={() => setOpen(false)}
            >
                {session && (
                <Fragment>
                    <Grid container spacing={2} alignItems="center" style={{ padding: "24px 16px" }}>
                        <Grid item style={{ fontSize: "30px" }}>
                            {icon}
                        </Grid>
                        <Grid item>
                            <Typography variant="body1">
                                <b>{session.user.name}</b>
                            </Typography>
                            <Typography variant="body2">
                                {session.user.email}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                </Fragment>
                )}
                <List>
                    {!session && (
                        <Fragment>
                            <Link href="/auth/signin">
                                <ListItem button key={"login-button"}>
                                    <ListItemIcon>
                                        <ExitToAppRounded />
                                    </ListItemIcon>
                                    <ListItemText primary={"Bejelentkezés"} />
                                </ListItem>
                            </Link>
                            <Divider />
                        </Fragment>
                    )}
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {/* 24x24 kép a technológiákról */}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                {session && (
                    <LogoutButton />
                )}
            </Drawer>
        </Fragment>
    )
}
