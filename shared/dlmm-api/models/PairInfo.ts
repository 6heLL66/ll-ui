/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FeeData } from './FeeData';
import type { FeeTvlRatioData } from './FeeTvlRatioData';
import type { VolumeData } from './VolumeData';
export type PairInfo = {
    /**
     * Address of the liquidity pair
     */
    address: string;
    /**
     * 24 hour APR
     */
    apr: number;
    /**
     * 24 hour APY
     */
    apy: number;
    /**
     * Base fee rate
     */
    base_fee_percentage: string;
    /**
     * Bin step
     */
    bin_step: number;
    /**
     * Cumulative fee volume
     */
    cumulative_fee_volume: string;
    /**
     * Cumulative trading volume
     */
    cumulative_trade_volume: string;
    /**
     * Price of the liquidity pair
     */
    current_price: number;
    /**
     * Farm reward apr
     */
    farm_apr: number;
    /**
     * Farm reward apy
     */
    farm_apy: number;
    /**
     * Fee TVL ratio in percentage in different timeframes
     */
    fee_tvl_ratio: FeeTvlRatioData;
    /**
     * Fee data in different timeframes
     */
    fees: FeeData;
    /**
     * Trading fees earned in the last 24 hours
     */
    fees_24h: number;
    /**
     * Flag to indicate whether the pair should be shown in the UI
     */
    hide: boolean;
    /**
     * Flag to indicate whether the pair is blacklisted
     */
    is_blacklisted: boolean;
    /**
     * Total liquidity the liquidity pair holding. Also known as Total Value Locked
     */
    liquidity: string;
    /**
     * Maximum fee rate
     */
    max_fee_percentage: string;
    /**
     * Address of token X mint of the liquidity pair
     */
    mint_x: string;
    /**
     * Address of token Y mint of the liquidity pair
     */
    mint_y: string;
    /**
     * Name of the liquidity pair
     */
    name: string;
    /**
     * Protocol fee rate. A cut from trade fee.
     */
    protocol_fee_percentage: string;
    /**
     * Address of token X reserve of the liquidity pair
     */
    reserve_x: string;
    /**
     * Token X amount the liquidity pair hold
     */
    reserve_x_amount: number;
    /**
     * Address of token Y reserve of the liquidity pair
     */
    reserve_y: string;
    /**
     * Token Y amount the liquidity pair hold
     */
    reserve_y_amount: number;
    /**
     * Address of the farming reward X of the liquidity pair
     */
    reward_mint_x: string;
    /**
     * Address of the farming reward Y of the liquidity pair
     */
    reward_mint_y: string;
    /**
     * Tags of the pair
     */
    tags: Array<string>;
    /**
     * Trading fees earned since the beginning of the day
     */
    today_fees: number;
    /**
     * Trading volume in the last 24 hours
     */
    trade_volume_24h: number;
    /**
     * Volume data in different timeframes
     */
    volume: VolumeData;
};

