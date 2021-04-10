import get from "../fetch/get";
import post from "../fetch/post";

export default class IconWrapper {
    public async set(icon: string) {
        return await post("/icon/set", {
            body: JSON.stringify({ icon }),
        });
    }

    public async get(): Promise<string> {
        // @ts-ignore
        return (await get("/icon/get")).data.image;
    }
}