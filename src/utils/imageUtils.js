import { applyFilter } from './filters';

export const createStripWithText = async (images, filter, customText, stickers = [], scale = 1) => {
  const stripWidth = 360;
  const imageHeight = 220;
  const dividerHeight = 10;
  const topPadding = 20;
  const textHeight = 40;
  const extraTail = 40;
  const totalHeight = topPadding + images.length * (imageHeight + dividerHeight) - dividerHeight + textHeight;

  const borderSize = 20;
  const canvasWidth = (stripWidth + borderSize * 2) * scale;
  const canvasHeight = (totalHeight + borderSize + extraTail) * scale;

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');

  ctx.scale(scale, scale);

  // Outer black background
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvasWidth / scale, canvasHeight / scale);

  // Draw each image
  for (let i = 0; i < images.length; i++) {
    const img = new Image();
    img.src = images[i];
    await new Promise((res) => (img.onload = res));

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = stripWidth;
    tempCanvas.height = imageHeight;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(img, 0, 0, stripWidth, imageHeight);

    if (filter !== 'none') {
      applyFilter(tempCtx, filter);
    }

    const y = borderSize + topPadding + i * (imageHeight + dividerHeight);
    ctx.drawImage(tempCanvas, borderSize, y);
  }

  // Draw sprocket holes
  const holeWidth = 10;
  const holeHeight = 20;
  const holeSpacing = 40;
  const holeStartY = borderSize + 5;

  for (let y = holeStartY; y < canvasHeight / scale - 20; y += holeSpacing) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(6, y, holeWidth, holeHeight); // Left
    ctx.fillRect(stripWidth + borderSize + 6, y, holeWidth, holeHeight); // Right
  }

  // Draw stickers
  for (const sticker of stickers) {
    const img = new Image();
    img.src = sticker.src;
    await new Promise((res) => (img.onload = res));

    ctx.save();
    const centerX = sticker.x + sticker.width / 2;
    const centerY = sticker.y + sticker.height / 2;
    ctx.translate(centerX, centerY);
    ctx.rotate(sticker.rotation || 0);
    ctx.drawImage(
      img,
      -sticker.width / 2,
      -sticker.height / 2,
      sticker.width,
      sticker.height
    );
    ctx.restore();
  }

  // Add custom text
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 20px Fredoka';
  ctx.textAlign = 'center';
  ctx.fillText(customText, canvasWidth / (2 * scale), canvasHeight / scale - 20);

  return canvas.toDataURL('image/png');
};