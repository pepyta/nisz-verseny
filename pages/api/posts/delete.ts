import prisma from "@lib/server/prisma";
import { parseBody } from "next/dist/next-server/server/api-utils";
import wrapper from "../../../lib/server/endpoint";

export default wrapper(async (req) => {
    const {id} = JSON.parse(req.body);
    

    const deletePost = await prisma.post.delete({
        where: {
            id: id
        }
    })
    return{
        message: "Sikeresen törölted a bejegyzést!",
    };
})