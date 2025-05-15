/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProtocolMetrics } from '../models/ProtocolMetrics';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InfoRouteService {
    /**
     * @returns ProtocolMetrics
     * @throws ApiError
     */
    public static getProtocolMetrics(): CancelablePromise<Array<ProtocolMetrics>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/info/protocol_metrics',
        });
    }
}
