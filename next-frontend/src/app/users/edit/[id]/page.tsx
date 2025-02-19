/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { getUserById, updateUser } from "@/app/utils/queries/users/[id]/route";

export default function UserEdit({ params }: { params: Promise<{ id: number }> }) {
    const queryClient = new QueryClient()
    
    const router = useRouter();
    const { id: userId } = use(params);

    const { data: user} = useQuery({
        queryKey: ["user", userId],
        queryFn: () => getUserById({ id: userId })
    });

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        if (user?.result) {
            setUsername(user.result.username);
            setName(user.result.name);
            setAddress(user.result.address);
            setPhone(user.result.phone);
        }
    }, [user]);

    const mutation = useMutation({
        mutationFn: (data: any) => updateUser({ id: userId }, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            router.push("/users");
        },
    });

    const editUser = (e: React.FormEvent) => {
        e.preventDefault();
        if (username && name && address && phone) {
            const userData = { 
                username, 
                name, 
                address, 
                phone 
            };

            mutation.mutate(userData);
        }
    };

    if (!user) return <div>User not found.</div>;

    return (
        <div className="w-full max-w-7xl m-auto">
            <form className="w-full" onSubmit={editUser}>
                <span className="font-bold text-yellow-500 py-2 block underline text-2xl">Edit User</span>
                <div className="w-full py-2">
                    <label className="text-sm font-bold py-2 block">Username</label>
                    <input type="text" className="w-full border-[1px] border-gray-200 p-2 rounded-sm" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="w-full py-2">
                    <label className="text-sm font-bold py-2 block">Name</label>
                    <input type="text" className="w-full border-[1px] border-gray-200 p-2 rounded-sm" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="w-full py-2">
                    <label className="text-sm font-bold py-2 block">Address</label>
                    <textarea className="w-full border-[1px] border-gray-200 p-2 rounded-sm" value={address} onChange={(e) => setAddress(e.target.value)}/>
                </div>
                <div className="w-full py-2">
                    <label className="text-sm font-bold py-2 block">Phone</label>
                    <input type="text" className="w-full border-[1px] border-gray-200 p-2 rounded-sm" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </div>
                <div className="w-full py-2">
                    <button type="submit" className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}
