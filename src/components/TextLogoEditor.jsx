import React from 'react';

const TextLogoEditor = ({ textLogo, setTextLogo }) => (
  <div className="mb-4">
    <label className="block font-bold mb-1">Custom Text</label>
    <input
      type="text"
      value={textLogo.text}
      onChange={e => setTextLogo({ ...textLogo, text: e.target.value })}
      className="px-2 py-1 rounded w-64"
      placeholder="Add your event name, date, etc."
    />
    <div className="mt-2">
      <label className="block font-bold mb-1">Logo (optional)</label>
      <input
        type="file"
        accept="image/*"
        onChange={e => setTextLogo({ ...textLogo, logo: e.target.files[0] })}
      />
    </div>
  </div>
);

export default TextLogoEditor;
