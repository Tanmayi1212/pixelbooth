import React from 'react';

const DownloadShareBar = ({ stripDataUrl }) => {
  const downloadImage = () => {
    const link = document.createElement('a');
    link.download = 'photostrip.png';
    link.href = stripDataUrl;
    link.click();
  };

  return (
    <div className="mt-6 flex justify-center">
      <button
        onClick={downloadImage}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow-lg"
      >
        💾 Download Strip
      </button>
    </div>
  );
};

export default DownloadShareBar;