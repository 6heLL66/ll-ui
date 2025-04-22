export type InputToken = {
    address: string;
    decimals: number;
};

export type InputAmount = InputToken & {
    rawAmount: bigint;
};