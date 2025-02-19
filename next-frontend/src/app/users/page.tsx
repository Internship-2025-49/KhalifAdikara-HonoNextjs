"use client";

import React from "react";
import { UserModel } from "../types/users";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../components/TableUser";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers } from "../utils/queries/users/route";
import { deleteUser } from "../utils/queries/users/[id]/route";

export default function Users() {
    const queryClient = useQueryClient();
    const { data: users = [], isLoading } = useQuery({ queryKey: ['users'], queryFn: getUsers });

    const mutation = useMutation({
        mutationFn: (id: number) => deleteUser({id}),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });

    if (isLoading) return <div>Loading...</div>;

    const columns: ColumnDef<UserModel>[] = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "username", header: "Username" },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "address", header: "Address" },
        { accessorKey: "phone", header: "Phone" },
        {
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Button variant="destructive" size="sm" onClick={() => mutation.mutate(row.original.id)}>
                        Delete
                    </Button>
                    <Link href={`/users/edit/${row.original.id}`}>
                        <Button variant="outline" size="sm">Edit</Button>
                    </Link>
                    <Link href={`/users/read/${row.original.id}`}>
                        <Button variant="outline" size="sm">View</Button>
                    </Link>
                </div>
            ),
        }
    ];

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-2xl font-bold text-center mb-5">List Users - Counter: {Array.isArray(users) ? users.length : 0}</h2>
            <div className="flex justify-center">
                <Link href={`/users/create`}>
                    <Button className="mb-4">Create User</Button>
                </Link>
            </div>
            <DataTable columns={columns} data={Array.isArray(users) ? users : []} />
        </div>
    );
}
