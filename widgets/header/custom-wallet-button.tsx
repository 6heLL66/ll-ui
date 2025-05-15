'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import styles from './custom-wallet-button.module.css';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useRef } from 'react';
import { useAuth } from '@/features/auth/useAuth';

export const CustomWalletButton = () => {
  const { wallet, publicKey, disconnect, signMessage } = useWallet();
  const { isAuthenticated, authorize } = useAuth();
  const { setVisible } = useWalletModal();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const handleClick = () => {
    if (!wallet || !publicKey) {
      setVisible(true);
    }
  };
  
  // Сокращаем адрес кошелька для отображения
  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };
  
  // Копирование адреса в буфер обмена
  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toString());
      // Можно добавить уведомление о копировании
    }
  };
  
  // Подписание сообщения
  const handleSignMessage = async () => {
    if (!publicKey || !signMessage) return;
    
    authorize()
  };
  
  // Обработчик отключения кошелька
  const handleDisconnect = () => {
    disconnect();
  };
  
  return (
    <div className={styles.walletButtonContainer} ref={dropdownRef}>
      <button 
        className={styles.customWalletButton}
        onClick={handleClick}
      >
        {publicKey 
          ? shortenAddress(publicKey.toString())
          : 'Connect Wallet'
        }
      </button>
      
      {publicKey && (
        <div className={styles.dropdown}>
          <ul>
          <li className='flex items-center gap-2' onClick={handleSignMessage}>
              {!isAuthenticated && <button className={styles.dropdownItem}>Sign</button>}
              <div className='flex items-center gap-2'>
                <div className={isAuthenticated ? 'w-[12px] h-[12px] rounded-full bg-green-500 opacity-50' : 'w-[12px] h-[12px] rounded-full bg-red-700 opacity-40'} />
                <span className='text-sm'>{isAuthenticated ? 'signed' : 'not signed'}</span>
              </div>
              
            </li>
            <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
            <li className={styles.dropdownItem} onClick={copyAddress}>
              Copy Address
            </li>
            <li className={styles.dropdownItem} onClick={handleDisconnect}>
              Disconnect
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}; 