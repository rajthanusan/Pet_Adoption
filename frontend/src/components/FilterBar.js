const FilterBar = ({ currentFilter, onFilter }) => {
    const filters = [
      { value: 'all', label: 'All Pets' },
      { value: 'Happy', label: 'Happy' },
      { value: 'Excited', label: 'Excited' },
      { value: 'Sad', label: 'Sad' }
    ];
  
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Filter by Mood</h2>
        <div className="flex flex-wrap gap-2">
          {filters.map(filter => (
            <button
              key={filter.value}
              onClick={() => onFilter(filter.value)}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                currentFilter === filter.value
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default FilterBar;