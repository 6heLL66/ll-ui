/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BinCache = {
    /**
     * Amount of token X in the bin. This already excluded protocol fees.
     */
    amount_x: number;
    /**
     * Total token X swap into the bin. Only used for tracking purpose.
     */
    amount_x_in: number;
    /**
     * Amount of token Y in the bin. This already excluded protocol fees.
     */
    amount_y: number;
    /**
     * Total token Y swap into he bin. Only used for tracking purpose.
     */
    amount_y_in: number;
    /**
     * Swap fee amount of token X per liquidity deposited.
     */
    fee_amount_x_per_token_stored: number;
    /**
     * Swap fee amount of token Y per liquidity deposited.
     */
    fee_amount_y_per_token_stored: number;
    /**
     * Liquidities of the bin. This is the same as LP mint supply.
     */
    liquidity_supply: number;
    /**
     * Bin price
     */
    price: number;
    /**
     * reward_a_per_token_stored
     */
    reward_per_token_stored: Array<number>;
};

