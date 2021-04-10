import wrapper from "../../../lib/server/endpoint";
import prisma from "../../../lib/server/prisma";
import getUser from "../../../lib/server/getUser";

export default wrapper(async (req) => {
    const user = await getUser(req);

    const {title, content, post_category_connector} = JSON.parse(req.body);

    const post = await prisma.post.create({
        data: {
            title,
            content,
            post_category_connector: {
                connect: {
                    id: postId,
                },
            },
            author: {
                connect: {
                    id: user.id,
                },
            },
        },
    });

    return {
        message: "Sikeres",
        data: {
            post,
        },
    };
});