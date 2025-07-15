import React from 'react';

const FilterBar = ({ selected, onChange }) => {
  const filters = ['none', 'sepia', 'bw', 'invert', 'cool', 'warm'];

  return (
    <div className="flex justify-center flex-wrap gap-3 mt-6">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`px-4 py-2 rounded-full font-bold shadow-md transition-all text-sm tracking-wide ${
            selected === f
              ? 'bg-teal-600 text-white'
              : 'bg-white border border-teal-400 text-teal-700 hover:bg-teal-100'
          }`}
        >
          {f.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;