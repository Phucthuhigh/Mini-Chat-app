import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppContext } from "@/contexts/AppContext";
import { db } from "@/firebase/config";
import { addDocument } from "@/firebase/services";
import { Conversation, User } from "@/interfaces";
import { collection, doc, serverTimestamp } from "firebase/firestore";
import { Dispatch, SetStateAction, useContext } from "react";
import { useNavigate } from "react-router-dom";

const UserCard = ({
    userInfo,
    currentUser,
    setInput,
}: {
    userInfo: User;
    currentUser: User;
    setInput: Dispatch<SetStateAction<string>>;
}) => {
    const { conversations } = useContext(AppContext);

    const isConversationAlreadyExist = (
        uid: string
    ): Conversation | undefined => {
        return conversations.find((conversation: Conversation) => {
            return conversation.members.includes(uid);
        });
    };

    const navigate = useNavigate();

    const handleSelect = async () => {
        const conversationSelect = isConversationAlreadyExist(userInfo.id);
        if (conversationSelect) {
            navigate(`/messages/${conversationSelect.id}`);
            setInput("");
            return;
        }
        const newConversationId = doc(collection(db, "conversations")).id;
        await addDocument("conversations", {
            id: newConversationId,
            members: [currentUser.id, userInfo.id],
            createdAt: serverTimestamp(),
            lastMessageId: null,
            lastMessageCreatedAt: null,
            type: "direct",
        });

        navigate(`/messages/${newConversationId}`);
        setInput("");
    };

    return (
        <div
            onClick={handleSelect}
            className="w-full h-[80px] flex items-center gap-4 rounded-xs hover:bg-slate-400 dark:hover:bg-slate-700 py-2 px-4 outline-none overflow-hidden cursor-pointer">
            <Avatar>
                <AvatarImage src={userInfo.photoURL ?? ""} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start overflow-hidden">
                <span className="font-medium text-lg">
                    {userInfo.displayName}
                </span>
            </div>
        </div>
    );
};

export default UserCard;
