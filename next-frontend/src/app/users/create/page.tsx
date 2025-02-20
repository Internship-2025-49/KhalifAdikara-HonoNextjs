"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { createUser } from '@/app/utils/queries/users/route';
import { useForm } from 'react-hook-form';
import { userSchema } from '@/app/types/userSchema';
import { z } from 'zod';
import { userDefaultValues } from '@/app/types/defaultValues';
import UserForm from '@/app/components/FormUser';

export default function UserCreate() {
    const queryClient = new QueryClient();
    const router = useRouter();

    const form = useForm({
        defaultValues: userDefaultValues,
    });

    const mutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            router.push('/users');
        },
    });

    function submit(values: z.infer<typeof userSchema>) {
        mutation.mutate(values);
    }

    return (
        <div className='container w-full py-10'>
            <div className='flex justify-center'>
                <UserForm form={form} onSubmit={submit} titleText="Add User" buttonText="Submit" required={true}></UserForm>
            </div>
        </div>
    );
}