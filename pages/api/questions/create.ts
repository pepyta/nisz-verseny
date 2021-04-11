import { User } from ".prisma/client";
import { Answer } from ".prisma/client";
import wrapper from "@lib/server/endpoint";
import getUser from "@lib/server/getUser";
import prisma from "@lib/server/prisma";
import { GetQuestionsResponseType } from "./get";

export type CreateQuestionRequiredParameters = {
    title: string;
    content: string;
    categories: string[];
};

export default wrapper(async (req) => {
    const user = await getUser(req);

    const { content, title, categories }: CreateQuestionRequiredParameters = JSON.parse(req.body);
    
    const question: CreateQuestionResponseType = await prisma.question.create({
        data: {
            content,
            title,
            QuestionCategoryConnector: {
                create: categories.map((category) => ({
                    categoryId: category,
                })),
            },
            user: {
                connect: {
                    id: user.id,
                }
            }
        },
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
        }
    });

    return {
        data: question,
    };
});

export type CreateQuestionResponseType = GetQuestionsResponseType[0];