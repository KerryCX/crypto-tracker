export type PricePoint = [number, number]; // [timestamp, price]

export interface PriceHistory {
  prices: PricePoint[];
}
