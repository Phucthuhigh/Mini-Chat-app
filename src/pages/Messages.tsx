import {
    ResizableHandle,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useContext } from "react";
import { AuthContextType } from "@/interfaces";
import { AuthContext } from "@/contexts/AuthContext";
import Sidebar from "@/components/ui/Sidebar";
import ChatWindow from "@/components/ui/ChatWindow";
import Loading from "@/components/ui/loading";

const Messages = () => {
    const { user } = useContext<AuthContextType>(AuthContext);

    return user ? (
        <ResizablePanelGroup
            autoSaveId="persistence"
            direction="horizontal"
            className="h-full">
            <Sidebar currentUser={user} />
            <ResizableHandle withHandle />
            <ChatWindow />
        </ResizablePanelGroup>
    ) : (
        <Loading />
    );
};

export default Messages;
