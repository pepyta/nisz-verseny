import { RegistrationRequiredParameters } from "@pages/api/auth/register";
import post from "../fetch/post";

export default class UserWrapper {
    public async register(data: RegistrationRequiredParameters) {
        return await post("/auth/register", {
            body: JSON.stringify(data),
        });
    }
}