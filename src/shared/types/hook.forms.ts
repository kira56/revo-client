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

type TechSkillLevel = "JUNIOR" | "MID" | "SENIOR" | "MID_SENIOR" | "JUNIOR_MID" | "TRAINEE";

export type UserRecommendationType = {
    id: string;
    name: string;
    similarity_score: number;
    weekly_available_hours: number;
    seniority_level: TechSkillLevel;
    english_level: number;
    tech_skills: Record<string, TechSkillLevel>;
    assignment_avg: number;
    active_assignments: number;
}

interface TechSkills {
    [tech: string]: string;
}

interface Result {
    id: string;
    name: string;
    similarity_score: number;
    weekly_available_hours: number;
    seniority_level: string;
    english_level: number;
    tech_skills: TechSkills;
    assignment_avg: number;
    active_assignments: number;
}

interface Entry {
    id: string;
    createdAt: string;
    seniority: string;
    english: string;
    techStacks: string[];
    primaryTechStack: string;
    hoursPerWeek: number;
    teamLead: boolean;
    flexibleSchedule: boolean;
    result: Result[];
}

export type HistoryType = Entry[];
