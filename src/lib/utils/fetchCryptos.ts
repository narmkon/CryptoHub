import { BASE_URL } from "@/config";
import type { IPaginatedData, IDataDTO } from "@/types/crypto";
import { FetchOptions, FetchStats } from "@/types/fetch";

export interface BatchResult {
  success: boolean;
  page: number;
  data: IDataDTO[];
  error?: string;
}

/**
 * Fetch all cryptocurrencies with robust error handling and retry logic
 */
export async function fetchAllCryptos(options: FetchOptions = {}): Promise<{
  cryptos: IDataDTO[];
  stats: FetchStats;
}> {
  const {
    pageSize = 100,
    maxRetries = 3,
    retryDelay = 1000,
    timeout = 10000,
    baseUrl = BASE_URL,
  } = options;

  const startTime = Date.now();
  const totalBatches = Math.ceil(5000 / pageSize);
  const results: BatchResult[] = [];
  let retriedBatches = 0;

  const fetchBatch = async (
    page: number,
    attempt: number = 1,
  ): Promise<BatchResult> => {
    try {
      console.log(
        `📦 Fetching batch ${page}/${totalBatches} (attempt ${attempt})`,
      );

      const response = await fetch(
        `${baseUrl}/api/data?page=${page}&size=${pageSize}`,
        {
          headers: { "Cache-Control": "no-cache" },
          signal: AbortSignal.timeout(timeout),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: IPaginatedData = await response.json();

      return {
        success: true,
        page,
        data: data.items,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error(
        `❌ Batch ${page} failed (attempt ${attempt}):`,
        errorMessage,
      );

      return {
        success: false,
        page,
        data: [],
        error: errorMessage,
      };
    }
  };

  console.log(`🚀 Starting ${totalBatches} parallel batch requests...`);
  const initialPromises = Array.from({ length: totalBatches }, (_, i) =>
    fetchBatch(i + 1),
  );

  const initialResults = await Promise.all(initialPromises);
  results.push(...initialResults);

  // Identify failed batches
  let failedBatches = results.filter((r) => !r.success);

  // Retry failed batches
  for (
    let retryAttempt = 1;
    retryAttempt <= maxRetries && failedBatches.length > 0;
    retryAttempt++
  ) {
    console.log(
      `🔄 Retry attempt ${retryAttempt}/${maxRetries} for ${failedBatches.length} failed batches`,
    );

    // Add delay before retry
    if (retryDelay > 0) {
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }

    const retryPromises = failedBatches.map((failed) =>
      fetchBatch(failed.page, retryAttempt + 1),
    );

    const retryResults = await Promise.all(retryPromises);
    retriedBatches += retryResults.length;

    // Update results
    retryResults.forEach((retryResult) => {
      const index = results.findIndex((r) => r.page === retryResult.page);
      if (index !== -1) {
        results[index] = retryResult;
      }
    });

    // Update failed batches list
    failedBatches = results.filter((r) => !r.success);
  }

  // Collect all successful data
  const allCryptos = results
    .filter((r) => r.success)
    .sort((a, b) => a.page - b.page) // Maintain order
    .flatMap((r) => r.data);

  const stats: FetchStats = {
    totalBatches,
    successfulBatches: results.filter((r) => r.success).length,
    failedBatches: results.filter((r) => !r.success).length,
    retriedBatches,
    totalItems: allCryptos.length,
    loadTime: Date.now() - startTime,
  };

  console.log("📊 Final Stats:", stats);
  if (stats.failedBatches > 0) {
    const failedPages = results.filter((r) => !r.success).map((r) => r.page);
    console.warn("⚠️ Failed batches (pages):", failedPages);
  }

  return { cryptos: allCryptos, stats };
}
