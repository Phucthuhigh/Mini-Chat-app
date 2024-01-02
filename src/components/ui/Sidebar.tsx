import { ResizablePanel } from "./resizable";
import SearchBar from "./searchBar";
import { ScrollArea } from "./scroll-area";
import SingleMessageCard from "./SingleMessageCard";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    DropdownMenuShortcut,
} from "./dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { IoIosLogOut } from "react-icons/io";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import { User } from "@/interfaces";

const Sidebar = ({ user }: { user: User | null | undefined }) => {
    const [themeState, setThemeState] = useState<string>(
        localStorage.getItem("vite-ui-theme") || ""
    );

    const { setTheme } = useTheme();
    useEffect(() => {
        if (
            themeState == "dark" ||
            themeState == "light" ||
            themeState == "system"
        )
            setTheme(themeState);
    }, [setTheme, themeState]);

    const handleLogout = () => {
        signOut(auth);
    };

    return (
        <ResizablePanel
            collapsible={true}
            collapsedSize={5}
            minSize={25}
            className="bg-slate-300 dark:bg-slate-900 grid grid-rows-[110px_1fr_70px] grid-cols-1"
            defaultSize={25}>
            <div className="px-3 py-2 border-b border-slate-400 dark:border-slate-800">
                <span className="text-2xl font-semibold">Messages</span>
                <SearchBar />
            </div>
            <ScrollArea className="overflow-auto">
                <SingleMessageCard />
                <SingleMessageCard />
                <SingleMessageCard />
                <SingleMessageCard />
                <SingleMessageCard />
                <SingleMessageCard />
                <SingleMessageCard />
                <SingleMessageCard />
                <SingleMessageCard />
                <SingleMessageCard />
                <SingleMessageCard />
                <SingleMessageCard />
                <SingleMessageCard />
                <SingleMessageCard />
                <SingleMessageCard />
                <SingleMessageCard />
                <SingleMessageCard />
            </ScrollArea>
            <div className="flex items-center px-3 border-t border-slate-400 dark:border-slate-800">
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-4 rounded-sm hover:bg-slate-400 dark:hover:bg-slate-700 py-2 px-4 outline-none">
                        <Avatar>
                            <AvatarImage
                                src={user?.photoURL}
                                alt={`@${user?.displayName}`}
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start">
                            <span className="font-medium">
                                {user?.displayName}
                            </span>
                            <span className="text-gray-600 text-sm">
                                {user?.email}
                            </span>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuGroup>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    Toggle theme
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuRadioGroup
                                            value={themeState}
                                            onValueChange={setThemeState}>
                                            <DropdownMenuRadioItem value="dark">
                                                Dark
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="light">
                                                Light
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="system">
                                                System
                                            </DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                            <DropdownMenuItem onClick={handleLogout}>
                                Log out
                                <DropdownMenuShortcut>
                                    <IoIosLogOut />
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </ResizablePanel>
    );
};

export default Sidebar;
