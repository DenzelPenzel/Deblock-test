'use client';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { mainnet } from 'viem/chains';
import { WagmiProvider } from 'wagmi';
import { useWamigConfig } from '../wagmi';

type Props = { children: ReactNode };

const queryClient = new QueryClient();

const OnchainProviders = ({ children }: Props) => {
  const wagmiConfig = useWamigConfig();
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider apiKey={'123'} chain={mainnet}>
          <RainbowKitProvider modalSize="compact">
            {children}
          </RainbowKitProvider>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default OnchainProviders;
