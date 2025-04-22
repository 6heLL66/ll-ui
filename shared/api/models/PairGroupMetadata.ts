/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomGroupFeeTvlRatio } from './CustomGroupFeeTvlRatio';
import type { CustomGroupVolume } from './CustomGroupVolume';
export type PairGroupMetadata = {
    custom_fee_tvl_ratio: CustomGroupFeeTvlRatio;
    custom_volume: CustomGroupVolume;
    lexical_order_mints: string;
    max_fee_tvl_ratio: number;
    max_lm_apr: number;
    min_fee_tvl_ratio: number;
    min_lm_apr: number;
    name: string;
    total_trade_volume: number;
    total_tvl: number;
};

