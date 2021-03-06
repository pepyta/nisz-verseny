import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import HelpIcon from '@material-ui/icons/Help';
import FolderIcon from '@material-ui/icons/Folder';
import ChatIcon from '@material-ui/icons/Chat';
import { Button, Card, CardActionArea, CardContent, CardMedia, Dialog, DialogContent, DialogContentText, DialogTitle, Grid } from '@material-ui/core';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const tabhoz = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
}));

const kartyahoz = makeStyles({
    root: {
        maxWidth: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
    }

})

const helpPage = () => {
    const tabClass = tabhoz();
    const kartyaClass = kartyahoz();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    /* const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }; */

    return (
        <div className={tabClass.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    scrollButtons="auto"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs example"
                    centered
                    style={{ borderRadius: 12, }}
                >
                    <Tab label="Bejegyz??sek" icon={<FolderIcon />} {...a11yProps(0)} />
                    <Tab label="Besz??lget??s" icon={<ChatIcon />} {...a11yProps(1)} />
                    <Tab label="K??rd??sek" icon={<HelpIcon />} {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        {/* <Button onClick={handleClickOpen}> */}
                        <Card className={kartyaClass.root}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Bejegyz??s k??sz??t??se"
                                    height="100%"
                                    image="/img/gif/bejegyzesKeszit.gif"
                                    title="Bejegyz??s k??sz??t??se"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="h2">
                                        Bejegyz??s k??sz??t??se
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Bejegyz??s k??szit??se nagyon egyszer??, csak kattintsunk a "bejegyz??s l??trehoz??sa"
                                        gombra, majd t??lts??k ki a k??rt adatokat.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        {/* </Button> */}
                        {/* <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"

                        >
                            <DialogContent style={{ backgroundImage: 'url("/img/gif/bejegyzeskeszit.gif")', backgroundRepeat: 'no-repeat' }}>
                                <DialogContentText id="alert-dialog-description"
                                    style={
                                        {
                                            width: '550px',
                                            height: '300px'
                                        }
                                    }
                                >
                                </DialogContentText>
                            </DialogContent>
                        </Dialog> */}
                    </Grid>
                    <Grid item xs={6}>
                        {/* <Button onClick={handleClickOpen}> */}
                        <Card className={kartyaClass.root}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Bejegyz??s t??rl??se"
                                    height="100%"
                                    image="/img/gif/bejegyzesTorles.gif"
                                    title="Bejegyz??s t??rl??se"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="h2">
                                        Bejegyz??s t??rl??se
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Bejegyz??st ??gy tudunk t??r??lni, hogy a posztunkban r??kattintunk a h??rom pontra,
                                        majd a t??rl??st v??lasztjuk.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        {/* </Button> */}

                        {/* <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"

                        >
                            <DialogContent style={{ backgroundImage: 'url("/img/gif/bejegyzestorles.gif")', backgroundRepeat: 'no-repeat' }}>
                                <DialogContentText id="alert-dialog-description"
                                    style={
                                        {
                                            width: '550px',
                                            height: '300px'
                                        }
                                    }
                                >
                                </DialogContentText>
                            </DialogContent>
                        </Dialog> */}

                    </Grid>
                    <Grid item xs={3}>

                    </Grid>
                    <Grid item xs={6}>
                        {/* <Button onClick={handleClickOpen}> */}
                        <Card className={kartyaClass.root}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Bejegyz??s szerkeszt??se"
                                    height="100%"
                                    image="/img/gif/bejegyzesSzerk.gif"
                                    title="Bejegyz??s szerkeszt??se"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="h2">
                                        Bejegyz??s szerkeszt??se
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Bejegyz??st ??gy tudunk t??r??lni, hogy a posztunkban r??kattintunk a h??rom pontra,
                                        majd a szerkeszt??st v??lasztjuk.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        {/* </Button> */}

                        {/* <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"

                        >
                            <DialogContent style={{ backgroundImage: 'url("/img/gif/bejegyzestorles.gif")', backgroundRepeat: 'no-repeat' }}>
                                <DialogContentText id="alert-dialog-description"
                                    style={
                                        {
                                            width: '550px',
                                            height: '300px'
                                        }
                                    }
                                >
                                </DialogContentText>
                            </DialogContent>
                        </Dialog> */}
                    </Grid>
                    <Grid item xs={3}>

                    </Grid>
                </Grid>

            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid container>
                    <Grid item xs={3}>

                    </Grid>
                    <Grid item xs={6}>
                        {/* <Button onClick={handleClickOpen}> */}
                        <Card className={kartyaClass.root}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Besz??lget??s"
                                    height="100%"
                                    image="/img/gif/beszelget.gif"
                                    title="Besz??lget??s"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="h2">
                                        Besz??lget??s
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Besz??get??shez kattintson b??rmelyik kateg??ri??ra a bal oldalon, majd a besz??lget??sre
                                        kattinta el is kezdhet chatelni a t??bbi felhaszn??l??val.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        {/* </Button> */}
                        {/* <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"

                        >
                            <DialogContent style={{ backgroundImage: 'url("/img/gif/bejegyzeskeszit.gif")', backgroundRepeat: 'no-repeat' }}>
                                <DialogContentText id="alert-dialog-description"
                                    style={
                                        {
                                            width: '550px',
                                            height: '300px'
                                        }
                                    }
                                >
                                </DialogContentText>
                            </DialogContent>
                        </Dialog> */}
                    </Grid>
                    <Grid item xs={3}>

                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Grid container>
                    <Grid item xs={6}>
                        {/* <Button onClick={handleClickOpen}> */}
                        <Card className={kartyaClass.root}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="K??rdez??s"
                                    height="100%"
                                    image="/img/gif/kerdes.gif"
                                    title="K??rdez??s"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="h2">
                                        K??rdez??s
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        K??rd??s feltev??s??hez r?? kell hogy nyomjunk a k??rd??sek ??s v??laszok men??pontra a bal oldalt,
                                        majd jobb alul a "k??rd??s l??trehoz??sa" gombra kattintva feltehetj??k k??rd??s??nket.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        {/* </Button> */}
                        {/* <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"

                        >
                            <DialogContent style={{ backgroundImage: 'url("/img/gif/bejegyzeskeszit.gif")', backgroundRepeat: 'no-repeat' }}>
                                <DialogContentText id="alert-dialog-description"
                                    style={
                                        {
                                            width: '550px',
                                            height: '300px'
                                        }
                                    }
                                >
                                </DialogContentText>
                            </DialogContent>
                        </Dialog> */}
                    </Grid>
                    <Grid item xs={6}>
                        {/* <Button onClick={handleClickOpen}> */}
                        <Card className={kartyaClass.root}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="V??laszol??s"
                                    height="100%"
                                    image="/img/gif/valasz.gif"
                                    title="V??laszol??s"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="h2">
                                        V??laszol??s
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        K??rd??sek megv??laszol??s??hoz nyomjunk r?? a bal oldalon tal??lhat?? "k??rd??sek ??s v??laszok"
                                        men??pontra, majd a nyitott k??rd??sek k??z??l v??logathatunk.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        {/* </Button> */}

                        {/* <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"

                        >
                            <DialogContent style={{ backgroundImage: 'url("/img/gif/bejegyzestorles.gif")', backgroundRepeat: 'no-repeat' }}>
                                <DialogContentText id="alert-dialog-description"
                                    style={
                                        {
                                            width: '550px',
                                            height: '300px'
                                        }
                                    }
                                >
                                </DialogContentText>
                            </DialogContent>
                        </Dialog> */}

                    </Grid>
                </Grid>
            </TabPanel>
        </div>
    );
}

export default helpPage;