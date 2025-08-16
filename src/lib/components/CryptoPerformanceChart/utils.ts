import { IDataDTO } from "@/types/crypto";

export const transformChartData = (
  data: IDataDTO[],
  metric: keyof IDataDTO,
) => {
  return data.map((item) => ({
    name: item.cryptocurrency,
    value: item[metric] as number,
  }));
};
export const createChartOption = (
  chartData: Array<{ name: string; value: number }>,
) => {
  const xAxisData = chartData.map((item) => item.name);

  const seriesData = chartData.map((item) => ({
    value: item.value,
    itemStyle: {
      color:
        item.value >= 0
          ? {
              type: "linear",
              x: 0,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [
                { offset: 0, color: "#16a34a" },
                { offset: 1, color: "#22c55e" },
              ],
            }
          : {
              type: "linear",
              x: 0,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [
                { offset: 0, color: "#dc2626" },
                { offset: 1, color: "#ef4444" },
              ],
            },
    },
  }));

  // --- Dynamic Y-Axis Range ---
  const values = chartData.map((d) => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  let yMin = minValue;
  let yMax = maxValue;
  const range = maxValue - minValue;

  if (range < 5) {
    const padding = (5 - range) / 2;
    yMin = minValue - padding;
    yMax = maxValue + padding;
  } else {
    const step = Math.ceil(range / 5);
    yMin = Math.floor(minValue / step) * step;
    yMax = Math.ceil(maxValue / step) * step;
  }

  // --- Detect mobile ---
  const isCompact = typeof window !== "undefined" && window.innerWidth <= 640;
  const isTitleCompact =
    typeof window !== "undefined" && window.innerWidth <= 1080;

  return {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      borderColor: "transparent",
      textStyle: { color: "#fff", fontSize: isCompact ? 10 : 12 },
      formatter: function (params: [ReturnType<typeof transformChartData>[0]]) {
        const data = params[0];
        const sign = data.value >= 0 ? "+" : "";
        return `
          <div style="font-weight:500;">${data.name}</div>
          <div style="font-size:${isCompact ? 10 : 12}px;opacity:0.9;">
            ${sign}${data.value.toFixed(1)}%
          </div>`;
      },
    },
    grid: {
      left: isCompact ? 20 : 30,
      right: isCompact ? 10 : 20,
      bottom: isCompact ? 50 : 40,
      top: 20,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: xAxisData,
      axisTick: { show: false, alignWithLabel: true },
      axisLine: { show: false },
      axisLabel: {
        color: "#64748b",
        fontSize: isCompact ? 9 : 11,
        interval: 0, // always show all labels
        rotate: isCompact ? 45 : 0, // rotate on mobile
        formatter: (val: string) =>
          isTitleCompact && val.length > 6 ? val.slice(0, 6) + "…" : val,
      },
    },
    yAxis: {
      type: "value",
      min: yMin,
      max: yMax,
      splitNumber: 5,
      axisTick: { show: false },
      axisLine: { show: false },
      splitLine: {
        lineStyle: { color: "#f1f5f9", width: 1 },
      },
      axisLabel: {
        formatter: (val: number) => `${val.toFixed(1)}%`,
        color: "#94a3b8",
        fontSize: isCompact ? 9 : 11,
      },
    },
    series: [
      {
        type: "bar",
        data: seriesData,
        barWidth: isCompact ? "30%" : "50%", // thinner bars on mobile
        borderRadius: [4, 4, 0, 0],
        emphasis: {
          focus: "series",
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.15)",
          },
        },
        animationDuration: 600,
        animationEasing: "cubicOut",
        animationDurationUpdate: 600,
        animationEasingUpdate: "cubicOut",
      },
    ],
  };
};
