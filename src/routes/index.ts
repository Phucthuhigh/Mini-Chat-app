import Auth from "@/pages/Auth"
import Messages from "@/pages/Messages"
import { FC } from "react"

interface Routes {
    path: string,
    component: FC
}

export const publicRoutes: Array<Routes> = [
    {
        path: "/",
        component: Auth
    },
    {
        path: "/messages",
        component: Messages
    }
]

export const privateRoutes: Array<Routes> = []