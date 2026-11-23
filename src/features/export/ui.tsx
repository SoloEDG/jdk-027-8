import type { Dispatch, SetStateAction } from "react";
import { Download, FileImage, Maximize2 } from "lucide-react";
import type { BackgroundAsset, CanvasSize, Layer } from "@/shared/types";

type ExportPanelProps = { sizes: CanvasSize[]; selected: CanvasSize; onChange: Dispatch<SetStateAction<CanvasSize>>; onExport: () => void };

export function ExportPanel({ sizes, selected, onChange, onExport }: ExportPanelProps) {
  return <section className="export-panel"><div className="export-title"><div><span className="eyebrow">03 / DELIVERY</span><h2>导出设置</h2></div><FileImage size={17} /></div><div className="size-picker">{sizes.map((size) => <button key={size.id} className={selected.id === size.id ? "active" : ""} onClick={() => onChange(size)}><span>{size.ratio}</span><small>{size.label}</small></button>)}</div><div className="export-meta"><span><Maximize2 size={14} />{selected.width} × {selected.height}px</span><span>PNG · 当前背景</span></div><button className="export-button" onClick={onExport}><Download size={17} />导出图片</button></section>;
}

type PngExport = { background: BackgroundAsset; layers: Layer[]; size: CanvasSize };

export function downloadPng({ background, layers, size }: PngExport) {
  const canvas = document.createElement("canvas");
  canvas.width = size.width;
  canvas.height = size.height;
  const context = canvas.getContext("2d");
  if (!context) return;
  const colors: Record<string, [string, string]> = {
    afterglow: ["#19172e", "#e46b55"],
    mint: ["#113c44", "#d3eaa2"],
    paper: ["#453d35", "#e5c999"],
    signal: ["#521a28", "#f08761"]
  };
  const drawGradient = () => {
    const [start, end] = colors[background.id] ?? ["#202531", "#6678a8"];
    const gradient = context.createLinearGradient(0, 0, size.width, size.height);
    gradient.addColorStop(0, start);
    gradient.addColorStop(1, end);
    context.fillStyle = gradient;
    context.fillRect(0, 0, size.width, size.height);
  };
  const drawLayers = () => {
    const scale = size.width / 1080;
    layers.forEach((layer) => {
    context.save();
    context.translate((layer.x / 100) * size.width, (layer.y / 100) * size.height);
    context.rotate((layer.rotation * Math.PI) / 180);
    context.globalAlpha = layer.opacity;
    context.fillStyle = layer.color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = `${layer.kind === "text" ? "700" : "400"} ${layer.fontSize * scale}px ${layer.kind === "text" ? "DM Sans" : "Georgia"}`;
    context.fillText(layer.content, 0, 0);
    context.restore();
    });
  };
  const save = () => canvas.toBlob((blob) => {
    if (!blob) return;
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = `posture-${size.id}.png`;
    link.click();
    URL.revokeObjectURL(href);
  }, "image/png");
  const imageUrl = background.style.match(/^url\("([^"]+)"\)/)?.[1];
  if (imageUrl) {
    const image = document.createElement("img");
    image.onload = () => {
      const coverScale = Math.max(size.width / image.naturalWidth, size.height / image.naturalHeight);
      const width = image.naturalWidth * coverScale;
      const height = image.naturalHeight * coverScale;
      context.drawImage(image, (size.width - width) / 2, (size.height - height) / 2, width, height);
      drawLayers();
      save();
    };
    image.onerror = () => { drawGradient(); drawLayers(); save(); };
    image.src = imageUrl;
    return;
  }
  drawGradient();
  drawLayers();
  save();
}
