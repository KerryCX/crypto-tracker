const TRILLION = 1_000_000_000_000;
const BILLION = 1_000_000_000;
const MILLION = 1_000_000;

const formatCurrencyAbbreviation = (
  value: number,
  divisor: number,
  unit: string,
): string => `$${(value / divisor).toFixed(2)}${unit}`;

export const formatLargeNumber = (value: number): string => {
  if (value >= TRILLION)
    return formatCurrencyAbbreviation(value, TRILLION, "T");
  if (value >= BILLION) return formatCurrencyAbbreviation(value, BILLION, "B");
  if (value >= MILLION) return formatCurrencyAbbreviation(value, MILLION, "M");
  return `$${value.toLocaleString()}`;
};

export const formatCurrency = (value: number): string =>
  `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const formatPercentage = (value: number | null): string => {
  if (value === null) return "N/A";
  const indicator = value >= 0 ? "▲" : "▼";
  return `${indicator} ${value.toFixed(2)}%`;
};
