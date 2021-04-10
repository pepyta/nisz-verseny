export const API_ENDPOINT = process.env.NODE_ENV === "production" ? "http://csapat05-versenydonto.nisz.hu/api" : "http://localhost:3000/api";

const get = async (input: RequestInfo, init?: RequestInit) => {
    const resp = await fetch(`${API_ENDPOINT}${input}`, {
        method: "GET",
        ...init,
    });

    if(!resp.ok) throw new Error("A szerver nem elérhető!");

    const data = await resp.json();
    if(data.error) throw new Error(data.message);

    return data;
};

export default get;