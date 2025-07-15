import React, { useState, useEffect } from 'react';
import WebcamCapture from './components/WebcamCapture';
import StripCanvasPreview from './components/StripCanvasPreview';
import FilterBarWithPreview from './components/FilterBarWithPreview'; // 👈 updated component
import TextOverlayInput from './components/TextOverlayInput';
import StickerPanel from './components/StickerPanel';
import { createStripWithText } from './utils/imageUtils';
import { THEMES } from './utils/themeConfig';
import './styles/tailwind.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [customText, setCustomText] = useState('');
  const [stickers, setStickers] = useState([]);
  const [theme, setTheme] = useState('none');
  const [filter, setFilter] = useState('none');
  const [boothStarted, setBoothStarted] = useState(false);

  useEffect(() => {
    if (theme !== 'none') {
      setFilter(THEMES[theme].canvasFilter);
    }
  }, [theme]);

  const handleCapture = (img) => {
    if (images.length < 5) {
      setImages((prev) => [...prev, img]);
    }
  };

  const handleDownload = async () => {
    const stripCanvas = await createStripWithText(images, filter, customText, stickers, 3);
    const link = document.createElement('a');
    link.download = 'photostrip.png';
    link.href = stripCanvas;
    link.click();
  };

  const handleStartBooth = () => {
    setBoothStarted(true);
  };

  return (
    <div className="relative min-h-screen overflow-y-auto">
      {/* Background */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-center bg-no-repeat bg-[length:100%_auto] -z-10 transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: THEMES[theme].background
            ? `url('${THEMES[theme].background}')`
            : `url('/assets/none-bg.jpg')`,
          filter: THEMES[theme].filter,
        }}
      />
      <div className="fixed inset-0 bg-white/10 -z-10" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen p-6 space-y-6">
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          disabled={boothStarted}
          className={`bg-white rounded px-3 py-1 shadow-md font-semibold text-teal-700 transition-opacity duration-700 ease-in-out ${
            boothStarted ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {Object.entries(THEMES).map(([key, value]) => (
            <option key={key} value={key}>
              {value.name}
            </option>
          ))}
        </select>

        <h1
          className="text-5xl text-black font-bold"
          style={{ fontFamily: THEMES[theme].font }}
        >
          📸 Photobooth
        </h1>

        {images.length < 5 && (
          <WebcamCapture
            onCapture={handleCapture}
            currentIndex={images.length}
            liveFilter={THEMES[theme].liveFilter}
            theme={theme}
            onStart={handleStartBooth}
          />
        )}

        {images.length > 0 && (
          <>
            <StripCanvasPreview
              images={images}
              theme={theme}
              customText={customText}
              stickers={stickers}
              setStickers={setStickers}
              filter={filter}

            />
            <StickerPanel />
          </>
        )}

        {images.length === 5 && (
          <>
            <TextOverlayInput value={customText} onChange={setCustomText} />
            {theme === 'none' && (
              <FilterBarWithPreview
                selected={filter}
                onChange={setFilter}
                images={images}
              />
            )}
            <button
              onClick={handleDownload}
              className="mt-4 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-full shadow-lg"
            >
              💾 Download Strip
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;