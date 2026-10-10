import React, { useState } from "react";
import { WardrobeItem } from "../data/wardrobe";
import { RotateCw, Check, Sparkles } from "lucide-react";
import { playFlipSound, playTingSound } from "../utils/soundEffects";
import { WardrobeItemAsset } from "./WardrobeItemAsset";

interface Props {
  item: WardrobeItem;
  isEquipped: boolean;
  currentColor?: string;
  gender?: "nu" | "nam";
  onEquip: (item: WardrobeItem) => void;
  onUnequip: (item: WardrobeItem) => void;
}

export const ModernFlipCard: React.FC<Props> = ({
  item,
  isEquipped,
  currentColor,
  gender = "nu",
  onEquip,
  onUnequip
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="perspective-1000 min-h-[230px] w-full select-none">
      <div
        className={`relative w-full h-full duration-500 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* ================= MẶT TRƯỚC ================= */}
        <div
          className={`w-full h-full rounded-2xl p-3 border-2 flex flex-col justify-between backface-hidden shadow-xs transition-all ${
            isEquipped
              ? "bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-300 shadow-md"
              : "bg-white border-stone-200 hover:border-emerald-300 hover:shadow-md"
          }`}
        >
          {/* Top Row: Layer Badge & Flip Button */}
          <div className="flex items-center justify-between gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
              {item.badge}
            </span>
            <button
              onClick={() => {
                playFlipSound();
                setIsFlipped(true);
              }}
              className="p-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
              title="Lật thẻ xem mẹo phối chéo cổ phục"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Gợi ý</span>
              <RotateCw className="w-2.5 h-2.5" />
            </button>
          </div>

          {/* Middle: Visual Thumbnail & Description */}
          <div className="flex items-center gap-3 my-1">
            <div className="w-20 h-20 bg-green-50 rounded-lg flex items-center justify-center shrink-0 border border-emerald-200/60 shadow-inner overflow-hidden p-1.5">
              <WardrobeItemAsset
                item={item}
                color={isEquipped ? currentColor : item.colorPreview || currentColor}
                gender={gender}
                className="w-full h-full transform scale-90 transition-transform duration-300 hover:scale-100"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate" title={item.name}>
                {item.name}
              </h4>
              <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                {item.dynastyOrVibe}
              </p>
              <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                {item.desc}
              </p>
            </div>
          </div>

          {/* Bottom Action: Mặc món này / Đang mặc */}
          <div className="pt-2 border-t border-stone-100 flex items-center gap-2">
            {isEquipped ? (
              <button
                onClick={() => {
                  playTingSound();
                  onUnequip(item);
                }}
                className="flex-1 py-1.5 px-3 rounded-xl text-xs font-bold bg-emerald-600 text-white flex items-center justify-center gap-1.5 shadow-xs hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Đang mặc (Bấm để tháo)</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  playTingSound();
                  onEquip(item);
                }}
                className="flex-1 py-1.5 px-3 rounded-xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 transition-all hover:shadow-xs cursor-pointer"
              >
                + Mặc món này
              </button>
            )}
          </div>
        </div>

        {/* ================= MẶT SAU (GỢI Ý PHỐI CHÉO) ================= */}
        <div className="absolute inset-0 w-full h-full rounded-2xl p-3.5 border-2 border-amber-300 bg-amber-50/95 flex flex-col justify-between backface-hidden rotate-y-180 shadow-md">
          <div>
            <div className="flex items-center justify-between pb-1.5 border-b border-amber-200">
              <span className="text-[11px] font-black text-amber-950 flex items-center gap-1">
                <span>💡 Bí Kíp Remix Gen Z</span>
              </span>
              <button
                onClick={() => {
                  playFlipSound();
                  setIsFlipped(false);
                }}
                className="p-1 rounded-lg bg-white text-stone-600 hover:text-stone-900 text-[10px] font-bold flex items-center gap-1 border border-amber-200 cursor-pointer"
              >
                <span>Đóng</span>
                <RotateCw className="w-2.5 h-2.5" />
              </button>
            </div>
            <div className="mt-2 text-xs text-amber-950 space-y-1.5 leading-relaxed">
              <div className="font-bold text-amber-900">{item.name}</div>
              <p className="text-[11px] text-slate-700 bg-white/80 p-2 rounded-xl border border-amber-200/60">
                {item.mixTip}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-amber-200/80 flex items-center gap-2">
            <button
              onClick={() => {
                playTingSound();
                setIsFlipped(false);
                if (isEquipped) {
                  onUnequip(item);
                } else {
                  onEquip(item);
                }
              }}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer ${
                isEquipped
                  ? "bg-stone-700 hover:bg-stone-800 text-white"
                  : "bg-amber-600 hover:bg-amber-700 text-white"
              }`}
            >
              {isEquipped ? "Đang mặc (Bấm để tháo)" : "Mặc thử ngay!"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
