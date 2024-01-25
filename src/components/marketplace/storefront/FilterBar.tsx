interface FilterProps {
  setFilter: (filter: string) => void;
}
const FilterBar: React.FC<FilterProps> = ({ setFilter }) => {
  return (
    <div className="flex justify-between">
      <button
        onClick={() => setFilter("All")}
        className="bg-gray-200 px-4 py-2"
      >
        All
      </button>
      {/* Add more buttons for each category */}
      <button
        onClick={() => setFilter("Experience")}
        className="bg-gray-200 px-4 py-2"
      >
        Experience
      </button>
      <button
        onClick={() => setFilter("Merchandise")}
        className="bg-gray-200 px-4 py-2"
      >
        Merchandise
      </button>
    </div>
  );
};

export default FilterBar;
