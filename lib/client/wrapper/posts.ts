import { CreatePostRequiredParameters, CreatePostResponseType } from "@pages/api/posts/create";
import { GetPostsResponseType } from "@pages/api/posts/get";
import get from "../fetch/get";
import post from "../fetch/post";

export default class PostsWrapper {
    public async create(data: CreatePostRequiredParameters) {
        return await post<CreatePostResponseType>("/posts/create", {
            body: JSON.stringify(data),
        });
    }

    public async get() {
        return await get<GetPostsResponseType>("/posts/get");
    }

    public async delete(id: number) {
        return await post("/posts/delete", {
            body: JSON.stringify({id}),
        });
    }
}