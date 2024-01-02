import {
    ResizableHandle,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useContext } from "react";
import { AuthContextType } from "@/interfaces";
import { AuthContext } from "@/contexts/AuthContext";
import Sidebar from "@/components/ui/Sidebar";
import ChatWindow from "@/components/ui/ChatWindow";

const Messages = () => {
    const { user } = useContext<AuthContextType>(AuthContext);

    return (
        <ResizablePanelGroup
            autoSaveId="persistence"
            direction="horizontal"
            className="h-full">
            <Sidebar user={user} />
            <ResizableHandle withHandle />
            <ChatWindow />
        </ResizablePanelGroup>
    );
};

export default Messages;
