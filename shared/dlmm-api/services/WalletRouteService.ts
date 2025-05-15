/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WalletEarning } from '../models/WalletEarning';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WalletRouteService {
    /**
     * @param walletAddress Address of the wallet
     * @param pairAddress Address of the pair
     * @returns WalletEarning
     * @throws ApiError
     */
    public static getWalletEarning(
        walletAddress: string,
        pairAddress: string,
    ): CancelablePromise<Array<WalletEarning>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/wallet/{wallet_address}/{pair_address}/earning',
            path: {
                'wallet_address': walletAddress,
                'pair_address': pairAddress,
            },
        });
    }
}
