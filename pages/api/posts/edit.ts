import wrapper from "../../../lib/server/endpoint";
import prisma from "../../../lib/server/prisma";
import getUser from "../../../lib/server/getUser";
import { GetPostsResponseType } from "./get";

export type EditPostRequiredParameters = {
    id: number;
    title: string;
    content: string;
    categories: string[];
};

export default wrapper(async (req) => {
    const user = await getUser(req);

    const {id, title, content, categories}: EditPostRequiredParameters = JSON.parse(req.body);

    const check = await prisma.post.findUnique({
        where: {
            id,
        },
    });

    if(check.userId !== user.id) throw new Error("Ehhez nincs jogosultságod!");


    await prisma.postCategoryConnector.deleteMany({
        where: {
            postId: id,
        },
    });

    const post = await prisma.post.update({
        where: {
            id,
        },
        data: {
            title,
            content,
            author: {
                connect: {
                    id: user.id,
                },
            },
            PostCategoryConnector: {
                create: categories.map((category) => (
                    {
                        categoryId: category,
                    }
                )),
            },
        },
        include: {
            author: true,
            PostCategoryConnector: {
                include: {
                    category: true
                },
            },
        }
    });

    return {
        message: "Sikeresen szerkesztetted a bejegyzést!",
        data: post,
    };
});

export type EditPostResponseType = GetPostsResponseType[0];