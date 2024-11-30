import { MantineProvider as MantineThemeProvider } from "@mantine/core";
import { ReactNode } from "react";
import { mantineTheme } from "@theme/mantine-theme";

type MantineProviderProps = {
  children: ReactNode;
};

export const MantineProvider = ({ children }: MantineProviderProps) => {
  return (
    <MantineThemeProvider theme={mantineTheme}>{children}</MantineThemeProvider>
  );
};
