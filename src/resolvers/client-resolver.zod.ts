import { z, type ZodType } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { ClientFormType } from "@shared/types/hook.forms"

export const ClientSchema: ZodType<ClientFormType> = z
    .object({
        seniorityLevel: z.string().min(1),
        englishLevel: z.string().min(1),
        techStack: z.array(z.string()).min(1),
        primaryTechStack: z.string().min(1),
        // team: z.string().min(1),
        // startDate: z.string().min(1),
        // endDate: z.string().min(1),
        teamLead: z.boolean(),
        hoursPerWeek: z.number().int().positive(),
        flexibleSchedule: z.boolean(),
    })


export const ClientResolver = zodResolver(ClientSchema)
