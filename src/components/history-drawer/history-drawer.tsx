import {
  Accordion,
  Avatar,
  Badge,
  Box,
  Card,
  Drawer,
  Group,
  Pill,
  Stack,
  Text,
} from "@mantine/core";
import clientAxios from "@shared/config/axios-client";
import { DD_MM_YYYY_h_mm_ss_a } from "@shared/constants/date-format";
import { EnglishLevelEnum, SeniorityLevelEnum } from "@shared/enums/level.enum";
import { HistoryType } from "@shared/types/hook.forms";
import {
  mappingEnglishLevel,
  mappingSeniorityLevel,
} from "@shared/utils/mapping-levels.util";
import { useGlobalStore } from "@store/global.store";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

interface HistorySideDrawerProps {
  close: () => void;
  opened: boolean;
}

export const HistoryDrawer = ({ close, opened }: HistorySideDrawerProps) => {
  const user = useGlobalStore((state) => state.user);

  const { data } = useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      const response = await clientAxios.get("/history", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      return response.data.content as HistoryType;
    },
  });

  return (
    <Drawer
      position="right"
      opened={opened}
      onClose={close}
      title="History Recommendations"
    >
      <Stack>
        {!data?.length ? (
          <Text>Empty</Text>
        ) : (
          <Accordion>
            {data.map((history) => (
              <Accordion.Item key={history.id} value={history.id}>
                <Accordion.Control>
                  <Stack>
                    <Text>
                      {dayjs(history.createdAt).format(DD_MM_YYYY_h_mm_ss_a)}
                    </Text>
                    <Stack gap={8}>
                      <Text fw={600} size="sm">
                        Requirements:
                      </Text>
                      <Group>
                        <Badge>
                          {
                            mappingSeniorityLevel[
                              history.seniority as SeniorityLevelEnum
                            ]
                          }
                        </Badge>
                        <Pill>{history.primaryTechStack}</Pill>
                        <Pill>
                          English -
                          {
                            mappingEnglishLevel[
                              history.english as EnglishLevelEnum
                            ]
                          }
                        </Pill>
                        <Pill>{history.hoursPerWeek}h</Pill>
                      </Group>
                    </Stack>
                  </Stack>
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack>
                    {history.result.map((user, index) => (
                      <Card key={user.id} withBorder>
                        <Stack>
                          <Group justify="space-between">
                            <Group>
                              <Avatar
                                src={`https://i.pravatar.cc/300?img=${index}`}
                              />
                              <Box w={150}>
                                <Text fw={600}>{user.name}</Text>
                              </Box>
                            </Group>
                            <Badge size="sm">
                              {
                                mappingSeniorityLevel[
                                  user.seniority_level as SeniorityLevelEnum
                                ]
                              }
                            </Badge>
                          </Group>
                          <Group justify="space-between">
                            <Text size="sm" c="gray">
                              English Level:
                            </Text>
                            <Text size="sm" c="violet">
                              {
                                mappingEnglishLevel[
                                  user.english_level as unknown as EnglishLevelEnum
                                ]
                              }
                            </Text>
                          </Group>
                          <Group justify="space-between">
                            <Text size="sm" c="gray">
                              Hours Available:
                            </Text>
                            <Text size="sm" c="violet">
                              {user.weekly_available_hours}h
                            </Text>
                          </Group>
                        </Stack>
                      </Card>
                    ))}
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        )}
      </Stack>
    </Drawer>
  );
};
