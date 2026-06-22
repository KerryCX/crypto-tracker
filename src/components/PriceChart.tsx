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
        <CartesianGrid strokeDasharray='3 3' />
        {/* interval={23} shows one label per day — hourly data over 7 days ≈ 168 points, so every 24th label */}
        <XAxis dataKey='time' interval={23} />
        {/* domain auto fits the scale to the actual price range rather than starting at zero */}
        <YAxis domain={["auto", "auto"]} />
        <Tooltip />
        <Line type='monotone' dataKey='price' dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PriceChart;
