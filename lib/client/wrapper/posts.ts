import { CreatePostRequiredParameters, CreatePostResponseType } from "@pages/api/posts/create";
import { EditPostRequiredParameters, EditPostResponseType } from "@pages/api/posts/edit";
import { GetPostsResponseType } from "@pages/api/posts/get";
import { CreateReactionResponseType } from "@pages/api/posts/react";
import get from "../fetch/get";
import post from "../fetch/post";

export default class PostsWrapper {
    public async create(data: CreatePostRequiredParameters) {
        return await post<CreatePostResponseType>("/posts/create", {
            body: JSON.stringify(data),
        });
    }
    
    public async edit(data: EditPostRequiredParameters) {
        return await post<EditPostResponseType>("/posts/edit", {
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

    public async react(postId: number, emoji: string) {
        return await post<CreateReactionResponseType>("/posts/react", {
            body: JSON.stringify({
                postId,
                emoji,
            }),
        });
    }
}