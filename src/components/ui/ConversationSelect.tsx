import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useFirestore from "@/hooks/useFirestore";
import { Conversation, Message, User } from "@/interfaces";
import { QueryCompositeFilterConstraint, where } from "firebase/firestore";
import { useMemo } from "react";
import { NavLink } from "react-router-dom";

const MessageCard = ({
    conversation,
    currentUser,
}: {
    conversation: Conversation;
    currentUser: User;
}) => {
    const userListCondition = useMemo(() => {
        return where(
            "id",
            "in",
            conversation.members ?? [""]
        ) as any as QueryCompositeFilterConstraint;
    }, [conversation.members]);

    const userList = useFirestore<User>("users", userListCondition).filter(
        (user) => currentUser.id !== user.id
    );

    const lastMessageCondition = useMemo(() => {
        return where(
            "id",
            "==",
            conversation.lastMessageId ?? ""
        ) as any as QueryCompositeFilterConstraint;
    }, [conversation.lastMessageId]);

    const lastMessage = useFirestore<Message>("messages", lastMessageCondition);

    const userTypeLastMessageCondition = useMemo(() => {
        return where(
            "id",
            "==",
            lastMessage.length !== 0 ? lastMessage[0].by : ""
        ) as any as QueryCompositeFilterConstraint;
    }, [lastMessage]);

    const userTypeLastMessage = useFirestore<User>(
        "users",
        userTypeLastMessageCondition
    );

    return (
        <NavLink
            to={`/messages/${conversation.id}`}
            className={(nav) =>
                `w-full h-[80px] flex items-center gap-4 rounded-xs ${
                    nav.isActive ? "bg-gray-400 dark:bg-slate-800" : ""
                } hover:bg-slate-400 dark:hover:bg-slate-700 py-2 px-4 outline-none overflow-hidden cursor-pointer`
            }>
            {userList.map((user) => {
                return (
                    <Avatar key={user.id}>
                        <AvatarImage src={user.photoURL ?? ""} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                );
            })}
            <div className="flex flex-col items-start overflow-hidden">
                <span className="font-medium text-lg">
                    {conversation.type === "direct"
                        ? userList[0]?.displayName
                        : conversation?.displayName}
                </span>
                {!!lastMessage.length && !!userTypeLastMessage.length && (
                    <span className="text-sm font-thin text-gray-600">
                        {userTypeLastMessage[0].id === currentUser.id
                            ? "Bạn"
                            : userTypeLastMessage[0].displayName}
                        {": "}
                        {lastMessage[0].text}
                    </span>
                )}
            </div>
        </NavLink>
    );
};

export default MessageCard;
