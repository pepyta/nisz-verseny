import wrapper from "@lib/server/endpoint";
import getUser from "@lib/server/getUser";
import prisma from "@lib/server/prisma";

export type CreateDiscussionMessageRequiredParameters = {
    content: string;
    category: string;
};

export default wrapper(async (req) => {
    const user = await getUser(req);
    
    const { content, category }: CreateDiscussionMessageRequiredParameters = JSON.parse(req.body);

    const message = await prisma.message.create({
        data: {
            sender: {
                connect: {
                    id: user.id,
                },
            },
            content,
            category: {
                connect: {
                    id: category,
                },
            },
        },
        include: {
            sender: true,
        }
    });

    return {
        data: message,
    }
});