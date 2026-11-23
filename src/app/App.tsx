import { useMemo, useState } from "react";
import { Check, ChevronDown, History, Menu, MoreHorizontal, Redo2, Save, Undo2 } from "lucide-react";
import { AssetPanel } from "@/features/assets";
import { CanvasStage, LayerPanel, PresetStrip, applyPreset } from "@/features/composition";
import { ExportPanel, downloadPng } from "@/features/export";
import { backgrounds, canvasSizes, defaultLayers, presets } from "@/shared/defaults";
import type { BackgroundAsset, CanvasSize, Layer, Preset } from "@/shared/types";

const makeId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;

export default function App() {
  const [background, setBackground] = useState<BackgroundAsset>(backgrounds[0]);
  const [backgroundOptions, setBackgroundOptions] = useState<BackgroundAsset[]>(backgrounds);
  const [layers, setLayers] = useState<Layer[]>(defaultLayers);
  const [selectedId, setSelectedId] = useState<string | null>(defaultLayers[0].id);
  const [activePreset, setActivePreset] = useState("headline");
  const [exportSize, setExportSize] = useState<CanvasSize>(canvasSizes[0]);
  const [saved, setSaved] = useState(false);
  const selectedIndex = layers.findIndex((layer) => layer.id === selectedId);
  const selected = layers[selectedIndex];
  const projectLabel = useMemo(() => `${layers.filter((layer) => layer.kind === "text").length} 个文字 · ${layers.filter((layer) => layer.kind === "sticker").length} 个贴纸`, [layers]);

  const updateLayer = (id: string, patch: Partial<Layer>) => setLayers((current) => current.map((layer) => layer.id === id ? { ...layer, ...patch } : layer));
  const addText = () => { const layer: Layer = { id: makeId("text"), kind: "text", name: "新文字", content: "输入你的句子", x: 50, y: 52, scale: 0.72, rotation: 0, color: "#fff7e8", fontSize: 44, opacity: 1 }; setLayers((current) => [...current, layer]); setSelectedId(layer.id); };
  const addSticker = (sticker: { label: string; glyph: string; color: string }) => { const layer: Layer = { id: makeId("sticker"), kind: "sticker", name: sticker.label, content: sticker.glyph, x: 50, y: 68, scale: 0.82, rotation: 0, color: sticker.color, fontSize: 80, opacity: 1 }; setLayers((current) => [...current, layer]); setSelectedId(layer.id); };
  const addBackground = (file: File) => { const asset: BackgroundAsset = { id: makeId("upload"), label: file.name.replace(/\.[^/.]+$/, "").slice(0, 16) || "上传底图", accent: "#ffffff", style: `url("${URL.createObjectURL(file)}") center / cover no-repeat` }; setBackgroundOptions((current) => [...current, asset]); setBackground(asset); };
  const moveLayer = (direction: "up" | "down") => { if (selectedIndex < 0) return; const next = direction === "up" ? selectedIndex + 1 : selectedIndex - 1; if (next < 0 || next >= layers.length) return; setLayers((current) => { const copy = [...current]; [copy[selectedIndex], copy[next]] = [copy[next], copy[selectedIndex]]; return copy; }); };
  const removeSelected = () => { if (!selected) return; setLayers((current) => current.filter((layer) => layer.id !== selected.id)); setSelectedId(layers[selectedIndex - 1]?.id ?? layers[selectedIndex + 1]?.id ?? null); };
  const selectPreset = (preset: Preset) => { setLayers((current) => applyPreset(current, preset)); setBackground(backgrounds.find((item) => item.id === preset.backgroundId) ?? backgrounds[0]); setExportSize(preset.canvas); setActivePreset(preset.id); };
  const exportArtwork = () => downloadPng({ background, layers, size: exportSize });

  return <div className="app-shell">
    <header className="topbar"><div className="brand"><span className="brand-mark">P</span><span>POSTURE</span><span className="brand-divider" /><span className="workspace-name">情绪海报工作台</span></div><div className="project-status"><span className="status-dot" />{projectLabel}<span className="status-divider" />自动保存已开启</div><div className="top-actions"><button className="icon-button" aria-label="撤销"><Undo2 size={17} /></button><button className="icon-button" aria-label="重做"><Redo2 size={17} /></button><button className="save-button" onClick={() => { setSaved(true); window.setTimeout(() => setSaved(false), 1800); }}>{saved ? <Check size={16} /> : <Save size={16} />}<span>{saved ? "已保存" : "保存"}</span></button><button className="icon-button" aria-label="更多"><MoreHorizontal size={18} /></button><button className="avatar">LC</button></div></header>
    <div className="mobile-toolbar"><button className="icon-button"><Menu size={18} /></button><span>POSTURE / 工作区</span><button className="icon-button"><MoreHorizontal size={18} /></button></div>
    <main className="workspace"><AssetPanel background={background} backgroundOptions={backgroundOptions} onBackgroundChange={setBackground} onUpload={addBackground} onAddSticker={addSticker} setLayers={setLayers} /><section className="canvas-column"><div className="canvas-toolbar"><div><span className="eyebrow">CURRENT BOARD</span><h1>Weekend moodboard <ChevronDown size={18} /></h1></div><div className="canvas-toolbar-actions"><button className="toolbar-button"><History size={15} />版本</button><button className="toolbar-button">100%</button><button className="toolbar-button">适配画布</button></div></div><div className="canvas-wrap"><CanvasStage background={background} layers={layers} selectedId={selectedId} onSelect={setSelectedId} onChange={updateLayer} /></div><PresetStrip activeId={activePreset} onApply={selectPreset} /></section><section className="right-column"><LayerPanel layers={layers} selectedId={selectedId} onSelect={setSelectedId} onChange={updateLayer} onRemove={removeSelected} onAddText={addText} onMove={moveLayer} /><ExportPanel sizes={canvasSizes} selected={exportSize} onChange={setExportSize} onExport={exportArtwork} /></section></main>
  </div>;
}
