import type { BackgroundAsset, CanvasSize, Layer, Preset, StickerAsset } from "./types";

export const canvasSizes: CanvasSize[] = [
  { id: "square", label: "正方形", width: 1080, height: 1080, ratio: "1:1" },
  { id: "portrait", label: "竖版海报", width: 1080, height: 1350, ratio: "4:5" },
  { id: "story", label: "社媒故事", width: 1080, height: 1920, ratio: "9:16" },
  { id: "wide", label: "横幅", width: 1600, height: 900, ratio: "16:9" }
];

export const backgrounds: BackgroundAsset[] = [
  { id: "afterglow", label: "Afterglow", accent: "#ffcc66", style: "linear-gradient(135deg, #19172e 0%, #4b2469 52%, #e46b55 100%)" },
  { id: "mint", label: "Soft Mint", accent: "#c6f6d5", style: "linear-gradient(145deg, #113c44 0%, #1d776c 50%, #d3eaa2 100%)" },
  { id: "paper", label: "Newsprint", accent: "#f4d9aa", style: "linear-gradient(135deg, #453d35 0%, #8e6c4f 46%, #e5c999 100%)" },
  { id: "signal", label: "Signal Red", accent: "#ffe4d6", style: "linear-gradient(135deg, #521a28 0%, #b62e4d 52%, #f08761 100%)" }
];

export const stickers: StickerAsset[] = [
  { id: "spark", label: "火花", glyph: "✦", color: "#ffdc66" },
  { id: "heart", label: "爱心", glyph: "♥", color: "#ff6d89" },
  { id: "arrow", label: "箭头", glyph: "➜", color: "#a7e7ff" },
  { id: "wow", label: "惊叹", glyph: "!", color: "#fff4db" },
  { id: "sun", label: "太阳", glyph: "☼", color: "#ffd66b" },
  { id: "dot", label: "圆点", glyph: "●", color: "#a6ffdc" }
];

export const presets: Preset[] = [
  {
    id: "headline",
    label: "主标题",
    description: "标题上置，贴纸做视觉锚点",
    canvas: canvasSizes[0],
    backgroundId: "afterglow",
    positions: [{ x: 50, y: 22, scale: 1, rotation: 0 }, { x: 78, y: 74, scale: 1.1, rotation: -12 }, { x: 18, y: 78, scale: 0.8, rotation: 10 }]
  },
  {
    id: "editorial",
    label: "杂志切片",
    description: "对角线留白，适合长句",
    canvas: canvasSizes[1],
    backgroundId: "paper",
    positions: [{ x: 31, y: 72, scale: 0.92, rotation: -4 }, { x: 72, y: 22, scale: 1.15, rotation: 14 }, { x: 80, y: 77, scale: 0.72, rotation: 8 }]
  },
  {
    id: "story",
    label: "故事卡片",
    description: "竖屏节奏，内容保持在安全区",
    canvas: canvasSizes[2],
    backgroundId: "mint",
    positions: [{ x: 50, y: 47, scale: 1.08, rotation: 0 }, { x: 15, y: 15, scale: 0.8, rotation: -15 }, { x: 84, y: 84, scale: 0.8, rotation: 10 }]
  }
];

export const defaultLayers: Layer[] = [
  { id: "copy-1", kind: "text", name: "主文案", content: "今天也要发光", x: 50, y: 23, scale: 1, rotation: -2, color: "#fff7e8", fontSize: 56, opacity: 1 },
  { id: "copy-2", kind: "text", name: "副文案", content: "small wins, big energy", x: 50, y: 33, scale: 0.58, rotation: 0, color: "#ffd68a", fontSize: 22, opacity: 0.92 },
  { id: "sticker-1", kind: "sticker", name: "火花", content: "✦", x: 78, y: 73, scale: 1.1, rotation: -12, color: "#ffdc66", fontSize: 80, opacity: 1 }
];
