/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type DepositWithdraw = {
    /**
     * Active bin ID
     */
    active_bin_id: number;
    /**
     * Timestamp of the activity
     */
    onchain_timestamp: number;
    /**
     * Address of the liquidity pair for the position
     */
    pair_address: string;
    /**
     * Address of the position
     */
    position_address: string;
    /**
     * Liquidity pair price
     */
    price: number;
    /**
     * Amount of token X
     */
    token_x_amount: number;
    /**
     * Amount of token X in USD
     */
    token_x_usd_amount: number;
    /**
     * Amount of token Y
     */
    token_y_amount: number;
    /**
     * Amount of token Y in USD
     */
    token_y_usd_amount: number;
    /**
     * Transaction hash
     */
    tx_id: string;
};

