import { IDataDTO } from "@/types/crypto";
import * as echarts from "echarts";
import { useEffect, useRef } from "react";
import { createChartOption, transformChartData } from "../utils";
import debounce from "lodash.debounce";

export const useECharts = (
  data: IDataDTO[],
  selectedMetric: keyof IDataDTO,
) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const chartData = transformChartData(data, selectedMetric);
    const option = createChartOption(chartData);
    chartInstance.current.setOption(option, true);

    const handleResize = debounce(() => {
      chartInstance.current?.resize();
      chartInstance.current?.setOption(createChartOption(chartData), true);
    }, 40);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [data, selectedMetric]);

  useEffect(() => {
    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, []);

  return chartRef;
};
