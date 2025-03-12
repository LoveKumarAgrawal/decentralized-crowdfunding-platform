"use client"
import Navbar from "@/components/Navbar";
import { WagmiProvider } from "wagmi";
import { config } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

export default function Home() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Navbar />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
