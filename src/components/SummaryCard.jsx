const SummaryCard = ({ title, value }) => (
  <div className="bg-white shadow-lg rounded-2xl p-4">
    <div className="text-lg font-semibold text-center">{value}</div>
    <div className="text-gray-800 text-sm text-center">{title}</div>
  </div>
);

export default SummaryCard;
