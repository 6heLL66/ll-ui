/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ClaimReward = {
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
     * Address of the farm reward claimed
     */
    reward_mint_address: string;
    /**
     * Amount of reward token claimed
     */
    token_amount: number;
    /**
     * Amount of reward token claimed in USD
     */
    token_usd_amount: number;
    /**
     * Transaction hash
     */
    tx_id: string;
};

