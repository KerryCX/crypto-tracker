import { useState, useEffect } from "react";
import type { CoinDetail } from "../types/coinDetail";

interface UseCoinDetailResult {
  coin: CoinDetail | null;
  loading: boolean;
  error: string | null;
}

const useCoinDetail = (id: string): UseCoinDetailResult => {
  const [coin, setCoin] = useState<CoinDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoin = async (): Promise<void> => {
      try {
        // Exclude localisation, tickers, community and developer data to reduce response size
        const response = await fetch(`/api/coin/${id}`);
        if (!response.ok) {
          const message =
            response.status === 429
              ? "Too many requests — please wait a moment and refresh"
              : `Something went wrong (${response.status})`;
          throw new Error(message);
        }
        const data: CoinDetail = await response.json();
        setCoin(data);
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

    fetchCoin();
  }, [id]);

  return { coin, loading, error };
};

export default useCoinDetail;
