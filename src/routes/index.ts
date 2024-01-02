import Auth from "@/pages/Auth";
import Messages from "@/pages/Messages";
import { Routes } from "@/interfaces";

export const publicRoutes: Array<Routes> = [
    {
        path: "/",
        component: Auth,
    },
];

export const privateRoutes: Array<Routes> = [
    {
        path: "/messages",
        component: Messages,
    },
];
