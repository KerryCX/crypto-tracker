import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  formatLargeNumber,
  formatPercentage,
} from "./formatters";

describe("formatCurrency", () => {
  it("formats a whole number with dollar sign and two decimal places", () => {
    expect(formatCurrency(64000)).toBe("$64,000.00");
  });

  it("formats a decimal number correctly", () => {
    expect(formatCurrency(1234.56)).toBe("$1,234.56");
  });
});

describe("formatLargeNumber", () => {
  it("formats trillions with T suffix", () => {
    expect(formatLargeNumber(1_290_000_000_000)).toBe("$1.29T");
  });

  it("formats billions with B suffix", () => {
    expect(formatLargeNumber(210_000_000_000)).toBe("$210.00B");
  });

  it("formats millions with M suffix", () => {
    expect(formatLargeNumber(5_000_000)).toBe("$5.00M");
  });

  it("formats small numbers without suffix", () => {
    expect(formatLargeNumber(500)).toBe("$500");
  });
});

describe("formatPercentage", () => {
  it("formats a positive number with up arrow", () => {
    expect(formatPercentage(1.5)).toBe("▲ 1.50%");
  });

  it("formats a negative number with down arrow", () => {
    expect(formatPercentage(-2.64)).toBe("▼ -2.64%");
  });

  it("returns N/A for null", () => {
    expect(formatPercentage(null)).toBe("N/A");
  });
});
