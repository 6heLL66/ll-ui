/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MessageDto } from '../models/MessageDto';
import type { TokenDto } from '../models/TokenDto';
import type { TokenObtainRequestDto } from '../models/TokenObtainRequestDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Challenge Request
     * @param publicKey
     * @returns MessageDto Successful Response
     * @throws ApiError
     */
    public static challengeRequestAuthRequestChallengeGet(
        publicKey: string,
    ): CancelablePromise<MessageDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/request-challenge',
            query: {
                'public_key': publicKey,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Tokens
     * @param requestBody
     * @returns TokenDto Successful Response
     * @throws ApiError
     */
    public static getTokensAuthTokenPost(
        requestBody: TokenObtainRequestDto,
    ): CancelablePromise<TokenDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/token',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
