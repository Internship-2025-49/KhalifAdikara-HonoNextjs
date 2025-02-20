"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { FormProps } from '../types/users';

export default function UserForm({ form, onSubmit, titleText, buttonText, required }: FormProps) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full mx-32'>
                <div className='text-center'>
                    <span className='font-bold py-2 block text-4xl'>{titleText}</span>
                </div>

                <div className='w-full py-2'>
                    <FormField control={form.control} name='username' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder='Enter username' {...field} required={required} />
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
                                <Input placeholder='Enter name' {...field} required={required} />
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
                                <Textarea placeholder='Enter address' {...field} required={required} />
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
                                <Input placeholder='Enter phone number' {...field} required={required} />
                            </FormControl>
                        </FormItem>
                    )}
                    />
                </div>
                <div className='w-full py-2'>
                    <Button type='submit'>{buttonText}</Button>
                </div>
            </form>
        </Form>
    );
}