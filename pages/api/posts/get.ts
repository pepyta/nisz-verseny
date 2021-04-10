
import wrapper from "@lib/server/endpoint";
import prisma from "@lib/server/prisma";
import getUser from "@lib/server/getUser";
import { Post } from ".prisma/client";
import { User } from ".prisma/client";
import { PostCategoryConnector } from ".prisma/client";
import { Category } from ".prisma/client";
import { Reaction } from ".prisma/client";

export default wrapper(async (req) => {
    const posts = await prisma.post.findMany({
        include: {
            author: true,
            PostCategoryConnector: {
                include: {
                    category: true
                },
            },
            reactions: {
                include: {
                    user: true,
                }
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return {
        data: posts,
    };
});

export type GetPostsResponseType = (Post & {
    author: User;
    PostCategoryConnector: (PostCategoryConnector & {
        category: Category;
    })[];
    reactions: (Reaction & {
        user: User;
    })[];
})[];