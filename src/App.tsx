import { Card, Container, Grid, Stack, Title } from "@mantine/core";
import { ClientForm } from "./components/forms/client-form";
import { Recommendations } from "./components/recommendations/recommendations";

function App() {
  return (
    <Container size="xl" my={20}>
      <Stack>
        <Title ta="center">Revo Client</Title>
        <Grid>
          <Grid.Col span={6}>
            <Card withBorder>
              <ClientForm />
            </Card>
          </Grid.Col>
          <Grid.Col span={6}>
            <Card withBorder>
              <Recommendations />
            </Card>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
}

export default App;
