import { useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Message, User } from "@/interfaces";
import {
    QueryCompositeFilterConstraint,
    Timestamp,
    where,
} from "firebase/firestore";
import useFirestore from "@/hooks/useFirestore";
import formatTime from "@/utils/formatTime";

const MessageChat = ({
    message,
    currentUser,
}: {
    message: Message;
    currentUser: User;
}) => {
    const userTypeCondition = useMemo(() => {
        return where(
            "id",
            "==",
            message.by
        ) as any as QueryCompositeFilterConstraint;
    }, [message.by]);

    const userType = useFirestore<User>("users", userTypeCondition)[0];

    return message.by !== currentUser.id ? (
        <div className="flex self-start items-start gap-2.5">
            <Avatar>
                <AvatarImage src={userType?.photoURL ?? ""} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {userType?.displayName}
                    </span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        {message.createdAt &&
                            formatTime(message.createdAt as Timestamp)}
                    </span>
                </div>
                <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                    {message.text}
                </p>
            </div>
        </div>
    ) : (
        <div className="flex self-end items-start gap-2.5">
            <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-blue-600 rounded-s-xl rounded-ee-xl">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        Bạn
                    </span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        {message.createdAt &&
                            formatTime(message.createdAt as Timestamp)}
                    </span>
                </div>
                <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                    {message.text}
                </p>
            </div>
            <Avatar>
                <AvatarImage src={userType?.photoURL ?? ""} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    );
};

export default MessageChat;
