import { z } from "zod";
import { userSchema } from "./userSchema";

export const userDefaultValues :z.infer<typeof userSchema> = {
    username: "",
    name: "",
    address: "",
    phone: "",
};