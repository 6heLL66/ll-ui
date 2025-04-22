/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClaimFee } from '../models/ClaimFee';
import type { ClaimReward } from '../models/ClaimReward';
import type { DepositWithdraw } from '../models/DepositWithdraw';
import type { Position } from '../models/Position';
import type { PositionSnapshot } from '../models/PositionSnapshot';
import type { PositionWithApy } from '../models/PositionWithApy';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PositionRouteService {
    /**
     * @param positionAddress Address of the position
     * @returns PositionWithApy
     * @throws ApiError
     */
    public static getPosition(
        positionAddress: string,
    ): CancelablePromise<PositionWithApy> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/position/{position_address}',
            path: {
                'position_address': positionAddress,
            },
        });
    }
    /**
     * @param positionAddress Address of the position
     * @returns ClaimFee
     * @throws ApiError
     */
    public static getClaimFees(
        positionAddress: string,
    ): CancelablePromise<Array<ClaimFee>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/position/{position_address}/claim_fees',
            path: {
                'position_address': positionAddress,
            },
        });
    }
    /**
     * @param positionAddress Address of the position
     * @returns ClaimReward
     * @throws ApiError
     */
    public static getClaimRewards(
        positionAddress: string,
    ): CancelablePromise<Array<ClaimReward>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/position/{position_address}/claim_rewards',
            path: {
                'position_address': positionAddress,
            },
        });
    }
    /**
     * @param positionAddress Address of the position
     * @returns DepositWithdraw
     * @throws ApiError
     */
    public static getDeposits(
        positionAddress: string,
    ): CancelablePromise<Array<DepositWithdraw>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/position/{position_address}/deposits',
            path: {
                'position_address': positionAddress,
            },
        });
    }
    /**
     * @deprecated
     * @param positionAddress Address of the position
     * @param rowsToTake Number of records to take. Max 255.
     * @returns PositionSnapshot
     * @throws ApiError
     */
    public static getRecentNSnapshot(
        positionAddress: string,
        rowsToTake: number,
    ): CancelablePromise<Array<PositionSnapshot>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/position/{position_address}/snapshots',
            path: {
                'position_address': positionAddress,
            },
            query: {
                'rows_to_take': rowsToTake,
            },
        });
    }
    /**
     * @param positionAddress Address of the position
     * @returns DepositWithdraw
     * @throws ApiError
     */
    public static getWithdraws(
        positionAddress: string,
    ): CancelablePromise<Array<DepositWithdraw>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/position/{position_address}/withdraws',
            path: {
                'position_address': positionAddress,
            },
        });
    }
    /**
     * @param positionAddress Address of the position
     * @returns Position
     * @throws ApiError
     */
    public static getPositionV2(
        positionAddress: string,
    ): CancelablePromise<Position> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/position_v2/{position_address}',
            path: {
                'position_address': positionAddress,
            },
        });
    }
}
