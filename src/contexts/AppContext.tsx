import { QueryCompositeFilterConstraint, where } from "firebase/firestore";
import React, { ReactNode, createContext, useContext, useMemo } from "react";
import { AuthContext } from "./AuthContext";
import useFirestore from "@/hooks/useFirestore";
import { Conversation, GroupConversation } from "@/interfaces";

export const AppContext = createContext<Record<any, any>>({});

const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useContext(AuthContext);
    

    const conversationsCondition = useMemo(() => {
        return where(
            "members",
            "array-contains",
            user?.id ?? "",
        ) as any as QueryCompositeFilterConstraint;
    }, [user?.id]);

    const conversations = useFirestore<Conversation | GroupConversation>("conversations", conversationsCondition);
    

    return (
        <AppContext.Provider value={{ conversations }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
