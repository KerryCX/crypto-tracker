import { useParams, useNavigate } from "react-router-dom";
import useCoinDetail from "../../hooks/useCoinDetail";
import usePriceHistory from "../../hooks/usePriceHistory";
import PriceChart from "../../components/PriceChart";
import {
  formatCurrency,
  formatLargeNumber,
  formatPercentage,
} from "../../utils/formatters";

const CoinDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { coin, loading, error } = useCoinDetail(id ?? "");
  const {
    priceHistory,
    loading: chartLoading,
    error: chartError,
  } = usePriceHistory(id ?? "");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!coin) return <p>Coin not found</p>;

  return (
    <main>
      <button onClick={() => navigate("/")}>← Back to market</button>
      <img src={coin.image.large} alt={coin.name} width={64} height={64} />
      <h1>
        {coin.name} <span>({coin.symbol.toUpperCase()})</span>
      </h1>
      <dl>
        <dt>Price</dt>
        <dd>{formatCurrency(coin.market_data.current_price.usd)}</dd>

        <dt>24h Change</dt>
        <dd
          style={{
            color:
              coin.market_data.price_change_percentage_24h >= 0
                ? "green"
                : "red",
          }}
        >
          {formatPercentage(coin.market_data.price_change_percentage_24h)}
        </dd>
        <dt>Market Cap</dt>
        <dd>{formatLargeNumber(coin.market_data.market_cap.usd)}</dd>

        <dt>24h High</dt>
        <dd>{formatCurrency(coin.market_data.high_24h.usd)}</dd>

        <dt>24h Low</dt>
        <dd>{formatCurrency(coin.market_data.low_24h.usd)}</dd>

        <dt>Volume</dt>
        <dd>{formatLargeNumber(coin.market_data.total_volume.usd)}</dd>
      </dl>
      <h2>7 Day Price (USD)</h2>
      {chartLoading && <p>Loading chart...</p>}
      {chartError && <p>Chart unavailable</p>}
      {priceHistory && <PriceChart priceHistory={priceHistory} />}
    </main>
  );
};

export default CoinDetail;
