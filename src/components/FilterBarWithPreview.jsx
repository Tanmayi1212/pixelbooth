import React, { useEffect, useRef } from 'react';
import { applyFilter } from '../utils/filters';

const FILTERS = ['none', 'sepia', 'bw', 'invert', 'cool', 'warm'];

const FilterBarWithPreview = ({ selected, onChange, images }) => {
  const previewRefs = useRef([]);

  useEffect(() => {
    previewRefs.current.forEach((canvas, index) => {
      if (!canvas || images.length === 0) return;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = images[0]; // use first image as preview
      img.onload = () => {
        canvas.width = 100;
        canvas.height = 80;
        ctx.clearRect(0, 0, 100, 80);
        ctx.drawImage(img, 0, 0, 100, 80);
        if (FILTERS[index] !== 'none') {
          applyFilter(ctx, FILTERS[index]);
        }
      };
    });
  }, [images]);

  return (
    <div className="flex justify-center flex-wrap gap-6 mt-8">
      {FILTERS.map((f, index) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`flex flex-col items-center px-3 py-2 rounded-xl shadow-md transition-all ${
            selected === f
              ? 'border-4 border-teal-600 bg-white'
              : 'border border-gray-300 bg-white hover:border-teal-400'
          }`}
        >
          <canvas ref={(el) => (previewRefs.current[index] = el)} className="rounded mb-2" />
          <span className="text-sm font-semibold text-teal-700">{f.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
};

export default FilterBarWithPreview;