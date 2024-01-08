import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Conversation, GroupConversation, User } from "@/interfaces";
import { FieldValue, serverTimestamp } from "firebase/firestore";

const MessageCard = ({
    conversation
}: {
    conversation: Conversation | GroupConversation
}) => {

    console.log(conversation);
    
    return (
        <></>
        // <div className="w-full h-[80px] flex items-center gap-4 rounded-xs hover:bg-slate-400 dark:hover:bg-slate-700 py-2 px-4 outline-none overflow-hidden cursor-pointer">
        //     <div className="grid grid-cols-3 gap-4">
        //         {userList.map((user) => {
        //             return (
        //                 <Avatar key={user.id}>
        //                     <AvatarImage src={user.photoURL} />
        //                     <AvatarFallback>CN</AvatarFallback>
        //                 </Avatar>
        //             );
        //         })}
        //     </div>
        //     <div className="flex flex-col items-start overflow-hidden">
        //         <span className="font-medium text-lg">{displayName}</span>
        //         {lastMessage && (
        //             <p className="line-clamp-1 text-sm text-gray-600">
        //                 {lastMessage.by}: {lastMessage.text}
        //             </p>
        //         )}
        //     </div>
        // </div>
    );
};

export default MessageCard;
