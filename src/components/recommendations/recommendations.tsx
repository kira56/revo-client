import { CardUser } from "@components/cards/card-user";
import { Grid, Stack, Text, Title } from "@mantine/core";
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
        <Grid>
          {users.map((user, index) => (
            <Grid.Col span={6} key={user.id}>
              <CardUser user={user} index={index} />
            </Grid.Col>
          ))}
        </Grid>
      )}
    </Stack>
  );
};
