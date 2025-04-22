'use client';

import Link from 'next/link';
import Image from 'next/image';
import { DOCS_LINK } from '@/config/links';
import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import './wallet-button.css';
import { CustomWalletButton } from './custom-wallet-button';

export const Logo = () => {
  return (
    <div className="relative">
      <div className="relative w-8 h-8">
        <Image src="/images/logo.jpg" alt="Liquidity Loop Logo" fill className="object-contain rounded-full" />
      </div>
    </div>
  );
};

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { publicKey } = useWallet();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent scrolling when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <>
      <header className="backdrop-blur-md bg-black/20 border-b border-white/10 fixed top-0 left-0 right-0 z-50 w-full">
        <div className="w-full mx-auto h-16 flex justify-between items-center px-6 lg:px-10">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
              <span className="text-base font-semibold">Liquidity Loop</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="/pools" highlight>Pools</NavLink>
            <NavLink href="/wallets" highlight>Wallets</NavLink>
            <NavLink href={DOCS_LINK} external>Docs</NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <div className="scale-[0.85] origin-right">
              <CustomWalletButton />
            </div>
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-1 text-white/80 hover:text-primary-default transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16"></div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed z-[9999] inset-0 min-h-[100dvh] transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMobileMenu}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />

        {/* Content Container */}
        <div className="relative h-full flex flex-col" onClick={e => e.stopPropagation()}>
          {/* Top bar with logo and close button */}
          <div className="container mx-auto px-4 h-16 flex justify-between items-center border-b border-white/10">
            <Link href="/" className="flex items-center gap-2" onClick={toggleMobileMenu}>
              <Logo />
              <span className="text-base font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Liquidity Loop</span>
            </Link>
            
            <button
              className="p-1 text-white/80 hover:text-primary-default transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Navigation Links Container */}
          <div className="flex-1 container mx-auto px-4 flex flex-col justify-center">
            <nav className="flex flex-col gap-4">
              <MobileNavLink href="/pools" onClick={toggleMobileMenu}>Pools</MobileNavLink>
              <MobileNavLink href="/wallets" onClick={toggleMobileMenu}>Wallets</MobileNavLink>
              <MobileNavLink href={DOCS_LINK} external onClick={toggleMobileMenu}>Docs</MobileNavLink>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

const NavLink = ({ 
  href, 
  children, 
  external,
  onClick,
  disabled,
  highlight
}: { 
  href: string; 
  children: React.ReactNode; 
  external?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  highlight?: boolean;
}) => {
  const baseStyles = 'text-sm transition-colors py-1 relative group';
  const disabledStyles = 'cursor-not-allowed opacity-70 hover:text-white/80';
  const highlightStyles = highlight 
    ? 'text-white font-bold' 
    : 'text-white/70 hover:text-white';

  if (disabled) {
    return (
      <span className={`${baseStyles} ${disabledStyles} flex items-center gap-1`}>
        {children}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="opacity-70"
        >
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      </span>
    );
  }

  if (external) {
    return (
      <Link 
        href={href} 
        rel="noopener noreferrer" 
        target="_blank" 
        className={`${baseStyles} ${highlightStyles} flex items-center gap-1`}
        onClick={onClick}
      >
        {children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-60"
        >
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
        {highlight && (
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        )}
      </Link>
    );
  }

  return (
    <Link href={href} className={`${baseStyles} ${highlightStyles}`} onClick={onClick}>
      {children}
      {highlight && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      )}
    </Link>
  );
};

const MobileNavLink = ({ 
  href, 
  children, 
  external,
  onClick,
  disabled,
  highlight
}: { 
  href: string; 
  children: React.ReactNode; 
  external?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  highlight?: boolean;
}) => {
  const baseStyles = 'text-lg text-white/90 hover:text-white transition-colors py-2 relative';
  const disabledStyles = 'cursor-not-allowed opacity-70 hover:text-white/80';

  if (disabled) {
    return (
      <span className={`${baseStyles} ${disabledStyles} flex items-center gap-1`}>
        {children}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="opacity-70"
        >
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      </span>
    );
  }

  if (external) {
    return (
      <Link 
        href={href} 
        rel="noopener noreferrer" 
        target="_blank" 
        className={`${baseStyles} flex items-center gap-1`}
        onClick={onClick}
      >
        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-medium">{children}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-60"
        >
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      </Link>
    );
  }

  return (
    <Link 
      href={href} 
      className={baseStyles}
      onClick={onClick}
    >
      <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-medium">{children}</span>
    </Link>
  );
};