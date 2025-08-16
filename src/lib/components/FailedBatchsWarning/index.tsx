import { FetchStats } from "@/lib/utils/fetchCryptos";

const FailedBatchesWarning = ({ stats }: { stats: FetchStats }) => {
  return (
    <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <div className="flex items-center">
        <div className="text-yellow-600 mr-2">⚠️</div>
        <div>
          <h3 className="text-yellow-800 font-medium">Partial Data Loaded</h3>
          <p className="text-yellow-700 text-sm">
            {stats.failedBatches} batches failed to load after {3} retry
            attempts. Showing {stats.totalItems} out of 5000 total items.
          </p>
        </div>
      </div>
    </div>
  );
};
export default FailedBatchesWarning;
