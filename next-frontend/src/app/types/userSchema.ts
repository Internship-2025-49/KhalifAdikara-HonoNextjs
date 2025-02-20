import { z } from "zod"

export const userSchema = z.object({
    id: z.number(),
    username: z.string().min(3),
    name: z.string().min(3),
    address: z.string().min(3),
    phone: z.string().min(10),
})


export type userForm = z.infer<typeof userSchema>;