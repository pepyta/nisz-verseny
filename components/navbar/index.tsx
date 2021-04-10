import { AppBar, Button, Card, CardContent, Container, Divider, Drawer, Grid, Hidden, IconButton, InputBase, List, ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles, Menu, MenuItem, Popover, StylesProvider, Toolbar, Typography, useMediaQuery } from "@material-ui/core";
import { ExitToAppRounded, HistoryRounded, HomeRounded, MenuRounded, SearchRounded } from "@material-ui/icons";
import { useSession } from "next-auth/client"
import { Fragment, PropsWithChildren, useState } from "react";
import { experimentalStyled as styled, alpha, useTheme } from '@material-ui/core/styles';
import Link from "next/link";
import { useIcon } from "@components/providers/IconProvider";
import LogoutButton from "@components/navbar/LogoutButton";
import PostCreation from "@components/posts/PostCreation";
import { useCategories } from "@components/providers/CategoryProvider";
import Image from "next/image";
import FuseJS from "fuse.js";
import { usePosts } from "@components/providers/PostsProvider";
import CategoryIcon from "@components/categories/CategoryIcon";
import EditIcon from '@material-ui/icons/EditRounded';

const DRAWER_WIDTH = 300;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    paper: {
        boxShadow: "none !important",
        MozBoxShadow: "none !important",
        WebkitBoxShadow: "none !important",
        backgroundColor: "transparent !important",
        marginTop: theme.spacing(1),
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
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
            marginLeft: DRAWER_WIDTH,
            marginTop: 64,
        },
    },
    drawerPaperDesktop: {
        marginTop: 64,
    }
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    transition: theme.transitions.create('background-color'),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
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
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: '100%',
    },
}));

export default function Navbar({ children }: PropsWithChildren<{}>) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery('(min-width:600px)');
    const [session] = useSession();
    const { icon } = useIcon();
    const { categories } = useCategories();
    const [anchorEl, setAnchorEl] = useState<Element>(null);
    const [openSearch, setOpenSearch] = useState(false);
    const { posts } = usePosts();

    const [search, setSearch] = useState("");

    const theme = useTheme();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenSearch(true);
    };

    const handleClose = () => {
        setOpenSearch(false);
    };

    const fuse = new FuseJS(posts.map((post) => ({
        title: post.title,
        content: post.content,
        author: post.author.name,
        categories: post.PostCategoryConnector.map((el) => el.category.name),
    })), {
        keys: ["title", "content", "author", "categories"],
    });


    return (
        <Fragment>
            <AppBar style={{ zIndex: 1300 }}>
                <div style={{ marginLeft: isDesktop ? DRAWER_WIDTH : 0 }}>
                    <Container maxWidth="sm" >
                        <Toolbar style={{ padding: 0 }}>
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
                                    value={search}
                                    onChange={(e) => {
                                        handleClick(e);
                                        setSearch(e.target.value);
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                            <Popover
                                open={openSearch}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                classes={{
                                    paper: classes.paper,
                                }}
                            >
                                {
                                    fuse.search(search, {
                                        limit: 3,
                                    }).map((result) => (
                                        <Card
                                            style={{
                                                margin: theme.spacing(1),
                                                width: anchorEl?.clientWidth,
                                            }}
                                        >
                                            <CardContent>
                                                <Typography variant="body1">
                                                    Teszt
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    ))
                                }
                            </Popover>
                        </Toolbar>
                    </Container>
                </div>
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
                            <Link href="/auth/welcome">
                                <Grid item style={{ fontSize: 24, textDecoration: "none", cursor: "pointer" }}>
                                    {icon}
                                </Grid>
                            </Link>
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
                    <Link href="/">
                        <ListItem button key={"home-button"}>
                            <ListItemIcon>
                                <HomeRounded />
                            </ListItemIcon>
                            <ListItemText primary={"Főoldal"} />
                        </ListItem>
                    </Link>
                    {session && (
                        <Link href="/posts/my">
                            <ListItem button key={"my-posts-button"}>
                                <ListItemIcon>
                                    <EditIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Saját bejegyzések"} />
                            </ListItem>
                        </Link>
                    )}
                </List>
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
                    </Fragment>
                )}
                <Divider />
                <List subheader={
                    <ListSubheader component="div" id="nested-list-subheader">Kategóriák</ListSubheader>
                }>
                    {categories.map((category, index) => (
                        <Link href={`/categories/${category.id}`}>
                            <ListItem button key={category.id}>
                                <ListItemIcon>
                                    <CategoryIcon category={category} />
                                </ListItemIcon>
                                <ListItemText primary={category.name} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
                {session && (
                    <LogoutButton />
                )}
            </Drawer>
            <PostCreation />
            <div className={classes.content}>
                {children}
            </div>
        </Fragment>
    )
}
