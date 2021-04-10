import get from "./get";

const post = async <T = {}>(input: RequestInfo, init?: RequestInit) => {
    return await get<T>(input, {
        method: "POST",
        ...init,
    });
};

export default post;