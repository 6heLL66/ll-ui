'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { PairInfo } from '@/shared/dlmm-api';
import Image from 'next/image';
import { useTokens } from '@/features/tokens/useTokens';
import { useRouter } from 'next/navigation';

interface PoolRowProps {
  pool: PairInfo;
  className?: string;
}

export function PoolRow({ pool, className }: PoolRowProps) {
  const router = useRouter();
  const { tokensMap } = useTokens([pool.mint_x, pool.mint_y]);

  const tokenX = tokensMap[pool.mint_x];
  const tokenY = tokensMap[pool.mint_y];

  return (
    <TableRow className={`border-zinc-800/40 hover:bg-zinc-800/50 transition-colors duration-150 cursor-pointer group ${className || ''}`} onClick={() => router.push(`/pools/${pool.address}`)}>
      <TableCell className="font-medium py-5">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2 transition-all duration-300 group-hover:scale-105">
            <div
              className="w-9 h-9 rounded-full bg-zinc-800 border-2 border-zinc-700/70 flex items-center justify-center text-xs overflow-hidden shadow-md transition-transform duration-300"
            >
              <Image src={tokenX?.logoURI ?? '/images/placeholder.png'} alt={pool.mint_x} width={36} height={36} />
            </div>
            <div
              className="w-9 h-9 rounded-full bg-zinc-800 border-2 border-zinc-700/70 flex items-center justify-center text-xs overflow-hidden shadow-md transition-transform duration-300"
            >
              <Image src={tokenY?.logoURI ?? '/images/placeholder.png'} alt={pool.mint_y} width={36} height={36} />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-zinc-200 group-hover:text-white transition-colors duration-200">{pool.name}</span>
          </div>
        </div>
      </TableCell>
      <TableCell className="font-medium text-zinc-300">
        <span className="group-hover:text-white transition-colors duration-200">${formatCurrency(+pool.liquidity)}</span>
      </TableCell>
      <TableCell className="font-medium text-zinc-300">
        <span className="group-hover:text-white transition-colors duration-200">${formatCurrency(+pool.volume.hour_24)}</span>
      </TableCell>
      <TableCell className="">
        <span className={`font-medium transition-colors duration-200`}>{pool.fee_tvl_ratio.hour_24.toFixed(2)}%</span>
      </TableCell>
      <TableCell className="w-10">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-8 w-8 text-zinc-500 group-hover:text-white group-hover:bg-zinc-700/30 transition-all duration-200 transform group-hover:translate-x-1"
        >
          <ChevronRight size={18} />
        </Button>
      </TableCell>
    </TableRow>
  );
}
