import DiscussionsWrapper from "@lib/client/wrapper/discussions";
import { GetDiscussionMessagesResponseType } from "@pages/api/discussions/get";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react";

type DiscussionsContextType = {
    messages: GetDiscussionMessagesResponseType;
    setMessages: Dispatch<SetStateAction<GetDiscussionMessagesResponseType>>;
};

const DiscussionsContext = createContext<DiscussionsContextType>(null);

export const useDiscussions = () => {
    const { messages, setMessages } = useContext(DiscussionsContext);

    return {
        messages,
        addMessage: (message: GetDiscussionMessagesResponseType[0]) => setMessages([...messages, message])
    };
};

const DiscussionsProvider = ({ children }: PropsWithChildren<{}>) => {
    const [messages, setMessages] = useState([]);
    const wrapper = new DiscussionsWrapper();

    const load = async () => {
        try {
            const resp = await wrapper.get();
            if(messages.length !== resp.data.length) setMessages(resp.data);
            setTimeout(load, 5000);
        } catch(e) {}
    };

    useEffect(() => { load() }, []);

    return (
        <DiscussionsContext.Provider value={{ messages, setMessages }}>
            {children}
        </DiscussionsContext.Provider>
    );
};

export default DiscussionsProvider;