import { Card, Group, Stack, Text, Title } from "@mantine/core";
import { UserRecommendationType } from "@shared/types/hook.forms";
interface RecommendationsProps {
  users: UserRecommendationType[];
}

export const Recommendations = ({ users }: RecommendationsProps) => {
  return (
    <Stack>
      <Title order={4}>Recommended Positions</Title>
      {!users.length ? (
        <Text>No Recommendations</Text>
      ) : (
        users.map((user) => (
          <Card key={user.id} withBorder>
            <Stack gap={8}>
              <Group justify="space-between">
                <Text fw={600}>{user.name}</Text>
                <Text fw={600} c="green">
                  {user.english_level}
                </Text>
              </Group>
              <Stack gap={4}>
                <Group justify="space-between">
                  <Text fw={600} c="violet">
                    {user.seniority_level}
                  </Text>
                  <Text>{user.id}</Text>
                </Group>
                {/* <Text size="sm" c="gray">
                  {user.requirements}
                </Text> */}
              </Stack>
            </Stack>
          </Card>
        ))
      )}
    </Stack>
  );
};
