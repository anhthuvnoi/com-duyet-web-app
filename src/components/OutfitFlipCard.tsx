import React from "react";
import { Outfit } from "../data/outfits";
import { CheckCircle2, RotateCw, Sparkles, AlertTriangle, ShieldCheck } from "lucide-react";
import { playFlipSound, playTingSound } from "../utils/soundEffects";

interface Props {
  outfit: Outfit;
  isSelected: boolean;
  isFlipped: boolean;
  onSelect: () => void;
  onFlip: () => void;
}

export const OutfitFlipCard: React.FC<Props> = ({
  outfit,
  isSelected,
  isFlipped,
  onSelect,
  onFlip
}) => {
  return (
    <div className="perspective-1000 h-[26rem] w-full">
      <div
        className={`relative w-full h-full duration-500 transform-style-3d cursor-pointer ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={() => {
          playFlipSound();
          onFlip();
        }}
      >
        {/* ================= MẶT TRƯỚC ================= */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl p-3 border-2 flex flex-col justify-between backface-hidden bg-white shadow-sm transition-all ${
            isSelected
              ? "border-emerald-600 ring-2 ring-emerald-300 shadow-md"
              : "border-emerald-100 hover:border-emerald-300"
          }`}
        >
          {/* Ảnh & Score Badge */}
          <div className="relative h-56 rounded-xl overflow-hidden bg-emerald-50">
            <img
              src={outfit.img}
              alt={outfit.name}
              className="w-full h-full object-contain object-center transition-transform duration-500 hover:scale-105"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80";
              }}
            />
            {/* Điểm chuẩn di sản */}
            <span className="absolute top-2 right-2 bg-black/70 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full backdrop-blur-sm flex items-center gap-1 border border-white/10">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
              <span>{outfit.score}/10</span>
            </span>

            {/* Triều đại */}
            <span className="absolute bottom-2 left-2 bg-emerald-950/80 text-emerald-100 text-[9px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-sm">
              {outfit.dynasty}
            </span>
          </div>

          {/* Tiêu đề & mô tả ngắn */}
          <div className="pt-1">
            <div className="font-bold text-emerald-950 text-xs sm:text-sm flex items-center justify-between">
              <span className="truncate">{outfit.name}</span>
              {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-1" />}
            </div>
            <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
              {outfit.desc}
            </p>
          </div>

          {/* Nút hành động */}
          <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
                playTingSound();
                onSelect();
              }}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                isSelected
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
              }`}
            >
              {isSelected ? "Đang chọn bộ này" : "Mặc bộ này"}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                playFlipSound();
                onFlip();
              }}
              className="px-2 py-1.5 rounded-xl text-[10px] text-emerald-700 bg-slate-50 hover:bg-emerald-50 border border-slate-200 flex items-center gap-1 font-semibold"
              title="Lật thẻ xem lưu ý văn hóa"
            >
              <RotateCw className="w-3 h-3 text-emerald-600" />
              <span>Lật</span>
            </button>
          </div>
        </div>

        {/* ================= MẶT SAU ================= */}
        <div className="absolute inset-0 w-full h-full rounded-2xl p-3.5 border-2 border-emerald-500 bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-900 text-white rotate-y-180 backface-hidden flex flex-col justify-between overflow-y-auto text-left shadow-lg">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-emerald-700/60 pb-1.5">
              <span className="text-xs font-black text-amber-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                {outfit.name}
              </span>
              <span className="text-[10px] text-emerald-200">Quy chuẩn cổ phục</span>
            </div>

            {/* Cấu tạo mảnh ghép */}
            {outfit.layers && (
              <div className="text-[10px] bg-black/40 p-2 rounded-lg border border-emerald-500/30 space-y-1">
                <span className="font-bold text-emerald-300 block">🧩 Mảnh ghép cấu tạo:</span>
                <div className="grid grid-cols-1 gap-0.5 text-slate-200">
                  <div>• <strong>Áo chính:</strong> {outfit.layers.outerwear}</div>
                  {outfit.layers.innerwear && <div>• <strong>Áo lót/Yếm:</strong> {outfit.layers.innerwear}</div>}
                  <div>• <strong>Quần/Váy:</strong> {outfit.layers.bottom}</div>
                  {outfit.layers.waistband && <div>• <strong>Đai lưng:</strong> {outfit.layers.waistband}</div>}
                  <div>• <strong>Đầu & Giày:</strong> {outfit.layers.headwear} • {outfit.layers.footwear}</div>
                </div>
              </div>
            )}

            {/* Cách mặc chuẩn */}
            <div className="text-[11px] leading-relaxed">
              <span className="font-bold text-emerald-200">✨ Cách mặc chuẩn:</span>{" "}
              <span className="text-emerald-50">{outfit.correctWay}</span>
            </div>

            {/* Khóa gen cốt lõi */}
            <div className="text-[11px] leading-relaxed bg-emerald-900/80 p-2 rounded-lg border border-emerald-600/40">
              <span className="font-bold text-amber-200">🔒 Khóa gen:</span>{" "}
              <span className="text-slate-100">{outfit.coreRule}</span>
            </div>

            {/* Cảnh báo & Kiêng kỵ */}
            <div className="text-[11px] leading-relaxed text-amber-200 flex items-start gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Kiêng kỵ:</strong> {outfit.note}
              </span>
            </div>
          </div>

          {/* Lật lại */}
          <div className="pt-2 text-center border-t border-emerald-800 text-[10px] text-emerald-300 font-medium flex items-center justify-center gap-1">
            <RotateCw className="w-3 h-3" />
            <span>Bấm vào thẻ để quay về mặt trước</span>
          </div>
        </div>
      </div>
    </div>
  );
};
