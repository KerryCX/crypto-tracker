import { Grid, GridColumn } from "@progress/kendo-react-grid";
import useMarketData from "../../hooks/useMarketData";

const MarketOverview = () => {
  const { coins, loading, error } = useMarketData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main>
      <h1>Crypto Market</h1>
      <Grid data={coins}>
        <GridColumn field='market_cap_rank' title='Rank' width='80px' />
        <GridColumn field='name' title='Name' />
        <GridColumn field='current_price' title='Price (USD)' />
        <GridColumn field='price_change_percentage_24h' title='24h %' />
        <GridColumn field='market_cap' title='Market Cap' />
        <GridColumn field='total_volume' title='Volume' />
      </Grid>
    </main>
  );
};

export default MarketOverview;
