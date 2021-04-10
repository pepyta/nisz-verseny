import { Category } from ".prisma/client";
import { useCategories } from "@components/providers/CategoryProvider";
import { Grid, makeStyles } from "@material-ui/core";
import { useState } from "react";

const Tag = ({ category }: { category: Category }) => {
    const classes = useStyles();
    const { categories } = useCategories();

    return (
        <div className={classes.root} style={{ backgroundColor: categories.find((el) => category.id === el.id).color }}>
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