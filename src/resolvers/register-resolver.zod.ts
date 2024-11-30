import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormType } from "@shared/types/hook.forms";
import { z, ZodType } from "zod";

export const RegisterSchema: ZodType<RegisterFormType> = z.object({
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export const RegisterResolver = zodResolver(RegisterSchema)