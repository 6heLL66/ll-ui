/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AllGroupOfPairs } from '../models/AllGroupOfPairs';
import type { AllGroupOfPairsMetadata } from '../models/AllGroupOfPairsMetadata';
import type { AllPairsWithPagination } from '../models/AllPairsWithPagination';
import type { BinArrayCache } from '../models/BinArrayCache';
import type { BinTradeVolume } from '../models/BinTradeVolume';
import type { OrderBy } from '../models/OrderBy';
import type { PairFeeBps } from '../models/PairFeeBps';
import type { PairInfo } from '../models/PairInfo';
import type { PairSortKey } from '../models/PairSortKey';
import type { PairTradeVolume } from '../models/PairTradeVolume';
import type { PairTvlSnapshotByDay } from '../models/PairTvlSnapshotByDay';
import type { PositionLock } from '../models/PositionLock';
import type { Swap } from '../models/Swap';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PairRouteService {
    /**
     * @param includeUnknown Include pool with unverified token. Default true.
     * @returns PairInfo
     * @throws ApiError
     */
    public static all(
        includeUnknown?: boolean | null,
    ): CancelablePromise<Array<PairInfo>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pair/all',
            query: {
                'include_unknown': includeUnknown,
            },
        });
    }
    /**
     * @param page Default is 0
     * @param limit Default is 50
     * @param skipSize Default is 0
     * @param poolsToTop Pools to be sorted to top
     * @param sortKey Sort key. Default is Volume.
     * @param orderBy Sort order. Default is Descending.
     * @param searchTerm Search term.
     * @param includeUnknown Include pool with unverified token. Default true.
     * @param hideLowTvl Toggle pools with lower TVL than the value passed in
     * @param hideLowApr Toggle pools with low APR
     * @param includeTokenMints Only include token mints. Allow list of token mints
     * @param includePoolTokenPairs Only include pool token pairs. Allow list of pool token mints in format EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v-So11111111111111111111111111111111111111112
     * @param tags Tags to filter by
     * @returns AllGroupOfPairs
     * @throws ApiError
     */
    public static allByGroups(
        page?: number | null,
        limit?: number | null,
        skipSize?: number | null,
        poolsToTop?: Array<string>,
        sortKey?: (null | PairSortKey),
        orderBy?: (null | OrderBy),
        searchTerm?: string | null,
        includeUnknown?: boolean | null,
        hideLowTvl?: number | null,
        hideLowApr?: boolean | null,
        includeTokenMints?: any[] | null,
        includePoolTokenPairs?: any[] | null,
        tags?: any[] | null,
    ): CancelablePromise<AllGroupOfPairs> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pair/all_by_groups',
            query: {
                'page': page,
                'limit': limit,
                'skip_size': skipSize,
                'pools_to_top': poolsToTop,
                'sort_key': sortKey,
                'order_by': orderBy,
                'search_term': searchTerm,
                'include_unknown': includeUnknown,
                'hide_low_tvl': hideLowTvl,
                'hide_low_apr': hideLowApr,
                'include_token_mints': includeTokenMints,
                'include_pool_token_pairs': includePoolTokenPairs,
                'tags': tags,
            },
        });
    }
    /**
     * @param page Default is 0
     * @param limit Default is 50
     * @param skipSize Default is 0
     * @param poolsToTop Pools to be sorted to top
     * @param sortKey Sort key. Default is Volume.
     * @param orderBy Sort order. Default is Descending.
     * @param searchTerm Search term.
     * @param includeUnknown Include pool with unverified token. Default true.
     * @param hideLowTvl Toggle pools with lower TVL than the value passed in
     * @param hideLowApr Toggle pools with low APR
     * @param includeTokenMints Only include token mints. Allow list of token mints
     * @param includePoolTokenPairs Only include pool token pairs. Allow list of pool token mints in format EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v-So11111111111111111111111111111111111111112
     * @param tags Tags to filter by
     * @returns AllGroupOfPairsMetadata
     * @throws ApiError
     */
    public static allByGroupsMetadata(
        page?: number | null,
        limit?: number | null,
        skipSize?: number | null,
        poolsToTop?: Array<string>,
        sortKey?: (null | PairSortKey),
        orderBy?: (null | OrderBy),
        searchTerm?: string | null,
        includeUnknown?: boolean | null,
        hideLowTvl?: number | null,
        hideLowApr?: boolean | null,
        includeTokenMints?: any[] | null,
        includePoolTokenPairs?: any[] | null,
        tags?: any[] | null,
    ): CancelablePromise<AllGroupOfPairsMetadata> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pair/all_by_groups_metadata',
            query: {
                'page': page,
                'limit': limit,
                'skip_size': skipSize,
                'pools_to_top': poolsToTop,
                'sort_key': sortKey,
                'order_by': orderBy,
                'search_term': searchTerm,
                'include_unknown': includeUnknown,
                'hide_low_tvl': hideLowTvl,
                'hide_low_apr': hideLowApr,
                'include_token_mints': includeTokenMints,
                'include_pool_token_pairs': includePoolTokenPairs,
                'tags': tags,
            },
        });
    }
    /**
     * @param page Default is 0
     * @param limit Default is 50
     * @param skipSize Default is 0
     * @param poolsToTop Pools to be sorted to top
     * @param sortKey Sort key. Default is Volume.
     * @param orderBy Sort order. Default is Descending.
     * @param searchTerm Search term.
     * @param includeUnknown Include pool with unverified token. Default true.
     * @param hideLowTvl Toggle pools with lower TVL than the value passed in
     * @param hideLowApr Toggle pools with low APR
     * @param includeTokenMints Only include token mints. Allow list of token mints
     * @param includePoolTokenPairs Only include pool token pairs. Allow list of pool token mints in format EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v-So11111111111111111111111111111111111111112
     * @param tags Tags to filter by
     * @returns AllPairsWithPagination
     * @throws ApiError
     */
    public static allWithPagination(
        page?: number | null,
        limit?: number | null,
        skipSize?: number | null,
        poolsToTop?: Array<string>,
        sortKey?: (null | PairSortKey),
        orderBy?: (null | OrderBy),
        searchTerm?: string | null,
        includeUnknown?: boolean | null,
        hideLowTvl?: number | null,
        hideLowApr?: boolean | null,
        includeTokenMints?: any[] | null,
        includePoolTokenPairs?: any[] | null,
        tags?: any[] | null,
    ): CancelablePromise<AllPairsWithPagination> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pair/all_with_pagination',
            query: {
                'page': page,
                'limit': limit,
                'skip_size': skipSize,
                'pools_to_top': poolsToTop,
                'sort_key': sortKey,
                'order_by': orderBy,
                'search_term': searchTerm,
                'include_unknown': includeUnknown,
                'hide_low_tvl': hideLowTvl,
                'hide_low_apr': hideLowApr,
                'include_token_mints': includeTokenMints,
                'include_pool_token_pairs': includePoolTokenPairs,
                'tags': tags,
            },
        });
    }
    /**
     * @param lexicalOrderMints Lexical ordered token mints of the pair
     * @returns PairInfo
     * @throws ApiError
     */
    public static getSingleGroupPair(
        lexicalOrderMints: string,
    ): CancelablePromise<Array<PairInfo>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pair/group_pair/{lexical_order_mints}',
            path: {
                'lexical_order_mints': lexicalOrderMints,
            },
        });
    }
    /**
     * @param pairAddress Address of the liquidity pair
     * @returns PairInfo
     * @throws ApiError
     */
    public static getPair(
        pairAddress: string,
    ): CancelablePromise<PairInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pair/{pair_address}',
            path: {
                'pair_address': pairAddress,
            },
        });
    }
    /**
     * @deprecated
     * @param pairAddress Address of the liquidity pair
     * @param numOfDays Number of days before today. Max 255.
     * @returns BinTradeVolume
     * @throws ApiError
     */
    public static getBinTradeVolumeByDays(
        pairAddress: string,
        numOfDays: number,
    ): CancelablePromise<Array<BinTradeVolume>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pair/{pair_address}/analytic/bin_trade_volume',
            path: {
                'pair_address': pairAddress,
            },
            query: {
                'num_of_days': numOfDays,
            },
        });
    }
    /**
     * @param pairAddress Address of the liquidity pair
     * @param numOfDays Number of days before today. Max 255.
     * @returns PairFeeBps
     * @throws ApiError
     */
    public static getPairFeeBpsByDays(
        pairAddress: string,
        numOfDays: number,
    ): CancelablePromise<Array<PairFeeBps>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pair/{pair_address}/analytic/pair_fee_bps',
            path: {
                'pair_address': pairAddress,
            },
            query: {
                'num_of_days': numOfDays,
            },
        });
    }
    /**
     * @param pairAddress Address of the liquidity pair
     * @param numOfDays Number of days before today. Max 255.
     * @returns PairTradeVolume
     * @throws ApiError
     */
    public static getPairDailyTradeVolumeByDays(
        pairAddress: string,
        numOfDays: number,
    ): CancelablePromise<Array<PairTradeVolume>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pair/{pair_address}/analytic/pair_trade_volume',
            path: {
                'pair_address': pairAddress,
            },
            query: {
                'num_of_days': numOfDays,
            },
        });
    }
    /**
     * @param pairAddress Address of the liquidity pair
     * @param numOfDays Number of days before today. Max 255.
     * @returns PairTvlSnapshotByDay
     * @throws ApiError
     */
    public static getPairTvlByDays(
        pairAddress: string,
        numOfDays: number,
    ): CancelablePromise<Array<PairTvlSnapshotByDay>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pair/{pair_address}/analytic/pair_tvl',
            path: {
                'pair_address': pairAddress,
            },
            query: {
                'num_of_days': numOfDays,
            },
        });
    }
    /**
     * @param pairAddress Address of the liquidity pair
     * @param rowsToTake Number of records to take. Max 255.
     * @returns Swap
     * @throws ApiError
     */
    public static getPairSwapRecords(
        pairAddress: string,
        rowsToTake: number,
    ): CancelablePromise<Array<Swap>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pair/{pair_address}/analytic/swap_history',
            path: {
                'pair_address': pairAddress,
            },
            query: {
                'rows_to_take': rowsToTake,
            },
        });
    }
    /**
     * @deprecated
     * @param pairAddress Address of the liquidity pair
     * @returns BinArrayCache
     * @throws ApiError
     */
    public static getBinArrays(
        pairAddress: string,
    ): CancelablePromise<Array<BinArrayCache>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pair/{pair_address}/bin_arrays',
            path: {
                'pair_address': pairAddress,
            },
        });
    }
    /**
     * @param pairAddress Address of the liquidity pair
     * @returns PositionLock
     * @throws ApiError
     */
    public static getPairPositionsLock(
        pairAddress: string,
    ): CancelablePromise<Array<PositionLock>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pair/{pair_address}/positions_lock',
            path: {
                'pair_address': pairAddress,
            },
        });
    }
}
