import React from 'react';

const PhotoStrip = ({ images, filter, customText }) => {
  const filterStyles = {
    none: '',
    sepia: 'sepia(1)',
    bw: 'grayscale(1)',
    invert: 'invert(1)',
    cool: 'contrast(1.1) hue-rotate(180deg)',
    warm: 'contrast(1.1) hue-rotate(-20deg)',
  };

  return (
    <div className="bg-black p-3 rounded-xl shadow-2xl w-44 flex flex-col items-center space-y-2">
      {Array.from({ length: 5 }).map((_, idx) => (
        <div key={idx} className="w-full">
          <div className="w-full h-28 bg-black rounded-md overflow-hidden border border-gray-700">
            {images[idx] && (
              <img
                src={images[idx]}
                alt={`Captured ${idx}`}
                className="w-full h-full object-cover"
                style={{ filter: filterStyles[filter] }}
              />
            )}
          </div>
          {idx < 4 && <div className="h-2 bg-black w-full my-1" />}
        </div>
      ))}
      {customText && (
        <div className="text-white text-xs text-center font-semibold mt-2">
          {customText}
        </div>
      )}
    </div>
  );
};

export default PhotoStrip;