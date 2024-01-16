import { db } from "@/firebase/config";
import useDebounce from "@/hooks/useDebounce";
import useFirestore from "@/hooks/useFirestore";
import { User } from "@/interfaces";
import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { Dispatch, SetStateAction, useEffect } from "react";

interface SearchBarProps {
    input: string;
    setInput: Dispatch<SetStateAction<string>>;
    setSearchResult: Dispatch<SetStateAction<Array<User>>>;
    currentUser: User;
}

export default function SearchBar({
    input,
    setInput,
    setSearchResult,
    currentUser,
}: SearchBarProps) {
    const debouncedValue = useDebounce(input, 500);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        (async () => {
            const searchUsersResultRef = query(
                collection(db, "users"),
                where("keywords", "array-contains", debouncedValue),
                limit(20),
                orderBy("displayName")
            );
            const searchUsersResult = await getDocs(searchUsersResultRef);
            setSearchResult(
                searchUsersResult.docs
                    .map((doc) => doc.data())
                    .filter((doc) => doc.id != currentUser.id) as User[]
            );
        })();

        return () => {
            setSearchResult([]);
        };
    }, [debouncedValue]);

    return (
        <form className="px-2 mt-3">
            <div className="relative">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 bottom-0 w-6 h-6 my-auto text-slate-500 left-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <input
                    type="text"
                    placeholder="Search"
                    className="transition-all duration-100 w-full py-2 pl-12 pr-4 dark:text-slate-200 border border-slate-400 focus:border-slate-600 dark:focus:border-slate-200 rounded-full outline-none bg-transparent"
                    value={input}
                    onChange={(e) => {
                        const searchValue = e.target.value;
                        if (!searchValue.startsWith(" ")) setInput(searchValue);
                    }}
                />
            </div>
        </form>
    );
}
