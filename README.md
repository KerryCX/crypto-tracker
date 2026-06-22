# Crypto Tracker

A data dashboard built to demonstrate KendoReact Grid skills in a realistic API-backed context, paired with Recharts for data visualisation.

Live: [link once deployed]

## What it does

- Market overview: top 50 coins by market cap in a KendoReact Grid with live sorting and filtering
- Coin detail: key stats and a 7-day price history chart, reached by clicking any row

## Tech

- React + TypeScript + Vite
- KendoReact Grid (free tier) for sorting, filtering, custom cell renderers
- Recharts - 7-day price history line chart
- CoinGecko public API. No key required
- React Router

## A note on tooling choices

KendoReact Charts requires a commercial license; the Grid has a genuinely free production tier. I paired the Grid with Recharts for visualisation rather than the trial. A realistic pattern for production apps that mix vendor and open-source tooling.

## Run locally

```bash
npm install
npm run dev
```

## License

MIT — see [LICENSE](LICENSE) for details.
