import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useContext } from "react";
import { AuthContextType, User } from "@/interfaces";
import { AuthContext } from "@/contexts/AuthContext";
import Sidebar from "@/components/ui/Sidebar";
import ChatWindow from "@/components/ui/ChatWindow";
import { useParams } from "react-router-dom";

const Messages = () => {
    const { user } = useContext<AuthContextType>(AuthContext);
    const { id } = useParams();

    console.log(id);

    return (
        user && (
            <ResizablePanelGroup
                autoSaveId="persistence"
                direction="horizontal"
                className="h-full">
                <Sidebar currentUser={user as User} />
                <ResizableHandle withHandle />
                {id ? (
                    <ChatWindow id={id} currentUser={user as User} />
                ) : (
                    <ResizablePanel
                        className="min-w-[200px] text-4xl flex justify-center items-center font-medium text-gray-600"
                        defaultSize={75}>
                        Choose one conversation
                    </ResizablePanel>
                )}
            </ResizablePanelGroup>
        )
    );
};

export default Messages;
