import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "./avatar";
import { ResizablePanel } from "./resizable";
import { GrSend } from "react-icons/gr";
import { Button } from "./button";
import MessageChat from "./MessageChat";
import useFirestore from "@/hooks/useFirestore";
import { Conversation, Message, User } from "@/interfaces";
import { useMemo } from "react";
import {
    QueryCompositeFilterConstraint,
    orderBy,
    where,
} from "firebase/firestore";

const ChatWindow = ({ id, currentUser }: { id: string; currentUser: User }) => {
    const conversationCondition = useMemo(() => {
        return where("id", "==", id) as any as QueryCompositeFilterConstraint;
    }, [id]);
    const conversation = useFirestore<Conversation>(
        "conversations",
        conversationCondition
    )[0];

    const userListCondition = useMemo(() => {
        return where(
            "id",
            "in",
            conversation?.members ?? [""]
        ) as any as QueryCompositeFilterConstraint;
    }, [conversation?.members]);

    const userList = useFirestore<User>("users", userListCondition).filter(
        (user) => currentUser.id !== user.id
    );

    console.log(userList);

    const messagesCondition = useMemo(() => {
        return where(
            "conversationId",
            "==",
            id
        ) as any as QueryCompositeFilterConstraint;
    }, [id]);
    const messages = useFirestore<Message>(
        "messages",
        messagesCondition,
        orderBy("createdAt")
    );

    // console.log(messages);

    return (
        <ResizablePanel
            className="min-w-[200px] grid grid-rows-[80px_1fr_80px]"
            defaultSize={75}>
            <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src={userList[0]?.photoURL ?? ""} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-center">
                        <span className="font-semibold text-lg">
                            {userList[0]?.displayName}
                        </span>
                        <span className="text-sm text-gray-500">
                            Last active: 1m
                        </span>
                    </div>
                </div>
            </div>
            <div className="overflow-auto flex flex-col gap-6 p-8">
                {messages.map((message) => (
                    <MessageChat
                        key={message.id}
                        message={message}
                        currentUser={currentUser}
                    />
                ))}
            </div>
            <div className="flex items-center justify-center p-8 gap-5">
                <input
                    type="text"
                    placeholder="Aa"
                    className="transition-all duration-100 w-full py-2 pl-4 pr-4 dark:text-slate-200 border border-slate-400 focus:border-slate-600 dark:focus:border-slate-200 rounded-full outline-none bg-transparent"
                />
                <Button className="rounded-full flex justify-center items-center">
                    <GrSend className="text-lg" />
                </Button>
            </div>
        </ResizablePanel>
    );
};

export default ChatWindow;
