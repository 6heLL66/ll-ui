import { useConnection } from "@solana/wallet-adapter-react";
import DLMM, { MAX_BIN_PER_POSITION } from '@meteora-ag/dlmm'
import { PublicKey } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";
import { TokenAmount } from "@/shared/utils/tokenAmount";
import { useEffect, useState } from "react";

export const MAX_SIDE_RANGE = (MAX_BIN_PER_POSITION / 2) - 2;

export const useDLMM = (key: PublicKey) => {
    const { connection } = useConnection();
    const [activeBinId, setActiveBinId] = useState<number | undefined>(undefined);
    const dlmmPool = useQuery({
        queryKey: ['dlmmPool', key.toBase58()],
        queryFn: async () => {
            return await DLMM.create(connection, key);
        }
    });

    const getRange = (tokenXAmount: TokenAmount, tokenYAmount: TokenAmount) => {
        if (!dlmmPool.data) return;
        let range: {left: number, right: number};

        if ((tokenXAmount.amount === BigInt(0) && tokenYAmount.amount === BigInt(0)) || (tokenXAmount.amount !== BigInt(0) && tokenYAmount.amount !== BigInt(0))) {
            range = {left: MAX_SIDE_RANGE, right: MAX_SIDE_RANGE};
        } else if (tokenYAmount.amount === BigInt(0)) {
            range = {left: -1, right: MAX_SIDE_RANGE * 2 + 1};
        } else {
            range = {left: MAX_SIDE_RANGE * 2 + 1, right: -1};
        }

        return range!;
    }

    return {dlmmPool, getRange, activeBinId, setActiveBinId};
}