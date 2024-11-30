import {
  Button,
  Grid,
  Group,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

export const ClientForm = () => {
  return (
    <Stack>
      <Title order={4}>Job Search Preferences</Title>
      <Grid>
        <Grid.Col span={6}>
          <TextInput label="Seniority Level" />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput label="English Level" />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Tech Stack"
            placeholder="e.g React, Nodejs, Python"
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput label="Hours per Week" placeholder="40" />
        </Grid.Col>
        <Grid.Col span={12}>
          <Group>
            <Text fw={600}>Flexible Schedule</Text>
            <Switch />
          </Group>
        </Grid.Col>
      </Grid>
      <Button>Search</Button>
    </Stack>
  );
};
