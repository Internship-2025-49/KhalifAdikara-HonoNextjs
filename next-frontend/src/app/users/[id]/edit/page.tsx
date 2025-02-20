/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { getUserById, updateUser } from "@/app/utils/queries/users/[id]/route";
import { useForm } from "react-hook-form";
import { userDefaultValues } from "@/app/types/defaultValues";
import { z } from "zod";
import { userSchema } from "@/app/types/userSchema";
import UserForm from "@/app/components/FormUser";

export default function UserEdit({ params }: { params: Promise<{ id: number }> }) {
    const queryClient = new QueryClient()
    
    const router = useRouter();
    const { id: userId } = use(params);

    const { data: user } = useQuery({
        queryKey: ["user", userId],
        queryFn: () => getUserById({ id: userId })
    });

    const form = useForm({ defaultValues: userDefaultValues });

    useEffect(() => {
        if (user) {
            form.reset({
                username: user.username,
                name: user.name,
                address: user.address,
                phone: user.phone,
            });
        }
    }, [user, form]);

    const mutation = useMutation({
        mutationFn: (data: any) => updateUser({ id: userId }, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            router.push("/users");
        },
    });

    function submit(values: z.infer<typeof userSchema>) {
            mutation.mutate(values);
        }

    if (!user) return <div>User not found.</div>;

    return (
        <div className='container w-full py-10'>
            <div className='flex justify-center'>
                <UserForm form={form} onSubmit={submit} titleText="Update User" buttonText="Update" required={false}></UserForm>
            </div>
        </div>
    );
}
