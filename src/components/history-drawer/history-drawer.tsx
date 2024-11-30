import { Drawer, Stack, Text } from "@mantine/core";
import clientAxios from "@shared/config/axios-client";
import { HistoryType } from "@shared/types/hook.forms";
import { useGlobalStore } from "@store/global.store";
import { useQuery } from "@tanstack/react-query";

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
          data.map((history) => (
            <Stack>
              <Text>{history.english}</Text>
            </Stack>
          ))
        )}
      </Stack>
    </Drawer>
  );
};
