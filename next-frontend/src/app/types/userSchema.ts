"use client"

import { z } from "zod"

export const userSchema = z.object({
    username: z.string(),
    name: z.string(),
    address: z.string(),
    phone: z.string().min(10),
})

