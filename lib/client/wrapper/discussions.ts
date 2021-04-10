import get from "../fetch/get";
import post from "../fetch/post";
import { CreateDiscussionMessageRequiredParameters } from "@pages/api/discussions/create";
import { GetDiscussionMessagesResponseType } from "@pages/api/discussions/get";

export default class DiscussionsWrapper {
    public async get() {
        return await get<GetDiscussionMessagesResponseType>("/discussions/get");
    }

    public async create(data: CreateDiscussionMessageRequiredParameters) {
        return await post<GetDiscussionMessagesResponseType[0]>("/discussions/create", {
            body: JSON.stringify(data)
        });
    }
}