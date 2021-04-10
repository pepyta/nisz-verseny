import prisma from "@lib/server/prisma";
import { parseBody } from "next/dist/next-server/server/api-utils";
import wrapper from "../../../lib/server/endpoint";

type DeletePostRequiredParameters = {
    id: number;
};

export default wrapper(async (req) => {
    const { id }: DeletePostRequiredParameters = JSON.parse(req.body);

    await prisma.post.delete({
        where: {
            id,
        },
    });

    return{
        message: "Sikeresen törölted a bejegyzést!",
    };
})