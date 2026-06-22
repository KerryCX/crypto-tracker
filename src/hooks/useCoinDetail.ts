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
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`,
        );
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data: CoinDetail = await response.json();
        setCoin(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  return { coin, loading, error };
};

export default useCoinDetail;
