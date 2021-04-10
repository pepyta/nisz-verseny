
import wrapper from "@lib/server/endpoint";
import prisma from "@lib/server/prisma";
import getUser from "@lib/server/getUser";
import { Post } from ".prisma/client";
import { User } from ".prisma/client";
import { PostCategoryConnector } from ".prisma/client";
import { Category } from ".prisma/client";

export default wrapper(async (req) => {
    const user = await getUser(req);

    const posts = await prisma.post.findMany({
        where: {
            userId: user.id,
        },
        include: {
            author: true,
            PostCategoryConnector: {
                include: {
                    category: true
                },
            },
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
})[];