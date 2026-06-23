import { useParams, useNavigate } from "react-router-dom";
import useCoinDetail from "../../hooks/useCoinDetail";
import usePriceHistory from "../../hooks/usePriceHistory";

import {
  formatCurrency,
  formatLargeNumber,
  formatPercentage,
} from "../../utils/formatters";
import styles from "./CoinDetail.module.css";
import PriceChart from "../../components/PriceChart";

const CoinDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { coin, loading, error } = useCoinDetail(id ?? "");
  const {
    priceHistory,
    loading: chartLoading,
    error: chartError,
  } = usePriceHistory(id ?? "");

  if (loading) return <p>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!coin) return <p>Coin not found</p>;

  const change = coin.market_data.price_change_percentage_24h;
  const changeClass =
    change >= 0 ? styles.statValuePositive : styles.statValueNegative;

  return (
    <main className={styles.page}>
      <button className={styles.backLink} onClick={() => navigate("/")}>
        ← Back to market
      </button>

      <div className={styles.coinHeader}>
        <img
          className={styles.coinLogo}
          src={coin.image.large}
          alt={coin.name}
        />
        <div>
          <div className={styles.coinName}>{coin.name}</div>
          <div className={styles.coinSymbol}>{coin.symbol.toUpperCase()}</div>
        </div>
        <div className={styles.coinPrice}>
          {formatCurrency(coin.market_data.current_price.usd)}
        </div>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Market Cap</div>
          <div className={styles.statValue}>
            {formatLargeNumber(coin.market_data.market_cap.usd)}
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>24h High</div>
          <div className={styles.statValue}>
            {formatCurrency(coin.market_data.high_24h.usd)}
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>24h Low</div>
          <div className={styles.statValue}>
            {formatCurrency(coin.market_data.low_24h.usd)}
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Volume</div>
          <div className={styles.statValue}>
            {formatLargeNumber(coin.market_data.total_volume.usd)}
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>24h Change</div>
          <div className={changeClass}>{formatPercentage(change)}</div>
        </div>
      </div>

      <div className={styles.chartCard}>
        <h2 className={styles.chartTitle}>7 Day Price (USD)</h2>
        {chartLoading && <p>Loading chart...</p>}
        {chartError && <p>Chart unavailable</p>}
        {priceHistory && <PriceChart priceHistory={priceHistory} />}
      </div>
    </main>
  );
};

export default CoinDetail;
