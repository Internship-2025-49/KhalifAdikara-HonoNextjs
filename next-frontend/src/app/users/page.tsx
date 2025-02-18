"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../libs";
import { UserModel } from "../types/users";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { TableCell } from "@/components/ui/table";
import DataTable from "../components/TableUser";

export default function Users() {
    const { data, error } = useSWR<{ result: UserModel[] }>("/utils/queries/users", fetcher);
    const [users, setUsers] = useState<UserModel[]>([]);

    useEffect(() => {
        if (data && data.result && Array.isArray(data.result)) {
        setUsers(data.result);
        }
    }, [data]);

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    const deleteUser = async (id: number) => {
        const res = await fetch(`/utils/queries/users/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        });
        const content = await res.json();
        if (content.success > 0) {
        setUsers(users.filter((user) => user.id !== id));
        }
    };

    const columns: ColumnDef<UserModel>[] = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "username", header: "Username" },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "address", header: "Address" },
        { accessorKey: "phone", header: "Phone" },
        {
            header: "Actions",
            cell: ({ row }) => (
                <TableCell className="flex gap-2">
                    <Button variant="destructive" size="sm" onClick={() => deleteUser(row.original.id)}>
                        Delete
                    </Button>
                    <Link href={`/users/edit/${row.original.id}`}>
                        <Button variant="outline" size="sm">Edit</Button>
                    </Link>
                    <Link href={`/users/read/${row.original.id}`}>
                        <Button variant="outline" size="sm">View</Button>
                    </Link>
                </TableCell>
            ),
        },
    ];

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-2xl font-bold text-center mb-5">List Users - Counter: {users.length}</h2>
            <div className="flex justify-center">
                <Link href={`/users/create`}>
                    <Button className="mb-4">Create User</Button>
                </Link>
            </div>
            <DataTable columns={columns} data={users} />
        </div>
    );
}
