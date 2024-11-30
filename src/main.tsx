import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@context/mantine-provider.tsx";
import { BrowserRouter } from "react-router";
import { AppRouter } from "./router/app.routes.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <AppRouter />
        </MantineProvider>
      </QueryClientProvider>
    </StrictMode>
  </BrowserRouter>
);
