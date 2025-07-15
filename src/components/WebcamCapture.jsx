import React, { useRef, useEffect, useState } from 'react';
import { THEMES } from '../utils/themeConfig';

const CAPTURE_PROMPTS = [
  'Say Cheese!',
  'Big Smile!',
  'Goofy Face!',
  'Peace Sign!',
  'Final Shot!',
];

const WebcamCapture = ({ onCapture, currentIndex, liveFilter, theme, onStart }) => {
  const videoRef = useRef(null);
  const [countdown, setCountdown] = useState(0);
  const [flashVisible, setFlashVisible] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [promptText, setPromptText] = useState('');

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error('Camera access failed:', err);
      }
    };
    startCamera();
  }, []);

  const playShutterSound = () => {
    const audio = new Audio('/assets/shutter.mp3');
    audio.play().catch((err) => {
      console.warn('Shutter sound failed:', err.message);
    });
  };

  const startAutoCapture = () => {
    if (onStart) onStart(); // 🔐 Lock and fade the theme selector
    let shotCount = currentIndex;
    const snap = () => {
      setPromptText(CAPTURE_PROMPTS[shotCount] || '');
      setCountdown(3);
      let count = 3;

      const interval = setInterval(() => {
        count--;
        setCountdown(count);
        if (count === 0) {
          clearInterval(interval);
          setFlashVisible(true);
          playShutterSound();
          setTimeout(() => setFlashVisible(false), 300);
          setTimeout(() => {
            const video = videoRef.current;
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.filter = THEMES[theme].liveFilter;
            ctx.drawImage(video, 0, 0);
            onCapture(canvas.toDataURL());
            shotCount++;
            if (shotCount < 5) {
              setTimeout(() => snap(), 800);
            } else {
              setAutoMode(false);
              setPromptText('');
            }
          }, 200);
        }
      }, 1000);
    };
    snap();
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Prompt above the image */}
      {promptText && countdown > 0 && (
        <div className="mb-4 text-2xl font-semibold text-white bg-pink-600/80 px-4 py-2 rounded-xl z-30 animate-bounce">
          {promptText}
        </div>
      )}

      <div className="relative w-[320px] h-[240px] flex items-center justify-center">
        {/* Live Video */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover rounded shadow-lg"
          style={{ filter: THEMES[theme].liveFilter }}
        />

        {/* Flash */}
        {flashVisible && (
          <div className="absolute inset-0 bg-white opacity-80 animate-ping z-40 pointer-events-none transition-opacity duration-300" />
        )}

        {/* Countdown Overlay */}
        {countdown > 0 && (
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <div className="text-6xl font-bold text-white bg-black/75 px-6 py-4 rounded-full">
              {countdown}
            </div>
          </div>
        )}
      </div>

      {/* Button below image */}
      {!autoMode && (
        <button
          className="mt-4 bg-teal-500 text-white font-bold py-2 px-5 rounded shadow"
          onClick={() => {
            setAutoMode(true);
            startAutoCapture();
          }}
        >
          🎬 Start Booth
        </button>
      )}
    </div>
  );
};

export default WebcamCapture;