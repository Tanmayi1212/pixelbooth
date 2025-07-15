import React, { useEffect, useRef } from 'react';
import { applyFilter } from '../utils/filters';

const StripCanvasPreview = ({ images, theme, customText, stickers, setStickers, filter }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log('🎯 Rendering preview strip');
    if (!canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const stripWidth = 360;
    const imageHeight = 220;
    const dividerHeight = 10;
    const topPadding = 20;
    const textHeight = 40;
    const extraTail = 40;
    const borderSize = 20;
    const totalHeight =
      topPadding + images.length * (imageHeight + dividerHeight) - dividerHeight + textHeight;
    const canvasWidth = stripWidth + borderSize * 2;
    const canvasHeight = totalHeight + borderSize + extraTail;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    console.log('🧱 Canvas initialized:', { canvasWidth, canvasHeight });

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    console.log('🖤 Background drawn');

    images.forEach((src, i) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = src;

      img.onload = () => {
        console.log(`📷 Image ${i + 1} loaded`);

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = stripWidth;
        tempCanvas.height = imageHeight;
        const tempCtx = tempCanvas.getContext('2d');

        tempCtx.drawImage(img, 0, 0, stripWidth, imageHeight);
        console.log(`🖼 Image ${i + 1} drawn to temp canvas`);

        if (theme === 'none' && filter !== 'none') {
          console.log(`✨ Applying filter to image ${i + 1}:`, filter);
          applyFilter(tempCtx, filter);
          console.log(`✅ Filter applied to image ${i + 1}`);
        } else {
          console.log(`🚫 Skipping filter for image ${i + 1}`);
        }

        const y = borderSize + topPadding + i * (imageHeight + dividerHeight);
        ctx.drawImage(tempCanvas, borderSize, y);
        console.log(`📍 Image ${i + 1} drawn at y=${y}`);
      };
    });

    // Sprocket holes
    const holeWidth = 10;
    const holeHeight = 20;
    const holeSpacing = 40;
    const holeStartY = borderSize + 5;

    for (let y = holeStartY; y < canvasHeight - 20; y += holeSpacing) {
      ctx.fillStyle = '#fff';
      ctx.fillRect(6, y, holeWidth, holeHeight);
      ctx.fillRect(canvasWidth - 6 - holeWidth, y, holeWidth, holeHeight);
    }

    console.log('⚙️ Sprocket holes rendered');

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 20px Fredoka, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(customText, canvasWidth / 2, canvasHeight - 20);
    console.log('📝 Custom text rendered:', customText);
  }, [images, theme, customText, filter]);

  return (
    <div className="mt-6 inline-block">
      <canvas ref={canvasRef} className="rounded-xl shadow-xl" />
    </div>
  );
};

export default StripCanvasPreview;