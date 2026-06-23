import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { PriceHistory } from "../types/priceHistory";
import { CHART_COLORS } from "../constants/chartTheme";

interface PriceChartProps {
  priceHistory: PriceHistory;
}

const PriceChart = ({ priceHistory }: PriceChartProps) => {
  const chartData = priceHistory.prices.map(([timestamp, price]) => ({
    time: new Date(timestamp).toLocaleDateString("en-GB", {
      month: "short",
      day: "numeric",
    }),
    price: Math.round(price * 100) / 100,
  }));

  return (
    <ResponsiveContainer width='100%' height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray='3 3' stroke={CHART_COLORS.grid} />
        {/* interval={23} shows one label per day — hourly data over 7 days ≈ 168 points */}
        <XAxis
          dataKey='time'
          interval={23}
          tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
          axisLine={{ stroke: CHART_COLORS.grid }}
          tickLine={false}
        />
        {/* domain auto fits the scale to the actual price range rather than starting at zero */}
        <YAxis
          domain={["auto", "auto"]}
          tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
          axisLine={{ stroke: CHART_COLORS.grid }}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#161B22",
            border: "1px solid #21262D",
            borderRadius: "6px",
          }}
          labelStyle={{ color: "#8B949E" }}
          itemStyle={{ color: "#2DD4BF" }}
        />
        <Line
          type='monotone'
          dataKey='price'
          stroke={CHART_COLORS.line}
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PriceChart;
