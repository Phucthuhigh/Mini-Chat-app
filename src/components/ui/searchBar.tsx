export default function SearchBar() {
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
                />
            </div>
        </form>
    );
}
