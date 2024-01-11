import { Button } from "@/components/ui/button";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { auth } from "@/firebase/config";
import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    getAdditionalUserInfo,
    signInWithPopup,
} from "firebase/auth";
import { addDocument, generateKeywords } from "@/firebase/services";
import { serverTimestamp } from "firebase/firestore";
import { User } from "@/interfaces";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const facebookAuthProvider = new FacebookAuthProvider();
const googleAuthProvider = new GoogleAuthProvider();

const Auth = () => {
    const { user } = useContext(AuthContext);

    const handleLogin = async (
        provider: FacebookAuthProvider | GoogleAuthProvider
    ) => {
        try {
            const userCredential = await signInWithPopup(auth, provider);
            const { user } = userCredential;
            const details = getAdditionalUserInfo(userCredential);
            addDocument<User>("users", {
                id: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                phoneNumber: user.phoneNumber,
                providerId: details?.providerId as string | undefined,
                keywords: user.displayName
                    ? generateKeywords(user.displayName.toLowerCase())
                    : [],
                lastActive: serverTimestamp(),
            });
        } catch (error) {
            console.log(error);
        }
    };

    return user ? (
        <Navigate to={"/messages"} />
    ) : (
        <div className="flex flex-1 flex-col gap-10 justify-center items-center mx-auto">
            <h1 className="text-center text-5xl font-bold text-slate-800 dark:text-white">
                MINI CHAT APP
            </h1>
            <div className="flex flex-col gap-8 justify-center">
                <Button
                    className="text-2xl p-80 py-8 flex items-center gap-2"
                    onClick={() => handleLogin(facebookAuthProvider)}>
                    <FaFacebook className="text-3xl" />
                    Đăng nhập với Facebook
                </Button>
                <Button
                    className="text-2xl p-80 py-8 flex items-center gap-2"
                    onClick={() => handleLogin(googleAuthProvider)}>
                    <FaGoogle className="text-3xl" />
                    Đăng nhập với Google
                </Button>
            </div>
        </div>
    );
};

export default Auth;
