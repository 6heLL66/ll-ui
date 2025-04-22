import React from 'react';
import { Metadata } from 'next';
import { PoolsUI } from './components/ui';

export const metadata: Metadata = {
  title: 'Pools | Your App Name',
  description: 'View and interact with liquidity pools',
};

export default function PoolsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Pools</h1>
        <p className="text-slate-400">Provide liquidity to earn fees and rewards</p>
      </div>
      
      <PoolsUI />
    </div>
  );
} 