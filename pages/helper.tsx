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
        backgroundColor: theme.palette.background.paper,
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
                >
                    <Tab label="Bejegyzések" icon={<FolderIcon />} {...a11yProps(0)} />
                    <Tab label="Beszélgetés" icon={<ChatIcon />} {...a11yProps(1)} />
                    <Tab label="Kérdések" icon={<HelpIcon />} {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Grid container spacing = {3}>
                    <Grid item xs={6}>
                        {/* <Button onClick={handleClickOpen}> */}
                            <Card className={kartyaClass.root}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="Bejegyzés készítése"
                                        height="100%"
                                        image="/img/gif/bejegyzeskeszit.gif"
                                        title="Bejegyzés készítése"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="h2">
                                            Bejegyzés készítése
                                    </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Bejegyzés készitése nagyon egyszerű, csak kattintsunk a "bejegyzés létrehozása"
                                            gombra, majd töltsük ki a kért adatokat.
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
                                        alt="Bejegyzés törlése"
                                        height="100%"
                                        image="/img/gif/bejegyzestorles.gif"
                                        title="Bejegyzés törlése"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="h2">
                                            Bejegyzés törlése
                                    </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Bejegyzést úgy tudunk törölni, hogy a posztunkban rákattintunk a három pontra,
                                            majd a törlést választjuk.
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
                    <Grid item xs = {3}>

                    </Grid>
                    <Grid item xs = {6}>
                        {/* <Button onClick={handleClickOpen}> */}
                        <Card className={kartyaClass.root}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="Bejegyzés szerkesztése"
                                        height="100%"
                                        image="/img/gif/bejegyzesszerk.gif"
                                        title="Bejegyzés szerkesztése"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="h2">
                                            Bejegyzés szerkesztése
                                    </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                        Bejegyzést úgy tudunk törölni, hogy a posztunkban rákattintunk a három pontra,
                                            majd a szerkesztést választjuk.
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
                    <Grid item xs = {3}>
                        
                    </Grid>
                </Grid>

            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
        </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
        </TabPanel>
        </div>
    );
}

export default helpPage;