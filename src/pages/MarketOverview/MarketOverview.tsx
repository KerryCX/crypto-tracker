import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  GridColumn,
  type GridFilterChangeEvent,
  type GridSortChangeEvent,
} from "@progress/kendo-react-grid";
import {
  type SortDescriptor,
  type CompositeFilterDescriptor,
  filterBy,
  orderBy,
} from "@progress/kendo-data-query";
import useMarketData from "../../hooks/useMarketData";
import {
  formatCurrency,
  formatLargeNumber,
  formatPercentage,
} from "../../utils/formatters";

const initialSort: SortDescriptor[] = [
  { field: "market_cap_rank", dir: "asc" },
];
const initialFilter: CompositeFilterDescriptor = { logic: "and", filters: [] };

const MarketOverview = () => {
  const navigate = useNavigate();
  const { coins, loading, error } = useMarketData();
  const [sort, setSort] = useState<SortDescriptor[]>(initialSort);
  const [filter, setFilter] =
    useState<CompositeFilterDescriptor>(initialFilter);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const processedData = filterBy(orderBy(coins, sort), filter);

  return (
    <main>
      <h1>Crypto Market</h1>
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
        <GridColumn field='market_cap_rank' title='Rank' width='80px' />
        <GridColumn field='name' title='Name' />
        <GridColumn
          field='current_price'
          title='Price (USD)'
          cells={{
            data: (props) => (
              <td>{formatCurrency(props.dataItem.current_price)}</td>
            ),
          }}
        />
        <GridColumn
          field='price_change_percentage_24h'
          title='24h %'
          cells={{
            data: (props) => {
              const value = props.dataItem.price_change_percentage_24h;
              return (
                <td style={{ color: value >= 0 ? "green" : "red" }}>
                  {formatPercentage(value)}
                </td>
              );
            },
          }}
        />
        <GridColumn
          field='market_cap'
          title='Market Cap'
          cells={{
            data: (props) => (
              <td>{formatLargeNumber(props.dataItem.market_cap)}</td>
            ),
          }}
        />
        <GridColumn
          field='total_volume'
          title='Volume'
          cells={{
            data: (props) => (
              <td>{formatLargeNumber(props.dataItem.total_volume)}</td>
            ),
          }}
        />
      </Grid>
    </main>
  );
};

export default MarketOverview;
