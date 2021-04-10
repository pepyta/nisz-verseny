import get from "./get";

const post = async (input: RequestInfo, init?: RequestInit) => {
    return await get(input, {
        method: "POST",
        ...init,
    });
};

export default post;