"use client";

import { Toaster } from "sonner";
import { ThemeProvider } from "./themeProvider";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000 * 5,
          },
        },
      }),
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <Toaster />
    </ThemeProvider>
  );
};
export default Providers;
