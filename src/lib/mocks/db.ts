// lib/mocks/db.ts
import { factory, primaryKey } from "@mswjs/data";

// Define the data model
export const db = factory({
  cryptocurrency: {
    id: primaryKey(() => Math.random().toString(36).substr(2, 9)),
    perf_24h: () => Number((Math.random() * 20 - 10).toFixed(2)), // -10% to +10%
    perf_7d: () => Number((Math.random() * 40 - 20).toFixed(2)), // -20% to +20%
    perf_30d: () => Number((Math.random() * 80 - 40).toFixed(2)), // -40% to +40%
    perf_90d: () => Number((Math.random() * 200 - 100).toFixed(2)), // -100% to +100%
    cryptocurrency: () => {
      const cryptos = [
        "Bitcoin",
        "Ethereum",
        "Cardano",
        "Polkadot",
        "Chainlink",
        "Litecoin",
        "Bitcoin Cash",
        "Stellar",
        "Dogecoin",
        "VeChain",
        "Polygon",
        "Solana",
        "Avalanche",
        "Terra",
        "Cosmos",
        "Binance Coin",
        "XRP",
        "Uniswap",
        "TRON",
        "Wrapped Bitcoin",
        "Shiba Inu",
        "Dai",
        "Avalanche",
        "Polygon",
        "Algorand",
        "Internet Computer",
        "Filecoin",
        "Cosmos",
        "Hedera",
        "VeChain",
        "Sandbox",
        "Axie Infinity",
        "Decentraland",
      ];
      return `${cryptos[Math.floor(Math.random() * cryptos.length)]}-${Math.floor(Math.random() * 1000)}`;
    },
  },
});

// Seed some initial data
const seedData = () => {
  // Create 5000 cryptocurrency records
  for (let i = 0; i < 5000; i++) {
    db.cryptocurrency.create();
  }
};

// Helper function to create paginated response
export const createPaginatedResponse = (
  page: number = 1,
  size: number = 50,
  baseUrl: string = "/api/data",
) => {
  const allItems = db.cryptocurrency.findMany({});
  const total = allItems.length;
  const pages = Math.ceil(total / size);
  const startIndex = (page - 1) * size;
  const items = allItems.slice(startIndex, startIndex + size);

  // Transform items to match IDataDTO interface
  const transformedItems = items.map((item) => ({
    perf_24h: item.perf_24h,
    perf_7d: item.perf_7d,
    perf_30d: item.perf_30d,
    perf_90d: item.perf_90d,
    cryptocurrency: item.cryptocurrency,
  }));

  return {
    items: transformedItems,
    total,
    page,
    size,
    pages,
    links: {
      first: page > 1 ? `${baseUrl}?page=1&size=${size}` : null,
      last: page < pages ? `${baseUrl}?page=${pages}&size=${size}` : null,
      self: `${baseUrl}?page=${page}&size=${size}`,
      next: page < pages ? `${baseUrl}?page=${page + 1}&size=${size}` : null,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}&size=${size}` : null,
    },
  };
};

seedData();
