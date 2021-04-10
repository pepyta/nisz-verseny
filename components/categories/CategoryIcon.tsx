import { Category } from ".prisma/client";
import { makeStyles } from "@material-ui/core";
import Vibrant from "node-vibrant";
import Image from "next/image";
import { useState } from "react";

const CategoryIcon = ({ category }: { category: Category }) => {
    const classes = useStyles();
    const [color, setColor] = useState("#fff");

    const src = `/img/icon/${category.id}.svg`;

    Vibrant.from(src).getPalette().then((palette) => setColor(palette.LightMuted.hex));

    return (
        <div className={classes.root} style={{ backgroundColor: color }}>
            <Image src={src} width={16} height={16} />
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 8,
        width: 32,
        height: 32,
        padding: 8,
        boxShadow: theme.shadows[1],
    }
}));

export default CategoryIcon;