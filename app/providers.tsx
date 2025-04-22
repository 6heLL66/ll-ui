'use client';

import { HeroUIProvider } from '@heroui/react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { ToastContainer } from 'react-toastify';
import { queryClient } from '@/config/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const network = WalletAdapterNetwork.Mainnet;

  const endpoint = 'https://misty-omniscient-sea.solana-mainnet.quiknode.pro/83153b5b2ccf547e5f1684cd907a585dae65de9d';
  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <QueryClientProvider client={queryClient}>
            <HeroUIProvider>
              <ToastContainer theme="dark" position="bottom-right" className="border-border" />
              {children}
            </HeroUIProvider>
          </QueryClientProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
