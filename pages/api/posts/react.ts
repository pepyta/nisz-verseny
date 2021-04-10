import { User } from ".prisma/client";
import { Reaction } from ".prisma/client";
import wrapper from "@lib/server/endpoint";
import getUser from "@lib/server/getUser";
import prisma from "@lib/server/prisma";

export type CreateReactionRequiredParameters = {
    emoji: string;
    postId: number;
};

export default wrapper(async (req) => {
    const user = await getUser(req);
    const { emoji, postId }: CreateReactionRequiredParameters = JSON.parse(req.body);

    const check = await prisma.reaction.findMany({
        where: {
            postId,
            userId: user.id,
        },
    });

    const found = check.find((el) => el.emoji === emoji);
    if(found) {
        await prisma.reaction.delete({
            where: {
                id: found.id,
            },
        });

        return {
            message: "deleted",
        };
    } else {
        const reaction = await prisma.reaction.create({
            data: {
                emoji,
                post: {
                    connect: {
                        id: postId,
                    },
                },
                user: {
                    connect: {
                        id: user.id,
                    },
                },
            },
            include: {
                user: true,
            },
        });
    
        return {
            message: "created",
            data: reaction
        };
    }

});

export type CreateReactionResponseType = Reaction & {
    user: User;
};