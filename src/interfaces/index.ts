import { FieldValue, serverTimestamp } from "firebase/firestore";
import { FC } from "react";

export interface User {
    uid: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    photoURL: string;
}

export interface AuthContextType {
    user?: User | null;
}

export type Theme = "dark" | "light" | "system";

export interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
}

export interface ThemeProviderState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export interface Routes {
    path: string;
    component: FC;
}

export interface SingleMessages {
    from: string;
    to: string;
    createdAt: typeof serverTimestamp | FieldValue | Date;
    reply: string;
    reactions: object;
    isSeen: boolean;
}
