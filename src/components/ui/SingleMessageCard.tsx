import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SingleMessageCard = () => {
    return (
        <div className="w-full h-[80px] flex items-center gap-4 rounded-xs hover:bg-slate-400 dark:hover:bg-slate-700 py-2 px-4 outline-none overflow-hidden cursor-pointer">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start overflow-hidden">
                <span className="font-medium text-lg">phucthuhigh</span>
                <p className="line-clamp-1 text-sm text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Veritatis laboriosam repudiandae at sit quo quibusdam, ex
                    culpa eveniet? A error laborum suscipit fuga autem repellat
                    minus provident dolorum aperiam impedit?
                </p>
            </div>
        </div>
    );
};

export default SingleMessageCard;
