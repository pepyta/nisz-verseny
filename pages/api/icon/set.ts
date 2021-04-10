import wrapper from "@lib/server/endpoint";
import getUser from "@lib/server/getUser";
import prisma from "@lib/server/prisma";

export type SetIconRequiredParameters = {
    icon: string;
};

export default wrapper(async (req) => {
    const user = await getUser(req);
    const { icon }: SetIconRequiredParameters = JSON.parse(req.body);

    await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            image: icon,
        },
    });

    return {
        message: "Ikon sikeresen beállítva!",
    };
});