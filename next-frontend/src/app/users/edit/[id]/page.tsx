/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { getUserById, updateUser } from "@/app/utils/queries/users/[id]/route";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

export default function UserEdit({ params }: { params: Promise<{ id: number }> }) {
    const queryClient = new QueryClient()
    
    const router = useRouter();
    const { id: userId } = use(params);

    const { data: user} = useQuery({
        queryKey: ["user", userId],
        queryFn: () => getUserById({ id: userId })
    });

    const form = useForm({
        defaultValues: {
            username: "",
            name: "",
            address: "",
            phone: "",
        },
    });

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

    const submit = (data: any) => {
        mutation.mutate(data);
    };

    if (!user) return <div>User not found.</div>;

    return (
        <div className='container w-full py-10'>
            <div className='flex justify-center'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submit)} className='w-full mx-32'>
                        <div className='text-center'>
                            <span className='font-bold py-2 block text-4xl'>Edit User</span>
                        </div>

                        <div className='w-full py-2'>
                            <FormField control={form.control} name='username' render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Enter username' {...field}/>
                                    </FormControl>
                                </FormItem>
                            )}
                            />
                        </div>

                        <div className='w-full py-2'>
                            <FormField control={form.control} name='name' render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Enter name' {...field}/>
                                    </FormControl>
                                </FormItem>
                            )}
                            />
                        </div>

                        <div className='w-full py-2'>
                            <FormField control={form.control} name='address' render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder='Enter address' {...field}/>
                                    </FormControl>
                                </FormItem>
                            )}
                            />
                        </div>

                        <div className='w-full py-2'>
                            <FormField control={form.control} name='phone' render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Enter phone number' {...field}/>
                                    </FormControl>
                                </FormItem>
                            )}
                            />
                        </div>

                        <div className='w-full py-2'>
                            <Button type='submit'>Update</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
