'use client'

import { fetcher } from '@/app/libs'
import { use } from 'react';
import useSWR from 'swr';

export default function Detail({ params }: { params: Promise<{ id: number }> }) {
    const resolvedParams = use(params);
    const { data: user, isLoading, error } = useSWR(`/queries/users/${resolvedParams.id}`, fetcher);

    if (isLoading) return <div><span>Loading...</span></div>;
    if (error) return <div><span>Error fetching data</span></div>;
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
