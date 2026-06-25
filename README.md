# Crypto Tracker

A data dashboard built to demonstrate KendoReact Grid skills in a realistic API-backed context, paired with Recharts for data visualisation.

Live: [cryptotracker.kerryclements.com](https://cryptotracker.kerryclements.com)

## What it does

- Market overview: top 50 coins by market cap in a KendoReact Grid with live sorting, filtering and paging
- Coin detail: key stats and a 7-day price history chart, reached by clicking any row
- API calls are proxied through Netlify Functions so the API key is never exposed in the client bundle

## Tech

- React + TypeScript + Vite
- KendoReact Grid (free tier) — sorting, filtering, paging, custom cell renderers
- Recharts — 7-day price history line chart
- CoinGecko API — market data
- Netlify Functions — serverless API proxy
- React Router

## A note on tooling choices

KendoReact Charts requires a commercial license; the Grid has a genuinely free production tier. I paired the Grid with Recharts for visualisation rather than the trial — a realistic pattern for production apps that mix vendor and open-source tooling.

## Run locally

You'll need a free CoinGecko Demo API key to run this locally:

1. Sign up at [coingecko.com](https://www.coingecko.com) and go to the Developer Dashboard
2. Create a Demo API key (free, no credit card required)
3. Create a `.env.local` file in the project root:
4. Install dependencies:

```bash
npm install
npm install -g netlify-cli
```

5. Run the dev server:

```bash
netlify dev
```

The app runs on `http://localhost:8888`.
