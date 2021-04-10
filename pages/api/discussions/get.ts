import { User } from ".prisma/client";
import { Message } from ".prisma/client";
import wrapper from "@lib/server/endpoint";
import prisma from "@lib/server/prisma";

export default wrapper(async (req) => {
    const messages = await prisma.message.findMany({
        where: {
            sentat: {
                lte: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7),
            }
        },
        include: {
            sender: true,
        },
    });

    return {
        data: messages,
    }
});

export type GetDiscussionMessagesResponseType = (Message & {
    sender: User;
})[];