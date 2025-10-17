"use client";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { base, baseSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { WagmiProvider } from "wagmi";
import { getConfig } from "./wagmi";
import CDPProvider from "./cdp";

export default function Providers({ children }) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <CDPProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <OnchainKitProvider
            apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
            chain={baseSepolia}
            projectId={process.env.NEXT_PUBLIC_CDP_PROJECT_ID}
            config={{
              appearance: {
                name: "Survey Chain 🪙",
                logo: "/survey_chain_logo.svg",
                mode: "dark",
                theme: "base",
              },
              wallet: {
                display: "modal",
                preference: "all",
                termsUrl: "/terms",
                privacyUrl: "/privacy",
                supportedWallets: {
                  rabby: true,
                  trust: true,
                  frame: true,
                },
              },
              paymaster: process.env.PAYMASTER_ENDPOINT,
              analytics: true,
            }}
          >
            {children}
          </OnchainKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </CDPProvider>
  );
}
