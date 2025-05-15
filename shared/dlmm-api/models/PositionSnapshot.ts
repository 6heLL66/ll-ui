/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PositionSnapshot = {
    /**
     * Created at
     */
    created_at: string;
    /**
     * Accumulated fee X amount during the snapshot. This includes pending claimable fee.
     */
    cumulative_fee_x_amount: string;
    /**
     * Accumulated fee Y amount during the snapshot. This includes pending claimable fee.
     */
    cumulative_fee_y_amount: string;
    /**
     * Accumulated reward X amount during the snapshot. This includes pending claimable reward.
     */
    cumulative_reward_x_amount: string;
    /**
     * Accumulated reward Y amount during the snapshot. This includes pending claimable reward.
     */
    cumulative_reward_y_amount: string;
    /**
     * ID
     */
    id: number;
    /**
     * Amount of pending claimable fee X during the snapshot
     */
    pending_fee_x_amount: number;
    /**
     * Amount of pending claimable fee Y during the snapshot
     */
    pending_fee_y_amount: number;
    /**
     * Amount of pending claimable reward X during the snapshot
     */
    pending_reward_x_amount: number;
    /**
     * Amount of pending claimable reward Y during the snapshot
     */
    pending_reward_y_amount: number;
    /**
     * Address of the position
     */
    position_address: string;
    /**
     * Reward X usd rate during the snapshot
     */
    reward_x_usd_rate: number;
    /**
     * Reward Y usd rate during the snapshot
     */
    reward_y_usd_rate: number;
    /**
     * Amount of token X the position is holding during the snapshot
     */
    token_x_amount: number;
    /**
     * Token X usd rate during the snapshot
     */
    token_x_usd_rate: number;
    /**
     * Amount of token Y the position is holding during the snapshot
     */
    token_y_amount: number;
    /**
     * Token Y usd rate during the snapshot
     */
    token_y_usd_rate: number;
};

