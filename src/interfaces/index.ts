import { FieldValue, serverTimestamp } from "firebase/firestore";
import { FC } from "react";

export interface User {
    id: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    photoURL: string;
    keywords?: Array<string>;
    lastSeen?: typeof serverTimestamp | FieldValue | Date;
    providerId?: string;
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

export interface Conservation {
    id: string;
    members: string[];
    createdAt: typeof serverTimestamp | FieldValue | Date;
    lastMessageId: null | string;
    type: "directed" | "group";
}

export interface GroupConservation extends Conservation {
    displayName: string;
    photoUrl?: string;
}

export interface Message {
    conservationId: string;
    createdAt: typeof serverTimestamp | FieldValue | Date;
    reply: string | null;
    reactions: Record<string, any>;
    isSeen: boolean;
    text: string;
}
