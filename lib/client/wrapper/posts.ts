import { CreatePostRequiredParameters } from "@pages/api/posts/create";
import post from "../fetch/post";

export default class PostsWrapper {
    public async create(data: CreatePostRequiredParameters) {
        return await post("/posts/create", {
            body: JSON.stringify(data),
        });
    }
}