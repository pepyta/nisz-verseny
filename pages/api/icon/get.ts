import wrapper from "@lib/server/endpoint";
import getUser from "@lib/server/getUser";

export default wrapper(async (req) => {
    const { image } = await getUser(req);
    
    return {
        data: {
            image,
        },
    };
});