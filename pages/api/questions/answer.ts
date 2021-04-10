import { User } from ".prisma/client";
import { Answer } from ".prisma/client";
import wrapper from "@lib/server/endpoint";
import getUser from "@lib/server/getUser";
import prisma from "@lib/server/prisma";

export type CreateAnswerRequiredParameters = {
    content: string;
    questionId: number;
};

export default wrapper(async (req) => {
    const user = await getUser(req);

    const { content, questionId }: CreateAnswerRequiredParameters = JSON.parse(req.body);
    
    const answer = await prisma.answer.create({
        data: {
            content,
            question: {
                connect: {
                    id: questionId,
                }
            },
            user: {
                connect: {
                    id: user.id,
                }
            }
        },
        include: {
            user: true,
        }
    });

    return {
        data: answer,
    };
});

export type CreateAnswerResponseType = Answer & {
    user: User;
};