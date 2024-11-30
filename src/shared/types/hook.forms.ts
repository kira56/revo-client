export type ClientFormType = {
    seniorityLevel: string
    englishLevel: string
    techStack: string[]
    primaryTechStack: string
    // team: string
    // startDate: string
    // endDate: string
    teamLead: boolean
    hoursPerWeek: number
    flexibleSchedule: boolean
}

export type LoginFormType = {
    email: string
    password: string
}

export type RegisterFormType = {
    username: string
    email: string
    password: string
    confirmPassword: string
}