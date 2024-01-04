import { QueryCompositeFilterConstraint, where } from "firebase/firestore";
import React, { ReactNode, createContext, useContext, useMemo } from "react";
import { AuthContext } from "./AuthContext";
import useFirestore from "@/hooks/useFirestore";

export const AppContext = createContext<Record<any, any>>({});

const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useContext(AuthContext);

    const conservationsCondition = useMemo(() => {
        return where(
            "members",
            "array-contains",
            user?.id
        ) as any as QueryCompositeFilterConstraint;
    }, [user?.id]);

    const conservations = useFirestore("conservations", conservationsCondition);

    return (
        <AppContext.Provider value={{ conservations }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
