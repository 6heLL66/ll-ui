/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Swap = {
    /**
     * Number of bin involved
     */
    bin_count: number;
    /**
     * Ending bin ID for the swap
     */
    end_bin_id: number;
    /**
     * Fee in BPS
     */
    fee_bps: number;
    /**
     * Amount of token swapped in
     */
    in_amount: number;
    /**
     * Amount of USD value swapped in
     */
    in_amount_usd: number;
    /**
     * Address of the token swapped in
     */
    in_token: string;
    /**
     * Timestamp of the swap activity
     */
    onchain_timestamp: number;
    /**
     * Amount of token swapped out
     */
    out_amount: number;
    /**
     * Amount of USD value swapped out
     */
    out_amount_usd: number;
    /**
     * Address of the token swapped out
     */
    out_token: string;
    /**
     * Address of the liquidity pair
     */
    pair_address: string;
    /**
     * Amount of protocol fee charged
     */
    protocol_fee: number;
    /**
     * Amount of protocol fee charged in USD
     */
    protocol_fee_usd: number;
    /**
     * Starting bin ID for the swap
     */
    start_bin_id: number;
    /**
     * Amount of fee charged
     */
    trade_fee: number;
    /**
     * Amount of fee charged in USD
     */
    trade_fee_usd: number;
    /**
     * Transaction hash
     */
    tx_id: string;
};

