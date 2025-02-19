'use client'

import { getUserById } from "@/app/utils/queries/users/[id]/route";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

export default function Detail({ params }: { params: Promise<{ id: number }> }) {
    const { id: userId } = use(params);

    const { data: user } = useQuery({
        queryKey: ["user", userId],
        queryFn: () => getUserById({ id: userId }),
    });

    if (!user) return <div><span>No user found</span></div>;

    return (
        <div className='w-full'>
            <h2 className='text-center font-bold text-3xl py-3'>{user.username}</h2>
            <div className='w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md'>
                <p >{user.name}</p>
            </div>
            <div className='w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md'>
                <p >{user.address}</p>
            </div>
            <div className='w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md'>
                <p >{user.phone}</p>
            </div>
        </div>
    );
}
