import { Timestamp } from "firebase/firestore";
import { FC } from "react";

export interface User {
    id: string;
    displayName: string | null;
    email: string | null;
    phoneNumber: string | null;
    photoURL: string | null;
    keywords?: Array<string>;
    lastActive?: Timestamp;
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

export interface Conversation {
    id: string;
    members: string[];
    createdAt: Timestamp;
    lastMessageId: null | string;
    lastMessageCreatedAt: null | Timestamp;
    type: "direct" | "group";
    displayName?: string;
    photoUrl?: string;
}

export interface Message {
    id: string;
    conversationId: string;
    by: string;
    createdAt: Timestamp;
    reply: string | null;
    reactions: Record<string, number>;
    text: string;
}
