import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "./avatar";
import { ResizablePanel } from "./resizable";

const ChatWindow = () => {
    return (
        <ResizablePanel
            className="min-w-[200px] grid grid-rows-[80px_1fr_80px]"
            defaultSize={75}>
            <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-center">
                        <span className="font-semibold text-lg">
                            phucthuhigh
                        </span>
                        <span className="text-sm text-gray-500">
                            Last active: 1m
                        </span>
                    </div>
                </div>
            </div>
            <div className="bg-blue-500"></div>
            <div className="flex items-center justify-center p-8">
                <input
                    type="text"
                    placeholder="Aa"
                    className="transition-all duration-100 w-full py-2 pl-4 pr-4 dark:text-slate-200 border border-slate-400 focus:border-slate-600 dark:focus:border-slate-200 rounded-full outline-none bg-transparent"
                />
            </div>
        </ResizablePanel>
    );
};

export default ChatWindow;
