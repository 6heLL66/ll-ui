'use client';

import { JupApiToken } from '@/features/tokens/useTokens';
import { TokenAmount } from '@/shared/utils/tokenAmount';
import { Bin, BinLiquidity } from '@meteora-ag/dlmm';
import { Bar, BarChart, Tooltip, XAxis, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const CustomTooltip = ({ active, payload, label }: any) => {
  console.log(payload);
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1B23] p-3 min-w-[250px] rounded-md border border-[#2C2D3C] shadow-lg">
        <span className="flex justify-between">
          <span className="text-[#A1A1AA] text-[11px] font-bold">Bin price</span> <span className="text-[#FFFFFF] text-[12px] font-bold">{label}</span>
        </span>
        {!payload[0].payload.isActive && (
          <span className="flex justify-between">
            <span className="text-[#A1A1AA] text-[11px] font-bold">{payload[0].payload.token.symbol}</span>{' '}
            <span className="text-[#FFFFFF] text-[12px] font-bold">{payload[0].payload.amount}</span>
          </span>
        )}
        {payload[0].payload.isActive && (
          <>
            {(console.log(payload[0].payload.bin.xAmount), null)}
            <div className="flex justify-between">
              <span className="text-[#A1A1AA] text-[11px] font-bold">{payload[0].payload.tokenX.symbol}</span>{' '}
              <span className="text-[#FFFFFF] text-[12px] font-bold">
                {TokenAmount.fromRawAmount(payload[0].payload.tokenX.token, payload[0].payload.bin.xAmount).toSignificant(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A1A1AA] text-[11px] font-bold">{payload[0].payload.tokenY.symbol}</span>{' '}
              <span className="text-[#FFFFFF] text-[12px] font-bold">
                {TokenAmount.fromRawAmount(payload[0].payload.tokenY.token, payload[0].payload.bin.yAmount).toSignificant(2)}
              </span>
            </div>
          </>
        )}
      </div>
    );
  }
  return null;
};

export const RangeSelector = ({ bins, tokenX, tokenY, activeBin, onActiveBinsChange }: { bins: BinLiquidity[]; tokenX: JupApiToken; tokenY: JupApiToken; activeBin: number; onActiveBinsChange: (bins: BinLiquidity[]) => void }) => {
  const getPv = (bin: Bin, activeBin: number) => {
    if (bin.binId === activeBin) {
      
      const xAmount = TokenAmount.fromRawAmount(tokenX.token, bin.xAmount)
      .mulDownFixed(TokenAmount.fromHumanAmount(tokenX.token, bin.pricePerToken as `${number}`).scale18);
      const yAmount = TokenAmount.fromRawAmount(tokenY.token, bin.yAmount);
      return Number(+xAmount.toSignificant() + +yAmount.toSignificant());
    }
    return bin.binId < activeBin
      ? +TokenAmount.fromRawAmount(tokenY.token, bin.yAmount).toSignificant()
      : +TokenAmount.fromRawAmount(tokenX.token, bin.xAmount)
          .mulDownFixed(TokenAmount.fromHumanAmount(tokenX.token, bin.pricePerToken as `${number}`).scale18)
          .toSignificant();
  };

  const chartData = bins.map((bin, index) => ({
    name: (+bin.pricePerToken).toFixed(4),
    bin,
    token: bin.binId < activeBin ? tokenY.token : tokenX.token,
    tokenX,
    tokenY,
    amount:
      bin.binId < activeBin
        ? +TokenAmount.fromRawAmount(tokenY.token, bin.yAmount).toSignificant(2)
        : +TokenAmount.fromRawAmount(tokenX.token, bin.xAmount).toSignificant(2),
    isActive: bin.binId === activeBin,
    pv: getPv(bin, activeBin),
    index,
  }));

  const [selectedRange, setSelectedRange] = useState<[number, number]>([0, bins.length - 1]);

  useEffect(() => {
    setSelectedRange([0, bins.length - 1]);
    onActiveBinsChange(bins);
  }, []);

  useEffect(() => {
    onActiveBinsChange(bins.slice(selectedRange[0], selectedRange[1] + 1));
  }, [bins]);

  const handleRangeChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      setSelectedRange([value[0], value[1]]);
      onActiveBinsChange(bins.slice(value[0], value[1] + 1));
    }
  };

  const activeBinData = bins.find((bin) => bin.binId === activeBin);

  return (
    <div>
      <div>
        <ResponsiveContainer width="100%" height={130}>
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              left: 16,
              right: 16,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" tickLine={false} className="text-[11px]" tickMargin={8} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(61, 64, 98, 0.2)' }} />
            <Bar
              dataKey="pv"
              fill="#3D4062"
              shape={(props: any) => {
                const { x, y, width, height, payload } = props;

                // Определяем, находится ли бин в выбранном диапазоне
                const isInSelectedRange = payload.index >= selectedRange[0] && payload.index <= selectedRange[1];

                // Выбираем цвет в зависимости от того, активный ли это бин и находится ли он в выбранном диапазоне
                let fill = '#3D4062'; // Базовый цвет

                if (payload.isActive) {
                  fill = '#8884d8'; // Цвет активного бина
                } else if (!isInSelectedRange) {
                  fill = 'rgba(61, 64, 98, 0.3)'; // Затемненный цвет для бинов вне диапазона
                }

                return <rect x={x} y={y} width={width} height={height} fill={fill} />;
              }}
            />
          </BarChart>
        </ResponsiveContainer>

        {chartData && chartData.length > 0 && (
          <div className="px-4 py-2 relative bottom-[49px]">
            <Slider
              range
              min={0}
              max={bins.length - 1}
              value={selectedRange}
              onChange={handleRangeChange}
              styles={{
                handle: {
                  backgroundColor: '#8884d8',
                  borderColor: '#8884d8',
                  height: 14,
                  width: 14,
                  marginLeft: 0,
                  marginTop: -5,
                },
                track: {
                  backgroundColor: '#8884d8',
                  height: 4,
                },
                rail: {
                  backgroundColor: '#3D4062',
                  height: 4,
                },
              }}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-5 mt-8">
        <div className="bg-dark-surface-hover p-2 rounded-xl border border-dark-border shadow-dark-sm">
          <div className="text-xs text-dark-text-tertiary mb-1">Min Price</div>
          <div className="text-lg font-bold">{Number(bins[selectedRange[0]]?.price).toFixed(4)}</div>
          {activeBinData && bins[selectedRange[0]] && <div className="text-xs text-dark-text-tertiary mt-1">{Number((+bins[selectedRange[0]].price / +activeBinData.price - 1) * 100).toFixed(2)}%</div>}
        </div>
        <div className="bg-dark-surface-hover p-2 rounded-xl border border-dark-border shadow-dark-sm">
          <div className="text-xs text-dark-text-tertiary mb-1">Max Price</div>
          <div className="text-lg font-bold">{Number(bins[selectedRange[1]]?.price).toFixed(4)}</div>
          {activeBinData && bins[selectedRange[1]] && <div className="text-xs text-dark-text-tertiary mt-1">{Number((+bins[selectedRange[1]].price / +activeBinData.price - 1)  * 100).toFixed(2)}%</div>}
        </div>
        <div className="bg-dark-surface-hover p-2 rounded-xl border border-dark-border shadow-dark-sm">
          <div className="text-xs text-dark-text-tertiary mb-1">Num Bins</div>
          <div className="text-lg font-bold">{selectedRange[1] - selectedRange[0] + 1}</div>
        </div>
      </div>
    </div>
  );
};
