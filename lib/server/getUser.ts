import { NextApiRequest } from "next";
import { getSession } from "next-auth/client";
import prisma from "./prisma";

const getUser = async (req: NextApiRequest) => {
    const session = await getSession({ req });

    if(!session) throw new Error("Nem vagy bejelentkezve!");

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    });

    if(!user) throw new Error("Nem vagy bejelentkezve!");

    return user;
};

export default getUser;