import { useState, useEffect } from "react";
import type { PriceHistory } from "../types/priceHistory";

interface UsePriceHistoryResult {
  priceHistory: PriceHistory | null;
  loading: boolean;
  error: string | null;
}

const usePriceHistory = (id: string): UsePriceHistoryResult => {
  const [priceHistory, setPriceHistory] = useState<PriceHistory | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPriceHistory = async (): Promise<void> => {
      try {
        const response = await fetch(
          // 7 days of hourly price data in USD
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`,
        );
        if (!response.ok) {
          const message =
            response.status === 429
              ? "Too many requests — please wait a moment and refresh"
              : `Something went wrong (${response.status})`;
          throw new Error(message);
        }
        const data: PriceHistory = await response.json();
        setPriceHistory(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPriceHistory();
  }, [id]);

  return { priceHistory, loading, error };
};

export default usePriceHistory;
