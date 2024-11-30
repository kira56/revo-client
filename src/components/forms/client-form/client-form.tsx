import {
  Button,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  Stack,
  Switch,
  Text,
  Title,
} from "@mantine/core";
import { ClientFormType } from "../../../shared/types/hook.forms";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { ClientResolver } from "@resolvers/client-resolver.zod";
import { IconCalendar, IconChevronDown } from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";

export const ClientForm = () => {
  const clientMethods = useForm<ClientFormType>({
    mode: "all",
    resolver: ClientResolver,
    defaultValues: {
      seniorityLevel: "",
      englishLevel: "",
      techStack: [],
      primaryTechStack: "",
      team: "",
      startDate: "",
      endDate: "",
      teamLead: false,
      hoursPerWeek: 0,
      flexibleSchedule: false,
    },
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = clientMethods;

  const clientHandleSubmit = (formData: ClientFormType) => {
    console.log("Send DATA");
    console.log(formData, "<---- FORM DATA");
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
                data={["React", "Angular", "Vue", "Svelte"]}
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
                data={["React", "Angular", "Vue", "Svelte"]}
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
                data={["React", "Angular", "Vue", "Svelte"]}
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
                data={["React", "Angular", "Vue", "Svelte"]}
                required
                rightSection={<IconChevronDown size={14} />}
              />
            )}
          />
          <Controller
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
          />
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
