import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  const apiKey = Netlify.env.get("COINGECKO_API_KEY") ?? "";
  const id = context.params.id;

  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`,
    {
      headers: {
        "x-cg-demo-api-key": apiKey,
      },
    },
  );

  if (!response.ok) {
    return new Response(
      JSON.stringify({ error: `API error: ${response.status}` }),
      {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const config = {
  path: "/api/coin/:id",
};
