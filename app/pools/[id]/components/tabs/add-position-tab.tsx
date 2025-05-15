import Image from "next/image";
import { useState } from "react";
import { PriceRangeSelector } from "../price-range-selector";
import { PairInfo } from "@/shared/dlmm-api";
import { JupApiToken } from "@/features/tokens/useTokens";
interface AddPositionTabProps {
  pool: PairInfo;
  tokenX: JupApiToken;
  tokenY: JupApiToken;
}

export const AddPositionTab = ({ pool, tokenX, tokenY }: AddPositionTabProps) => {
  const [autoFill, setAutoFill] = useState(false);

  const [tokenXAmount, setTokenXAmount] = useState('');
  const [tokenYAmount, setTokenYAmount] = useState('');
  
  return (
    <div className="bg-dark-surface rounded-xl p-6 border border-dark-border shadow-lg">
      {/* Deposit Amount Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-dark-text-secondary font-medium text-lg">Enter deposit amount:</span>
          <div className="flex items-center">
            <div 
              className={`w-14 h-7 rounded-full ${autoFill ? 'bg-dark-accent-primary-DEFAULT' : 'bg-dark-surface-active'} relative transition-colors duration-300 mr-3 cursor-pointer shadow-dark-md`}
              onClick={() => setAutoFill(!autoFill)}
            >
              <div 
                className={`absolute w-5 h-5 rounded-full bg-white top-1 transition-transform duration-300 ${autoFill ? 'translate-x-8' : 'translate-x-1'} shadow-dark-sm`}
              ></div>
            </div>
            <span className="text-dark-text-secondary text-sm font-medium">Auto-Fill</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-5">
          {/* Token 0 Input */}
          <div className="bg-dark-surface-hover rounded-xl p-5 border border-dark-border hover:border-dark-border-focus transition-all duration-200 shadow-dark-md hover:shadow-dark-lg">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-dark-surface-active flex items-center justify-center border border-dark-border-light shadow-dark-sm">
                <Image 
                  src={tokenX.logoURI || "/placeholder.png"} 
                  alt={tokenX.symbol} 
                  width={40} 
                  height={40}
                  className="object-cover" 
                />
              </div>
              <span className="font-semibold text-xl">{tokenX.symbol}</span>
            </div>
            <input 
              type="number" 
              className="w-full bg-transparent text-2xl font-bold outline-none mb-3 focus:border-dark-border-focus transition-colors py-1" 
              placeholder="0"
              value={tokenXAmount}  
              onChange={(e) => setTokenXAmount(e.target.value)}
            />
            <div className="flex justify-between text-xs text-dark-text-tertiary">
              <span className="text-sm">Balance: 0.00</span>
              <div className="flex space-x-2">
                <button className="bg-dark-surface hover:bg-dark-surface-active px-3 py-1 rounded-md text-xs transition-colors shadow-dark-sm hover:shadow-dark-md">50%</button>
                <button className="bg-dark-surface hover:bg-dark-surface-active px-3 py-1 rounded-md text-xs transition-colors shadow-dark-sm hover:shadow-dark-md">MAX</button>
              </div>
            </div>
          </div>
          
          {/* Token 1 Input */}
          <div className="bg-dark-surface-hover rounded-xl p-5 border border-dark-border hover:border-dark-border-focus transition-all duration-200 shadow-dark-md hover:shadow-dark-lg">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-dark-surface-active flex items-center justify-center border border-dark-border-light shadow-dark-sm">
                <Image 
                  src={tokenY.logoURI || "/placeholder.png"} 
                  alt={tokenY.symbol} 
                  width={40} 
                  height={40}
                  className="object-cover" 
                />
              </div>
              <span className="font-semibold text-xl">{tokenY.symbol}</span>
            </div>
            <input 
              type="number" 
              className="w-full bg-transparent text-2xl font-bold outline-none mb-3 focus:border-dark-border-focus transition-colors py-1" 
              placeholder="0"
              value={tokenYAmount}
              onChange={(e) => setTokenYAmount(e.target.value)}
            />
            <div className="flex justify-between text-xs text-dark-text-tertiary">
              <span className="text-sm">Balance: 0.00</span>
              <div className="flex space-x-2">
                <button className="bg-dark-surface hover:bg-dark-surface-active px-3 py-1 rounded-md text-xs transition-colors shadow-dark-sm hover:shadow-dark-md">50%</button>
                <button className="bg-dark-surface hover:bg-dark-surface-active px-3 py-1 rounded-md text-xs transition-colors shadow-dark-sm hover:shadow-dark-md">MAX</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Price Range Section */}
      <PriceRangeSelector pool={pool} tokenX={tokenX} tokenY={tokenY} tokenXAmount={tokenXAmount} tokenYAmount={tokenYAmount} />
      
      {/* Add Liquidity Button */}
      <div className="mb-8">
        <button className="w-full py-3 bg-dark-accent-primary-muted text-dark-accent-primary-DEFAULT font-medium shadow-dark-md hover:from-dark-accent-purple-hover hover:to-dark-accent-blue-hover rounded-xl font-semibold transition-all duration-300 shadow-dark-lg transform hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-dark-accent-primary-DEFAULT focus:ring-opacity-50 text-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
          <div className="absolute -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
          <div className="flex items-center justify-center relative z-10">
            Add Liquidity
          </div>
        </button>
        
        <div className="mt-3 text-center text-xs text-dark-text-tertiary">
          Estimated gas fee: ~0.00042 SOL
        </div>
      </div>
    </div>
  );
}; 