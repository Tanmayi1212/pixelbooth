export const applyFilter = (ctx, filter) => {
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const data = imageData.data;

  switch (filter) {
    case 'sepia':
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        data[i]     = r * 0.393 + g * 0.769 + b * 0.189;
        data[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
        data[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
      }
      break;
    case 'bw':
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = data[i + 1] = data[i + 2] = avg;
      }
      break;
    case 'invert':
      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];       // R
        data[i + 1] = 255 - data[i + 1]; // G
        data[i + 2] = 255 - data[i + 2]; // B
      }
      break;
    case 'cool':
      for (let i = 0; i < data.length; i += 4) {
        data[i] *= 0.9;     // R
        data[i + 2] *= 1.1; // B
      }
      break;
    case 'warm':
      for (let i = 0; i < data.length; i += 4) {
        data[i] *= 1.1;     // R
        data[i + 2] *= 0.9; // B
      }
      break;
    default:
      break;
  }

  ctx.putImageData(imageData, 0, 0);
};