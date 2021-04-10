import { BottomNavigation, BottomNavigationAction, Container } from "@material-ui/core";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FolderIcon from '@material-ui/icons/Folder';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CommentIcon from '@material-ui/icons/Comment';
import HelpIcon from '@material-ui/icons/Help';

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
});


const helpPage = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState('bejegyzesek');

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
      };

    return (
        <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
            <BottomNavigationAction label="Bejegyzések" value="bejegyzesek" icon={<FolderIcon />} />
            <BottomNavigationAction label="Beszélgetés" value="beszelgetes" icon={<CommentIcon />} />
            <BottomNavigationAction label="Kérdések" value="kerdes" icon={<HelpIcon />} />
        </BottomNavigation>
    )
}

export default helpPage;