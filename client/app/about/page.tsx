"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { About } from "./about";

const queryClient = new QueryClient();

export default function AboutPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <About />
    </QueryClientProvider>
  );
}
