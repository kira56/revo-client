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
import { IconChevronDown, IconX } from "@tabler/icons-react";
import { EnglishLevelEnum, SeniorityLevelEnum } from "@shared/enums/level.enum";
import { useMutation } from "@tanstack/react-query";
import clientAxios from "@shared/config/axios-client";
import { useGlobalStore } from "@store/global.store";
import { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";

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

const techStacks: string[] = [
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
  "C#",
  "PHP",
  "Ruby",
  "Go",
  "Swift",
  "Kotlin",
  "TypeScript",
  "SQL",
  "NoSQL",
  "GraphQL",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "GCP",
  "Terraform",
  "Ansible",
  "Jenkins",
  "Git",
  "CI/CD",
  "Linux",
  "Unix",
  "Shell Scripting",
  "PowerShell",
  "Figma",
  "Sketch",
  "Adobe XD",
  "Photoshop",
  "Illustrator",
  "InDesign",
  ".NET",
  "Android",
  "Artificial intelligence",
  "BI",
  "Blazor",
  "C++",
  "Django",
  "Electron",
  "Elixir",
  "Flutter",
  "JQuery",
  "Laravel",
  "Machine Learning",
  "NextJs",
  "Node JS",
  "NuxtJS",
  "NuxtJS 2",
  "React JS",
  "React Native",
  "Roku",
  "Rust",
  "Scala",
  "Shopify",
  "Stripe",
  "Unity",
  "Visual Basic 6",
  "Webflow",
  "iOS",
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
      days: 0,
    },
  });

  const {
    control,
    handleSubmit,
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
          days: formData.days,
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
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          throw notifications.show({
            color: "red",
            position: "top-right",
            message: error.response?.data.message,
            icon: <IconX size={14} />,
          });
        }
        throw notifications.show({
          color: "red",
          position: "top-right",
          message: "Something went wrong, Please try again",
          icon: <IconX size={14} />,
        });
      },
    });
  };

  return (
    <FormProvider {...clientMethods}>
      <form onSubmit={handleSubmit(clientHandleSubmit)}>
        <Stack>
          <Title order={4}>Job Search Preferences</Title>
          <Controller
            control={control}
            name="seniorityLevel"
            render={({ field }) => (
              <Select
                data={seniorityLevels}
                {...field}
                label="Seniority Level"
                placeholder="Level"
                required
                rightSection={<IconChevronDown size={14} />}
              />
            )}
          />
          <Controller
            name="englishLevel"
            control={control}
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
            control={control}
            render={({ field }) => (
              <MultiSelect
                onChange={field.onChange}
                value={field.value}
                label="Tech Stacks"
                placeholder="Pick value"
                required
                data={techStacks}
                rightSection={<IconChevronDown size={14} />}
              />
            )}
          />
          <Controller
            name="primaryTechStack"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Primary Tech Stack"
                placeholder="Options"
                data={techStacks}
                required
                searchable
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
            name="days"
            control={control}
            render={({ field }) => (
              <NumberInput {...field} label="Days" placeholder="40" required />
            )}
          />
          <Controller
            name="hoursPerWeek"
            control={control}
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
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          </Group>
          <Group justify="space-between">
            <Text fw={600} size="sm">
              Flexible Schedule
            </Text>
            <Controller
              name="flexibleSchedule"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          </Group>
          <Button
            type="submit"
            disabled={!isValid}
            loading={processMutation.isPending}
          >
            Search
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
};
