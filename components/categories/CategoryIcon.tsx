import { Category } from ".prisma/client";
import { makeStyles } from "@material-ui/core";
import Vibrant from "node-vibrant";
import Image from "next/image";
import { useEffect, useState } from "react";

const CategoryIcon = ({ category, size = 32 }: { category: Category, size?: number }) => {
    const classes = useStyles();
    const [color, setColor] = useState(category.color || "#fff");

    const src = `/img/icon/${category.id}.svg`;

    if(!category.color) Vibrant.from(src).getPalette().then((palette) => setColor(palette.LightMuted.hex));

    useEffect(() => {
        setColor(category.color || color);
    }, [category.color]);

    return (
        <div
            className={classes.root}
            style={{ backgroundColor: color, width: size, height: size, borderRadius: size / 4, padding: size / 4  }}
        >
            <Image src={src} width={size / 4 * 3} height={size / 4 * 3} />
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: theme.shadows[1],
    }
}));

export default CategoryIcon;