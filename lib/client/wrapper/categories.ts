import { Category } from ".prisma/client";
import get from "../fetch/get";

export default class CategoriesWrapper {
    public async get() {
        return await get<{ categories: Category[] }>("/categories/get");
    }
}