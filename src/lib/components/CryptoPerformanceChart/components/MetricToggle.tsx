import { IDataDTO } from "@/types/crypto";
import { METRIC_OPTIONS } from "../constants";

const MetricToggle = ({
  selectedMetric,
  onMetricChange,
}: {
  selectedMetric: keyof IDataDTO;
  onMetricChange: (metric: keyof IDataDTO) => void;
}) => (
  <div className="flex bg-gray-900 rounded-lg p-1 gap-1">
    {METRIC_OPTIONS.map((option) => (
      <button
        key={option.value}
        onClick={() => onMetricChange(option.value as keyof IDataDTO)}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all hover:cursor-pointer ${
          selectedMetric === option.value
            ? "bg-gray-700 text-white shadow-sm"
            : "text-gray-500 hover:text-gray-200"
        }`}
      >
        {option.label}
      </button>
    ))}
  </div>
);
export default MetricToggle;
