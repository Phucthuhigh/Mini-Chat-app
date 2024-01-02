const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen min-h-screen">
            <div className="w-[4em] flex flex-row flex-nowrap items-center justify-between">
                <div className="w-[0.8em] h-[0.8em] bg-slate-900 dark:bg-slate-200 rounded-[50%] -translate-x-full animate-[left-swing_0.5s_ease-in_alternate_infinite]"></div>
                <div className="w-[0.8em] h-[0.8em] bg-slate-900 dark:bg-slate-200 rounded-[50%]"></div>
                <div className="w-[0.8em] h-[0.8em] bg-slate-900 dark:bg-slate-200 rounded-[50%] translate-x-[-95%] animate-[right-swing_0.5s_ease-out_alternate_infinite]"></div>
            </div>
        </div>
    );
};

export default Loading;
