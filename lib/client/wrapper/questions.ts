import get from "../fetch/get";
import post from "../fetch/post";
import { GetQuestionsResponseType } from "@pages/api/questions/get";
import { MarkAsAnswerRequiredParameters } from "@pages/api/questions/mark";
import { CreateAnswerRequiredParameters, CreateAnswerResponseType } from "@pages/api/questions/answer";
import { CreateQuestionRequiredParameters, CreateQuestionResponseType } from "@pages/api/questions/create";

export default class QuestionsWrapper {
    public async get() {
        return await get<GetQuestionsResponseType>("/questions/get");
    }

    public async mark(data: MarkAsAnswerRequiredParameters) {
        return await post("/questions/mark", {
            body: JSON.stringify(data),
        });
    }

    public async answer(data: CreateAnswerRequiredParameters) {
        return await post<CreateAnswerResponseType>("/questions/answer", {
            body: JSON.stringify(data),
        });
    }

    public async create(data: CreateQuestionRequiredParameters) {
        return await post<CreateQuestionResponseType>("/questions/create", {
            body: JSON.stringify(data),
        });
    }
}