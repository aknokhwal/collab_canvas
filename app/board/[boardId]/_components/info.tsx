'use client';
import { Skeleton } from "@/components/ui/skeleton";

import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { useRenameModal } from "@/store/use-rename-modal";
import { Actions } from "@/components/actions";
import { Menu } from "lucide-react";


const font = Poppins({
    subsets: ['latin'],
    weight: ['600']
})

interface InfoProps {
    boardId: string;
}

const TabSeparator = () => {
    return (
        <div className="text-neutral-300 px-1.5">
            |
        </div>
    );
};

export const Info = (
    { boardId }: InfoProps
) => {
    const { onOpen } = useRenameModal();

    const data = useQuery(api.board.get, {id: boardId as Id<"boards">});

    if (!data) return <InfoSkeleton />;
    return(
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
                <Hint label="Go to boards" side="bottom" sideOffset={10}>
                    <Button variant="board" className="px-2">
                        <Link href='/' className="flex items-center">
                            <Image 
                                src="/logo.svg"
                                alt="collab_canvas"
                                height={40}
                                width={40}
                            />
                            <span className={cn(
                                "font-semibold text-md ml-2 text-black",
                                font.className
                            )}>
                                CollabCanvas
                            </span>
                        </Link>
                    </Button>
                </Hint>
                <TabSeparator />
                <Hint label="Edit title" side="bottom" sideOffset={10}>
                    <Button
                        variant="board"
                        className="text-sm
                        font-normal px-2"
                        onClick={() => onOpen(data._id, data.title)}
                    >
                        {data.title}
                    </Button>
                </Hint>
                <TabSeparator />
                <Actions
                    id={data._id}
                    title={data.title}
                    side="bottom"
                    sideOffset={10}
                >
                    <div>
                        <Hint label="Main menu"
                        side="bottom" sideOffset={10}>
                            <Button size='icon' variant='board'>
                                <Menu />
                            </Button>
                        </Hint>
                    </div>
                </Actions>
        </div>
    );
};

export function InfoSkeleton() {
    return (
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]" 
        >
            <Skeleton className="h-full w-full bg-muted-400" />
        </div>
    )
}