export const OversInput = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-xs sm:text-sm font-medium text-gray-700">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e)}
        min={min}
        max={max}
        step={step}
        className="w-full text-sm rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  );
};
