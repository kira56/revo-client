import {
  Button,
  ComboboxItem,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  Stack,
  Switch,
  Text,
  Title,
} from "@mantine/core";
import {
  ClientFormType,
  UserRecommendationType,
} from "../../../shared/types/hook.forms";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { ClientResolver } from "@resolvers/client-resolver.zod";
import { IconChevronDown } from "@tabler/icons-react";
import { EnglishLevelEnum, SeniorityLevelEnum } from "@shared/enums/level.enum";
import { useMutation } from "@tanstack/react-query";
import clientAxios from "@shared/config/axios-client";
import { useGlobalStore } from "@store/global.store";

const seniorityLevels: ComboboxItem[] = [
  {
    value: SeniorityLevelEnum.JUNIOR.toString(),
    label: "Junior",
  },
  {
    value: SeniorityLevelEnum.JUNIOR_MID.toString(),
    label: "Junior-Mid",
  },
  {
    value: SeniorityLevelEnum.MID.toString(),
    label: "Mid",
  },
  {
    value: SeniorityLevelEnum.MID_SENIOR.toString(),
    label: "Mid-Senior",
  },
  {
    value: SeniorityLevelEnum.SENIOR.toString(),
    label: "Senior",
  },
  {
    value: SeniorityLevelEnum.TRAINEE.toString(),
    label: "Trainee",
  },
];

const englishLevels: ComboboxItem[] = [
  {
    value: EnglishLevelEnum.BASIC.toString(),
    label: "Basic",
  },
  {
    value: EnglishLevelEnum.PROFICIENT.toString(),
    label: "Proficient",
  },
  {
    value: EnglishLevelEnum.ADVANCED.toString(),
    label: "Advanced",
  },
];

interface ClientFormProps {
  setUsersRecommendation: (users: UserRecommendationType[]) => void;
}

export const ClientForm = ({ setUsersRecommendation }: ClientFormProps) => {
  const token = useGlobalStore((state) => state.token);

  const clientMethods = useForm<ClientFormType>({
    mode: "all",
    resolver: ClientResolver,
    defaultValues: {
      seniorityLevel: "",
      englishLevel: "",
      techStack: [],
      primaryTechStack: "",
      // team: "",
      // startDate: "",
      // endDate: "",
      teamLead: false,
      hoursPerWeek: 0,
      flexibleSchedule: false,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = clientMethods;

  const processMutation = useMutation({
    mutationFn: async (formData: ClientFormType) => {
      const response = await clientAxios.post(
        "/recommendation",
        {
          seniority: formData.seniorityLevel,
          english: formData.englishLevel,
          techStacks: formData.techStack,
          primaryTechStack: formData.primaryTechStack,
          hoursPerWeek: formData.hoursPerWeek,
          teamLead: formData.teamLead,
          flexibleSchedule: formData.flexibleSchedule,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.content as UserRecommendationType[];
    },
  });

  const clientHandleSubmit = async (formData: ClientFormType) => {
    await processMutation.mutateAsync(formData, {
      onSuccess: (data) => {
        setUsersRecommendation(data);
        reset();
      },
    });
  };

  return (
    <FormProvider {...clientMethods}>
      <form onSubmit={handleSubmit(clientHandleSubmit)}>
        <Stack>
          <Title order={4}>Job Search Preferences</Title>
          <Controller
            name="seniorityLevel"
            render={({ field }) => (
              <Select
                {...field}
                label="Seniority Level"
                placeholder="Level"
                data={seniorityLevels}
                required
                rightSection={<IconChevronDown size={14} />}
              />
            )}
          />
          <Controller
            name="englishLevel"
            render={({ field }) => (
              <Select
                {...field}
                label="English Level"
                placeholder="Level"
                data={englishLevels}
                required
                rightSection={<IconChevronDown size={14} />}
              />
            )}
          />

          <Controller
            name="techStack"
            render={({ field }) => (
              <MultiSelect
                onChange={(value) => {
                  field.onChange(value);
                }}
                label="Tech Stacks"
                placeholder="Pick value"
                required
                data={[
                  "React",
                  "Angular",
                  "Vue",
                  "Svelte",
                  "JavaScript",
                  "Design",
                  "Node",
                  "Rails",
                  "Python",
                  "HTML",
                  "CSS",
                  "Java",
                ]}
                rightSection={<IconChevronDown size={14} />}
              />
            )}
          />
          <Controller
            name="primaryTechStack"
            render={({ field }) => (
              <Select
                {...field}
                label="Primary Tech Stack"
                placeholder="Options"
                data={[
                  "React",
                  "Angular",
                  "Vue",
                  "Svelte",
                  "JavaScript",
                  "Design",
                  "Node",
                  "Rails",
                  "Python",
                  "HTML",
                  "CSS",
                  "Java",
                ]}
                required
                rightSection={<IconChevronDown size={14} />}
              />
            )}
          />
          {/* <Controller
            name="team"
            render={({ field }) => (
              <Select
                {...field}
                label="Team"
                placeholder="Options"
                data={["Frontend", "Backend", "Project Manager"]}
                required
                rightSection={<IconChevronDown size={14} />}
              />
            )}
          />
          <Controller
            name="startDate"
            render={({ field }) => (
              <DatePickerInput
                label="Start Date"
                placeholder="Pick date"
                onChange={(value) => {
                  field.onChange(value?.toISOString());
                }}
                leftSection={<IconCalendar size={14} />}
              />
            )}
          />
          <Controller
            name="endDate"
            render={({ field }) => (
              <DatePickerInput
                label="End Date"
                placeholder="Pick date"
                onChange={(value) => {
                  field.onChange(value?.toISOString());
                }}
                leftSection={<IconCalendar size={14} />}
              />
            )}
          /> */}
          <Controller
            name="hoursPerWeek"
            render={({ field }) => (
              <NumberInput
                {...field}
                label="Hours per Week"
                placeholder="40"
                required
              />
            )}
          />
          <Group justify="space-between">
            <Text fw={600} size="sm">
              Team Lead
            </Text>
            <Controller
              name="teamLead"
              render={({ field }) => <Switch {...field} />}
            />
          </Group>
          <Group justify="space-between">
            <Text fw={600} size="sm">
              Flexible Schedule
            </Text>
            <Controller
              name="flexibleSchedule"
              render={({ field }) => <Switch {...field} />}
            />
          </Group>
          <Button type="submit" disabled={!isValid}>
            Search
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
};
