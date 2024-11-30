import { EnglishLevelEnum, SeniorityLevelEnum } from "@shared/enums/level.enum";

export const mappingEnglishLevel: Record<EnglishLevelEnum, string> = {
    [EnglishLevelEnum.ADVANCED]: 'Advanced',
    [EnglishLevelEnum.PROFICIENT]: 'Proficient',
    [EnglishLevelEnum.BASIC]: 'Basic'
}

export const mappingSeniorityLevel: Record<SeniorityLevelEnum, string> = {
    [SeniorityLevelEnum.SENIOR]: 'Senior',
    [SeniorityLevelEnum.MID_SENIOR]: 'Mid Senior',
    [SeniorityLevelEnum.MID]: 'Mid',
    [SeniorityLevelEnum.JUNIOR_MID]: 'Junior Mid',
    [SeniorityLevelEnum.JUNIOR]: 'Junior',
    [SeniorityLevelEnum.TRAINEE]: 'Trainee'
}