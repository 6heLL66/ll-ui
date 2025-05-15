'use client';

import { MAX_SIDE_RANGE, useDLMM } from '@/features/pools/useDLMM';
import { JupApiToken } from '@/features/tokens/useTokens';
import { PairInfo } from '@/shared/dlmm-api';
import { TokenAmount } from '@/shared/utils/tokenAmount';
import { Bin, BinLiquidity } from '@meteora-ag/dlmm';
import { PublicKey } from '@solana/web3.js';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { RangeSelector } from './range-selector';
import { VolatilityChart } from './volatility-chart';
import { debounce } from 'lodash';

export const PriceRangeCharts = ({
  pool,
  tokenX,
  tokenY,
  tokenXAmount,
  tokenYAmount,
}: {
  pool: PairInfo;
  tokenX: JupApiToken;
  tokenY: JupApiToken;
  tokenXAmount: string;
  tokenYAmount: string;
}) => {
  const { getRange, dlmmPool, activeBinId, setActiveBinId } = useDLMM(new PublicKey(pool.address));

  const [fullRange, setFullRange] = useState<BinLiquidity[]>([]);

  const [selectedRange, setSelectedRange] = useState<[number, number]>([0, 0]);

  const [activeBins, setActiveBins] = useState<BinLiquidity[]>([]);
  const [, setSelectedBins] = useState<BinLiquidity[]>([]);

  const ref = useRef<{
    left: number;
    right: number;
  }>({
    left: 0,
    right: 0,
  });

  const [binsRange, setBinsRange] = useState<{
    activeBin: number;
    bins: BinLiquidity[];
  }>();

  useEffect(() => {
    if (!dlmmPool.isFetched || !dlmmPool.data) return;
    dlmmPool.data.refetchStates().then(() => {
      const range = getRange(TokenAmount.fromHumanAmount(tokenX.token, tokenXAmount as `${number}`), TokenAmount.fromHumanAmount(tokenY.token, tokenYAmount as `${number}`))!
      ref.current = range;
      dlmmPool.data.getBinsAroundActiveBin(MAX_SIDE_RANGE * 4, MAX_SIDE_RANGE * 4).then(a => {
        setFullRange(a.bins);
      })
     
      dlmmPool.data.getBinsAroundActiveBin(range.left, range.right).then(a => {
        setBinsRange(a);
        setActiveBinId(a?.activeBin ?? 0);
      });
    });
  }, [dlmmPool.isFetched, tokenXAmount, tokenYAmount]);

  const refreshRange = useCallback(async () => {
    if (!dlmmPool.data) return;
    const newBinId = (await dlmmPool.data.getActiveBin()).binId;
    console.log(newBinId, binsRange?.activeBin);
    const range = await dlmmPool.data.getBinsAroundActiveBin(ref.current.left, ref.current.right);
    setBinsRange(range);
    setActiveBinId(newBinId);
  }, [dlmmPool]);

  useEffect(() => {
    const interval = setInterval(async () => {
      refreshRange()
    }, 8000);

    return () => {
      clearInterval(interval);
    };
  }, [refreshRange]);

  const handleActiveBinsChange = (bins: Bin[]) => {
    setActiveBins(bins);
  };

  const getBinsLocal = (left: number, right: number) => {
    const lowerBinId = activeBinId! - left - 1;
    const upperBinId = activeBinId! + right + 1;
    return fullRange.filter(bin => bin.binId >= lowerBinId && bin.binId <= upperBinId);
  }

  const refetchStates = async () => {
    if (!dlmmPool.data) return;
    await dlmmPool.data.refetchStates();
  }

  const refetchStatesDebounced = useMemo(() => debounce(refetchStates, 200), []);

  const handleSelectedBinsChange = async (bins: BinLiquidity[], selected: number) => {
    if (!dlmmPool.data) return;
    setSelectedBins(bins);
    refetchStatesDebounced()
    console.log(selectedRange, selected)
    const range = getBinsLocal(selected + selectedRange[0] - 1, MAX_SIDE_RANGE * 2 - (selected + selectedRange[0]) + 1);
    ref.current = {left: selected + selectedRange[0] - 1, right: MAX_SIDE_RANGE * 2 - (selected + selectedRange[0]) + 1};

    setBinsRange({
      bins: range,
      activeBin: activeBinId ?? 0,
    });
  };

  return (
    <div>
      {activeBins.length && (tokenXAmount || tokenYAmount) && (
        <VolatilityChart
          bins={activeBins}
          onSelectedBinsChange={handleSelectedBinsChange}
          tokenX={tokenX}
          tokenY={tokenY}
          activeBin={activeBinId ?? 0}
          tokenXAmount={tokenXAmount}
          tokenYAmount={tokenYAmount}
        />
      )}
      {binsRange?.bins && <RangeSelector bins={binsRange?.bins || []} tokenX={tokenX} tokenY={tokenY} activeBin={activeBinId ?? 0} onSelectedRangeChange={setSelectedRange} onActiveBinsChange={handleActiveBinsChange} />}
    </div>
  );
};
