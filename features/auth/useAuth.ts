import { AuthService } from "@/shared/common-api";
import { useAuthStore } from "./AuthStore";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import bs58 from "bs58";

export const useAuth = () => {
  const { publicKey, signMessage } = useWallet();
  const { isAuthenticated, setIsAuthenticated, accessToken, refreshToken, setAccessToken, setRefreshToken } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);


  const authorize = async () => {
    if (!publicKey || !signMessage) {
      throw new Error("No public key found");
    }

    try {
        setIsLoading(true);
    
        const challenge = await AuthService.challengeRequestAuthRequestChallengeGet(publicKey.toBase58());
        const message = JSON.stringify(challenge)
        const messageBytes = Buffer.from(message);
        
        const signatureBytes = await signMessage(messageBytes);
        const signatureBase58 = bs58.encode(signatureBytes);
        
        const response = await AuthService.getTokensAuthTokenPost({
          message: challenge,
          signature: signatureBase58
        });
        
        if (response) {
          setAccessToken(response.access_token);
          setRefreshToken(response.refresh_token);
          setIsAuthenticated(true);
        }
    
        setIsLoading(false);
    } catch (error) {
        setIsLoading(false);
        console.error(error);
    }    
  };


  return {
    isAuthenticated,
    accessToken,
    refreshToken,
    isLoading,
    authorize,
    setIsAuthenticated,
    setAccessToken,
    setRefreshToken,
  };
};
