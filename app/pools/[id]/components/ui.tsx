'use client';
import { PairRouteService } from '@/shared/dlmm-api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { PoolPositionsTab } from './tabs/positions-tab';
import Link from 'next/link';
import { useTokens } from '@/features/tokens/useTokens';
import { TokenAmount } from '@/shared/utils/tokenAmount';

export const PoolUI = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'positions'>('positions');

  const { tokensMap, fetchTokens } = useTokens();

  const { data: pool, isLoading } = useQuery({
    queryKey: ['pool', id],
    queryFn: async () => {
      const pair = await PairRouteService.getPair(id as string);
      await fetchTokens([pair.mint_x, pair.mint_y]);
      return pair;
    },
  });

  if (isLoading || !pool || !tokensMap[pool.mint_x] || !tokensMap[pool.mint_y]) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const tokenX = tokensMap[pool.mint_x];
  const tokenY = tokensMap[pool.mint_y];

  const reserveXAmount = TokenAmount.fromRawAmount(tokenX.token, pool.reserve_x_amount);
  const reserveYAmount = TokenAmount.fromRawAmount(tokenY.token, pool.reserve_y_amount);

  return (
    <div className="w-full bg-dark-bg text-dark-text-primary min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="px-6 py-4">
        <div className="flex items-center text-dark-text-secondary text-sm">
          <Link href="/pools" className="hover:text-dark-text-primary transition-colors">
            Pools
          </Link>
          <span className="mx-2">›</span>
          <span className="text-dark-text-primary">
            {tokenX.symbol}-{tokenY.symbol}
          </span>
        </div>
      </div>

      {/* Pool Header */}
      <div className="px-6 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <h1 className="text-4xl font-bold text-dark-text-primary">
            {tokenX.symbol}-{tokenY.symbol}
          </h1>
          <div className="mt-2 md:mt-0 bg-dark-surface px-4 py-2 rounded-md text-dark-text-primary">
            <div className="flex items-center">
              <span className="font-bold text-xl">{(+pool.base_fee_percentage).toFixed(2)}%</span>
              <span className="ml-2 text-sm text-dark-text-secondary">fee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6">
        {/* Left Column - TVL */}
        <div className="bg-dark-surface rounded-xl p-6">
          <div className="text-dark-text-secondary mb-2">Total Value Locked</div>
          <div className="text-3xl font-bold">${pool.volume.hour_24.toLocaleString()}</div>

          <div className="mt-8">
            <div className="text-dark-text-secondary mb-4">Liquidity Allocation</div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-9 h-9 rounded-full overflow-hidden mr-3">
                    <Image src={tokenX.logoURI ?? '/images/placeholder.png'} alt={tokenX.symbol} width={36} height={36} className="object-cover" />
                  </div>
                  <div>
                    <div className="font-medium">{tokenX.symbol}</div>
                    <div className="text-xs text-dark-text-secondary flex items-center">
                      {tokenX.address.slice(0, 4)}...{tokenX.address.slice(-4)}
                      <svg className="w-3 h-3 ml-1 text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="text-right font-medium">{reserveXAmount.toSignificant()}</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-9 h-9 rounded-full overflow-hidden mr-3">
                    <Image src={tokenY.logoURI ?? '/images/placeholder.png'} alt={tokenY.symbol} width={36} height={36} className="object-cover" />
                  </div>
                  <div>
                    <div className="font-medium">{tokenY.symbol}</div>
                    <div className="text-xs text-dark-text-secondary flex items-center">
                      {tokenY.address.slice(0, 4)}...{tokenY.address.slice(-4)}
                      <svg className="w-3 h-3 ml-1 text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    {tokenY.freeze_authority && <div className="text-[9px] text-warning flex items-center whitespace-nowrap mt-1">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      Freeze Authority
                    </div>}
                  </div>
                </div>
                <div className="text-right font-medium">{reserveYAmount.toSignificant()}</div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <div className="flex justify-between">
              <span className="text-dark-text-secondary">Bin Step</span>
              <span>{pool.bin_step}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-dark-text-secondary">Base Fee</span>
              <span>{(+pool.base_fee_percentage).toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-dark-text-secondary">Max Fee</span>
              <span>{(+pool.max_fee_percentage).toFixed()}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-dark-text-secondary">Protocol Fee</span>
              <span>{(+pool.protocol_fee_percentage).toFixed(3)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-dark-text-secondary">24h Fee</span>
              <span>${pool.fees_24h.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Right Columns - Positions and Tabs */}
        <div className="lg:col-span-2">
          <div className="bg-dark-surface rounded-xl p-6 mb-6">
            <div className="text-xl font-semibold mb-4">Your Liquidity</div>
            <div className="flex items-center mb-4">
              <div className="text-dark-text-secondary mr-2">Current Pool Price</div>
              <div className="flex items-center">
                <span>{pool.current_price.toFixed(4)} {tokenX.symbol}/{tokenY.symbol}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-dark-bg-secondary p-4 rounded-lg">
                <div className="text-dark-text-secondary text-sm mb-1">Total Liquidity</div>
                <div className="text-xl font-bold">$0</div>
              </div>
              <div className="bg-dark-bg-secondary p-4 rounded-lg">
                <div className="text-dark-text-secondary text-sm mb-1">Fees Earned (Claimed)</div>
                <div className="text-xl font-bold">$0</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-dark-text-secondary text-sm mb-2">Current Balance</div>
                <div className="flex items-center mb-2">
                  <div className="w-5 h-5 rounded-full overflow-hidden mr-2">
                    <Image src={tokenX.logoURI ?? '/images/placeholder.png'} alt={tokenX.symbol} width={20} height={20} className="object-cover" />
                  </div>
                  <span>0 {tokenX.symbol}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full overflow-hidden mr-2">
                    <Image src={tokenY.logoURI ?? '/images/placeholder.png'} alt={tokenY.symbol} width={20} height={20} className="object-cover" />
                  </div>
                  <span>0 {tokenY.symbol}</span>
                </div>
              </div>
              <div>
                <div className="text-dark-text-secondary text-sm mb-2">Your Unclaimed Swap Fee</div>
                <div className="flex items-center mb-2">
                  <div className="w-5 h-5 rounded-full overflow-hidden mr-2">
                    <Image src={tokenX.logoURI ?? '/images/placeholder.png'} alt={tokenX.symbol} width={20} height={20} className="object-cover" />
                  </div>
                  <span>0 {tokenX.symbol}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full overflow-hidden mr-2">
                    <Image src={tokenY.logoURI ?? '/images/placeholder.png'} alt={tokenY.symbol} width={20} height={20} className="object-cover" />
                  </div>
                  <span>0 {tokenY.symbol}</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-dark-border mb-6">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('positions')}
                  className={`py-3 px-4 font-medium text-sm transition-colors ${
                    activeTab === 'positions' ? 'border-b-2 border-dark-accent-primary text-dark-text-primary' : 'text-dark-text-secondary hover:text-dark-text-primary'
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Your Positions
                  </div>
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === 'positions' && <PoolPositionsTab pool={pool} tokenX={tokenX} tokenY={tokenY} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
