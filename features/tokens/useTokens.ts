import { useEffect, useMemo } from "react";
import { create } from 'zustand';;
import { debounce, DebouncedFunc } from "lodash";
import { Token } from "@/shared/utils/token";

export type JupApiToken = {
    address: string;
    created_at: string;
    daily_volume: number;
    decimals: number;
    freeze_authority: string | null;    
    logoURI: string | null;
    mint_authority: string | null;
    minted_at: string | null;   
    name: string;
    permanent_delegate: string | null;
    token: Token;
    symbol: string;
    tags: string[] | null;
}

interface TokensState {
    tokens: JupApiToken[];
    setTokens: (tokens: JupApiToken[]) => void;
    addressesToLoad: string[];
    loadTokens: DebouncedFunc<() => Promise<void>>;
    fetchTokens: (addresses: string[]) => Promise<void>;
}

const useTokensStore = create<TokensState>((set, get) => ({
    tokens: [],
    setTokens: (tokens) => set({ tokens }),
    addressesToLoad: [],
    loadTokens: debounce(async () => {
        const { addressesToLoad } = get();

        if (!addressesToLoad || addressesToLoad.length === 0) return;
        
        try {
            const tokens = (await Promise.all(addressesToLoad.map((address) => {
                return fetch(`https://lite-api.jup.ag/tokens/v1/token/${address}`).then(res => res.json()) as Promise<JupApiToken>
            }))).map(token => ({...token, token: new Token(token.address, token.decimals, token.symbol, token.name)}))
            set((prev) => ({ ...prev, tokens: [...tokens, ...prev.tokens.filter(token => !tokens.find(t => t.address === token.address))], loading: false }));
        } catch (error) {
            console.error("Error fetching tokens:", error);
        }
    }, 250),
    fetchTokens: async (addresses) => {
        if (!addresses || addresses.length === 0) return;

        set({ addressesToLoad: Array.from(new Set([...get().addressesToLoad, ...addresses.filter(address => !get().tokens.find(token => token.address === address))])) });
        get().loadTokens();
    }
}));

export const useTokens = (addresses?: string[]) => {
    const { tokens, fetchTokens } = useTokensStore();

    useEffect(() => {
        if (addresses && addresses.length > 0) {
            fetchTokens(addresses);
        }
    }, []);

    const tokensMap = useMemo(() => {
        return tokens.reduce((acc, token) => {
            acc[token.address] = token;
            return acc;
        }, {} as Record<string, JupApiToken>);
    }, [tokens]);

    return { tokens, fetchTokens: (addresses: string[]) => fetchTokens(addresses), tokensMap };
}