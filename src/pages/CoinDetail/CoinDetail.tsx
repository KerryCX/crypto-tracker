import { useParams } from "react-router-dom";
import useCoinDetail from "../../hooks/useCoinDetail";

const CoinDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { coin, loading, error } = useCoinDetail(id ?? "");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!coin) return <p>Coin not found</p>;

  return (
    <main>
      <img src={coin.image.large} alt={coin.name} width={64} height={64} />
      <h1>
        {coin.name} <span>({coin.symbol.toUpperCase()})</span>
      </h1>
      <dl>
        <dt>Price</dt>
        <dd>${coin.market_data.current_price.usd.toLocaleString()}</dd>

        <dt>24h Change</dt>
        <dd>{coin.market_data.price_change_percentage_24h.toFixed(2)}%</dd>

        <dt>Market Cap</dt>
        <dd>${coin.market_data.market_cap.usd.toLocaleString()}</dd>

        <dt>24h High</dt>
        <dd>${coin.market_data.high_24h.usd.toLocaleString()}</dd>

        <dt>24h Low</dt>
        <dd>${coin.market_data.low_24h.usd.toLocaleString()}</dd>

        <dt>Volume</dt>
        <dd>${coin.market_data.total_volume.usd.toLocaleString()}</dd>
      </dl>
    </main>
  );
};

export default CoinDetail;
