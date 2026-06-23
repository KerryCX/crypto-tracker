// Chart colour constants — mirror the CSS custom properties in index.css
// Recharts props require plain strings, not CSS variables

export const CHART_COLORS = {
  line: "#2DD4BF", // --accent-teal
  grid: "#21262D", // --bg-border
  axis: "#8B949E", // --text-secondary
  tooltipBg: "#161B22", // --bg-surface
  tooltipBorder: "#21262D", // --bg-border
  tooltipLabel: "#8B949E", // --text-secondary
  tooltipValue: "#2DD4BF", // --accent-teal
} as const;
