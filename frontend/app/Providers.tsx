"use client"
import { ReactNode } from "react"
import { WagmiProvider } from "wagmi"
import { config } from "./config"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ToastContainer } from "react-toastify"

const queryClient = new QueryClient()
export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {children}
                <ToastContainer />
            </QueryClientProvider>
        </WagmiProvider>
    )
}