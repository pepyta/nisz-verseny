import getUser from "@lib/server/getUser";
import prisma from "@lib/server/prisma";
import wrapper from "../../../lib/server/endpoint";

type DeletePostRequiredParameters = {
    id: number;
};

export default wrapper(async (req) => {
    const user = await getUser(req);
    const { id }: DeletePostRequiredParameters = JSON.parse(req.body);

    const post = await prisma.post.findUnique({
        where: {
            id,
        },
    });

    if(post.userId !== user.id) throw new Error("Nincs jogosultságod ehhez!");

    await prisma.postCategoryConnector.deleteMany({
        where: {
            postId: id,
        },
    });

    await prisma.post.delete({
        where: {
            id,
        },
    });

    return{
        message: "Sikeresen törölted a bejegyzést!",
    };
})