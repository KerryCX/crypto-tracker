import { useState, useEffect } from "react";
import type { Coin } from "../types/coin";

interface UseMarketDataResult {
  coins: Coin[];
  loading: boolean;
  error: string | null;
}

const useMarketData = (): UseMarketDataResult => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoins = async (): Promise<void> => {
      try {
        const response = await fetch("/api/markets");
        if (!response.ok) {
          const message =
            response.status === 429
              ? "Too many requests — please wait a moment and refresh"
              : `Something went wrong (${response.status})`;
          throw new Error(message);
        }
        const data: Coin[] = await response.json();
        setCoins(data);
      } catch (err) {
        const message =
          err instanceof Error && err.message === "Failed to fetch"
            ? "Unable to reach the market data service — please try again shortly"
            : err instanceof Error
              ? err.message
              : "Something went wrong";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  return { coins, loading, error };
};

export default useMarketData;
