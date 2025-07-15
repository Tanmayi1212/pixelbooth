import React, { useEffect, useRef } from 'react';
import { applyFilter } from '../utils/filters';

const FILTERS = ['none', 'sepia', 'bw', 'invert', 'cool', 'warm'];

const FilterBarWithPreview = ({ selected, onChange, images }) => {
  const previewRefs = useRef({});

  useEffect(() => {
    FILTERS.forEach((filter) => {
      const canvas = previewRefs.current[filter];
      if (!canvas || images.length === 0) return;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = images[0];
      img.onload = () => {
        canvas.width = 100;
        canvas.height = 80;
        ctx.clearRect(0, 0, 100, 80);
        ctx.drawImage(img, 0, 0, 100, 80);
        if (filter !== 'none') {
          applyFilter(ctx, filter);
        }
      };
    });
  }, [images]);

  return (
    <div className="w-full">
      <div className="flex justify-center gap-4 flex-wrap mt-6">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            className={`flex flex-col items-center w-[100px] px-2 py-2 rounded-xl shadow-md overflow-hidden ${
              selected === filter
                ? 'border-4 border-teal-600 bg-white'
                : 'border border-gray-300 bg-white hover:border-teal-400'
            }`}

          >
            <canvas
              ref={(el) => (previewRefs.current[filter] = el)}
              className="rounded mb-2"
            />
            <span className="text-xs font-semibold text-teal-700">
              {filter.toUpperCase()}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBarWithPreview;