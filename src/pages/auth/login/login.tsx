import { LoginForm } from "@components/forms/login-form";
import { Card, Center, Group, Stack, Text, Title } from "@mantine/core";
import { MBIcon } from "@shared/icons/mb.icon";
import { useNavigate } from "react-router";

export const Login = () => {
  const navigate = useNavigate();

  return (
    <Center h="100vh">
      <Stack gap={24}>
        <Center>
          <MBIcon width={80} height={80} />
        </Center>
        <Stack gap={8}>
          <Title order={2} ta="center">
            Welcome Back!
          </Title>
          <Group justify="center" gap={4}>
            <Text>Do not have an account yet?</Text>
            <Text c="violet" fw={600} onClick={() => navigate("/register")}>
              Create account
            </Text>
          </Group>
        </Stack>
        <Card w={500} p={40} withBorder>
          <LoginForm />
        </Card>
      </Stack>
      <Text
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          color: "gray",
        }}
        size="sm"
      >
        Powered by Ravn
      </Text>
    </Center>
  );
};
