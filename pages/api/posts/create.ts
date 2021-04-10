import wrapper from "../../../lib/server/endpoint";
import prisma from "../../../lib/server/prisma";
import getUser from "../../../lib/server/getUser";
import { GetPostsResponseType } from "./get";

export type CreatePostRequiredParameters = {
    title: string;
    content: string;
    categories: string[];
};

export default wrapper(async (req) => {
    const user = await getUser(req);

    const {title, content, categories}: CreatePostRequiredParameters = JSON.parse(req.body);

    const post = await prisma.post.create({
        data: {
            title,
            content,
            PostCategoryConnector: {
                create: categories.map((category) => (
                    {
                        categoryId: category,
                    }
                )),
            },
            author: {
                connect: {
                    id: user.id,
                },
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
        message: "Sikeresen létrehoztad a bejegyzést!",
        data: post,
    };
});

export type CreatePostResponseType = GetPostsResponseType[0];