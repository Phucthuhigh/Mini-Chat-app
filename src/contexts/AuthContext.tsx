import { ReactNode, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import { AuthContextType, User } from "@/interfaces";
import Loading from "@/components/ui/loading";

export const AuthContext = createContext<AuthContextType>({});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userLogin) => {
            if (userLogin) {
                const { displayName, email, phoneNumber, photoURL, uid } =
                    userLogin;
                setUser({
                    id: uid,
                    displayName,
                    email,
                    phoneNumber,
                    photoURL,
                } as User);
                setIsLoading(false);
                navigate("/messages");
                return;
            }
            setUser(null);
            setIsLoading(false);
            navigate("/");
            return;
        });

        return () => unsubscribe();
    }, [navigate]);

    return isLoading ? (
        <Loading />
    ) : (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};

export default AuthContextProvider;
