import { Category } from ".prisma/client";
import CategoriesWrapper from "@lib/client/wrapper/categories";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

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
            setCategories((await wrapper.get()).data.categories);
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