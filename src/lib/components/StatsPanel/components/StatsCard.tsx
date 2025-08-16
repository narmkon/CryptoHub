const StatCard = ({
  value,
  label,
  color,
}: {
  value: string | number;
  label: string;
  color: string;
}) => {
  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    red: "text-red-600",
    yellow: "text-yellow-600",
    purple: "text-purple-600",
    indigo: "text-indigo-600",
  };

  return (
    <div className="bg-indigo-900/15 border-cyan-200/25 border-1 rounded p-3 text-center shadow-lg/15 shadow-cyan-300">
      <div
        className={`text-2xl font-bold ${colorClasses[color as keyof typeof colorClasses]}`}
      >
        {value}
      </div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
};
export default StatCard;
