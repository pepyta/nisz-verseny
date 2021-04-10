import wrapper from "@lib/server/endpoint";
import prisma from "@lib/server/prisma";

export default wrapper(async () => {
    const categories = await prisma.category.findMany({});

    return {
        data: {
            categories,
        },
    };
});