import { Drawer, Stack } from "@mantine/core";

interface HistorySideDrawerProps {
  close: () => void;
  opened: boolean;
}

export const HistoryDrawer = ({ close, opened }: HistorySideDrawerProps) => {
  return (
    <Drawer
      position="right"
      opened={opened}
      onClose={close}
      title="History Recommendations"
    >
      <Stack>
        <div>Empty</div>
      </Stack>
    </Drawer>
  );
};
