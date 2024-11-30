import { ClientForm } from "@components/forms/client-form";
import { HistoryDrawer } from "@components/history-drawer";
import { Recommendations } from "@components/recommendations/recommendations";
import {
  ActionIcon,
  AppShell,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Menu,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MBIcon } from "@shared/icons/mb.icon";
import { UserRecommendationType } from "@shared/types/hook.forms";
import { useGlobalStore } from "@store/global.store";
import { IconMenu3 } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export const Recommendation = () => {
  const navigate = useNavigate();
  const logout = useGlobalStore((state) => state.logout);

  const [usersRecommendation, setUsersRecommendation] = useState<
    UserRecommendationType[]
  >([]);

  const [opened, { close, open }] = useDisclosure(false);

  const handleLogout = () => {
    navigate("/login");
    logout();
  };

  console.log(usersRecommendation, "<---- usersRecommendation");

  return (
    <AppShell>
      <AppShell.Header h={60}>
        <Group h="100%" mx={30} justify="space-between">
          <MBIcon />
          <Group>
            <Button variant="default" onClick={open}>
              History
            </Button>
            <Menu shadow="md" position="bottom-end">
              <Menu.Target>
                <ActionIcon>
                  <IconMenu3 />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
          <HistoryDrawer opened={opened} close={close} />
        </Group>
      </AppShell.Header>
      <AppShell.Main my={100} px={20}>
        <Container size="xl">
          <Grid gutter={20}>
            <Grid.Col span={6}>
              <Card shadow="lg">
                <ClientForm setUsersRecommendation={setUsersRecommendation} />
              </Card>
            </Grid.Col>
            <Grid.Col span={6}>
              <Card shadow="lg">
                <Recommendations users={usersRecommendation} />
              </Card>
            </Grid.Col>
          </Grid>
        </Container>
      </AppShell.Main>
      <AppShell.Footer py={10}>
        <Text ta="center" c="gray" size="sm">
          Powered by Ravn
        </Text>
      </AppShell.Footer>
    </AppShell>
  );
};
