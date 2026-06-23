import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import type {
  GridSortChangeEvent,
  GridFilterChangeEvent,
} from "@progress/kendo-react-grid";
import { orderBy, filterBy } from "@progress/kendo-data-query";
import type {
  SortDescriptor,
  CompositeFilterDescriptor,
} from "@progress/kendo-data-query";
import useMarketData from "../../hooks/useMarketData";
import {
  formatCurrency,
  formatLargeNumber,
  formatPercentage,
} from "../../utils/formatters";
import styles from "./MarketOverview.module.css";

const initialSort: SortDescriptor[] = [
  { field: "market_cap_rank", dir: "asc" },
];
const initialFilter: CompositeFilterDescriptor = { logic: "and", filters: [] };

const MarketOverview = () => {
  const { coins, loading, error } = useMarketData();
  const [sort, setSort] = useState<SortDescriptor[]>(initialSort);
  const [filter, setFilter] =
    useState<CompositeFilterDescriptor>(initialFilter);
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const processedData = filterBy(orderBy(coins, sort), filter).map((coin) => ({
    ...coin,
    current_price: formatCurrency(coin.current_price),
    price_change_percentage_24h: formatPercentage(
      coin.price_change_percentage_24h,
    ),
    market_cap: formatLargeNumber(coin.market_cap),
    total_volume: formatLargeNumber(coin.total_volume),
  }));

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Market Overview</h1>
      <div className={styles.card}>
        <Grid
          data={processedData}
          sortable
          sort={sort}
          onSortChange={(e: GridSortChangeEvent) => setSort(e.sort)}
          filterable
          filter={filter}
          onFilterChange={(e: GridFilterChangeEvent) => setFilter(e.filter)}
          onRowClick={(e) => navigate(`/coin/${e.dataItem.id}`)}
        >
          <GridColumn
            field='market_cap_rank'
            title='Rank'
            width='80px'
            filterable={false}
          />
          <GridColumn field='name' title='Name' />
          <GridColumn field='current_price' title='Price (USD)' />
          <GridColumn field='price_change_percentage_24h' title='24h %' />
          <GridColumn field='market_cap' title='Market Cap' />
          <GridColumn field='total_volume' title='Volume' />
        </Grid>
      </div>
    </main>
  );
};

export default MarketOverview;
