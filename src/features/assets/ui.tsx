import type { Dispatch, SetStateAction } from "react";
import { Image, Sparkles } from "lucide-react";
import { stickers } from "@/shared/defaults";
import type { BackgroundAsset, Layer } from "@/shared/types";

type AssetPanelProps = {
  background: BackgroundAsset;
  backgroundOptions: BackgroundAsset[];
  onBackgroundChange: (asset: BackgroundAsset) => void;
  onUpload: (file: File) => void;
  onAddSticker: (sticker: { label: string; glyph: string; color: string }) => void;
  setLayers: Dispatch<SetStateAction<Layer[]>>;
};

export function AssetPanel({ background, backgroundOptions, onBackgroundChange, onUpload, onAddSticker }: AssetPanelProps) {
  return (
    <aside className="side-panel asset-panel">
      <div className="panel-heading"><div><span className="eyebrow">01 / ASSETS</span><h2>素材库</h2></div><Image size={17} /></div>
      <section className="asset-section">
        <div className="section-label"><span>底图</span><label className="text-button upload-button">上传<input type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0]; if (file) onUpload(file); event.currentTarget.value = ""; }} /></label></div>
        <div className="background-grid">
          {backgroundOptions.map((item) => <button key={item.id} className={`background-swatch ${background.id === item.id ? "active" : ""}`} onClick={() => onBackgroundChange(item)} style={{ background: item.style }} aria-label={`选择 ${item.label}`}><span>{item.label}</span></button>)}
        </div>
      </section>
      <section className="asset-section">
        <div className="section-label"><span>贴纸</span><span className="muted">点击添加</span></div>
        <div className="sticker-grid">
          {stickers.map((sticker) => <button key={sticker.id} className="sticker-button" onClick={() => onAddSticker(sticker)}><span style={{ color: sticker.color }}>{sticker.glyph}</span><small>{sticker.label}</small></button>)}
        </div>
      </section>
      <div className="asset-note"><Sparkles size={16} /><span>每个元素都能在画布上继续编辑。</span></div>
    </aside>
  );
}
