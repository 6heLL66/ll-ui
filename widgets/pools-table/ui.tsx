'use client';

import React, { useState } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PoolRow } from './pool-row';
import { Input } from '@/components/ui/input';
import { Search, ArrowUpDown, Filter, Loader2 } from 'lucide-react';
import { PairInfo } from '@/shared/dlmm-api';
import { Pagination } from '@heroui/react';

interface PoolsTableProps {
  pools: PairInfo[];
  totalCount: number;
  page: number;
  limit: number;
  loading: boolean;
  onPageChange: (page: number) => void;
  onSearch: (search: string) => void;
}

export function PoolsTable({ pools, totalCount, page, onPageChange, limit, onSearch, loading }: PoolsTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showMyPools, setShowMyPools] = useState(false);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const SortableHeader = ({ column, label }: { column: string; label: string }) => (
    <div className="flex items-center gap-1 cursor-pointer group" onClick={() => handleSort(column)}>
      {label}
      <ArrowUpDown
        size={14}
        className={`
        transition-all duration-200 ease-in-out
        ${sortColumn === column ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'}
        ${sortColumn === column && sortDirection === 'asc' ? 'rotate-180' : ''}
      `}
      />
    </div>
  );

  return (
    <div className="rounded-xl bg-gradient-to-b from-zinc-900/95 to-black/95 border border-zinc-800/40 overflow-hidden backdrop-blur-sm shadow-lg shadow-black/30">
      <div className="p-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-zinc-800/50">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" size={18} />
          <Input
            placeholder="Search by token name, symbol, mint"
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10 bg-zinc-900/70 border-zinc-800/50 w-full focus-visible:ring-zinc-700/60 focus-visible:border-zinc-700/60 text-zinc-300 rounded-lg transition-all duration-200"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowMyPools(!showMyPools)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              showMyPools
                ? 'bg-zinc-800/80 text-zinc-200 border border-zinc-700/70'
                : 'bg-zinc-900/70 text-zinc-500 border border-zinc-800/50 hover:bg-zinc-800/60 hover:text-zinc-300'
            }`}
          >
            <Filter size={16} />
            My Pools
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader className="bg-zinc-900/80">
            <TableRow className="border-zinc-800/50 hover:bg-transparent">
              <TableHead className="text-zinc-400 font-medium py-4">Pool</TableHead>
              <TableHead className="text-zinc-400 font-medium py-4">
                <SortableHeader column="tvl" label="TVL" />
              </TableHead>
              <TableHead className="text-zinc-400 font-medium py-4">
                <SortableHeader column="volume" label="Volume (24h)" />
              </TableHead>
              <TableHead className="text-zinc-400 font-medium py-4">
                <SortableHeader column="fee_tvl_ratio" label="Fee/TVL (24h)" />
              </TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <td colSpan={5} className="h-60">
                  <div className="w-full h-full flex items-center justify-center">
                    <Loader2 className="h-8 w-8 text-zinc-500 animate-spin" />
                  </div>
                </td>
              </TableRow>
            ) : pools.length === 0 ? (
              <TableRow>
                <td colSpan={5} className="h-60">
                  <div className="w-full h-full flex items-center justify-center text-zinc-500">
                    No pools found
                  </div>
                </td>
              </TableRow>
            ) : (
              pools.map((pool, index) => (
                <PoolRow key={pool.address} pool={pool} className={index % 2 === 0 ? 'bg-zinc-900/60' : 'bg-zinc-900/30'} />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 border-t border-zinc-800/50 flex justify-center">
        <div className="flex items-center gap-1">
          <Pagination
            renderItem={props => (
              <button
                {...props}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-zinc-900/70 text-zinc-500 hover:bg-zinc-800/70 hover:text-zinc-300 transition-all"
              />
            )}
            variant='bordered'
            onChange={onPageChange}
            page={page}
            showControls
            total={Math.floor(totalCount / limit)}
          />
        </div>
      </div>
    </div>
  );
}
