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
        // 7 days of hourly price data in USD
        const response = await fetch(`/api/price-history/${id}`);
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

    fetchPriceHistory();
  }, [id]);

  return { priceHistory, loading, error };
};

export default usePriceHistory;
