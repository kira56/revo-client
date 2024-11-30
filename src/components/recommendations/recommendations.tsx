import { Card, Group, Stack, Text, Title } from "@mantine/core";

export const Recommendations = () => {
  return (
    <Stack>
      <Title order={4}>Recommended Positions</Title>
      {Array.from({ length: 5 }).map((_, index) => (
        <Card key={index} withBorder>
          <Stack gap={8}>
            <Group justify="space-between">
              <Text fw={600}>Senior Full Stack Developer</Text>
              <Text fw={600} c="green">
                $120k - $150k
              </Text>
            </Group>
            <Stack gap={4}>
              <Group justify="space-between">
                <Text fw={600} c="violet">
                  TechCorp Inc.
                </Text>
                <Text>Remote</Text>
              </Group>
              <Text size="sm" c="gray">
                Requirements: Vuejs, Nodejs, MongoDB, 5+ years of experience
              </Text>
            </Stack>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
};
