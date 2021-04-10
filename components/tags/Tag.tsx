import { Category } from ".prisma/client";
import { Grid, makeStyles } from "@material-ui/core";
import Image from "next/image";
import Vibrant from "node-vibrant";
import NodeVibrant from "node-vibrant";
import { useEffect, useState } from "react";

const Tag = ({ category }: { category: Category }) => {
    const classes = useStyles();
    const [color, setColor] = useState("#000");

    
    let v = new NodeVibrant(`/img/icon/${category.id}.svg`);
    v.getPalette().then((palette) => {
        setColor(palette.DarkVibrant.hex);
    })

    return (
        <div className={classes.root} style={{ backgroundColor: color }}>
            <Grid container spacing={1} alignItems={"center"}>
                <Grid item>    
                    {category.name}
                </Grid>
            </Grid>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 16,
        padding: "8px 16px",
        color: "white",
        boxShadow: theme.shadows[1],
    }
}));

export default Tag;