import { useState } from "react";
import { AddPositionTab } from "./add-position-tab";
import { PairInfo } from "@/shared/api";
import { JupApiToken } from "@/features/tokens/useTokens";

interface PoolPositionsTabProps {
  pool: PairInfo;
  tokenX: JupApiToken;
  tokenY: JupApiToken;
}

export const PoolPositionsTab = ({ pool, tokenX, tokenY }: PoolPositionsTabProps) => {
  const [activeTab, setActiveTab] = useState("positions");
  
  return (
    <div className="text-dark-text-primary">
      {/* Header with Tab Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <button 
            className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center ${
              activeTab === "positions" 
                ? "bg-dark-accent-primary-muted text-dark-accent-primary-DEFAULT font-medium shadow-dark-md" 
                : "bg-dark-surface-hover text-dark-text-secondary hover:bg-dark-surface-active"
            }`}
            onClick={() => setActiveTab("positions")}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Your Positions</span>
          </button>
          
          <button 
            className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center ${
              activeTab === "add" 
                ? "bg-dark-accent-primary-muted text-dark-accent-primary-DEFAULT font-medium shadow-dark-md" 
                : "bg-dark-surface-hover text-dark-text-secondary hover:bg-dark-surface-active"
            }`}
            onClick={() => setActiveTab("add")}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Position</span>
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      {activeTab === "positions" ? (
        <PositionsContent pool={pool} tokenX={tokenX} tokenY={tokenY} onAddPosition={() => setActiveTab("add")} />
      ) : (
        <AddPositionTab pool={pool} tokenX={tokenX} tokenY={tokenY} />
      )}
    </div>
  );
};

// Component for displaying existing positions
const PositionsContent = ({ onAddPosition }: { pool: PairInfo; tokenX: JupApiToken; tokenY: JupApiToken; onAddPosition: () => void }) => {
  return (
    <div className="bg-dark-surface rounded-lg p-6 border border-dark-border">
      <div className="text-center py-8">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-dark-surface-hover flex items-center justify-center">
            <svg className="w-10 h-10 text-dark-text-disabled" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-medium mb-2">No positions found</h3>
        <p className="text-dark-text-tertiary mb-6 max-w-md mx-auto">
          You don`t have any liquidity positions in this pool yet. Add liquidity to start earning fees.
        </p>
        
        <button 
          onClick={onAddPosition}
          className="px-6 py-3 bg-gradient-to-r from-dark-accent-purple-DEFAULT to-dark-accent-blue-DEFAULT hover:from-dark-accent-purple-hover hover:to-dark-accent-blue-hover rounded-lg font-medium transition-all duration-200 shadow-dark-lg transform hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-dark-accent-primary-DEFAULT focus:ring-opacity-50"
        >
          <div className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Your First Position
          </div>
        </button>
      </div>
    </div>
  );
}; 