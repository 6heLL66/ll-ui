import { InputToken } from './types';

export class Token {
    public readonly address: string;
    public readonly decimals: number;
    public readonly symbol?: string;
    public readonly name?: string;
    public readonly wrapped: string;

    public constructor(
        address: string,
        decimals: number,
        symbol?: string,
        name?: string,
        wrapped?: string,
    ) {
        this.address = address.toLowerCase() as string;
        this.decimals = decimals;
        this.symbol = symbol;
        this.name = name;
        this.wrapped = (
            wrapped ? wrapped.toLowerCase() : address.toLowerCase()
        ) as string;
    }

    public isEqual(token: Token) {
        return this.address === token.address;
    }

    public isUnderlyingEqual(token: Token) {
        return this.wrapped === token.wrapped;
    }

    public isSameAddress(address: string) {
        return this.address === address.toLowerCase();
    }

    public toInputToken(): InputToken {
        return {
            address: this.address,
            decimals: this.decimals,
        };
    }
}