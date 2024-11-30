import { RegisterForm } from "@components/forms/register-form";
import { Card, Center, Group, Stack, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router";

export const Register = () => {
  const navigate = useNavigate();

  return (
    <Center h="100vh">
      <Stack gap={24}>
        <Stack gap={8}>
          <Title order={2} ta="center">
            Create Account
          </Title>
          <Group justify="center" gap={4}>
            <Text>Already have an account?</Text>
            <Text c="blue" fw={600} onClick={() => navigate("/login")}>
              Sign in
            </Text>
          </Group>
        </Stack>
        <Card w={500} p={40} withBorder>
          <Stack>
            <RegisterForm />
          </Stack>
        </Card>
      </Stack>
      <Text
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          color: "gray",
        }}
      >
        Powered by Ravn
      </Text>
    </Center>
  );
};
