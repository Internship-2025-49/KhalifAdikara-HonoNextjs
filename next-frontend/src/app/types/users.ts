import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { userSchema } from "./userSchema";

export interface UserModel{
    id:number,
    username:string,
    name:string,
    address:string,
    phone:string,
    deleteUser:(id: number)=> void;
}

export interface UserAddModel{
    username:string,
    name:string,
    address:string,
    phone:string,
}

export interface FormProps {
    form: UseFormReturn<z.infer<typeof userSchema>>;
    onSubmit(values: z.infer<typeof userSchema>): void;
    titleText: string;
    buttonText: string;
    required: boolean;
}


