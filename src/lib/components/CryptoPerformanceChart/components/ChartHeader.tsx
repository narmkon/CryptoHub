import { IDataDTO } from "@/types/crypto";
import MetricToggle from "./MetricToggle";

const ChartHeader = ({
  selectedMetric,
  onMetricChange,
  title,
}: {
  selectedMetric: keyof IDataDTO;
  onMetricChange: (metric: keyof IDataDTO) => void;
  title: string;
}) => (
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-lg font-semibold text-gray-100">{title}</h2>
    <MetricToggle
      selectedMetric={selectedMetric}
      onMetricChange={onMetricChange}
    />
  </div>
);
export default ChartHeader;
