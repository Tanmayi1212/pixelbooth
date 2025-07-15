import React from 'react';

const backgrounds = [
  { name: 'None', value: null },
  { name: 'Retro Dots', value: '/assets/backgrounds/retro-dots.png' },
  { name: '80s Grid', value: '/assets/backgrounds/80s-grid.png' }
];
const frames = [
  { name: 'None', value: null },
  { name: 'Classic', value: '/assets/frames/classic-frame.png' }
];

const BackgroundFramePicker = ({ setBackground, setFrame }) => (
  <div className="mb-4 flex flex-wrap gap-4">
    <div>
      <label className="block font-bold mb-1">Background</label>
      <select onChange={e => setBackground(e.target.value)} className="px-2 py-1 rounded">
        {backgrounds.map(bg => (
          <option key={bg.name} value={bg.value || ''}>{bg.name}</option>
        ))}
      </select>
    </div>
    <div>
      <label className="block font-bold mb-1">Frame</label>
      <select onChange={e => setFrame(e.target.value)} className="px-2 py-1 rounded">
        {frames.map(f => (
          <option key={f.name} value={f.value || ''}>{f.name}</option>
        ))}
      </select>
    </div>
  </div>
);

export default BackgroundFramePicker;
