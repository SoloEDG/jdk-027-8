export type ElementKind = "text" | "sticker";

export type CanvasSize = {
  id: string;
  label: string;
  width: number;
  height: number;
  ratio: string;
};

export type Layer = {
  id: string;
  kind: ElementKind;
  name: string;
  content: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  color: string;
  fontSize: number;
  opacity: number;
};

export type BackgroundAsset = {
  id: string;
  label: string;
  style: string;
  accent: string;
};

export type StickerAsset = {
  id: string;
  label: string;
  glyph: string;
  color: string;
};

export type Preset = {
  id: string;
  label: string;
  description: string;
  canvas: CanvasSize;
  backgroundId: string;
  positions: { x: number; y: number; scale: number; rotation: number }[];
};
