import { Category } from ".prisma/client";
import CategoriesWrapper from "@lib/client/wrapper/categories";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import Vibrant from "node-vibrant";

type CategoryContextType = {
    categories: Category[];
}

const CategoryContext = createContext<CategoryContextType>(null);

export const useCategories = () => {
    return useContext(CategoryContext);
};

const CategoryProvider = ({ children }: PropsWithChildren<{}>) => {
    const [categories, setCategories] = useState([]);
    const wrapper = new CategoriesWrapper();

    const load = async () => {
        try {
            const resp = (await wrapper.get()).data.categories;

            const palettes = await Promise.all(resp.map(async (category) => await Vibrant.from(`/img/icon/${category.id}.svg`).getPalette()));

            for(let i = 0; i < palettes.length; i++){
                resp[i].color = resp[i].color.length > 0 ? resp[i].color : palettes[i].DarkMuted.hex;
            }

            console.log(resp);

            setCategories(resp);
        } catch(e) {

        }
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories }}>
            {children}
        </CategoryContext.Provider>
    );
};



export default CategoryProvider;