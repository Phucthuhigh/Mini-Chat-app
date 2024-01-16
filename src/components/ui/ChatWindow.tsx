import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "./avatar";
import { ResizablePanel } from "./resizable";
import { GrSend } from "react-icons/gr";
import { Button } from "./button";
import MessageChat from "./MessageChat";
import useFirestore from "@/hooks/useFirestore";
import { Conversation, Message, User } from "@/interfaces";
import { useMemo, useRef, useState } from "react";
import {
    QueryCompositeFilterConstraint,
    Timestamp,
    collection,
    doc,
    orderBy,
    serverTimestamp,
    updateDoc,
    where,
} from "firebase/firestore";
import formatTime from "@/utils/formatTime";
import { db } from "@/firebase/config";
import { addDocument } from "@/firebase/services";

const ChatWindow = ({ id, currentUser }: { id: string; currentUser: User }) => {
    const endOfMessageRef = useRef<HTMLDivElement>(null);

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

    const [newMessage, setNewMessage] = useState<string>("");

    const handleAddMessage = async () => {
        const newMessageId = doc(collection(db, "messages")).id;
        const timeStamp = serverTimestamp();
        await addDocument("messages", {
            id: newMessageId,
            conversationId: id,
            by: currentUser.id,
            createdAt: timeStamp,
            reply: null,
            reactions: {},
            text: newMessage,
        });
        await updateDoc(doc(db, "conversations", id), {
            lastMessageId: newMessageId,
            lastMessageCreatedAt: timeStamp,
        });
        setNewMessage("");
        endOfMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const sendMessageOnEnter = (e: {
        key: string;
        preventDefault: () => void;
    }) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (!newMessage) return;
            handleAddMessage();
        }
    };

    const sendMessageOnClick = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (!newMessage) return;
        handleAddMessage();
    };

    return (
        <ResizablePanel
            className="min-w-[200px] grid grid-rows-[80px_1fr_80px]"
            defaultSize={75}>
            <div className="px-4 py-3 flex items-center justify-between border-b border-slate-400 dark:border-slate-800">
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src={userList[0]?.photoURL ?? ""} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-center">
                        <span className="font-semibold text-lg">
                            {userList[0]?.displayName}
                        </span>
                        {userList[0]?.lastActive && (
                            <span className="text-sm text-gray-500">
                                Last active:{" "}
                                {formatTime(
                                    userList[0]?.lastActive as Timestamp
                                )}
                            </span>
                        )}
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
                <div ref={endOfMessageRef} className="p-3"></div>
            </div>
            <div className="flex items-center justify-center p-8 gap-5">
                <input
                    onKeyDown={sendMessageOnEnter}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    type="text"
                    placeholder="Aa"
                    className="transition-all duration-100 w-full py-2 pl-4 pr-4 dark:text-slate-200 border border-slate-400 focus:border-slate-600 dark:focus:border-slate-200 rounded-full outline-none bg-transparent"
                />
                <Button
                    onClick={sendMessageOnClick}
                    className="rounded-full flex justify-center items-center">
                    <GrSend className="text-lg" />
                </Button>
            </div>
        </ResizablePanel>
    );
};

export default ChatWindow;
