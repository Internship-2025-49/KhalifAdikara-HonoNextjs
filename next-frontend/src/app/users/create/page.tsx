/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { createUser } from '@/app/utils/queries/users/route';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel} from '@/components/ui/form';
import { useForm } from 'react-hook-form';

export default function UserCreate() {
    const queryClient = new QueryClient()
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            username: "",
            name: "",
            address: "",
            phone: "",
        },
    });
    
    const mutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            router.push('/users');
        },
    });

    const submit = (data: any) => {
        mutation.mutate(data);
    };

    return (
        <div className='container w-full py-10'>
            <div className='flex justify-center'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submit)} className='w-full mx-32'>
                        <div className='text-center'>
                            <span className='font-bold py-2 block text-4xl'>Add User</span>
                        </div>

                        <div className='w-full py-2'>
                            <FormField control={form.control} name='username' render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Enter username' {...field} required />
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
                                        <Input placeholder='Enter name' {...field} required />
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
                                        <Textarea placeholder='Enter address' {...field} required />
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
                                        <Input placeholder='Enter phone number' {...field} required />
                                    </FormControl>
                                </FormItem>
                            )}
                            />
                        </div>
                        <div className='w-full py-2'>
                            <Button type='submit'>Submit</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
