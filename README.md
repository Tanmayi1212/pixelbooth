

## 🎉 PixelBooth – AI-Powered Photobooth Web App

A fully interactive photobooth app built with React and Canvas, featuring real-time filters, stickers, countdown captures, and downloadable filmstrip-style layouts.

---

## Features

- 📸 **Live Photo Capture** – Snap up to 5 shots with countdown + flash  
- 🎨 **Theme Selector** – Choose styles like Retro, Neon, or go custom with “None”  
- 🖌️ **Filter Engine** – Apply effects like BW, Sepia, Cool, or Warm (when using custom mode)  
- 🧢 **Sticker Panel** – Drag, rotate, and place themed stickers on your strip  
- 🎞️ **Live Strip Preview** – Renders with black border, sprocket holes, and bottom text  
- 💾 **Download Your Strip** – Exports a final PNG photostrip that mirrors your preview  

---

## Tech Stack

- React + JSX  
- Canvas API  
- TailwindCSS  
- Vercel for hosting  

---

## Setup Instructions

```bash
git clone https://github.com/Tanmayi1212/pixelbooth.git
cd pixelbooth
npm install
npm start
````

---

## Customization Guide

* To add a new theme, update `themeConfig.js` with styles and assets
* For new filters, extend `filters.js` with pixel logic
* Stickers can be added via `StickerPanel.jsx` with drag/drop rendering

---

## Known Issues

* Auto-glasses placement via face landmarks is a WIP
* Theme filters override custom filter logic except in "None" mode

---

## License

MIT — Free to fork, remix, and deploy

---

## 🙌 Creator

Crafted with passion by [Tanmayi](https://github.com/Tanmayi1212)
Inspired by vintage reels, reimagined for the web 💫

```
