import wrapper from "@lib/server/endpoint";
import getUser from "@lib/server/getUser";
import prisma from "@lib/server/prisma";

export type MarkAsAnswerRequiredParameters = {
    answerId: number;
};

export default wrapper(async (req) => {
    const user = await getUser(req);
    const { answerId }: MarkAsAnswerRequiredParameters = JSON.parse(req.body);

    const answer = await prisma.answer.findUnique({
        where: {
            id: answerId,
        },
    });

    if(answer.userId !== user.id) throw new Error("Ehhez nincs jogosultságod!");

    await prisma.answer.update({
        where: {
            id: answerId,
        },
        data: {
            marked: true,
        },
    });

    return {
        message: "Sikeresen megjelölted válasznak ezt a hozzáaszólást!"
    };
});