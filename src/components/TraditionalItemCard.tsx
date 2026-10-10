import React from "react";
import { WardrobeItem } from "../data/wardrobe";
import { Check, ShieldCheck } from "lucide-react";
import { playTingSound } from "../utils/soundEffects";
import { WardrobeItemAsset } from "./WardrobeItemAsset";

interface Props {
  item: WardrobeItem;
  isEquipped: boolean;
  currentColor?: string;
  gender?: "nu" | "nam";
  onEquip: (item: WardrobeItem) => void;
  onUnequip: (item: WardrobeItem) => void;
}

export const TraditionalItemCard: React.FC<Props> = ({
  item,
  isEquipped,
  currentColor,
  gender = "nu",
  onEquip,
  onUnequip
}) => {
  return (
    <div
      className={`min-h-[230px] rounded-2xl p-3 border-2 flex flex-col justify-between shadow-xs transition-all select-none ${
        isEquipped
          ? "bg-emerald-50/90 border-emerald-600 ring-2 ring-emerald-300 shadow-md"
          : "bg-white border-stone-200 hover:border-emerald-300 hover:shadow-md"
      }`}
    >
      {/* Top Row: Layer Badge & Dynasty */}
      <div className="flex items-center justify-between gap-1.5">
        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
          {item.badge}
        </span>
        <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md truncate max-w-[130px]">
          {item.dynastyOrVibe}
        </span>
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
          <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
            {item.desc}
          </p>
        </div>
      </div>

      {/* Cultural Rule snippet if available */}
      {item.culturalRule && (
        <div className="p-1.5 rounded-xl bg-stone-50 border border-stone-200/80 text-[10px] text-stone-600 flex items-start gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
          <span className="line-clamp-1 italic">{item.culturalRule}</span>
        </div>
      )}

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
  );
};
