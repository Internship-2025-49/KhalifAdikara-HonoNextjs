"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../libs";
import { UserModel } from "../types/users";
import Link from "next/link";
import User from "../components/User";

export default function Users() {
    const [users, setUsers] = useState<UserModel[]>([]);
    const { data, error } = useSWR<{ result: UserModel[] }>(`/utils/queries/users`, fetcher);

    useEffect(() => {
        console.log("Data fetched:", data);
        if (data && data.result && Array.isArray(data.result)) {
            setUsers(data.result);
        } else if (data !== undefined) {
            console.error("Invalid data format:", data);
        }
    }, [data]);

    if (error) {
        console.error("Error fetching data:", error);
        return <div>Failed to load</div>;
    }

    if (!data) return <div>Loading...</div>;

    const delete_User: UserModel['deleteUser'] = async (id: number) => {
        const res = await fetch(`/utils/queries/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const content = await res.json();

        if (content.success > 0) {
            setUsers(users.filter((user: UserModel) => user.id !== id));
        }
    };

    return (
        <div className="w-full max-w-7xl m-auto">
            
            <table className="w-full border-collapse border border-slate-400">
                <caption className="caption-top py-5 font-bold text-green-500 text-2xl">
                    List Users - Counter: 
                    <span className="text-red-500 font-bold">{users.length}</span>
                    <p>
                        <Link href={`/users/create`} className="bg-green-500 p-2 mt-6 inline-block text-white">Create</Link>
                    </p>
                </caption>
                <thead>
                    <tr className="text-center">
                        <th className="border border-slate-300">ID</th>
                        <th className="border border-slate-300">Username</th>
                        <th className="border border-slate-300">Name</th>
                        <th className="border border-slate-300">Address</th>
                        <th className="border border-slate-300">Phone</th>
                        <th className="border border-slate-300">Action Button</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((item: UserModel) => (
                        <User key={item.id} {...item} deleteUser={delete_User} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
