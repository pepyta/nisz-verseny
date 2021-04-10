import { NextApiRequest, NextApiResponse } from "next";

type ResponseType = {
    message?: string;
    data?: any;
};

const wrapper = (endpoint: (req: NextApiRequest) => Promise<ResponseType>) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const resp = await endpoint(req);
            res.json(resp);
        } catch(e) {
            res.json({
                error: true,
                message: e.message,
            });
        }
    };
};

export default wrapper;