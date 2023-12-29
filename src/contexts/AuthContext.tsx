import { ReactNode, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";

interface User {
    displayName: null | string;
    email: null | string;
    phoneNumber: null | string;
    photoURL: null | string;
    uid: string;
}

export const AuthContext = createContext({});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>();

    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { displayName, email, phoneNumber, photoURL, uid } = user;
                setUser({ displayName, email, phoneNumber, photoURL, uid });
                navigate("/messages");
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};

export default AuthContextProvider;
