import CryptoPerformanceChart from "@/lib/components/CryptoPerformanceChart";
import { fetchAllCryptos } from "../lib/utils/fetchCryptos";
import FailedBatchesWarning from "@/lib/components/FailedBatchsWarning";
import StatsPanel from "@/lib/components/StatsPanel";
import { FetchStats } from "@/types/fetch";

export const revalidate = 1000;

export default async function CryptosPage() {
  const { cryptos, stats } = await fetchAllCryptos({
    pageSize: 100,
    maxRetries: 3,
    retryDelay: 1000,
    timeout: 15000,
  });
  const sortedCryptosLastDay = cryptos.toSorted(
    (c2, c1) => c1.perf_24h - c2.perf_24h,
  );
  const sortedCryptosLastWeek = cryptos.toSorted(
    (c2, c1) => c1.perf_7d - c2.perf_7d,
  );
  const sortedCryptosLastMonth = cryptos.toSorted(
    (c2, c1) => c1.perf_30d - c2.perf_30d,
  );
  const sortedCryptosLastSeason = cryptos.toSorted(
    (c2, c1) => c1.perf_90d - c2.perf_90d,
  );

  return (
    <main className="p-6 flex flex-col gap-5">
      <StatsPanel stats={stats} />
      <CryptoPerformanceChart
        defaultSelectedMetric={"perf_24h"}
        title="Last Day's Best Performances"
        data={sortedCryptosLastDay.slice(0, 10)}
      />
      <CryptoPerformanceChart
        defaultSelectedMetric={"perf_7d"}
        title="Last Week's Best Performances"
        data={sortedCryptosLastWeek.slice(0, 10)}
      />
      <CryptoPerformanceChart
        defaultSelectedMetric={"perf_30d"}
        title="Last Month's Best Performances"
        data={sortedCryptosLastMonth.slice(0, 10)}
      />
      <CryptoPerformanceChart
        defaultSelectedMetric={"perf_90d"}
        title="Last Season's Best Performances"
        data={sortedCryptosLastSeason.slice(0, 10)}
      />
      <CryptoPerformanceChart
        defaultSelectedMetric={"perf_24h"}
        title="Last Day's Worst Performances"
        data={sortedCryptosLastDay.slice(-10)}
      />
      <CryptoPerformanceChart
        defaultSelectedMetric={"perf_7d"}
        title="Last Weeks's Worst Performances"
        data={sortedCryptosLastWeek.slice(-10)}
      />
      {"failedBatches" in stats && stats.failedBatches > 0 && (
        <FailedBatchesWarning stats={stats as FetchStats} />
      )}
    </main>
  );
}
