import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormType } from "@shared/types/hook.forms";
import { z, ZodType } from "zod";

export const LoginSchema: ZodType<LoginFormType> = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const LoginResolver = zodResolver(LoginSchema)