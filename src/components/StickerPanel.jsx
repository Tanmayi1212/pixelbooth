import React from 'react';

const stickers = [
  { id: 'hat', src: '/assets/stickers/party-hat.png' },
  { id: 'glasses', src: '/assets/stickers/glasses.png' },
  { id: 'cute', src: '/assets/stickers/cute.png' },
  { id: 'mustache', src: '/assets/stickers/mustache.png' }
];

const StickerPanel = () => {
  return (
    <div className="flex gap-4 mt-4 justify-center flex-wrap">
      {stickers.map((sticker) => (
        <img
          key={sticker.id}
          src={sticker.src}
          alt={sticker.id}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('sticker', JSON.stringify(sticker));
          }}
          className="w-16 h-16 cursor-grab hover:scale-110 transition-transform"
        />
      ))}
    </div>
  );
};

export default StickerPanel;
