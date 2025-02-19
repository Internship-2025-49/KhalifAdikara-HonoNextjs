/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { createUser } from '@/app/utils/queries/users/route';

export default function UserCreate() {
    const queryClient = new QueryClient()
    
    const router = useRouter();
    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    
    const mutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            router.push('/users');
        },
    });

    const addUser = (e: any) => {
        e.preventDefault();
        if (username !== "" && address !== "" && name !== "" && phone !== "") {
            const userData = {
                username,
                name,
                address,
                phone
            };
            
            mutation.mutate(userData);
        }
    };

    return (
        <div className="w-full max-w-7xl m-auto">
            <form className='w-full' onSubmit={addUser}>
                <span className='font-bold text-yellow-500 py-2 block underline text-2xl'>Form Add</span>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Username</label>
                    <input type='text' name='username' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setUsername(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Name</label>
                    <input type='text' name='name' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setName(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Address</label>
                    <textarea name='address' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setAddress(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Phone</label>
                    <input type='text' name='phone' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setPhone(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <button className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">Submit</button>
                </div>
            </form>
        </div>
    );
}
