import React from 'react';

const TextOverlayInput = ({ value, onChange }) => {
  return (
    <div className="mt-4 text-center">
      <input
        type="text"
        placeholder="Add your message here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-72 px-4 py-2 rounded-full border-2 border-pink-300 shadow-inner text-center text-pink-700 font-semibold placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
    </div>
  );
};

export default TextOverlayInput;