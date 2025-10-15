'use client';

import {
  http,
  cookieStorage,
  createConfig,
  createStorage,
  WagmiProvider,
} from "wagmi";
import { base, baseSepolia } from "viem/chains";
import { coinbaseWallet, metaMask } from "wagmi/connectors";
import { useState } from "react";

export function getConfig() {
  return createConfig({
    chains: [baseSepolia],
    connectors: [
      coinbaseWallet({
        appName: "Hello World",
        preference: "all",
        version: "4",
      }),
      metaMask(), // Add additional connectors
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [baseSepolia.id]: http(),
    },
  });
}