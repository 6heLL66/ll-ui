'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import styles from './custom-wallet-button.module.css';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

export const CustomWalletButton = () => {
  const { wallet, publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  
  const handleClick = () => {
    if (wallet) {
      disconnect();
    } else {
      setVisible(true);
    }
  };
  
  // Сокращаем адрес кошелька для отображения
  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };
  
  return (
    <button 
      className={styles.customWalletButton}
      onClick={handleClick}
    >
      {publicKey 
        ? shortenAddress(publicKey.toString())
        : 'Connect Wallet'
      }
    </button>
  );
}; 