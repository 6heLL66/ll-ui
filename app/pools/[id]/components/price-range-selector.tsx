import { useState } from 'react';
import {  BarChart, Bar, ResponsiveContainer, Cell } from 'recharts';
import { generateSpotData, generateCurveData, generateBidAskData } from './utils';
import { PairInfo } from '@/shared/api';
import { JupApiToken } from '@/features/tokens/useTokens';
import { PriceRangeCharts } from './price-range-charts';

interface PriceRangeSelectorProps {
  pool: PairInfo;
  tokenX: JupApiToken;
  tokenY: JupApiToken;
  tokenXAmount: string;
  tokenYAmount: string;
}
type VolatilityStrategy = 'spot' | 'curve' | 'bidask';

export const PriceRangeSelector = ({ pool, tokenX, tokenY, tokenXAmount, tokenYAmount }: PriceRangeSelectorProps) => {
  const [selectedStrategy, setSelectedStrategy] = useState<VolatilityStrategy>('curve');
  const [invertedPrice, setInvertedPrice] = useState(false);

  const getStrategyDescription = () => {
    switch (selectedStrategy) {
      case 'spot':
        return 'Spot strategy: Uniform distribution of liquidity';
      case 'curve':
        return 'Curve strategy: Gaussian distribution of liquidity';
      case 'bidask':
        return 'Bid-Ask strategy: Two peaks of liquidity';
      default:
        return '';
    }
  };

  // Base color for charts
  const baseColor = "#06b6d4"; // Cyan color as shown in the screenshot
  
  // ts-ignore
  const getBarColors = (data: any[], strategy: VolatilityStrategy) => {
    if (strategy === 'spot') {
      // All bars same color for spot
      return data.map(() => baseColor);
    } else if (strategy === 'curve') {
      // Gradient from light to dark for curve
      return data.map((entry) => {
        const intensity = entry.value;
        return `rgba(6, 182, 212, ${0.3 + intensity * 0.7})`; // Vary opacity based on value
      });
    } else if (strategy === 'bidask') {
      // Two color groups for bid-ask
      return data.map((entry, index) => {
        if (index < data.length / 2) {
          return `rgba(6, 182, 212, ${0.3 + entry.value * 0.7})`;
        } else {
          return `rgba(6, 182, 212, ${0.3 + entry.value * 0.7})`;
        }
      });
    }
    return data.map(() => baseColor);
  };

  // Prepare data with colors
  const spotData = generateSpotData();
  const curveData = generateCurveData();
  const bidAskData = generateBidAskData();
  
  const spotColors = getBarColors(spotData, 'spot');
  const curveColors = getBarColors(curveData, 'curve');
  const bidAskColors = getBarColors(bidAskData, 'bidask');

  // Handle token switch
  const handleTokenSwitch = () => {
    setInvertedPrice(!invertedPrice);
    // If there's an onChange handler, we should call it with inverted prices
    // This is a placeholder as we don't have actual price values yet
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="text-dark-text-primary text-lg font-medium">Select Volatility Strategy</span>
          <button className="ml-3 text-dark-text-tertiary text-sm flex items-center hover:text-dark-accent-primary-DEFAULT transition-colors">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reset Price
          </button>
        </div>
      </div>

      {/* Стратегии ликвидности */}
      <div className="text-dark-text-tertiary text-sm mb-2">{getStrategyDescription()}</div>

      <div className="mb-6 grid grid-cols-3 gap-4">
        <button
          className={`p-4 rounded-xl border ${
            selectedStrategy === 'spot' ? 'border-dark-accent-primary-DEFAULT bg-dark-surface-active' : 'border-dark-border bg-dark-surface hover:bg-dark-surface-hover'
          } 
            transition-colors`}
          onClick={() => setSelectedStrategy('spot')}
        >
          <div className="h-12 mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spotData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Bar dataKey="value" isAnimationActive={true} animationDuration={1000} animationEasing="ease-in-out">
                  {spotData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={spotColors[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center font-medium">Spot</div>
        </button>

        <button
          className={`p-4 rounded-xl border ${
            selectedStrategy === 'curve' ? 'border-dark-accent-primary-DEFAULT bg-dark-surface-active' : 'border-dark-border bg-dark-surface hover:bg-dark-surface-hover'
          } 
            transition-colors`}
          onClick={() => setSelectedStrategy('curve')}
        >
          <div className="h-12 mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={curveData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Bar dataKey="value" isAnimationActive={true} animationDuration={1000} animationEasing="ease-in-out">
                  {curveData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={curveColors[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center font-medium">Curve</div>
        </button>

        <button
          className={`p-4 rounded-xl border ${
            selectedStrategy === 'bidask' ? 'border-dark-accent-primary-DEFAULT bg-dark-surface-active' : 'border-dark-border bg-dark-surface hover:bg-dark-surface-hover'
          } 
            transition-colors`}
          onClick={() => setSelectedStrategy('bidask')}
        >
          <div className="h-12 mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bidAskData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Bar dataKey="value" isAnimationActive={true} animationDuration={1000} animationEasing="ease-in-out">
                  {bidAskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={bidAskColors[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center font-medium">Bid Ask</div>
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-dark-text-primary text-lg font-medium">Set Price Range</span>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
            <span className="text-sm text-dark-text-tertiary">{invertedPrice ? tokenY.symbol : tokenX.symbol}</span>
          </div>
          
          {/* Token Switch Button */}
          <button 
            onClick={handleTokenSwitch}
            className="flex items-center justify-center w-6 h-6 rounded-full bg-dark-surface-hover hover:bg-dark-surface-active transition-colors"
          >
            <svg className="w-4 h-4 text-dark-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
          
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-cyan-400 mr-2"></div>
            <span className="text-sm text-dark-text-tertiary">{invertedPrice ? tokenX.symbol : tokenY.symbol}</span>
          </div>
        </div>
      </div>

      <div>
        <PriceRangeCharts pool={pool} tokenX={tokenX} tokenY={tokenY} tokenXAmount={tokenXAmount} tokenYAmount={tokenYAmount} />
      </div>
    </div>
  );
};
