'use client';

import { MAX_SIDE_RANGE, useDLMM } from '@/features/pools/useDLMM';
import { JupApiToken } from '@/features/tokens/useTokens';
import { PairInfo } from '@/shared/api';
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
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [refreshRange]);

  const handleActiveBinsChange = (bins: Bin[]) => {
    setActiveBins(bins);
  };

  const handleSelectedBinsChange = async (bins: BinLiquidity[], selected: number) => {
    if (!dlmmPool.data) return;
    setSelectedBins(bins);
    await dlmmPool.data.refetchStates()
    const range = await dlmmPool.data.getBinsAroundActiveBin(selected - 1, MAX_SIDE_RANGE * 2 - selected + 1);
    ref.current = {left: selected - 1, right: MAX_SIDE_RANGE * 2 - selected + 1};

    setBinsRange(range);
  };

  const handleSelectedBinsChangeDebounced = useMemo(() => debounce(handleSelectedBinsChange, 100), [handleSelectedBinsChange]);

  return (
    <div>
      {activeBins.length && (
        <VolatilityChart
          bins={activeBins}
          onSelectedBinsChange={handleSelectedBinsChangeDebounced}
          tokenX={tokenX}
          tokenY={tokenY}
          activeBin={activeBinId ?? 0}
          tokenXAmount={tokenXAmount}
          tokenYAmount={tokenYAmount}
        />
      )}
      {binsRange?.bins && <RangeSelector bins={binsRange?.bins || []} tokenX={tokenX} tokenY={tokenY} activeBin={activeBinId ?? 0} onActiveBinsChange={handleActiveBinsChange} />}
    </div>
  );
};
