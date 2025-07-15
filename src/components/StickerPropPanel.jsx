import React from 'react';

const stickersList = [
  { name: 'Glasses', src: '/assets/stickers/glasses.png' },
  { name: 'Hat', src: '/assets/stickers/hat.png' },
  { name: 'Mustache', src: '/assets/stickers/mustache.png' }
];

const StickerPropPanel = ({ stickers, setStickers }) => {
  const addSticker = sticker => setStickers([...stickers, sticker]);
  return (
    <div className="mb-4">
      <h3 className="font-bold mb-2">Add Props</h3>
      <div className="flex">
        {stickersList.map(sticker => (
          <button
            key={sticker.name}
            onClick={() => addSticker(sticker)}
            className="mr-2"
            title={sticker.name}
          >
            <img src={sticker.src} alt={sticker.name} className="w-10 h-10" />
          </button>
        ))}
      </div>
      <div className="mt-2 text-sm text-gray-500">Props will appear on your strip (drag/drop not implemented in this starter).</div>
    </div>
  );
};

export default StickerPropPanel;
