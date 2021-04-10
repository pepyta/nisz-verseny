import { User } from ".prisma/client";
import { QuestionCategoryConnector } from ".prisma/client";
import { Answer } from ".prisma/client";
import { Category } from ".prisma/client";
import { Question } from ".prisma/client";
import wrapper from "@lib/server/endpoint";
import prisma from "@lib/server/prisma";

export default wrapper(async (req) => {
    const questions = await prisma.question.findMany({
        include: {
            user: true,
            QuestionCategoryConnector: {
                include: {
                    category: true,
                },
            },
            answers: {
                include: {
                    user: true,
                },
            },
        },
    });

    return {
        data: questions,
    };
});

export type GetQuestionsResponseType = (Question & {
    user: User;
    QuestionCategoryConnector: (QuestionCategoryConnector & {
        category: Category;
    })[];
    answers: (Answer & {
        user: User;
    })[];
})[]