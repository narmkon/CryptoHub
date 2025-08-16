import { FetchStats } from "@/types/fetch";
import StatCard from "./components/StatsCard";

const StatsPanel = ({ stats }: { stats: FetchStats }) => {
  const isFullStats = "totalBatches" in stats;

  return (
    <div className="mb-6 rounded-lg p-4">
      <h1 className="text-3xl font-bold mb-4">
        Cryptocurrency Dashboard ({stats.totalItems} items)
      </h1>

      <div
        className={`grid gap-4 text-sm ${isFullStats ? "grid-cols-2 md:grid-cols-6" : "grid-cols-2"}`}
      >
        {isFullStats && (
          <>
            <StatCard
              value={stats.totalBatches}
              label="Total Batches"
              color="blue"
            />
            <StatCard
              value={stats.successfulBatches}
              label="Successful"
              color="green"
            />
            <StatCard value={stats.failedBatches} label="Failed" color="red" />
            <StatCard
              value={stats.retriedBatches}
              label="Retried"
              color="yellow"
            />
          </>
        )}
        <StatCard
          value={stats.totalItems}
          label="Items Loaded"
          color="purple"
        />
        <StatCard
          value={`${stats.loadTime}ms`}
          label="Load Time"
          color="indigo"
        />
      </div>

      {isFullStats && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Success Rate</span>
            <span className="text-sm text-gray-600">
              {Math.round((stats.successfulBatches / stats.totalBatches) * 100)}
              %
            </span>
          </div>
          <div className="w-full rounded-full h-2">
            <div
              className="bg-green-500 shadow-md/85 shadow-green-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(stats.successfulBatches / stats.totalBatches) * 100}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsPanel;
