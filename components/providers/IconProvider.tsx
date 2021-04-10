import FullScreenLoader from "@components/loaders/FullScreenLoader";
import IconWrapper from "@lib/client/wrapper/icon";
import WelcomeScreen from "@pages/auth/welcome";
import { useSession } from "next-auth/client";
import { useSnackbar } from "notistack";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react";


const IconContext = createContext<IconContextType>(null);

type IconContextType = {
    icon: string;
    setIcon: Dispatch<SetStateAction<string>>;
};

const IconProvider = ({ children }: PropsWithChildren<{}>) => {
    const [icon, setIcon] = useState<string>(null);
    const [loaded, setLoaded] = useState(false);
    const [session] = useSession();

    const { enqueueSnackbar } = useSnackbar();

    const wrapper = new IconWrapper();

    useEffect(() => {
        if(session) load();
        else setLoaded(true);
    }, []);

    const load = async () => {
        try {
            const resp = await wrapper.get();
            setIcon(resp);

            setLoaded(true);
        } catch(e) {
            enqueueSnackbar(e.message, {
                variant: "error",
            });
        }
    };

    if(!loaded) return <FullScreenLoader />;

    return (
        <IconContext.Provider value={{ icon, setIcon }}>
            {!icon && session ? <WelcomeScreen /> : children}
        </IconContext.Provider>
    );
};


export const useIcon = () => {
    const { icon, setIcon } = useContext(IconContext);

    return {
        icon,
        setIcon,
    };
};

export default IconProvider;