export interface Token {
  symbol: string;
  name: string;
  logoURI: string;
  address: string;
}

export interface Pool {
  id: string;
  name: string;
  tokens: Token[];
  tvl: number;
  volume24h: number;
  poolCount: number;
  poolCount24h: number;
  poolCount7d: number;
  apr: number;
  fee: number;
  myLiquidity?: number;
} 