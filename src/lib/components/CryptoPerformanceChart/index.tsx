"use client";
import React, { useState } from "react";
import ChartHeader from "./components/ChartHeader";
import { useECharts } from "./hooks/useEcharts";
import classNames from "classnames";
interface IDataDTO {
  perf_24h: number;
  perf_7d: number;
  perf_30d: number;
  perf_90d: number;
  cryptocurrency: string;
}

const CryptoPerformanceChart = ({
  data,
  title,
  className,
  defaultSelectedMetric,
}: {
  defaultSelectedMetric: keyof IDataDTO;
  data: IDataDTO[];
  title: string;
  className?: string;
}) => {
  const [selectedMetric, setSelectedMetric] = useState<keyof IDataDTO>(
    defaultSelectedMetric,
  );
  const chartRef = useECharts(data, selectedMetric);

  return (
    <div className={classNames("w-full max-w-6xl mx-auto", className)}>
      <div className="bg-cyan-500/5 rounded-xl border border-cyan-500/10 p-6 shadow-sm">
        <ChartHeader
          title={title}
          selectedMetric={selectedMetric}
          onMetricChange={setSelectedMetric}
        />
        <div ref={chartRef} className="w-full h-80" />
      </div>
    </div>
  );
};

export default CryptoPerformanceChart;
