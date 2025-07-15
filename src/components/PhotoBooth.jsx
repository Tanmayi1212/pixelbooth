import React, { useState } from 'react';
import WebcamCapture from './WebcamCapture';
import PhotoStripPreview from './PhotoStripPreview';
import FilterSelector from './FilterSelector';
import BackgroundFramePicker from './BackgroundFramePicker';
import StickerPropPanel from './StickerPropPanel';
import TextLogoEditor from './TextLogoEditor';
import DownloadShareBar from './DownloadShareBar';

const PhotoBooth = () => {
  const [photos, setPhotos] = useState([]);
  const [filters, setFilters] = useState(Array(5).fill('none'));
  const [background, setBackground] = useState(null);
  const [frame, setFrame] = useState(null);
  const [stickers, setStickers] = useState([]);
  const [textLogo, setTextLogo] = useState({ text: '', logo: null });

  return (
    <div className="container mx-auto py-8">
      <WebcamCapture photos={photos} setPhotos={setPhotos} />
      <FilterSelector filters={filters} setFilters={setFilters} />
      <BackgroundFramePicker setBackground={setBackground} setFrame={setFrame} />
      <StickerPropPanel stickers={stickers} setStickers={setStickers} />
      <TextLogoEditor textLogo={textLogo} setTextLogo={setTextLogo} />
      <PhotoStripPreview
        photos={photos}
        filters={filters}
        background={background}
        frame={frame}
        stickers={stickers}
        textLogo={textLogo}
      />
      <DownloadShareBar />
    </div>
  );
};

export default PhotoBooth;
