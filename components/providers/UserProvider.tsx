import FullScreenLoader from "@components/loaders/FullScreenLoader";
import { useSession } from "next-auth/client";
import { Fragment, PropsWithChildren } from "react";

const UserProvider = ({ children }: PropsWithChildren<{}>) => {
    const [, isLoading] = useSession();

    if(isLoading) {
        return (
            <FullScreenLoader />
        );
    };

    return (
        <Fragment>
            {children}
        </Fragment>
    );
};

export default UserProvider;