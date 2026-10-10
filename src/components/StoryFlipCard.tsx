import React, { useState } from "react";
import { getStoryForCostume, CostumeStory } from "../data/storyData";
import { RotateCw, BookOpen, Sparkles, Volume2, History, Lightbulb } from "lucide-react";
import { playFlipSound, playTingSound } from "../utils/soundEffects";

export interface StoryFlipCardProps {
  story?: CostumeStory;
  outfitIdOrKey?: string;
  gender: "nu" | "nam";
  recommendationScore?: number;
  isTopRecommended?: boolean;
  rank?: number;
  onSpeak?: (text: string) => void;
  onSelect?: (story: CostumeStory) => void;
  className?: string;
}

export const StoryFlipCard: React.FC<StoryFlipCardProps> = ({
  story: initialStory,
  outfitIdOrKey,
  gender,
  recommendationScore,
  isTopRecommended = false,
  rank,
  onSpeak,
  onSelect,
  className = ""
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const story: CostumeStory = initialStory || getStoryForCostume(outfitIdOrKey, gender);

  const handleReadStory = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onSpeak) return;
    const textToRead = `${story.name}. Nguồn gốc và lịch sử: ${story.history}. Câu chuyện thú vị: ${story.story}`;
    onSpeak(textToRead);
  };

  return (
    <div className={`shrink-0 w-[250px] sm:w-[270px] perspective-1000 select-none ${className}`}>
      <div
        onClick={() => {
          if (!isFlipped) {
            playFlipSound();
            setIsFlipped(true);
          }
        }}
        className={`relative w-full h-[235px] sm:h-[245px] duration-500 transform-style-3d transition-transform ${
          isFlipped ? "rotate-y-180 cursor-default" : "cursor-pointer"
        }`}
        title={isFlipped ? "Đang xem mặt sau thẻ" : "Nhấp để lật xem câu chuyện lịch sử trang phục"}
      >
        {/* ============================================================ */}
        {/* MẶT TRƯỚC (FRONT) */}
        {/* ============================================================ */}
        <div
          className={`absolute inset-0 w-full h-full max-h-full rounded-2xl p-3 border-2 backface-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden text-left ${
            isTopRecommended
              ? "border-amber-400 ring-2 ring-amber-300/80 bg-gradient-to-br from-amber-50 via-yellow-50/50 to-emerald-50 shadow-md"
              : "border-emerald-300/80 bg-gradient-to-br from-amber-50/90 via-stone-50 to-emerald-50"
          } ${
            isFlipped ? "z-0 pointer-events-none opacity-0" : "z-10 pointer-events-auto opacity-100"
          }`}
        >
          {/* Top Banner: Tag & Flip hint */}
          <div className="flex items-center justify-between gap-1.5 z-10 shrink-0">
            {isTopRecommended && recommendationScore !== undefined ? (
              <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 flex items-center gap-1 shadow-xs border border-amber-300">
                <Sparkles className="w-2.5 h-2.5 fill-amber-950 text-amber-950" />
                <span>CỐM ĐỀ CỬ • {recommendationScore}%</span>
              </span>
            ) : recommendationScore !== undefined ? (
              <span className="text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                <span>⭐ Phù hợp {recommendationScore}%</span>
              </span>
            ) : (
              <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-700 text-white flex items-center gap-1 shadow-2xs">
                <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                <span>THẺ CÂU CHUYỆN</span>
              </span>
            )}

            <span className="text-[9.5px] font-bold text-amber-900 bg-amber-100/90 border border-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
              <span>Chạm lật</span>
              <RotateCw className="w-2.5 h-2.5 text-amber-700" />
            </span>
          </div>

          {/* Middle: Thumbnail & Info */}
          <div className="flex items-center gap-2.5 my-auto z-10">
            {/* Thumbnail Image */}
            <div className="w-16 h-24 sm:w-18 sm:h-26 rounded-xl overflow-hidden shrink-0 border-2 border-emerald-500 shadow-xs bg-stone-100">
              <img
                src={story.thumbnail}
                alt={story.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Title & Teaser */}
            <div className="flex-1 min-w-0 text-left">
              <div className="text-[9px] font-bold text-stone-500 uppercase tracking-wider mb-0.5 truncate">
                ✦ {gender === "nu" ? "Cổ Phục Nữ" : "Cổ Phục Nam"} ✦
              </div>
              <h4 className="font-black text-xs sm:text-[13px] text-emerald-950 truncate mb-1">
                {story.name}
              </h4>
              <p className="text-[10px] text-stone-600 line-clamp-3 leading-snug">
                {story.history}
              </p>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 hover:text-emerald-800 mt-1">
                <BookOpen className="w-3 h-3 text-emerald-600" />
                <span className="truncate">Xem tích xưa</span>
              </div>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-1.5 border-t border-stone-200/80 flex items-center justify-between text-[9.5px] z-10 text-stone-500 shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                playTingSound();
                onSelect?.(story);
              }}
              className="py-1 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] flex items-center gap-1 shadow-2xs transition-all active:scale-95 cursor-pointer"
              title={`Mặc trang phục ${story.name} lên búp bê`}
            >
              <Sparkles className="w-2.5 h-2.5 text-amber-300" />
              <span>Mặc bộ này</span>
            </button>
            <span className="font-bold text-amber-800 flex items-center gap-1 shrink-0">
              <span>Lật thẻ</span>
              <RotateCw className="w-2.5 h-2.5" />
            </span>
          </div>

          {/* Background Decorative Pattern */}
          <div className="absolute -right-5 -bottom-5 w-24 h-24 rounded-full bg-emerald-200/20 pointer-events-none" />
          <div className="absolute -left-5 -top-5 w-20 h-20 rounded-full bg-amber-200/20 pointer-events-none" />
        </div>

        {/* ============================================================ */}
        {/* MẶT SAU (BACK) */}
        {/* ============================================================ */}
        <div
          className={`absolute inset-0 w-full h-full max-h-full rounded-2xl p-3 border-2 border-amber-400 bg-[#fdfbf7] backface-hidden rotate-y-180 shadow-md flex flex-col justify-between overflow-hidden text-left ${
            isFlipped ? "z-20 pointer-events-auto opacity-100" : "z-0 pointer-events-none opacity-0"
          }`}
        >
          {/* Header (Cố định phía trên) */}
          <div className="flex items-center justify-between pb-1.5 border-b border-amber-200 shrink-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-xs">📜</span>
              <h4 className="font-black text-[11px] sm:text-xs text-emerald-950 truncate max-w-[130px] sm:max-w-[150px]">
                {story.name}
              </h4>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {onSpeak && (
                <button
                  type="button"
                  onClick={handleReadStory}
                  className="p-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors cursor-pointer"
                  title="Nghe Cốm đọc câu chuyện"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  playFlipSound();
                  setIsFlipped(false);
                }}
                className="py-0.5 px-1.5 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 text-[9px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                title="Lật lại mặt trước"
              >
                <span>Lật lại</span>
                <RotateCw className="w-2 h-2" />
              </button>
            </div>
          </div>

          {/* Body Content with Independent Scroll Container */}
          <div
            className="my-1.5 flex-1 min-h-0 overflow-y-auto pr-1 space-y-1.5 text-[10px] leading-relaxed scrollbar-thin overscroll-contain"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* 1. NGUỒN GỐC & LỊCH SỬ */}
            <div className="p-2 bg-amber-50/90 border border-amber-200/90 rounded-xl">
              <div className="flex items-center gap-1 text-amber-900 font-bold text-[10px] mb-0.5">
                <History className="w-3 h-3 text-amber-700 shrink-0" />
                <span>Nguồn Gốc & Lịch Sử:</span>
              </div>
              <p className="text-[9.5px] text-stone-800 leading-snug font-normal">
                {story.history}
              </p>
            </div>

            {/* 2. CÂU CHUYỆN THÚ VỊ */}
            <div className="p-2 bg-emerald-50/90 border border-emerald-200/90 rounded-xl">
              <div className="flex items-center gap-1 text-emerald-900 font-bold text-[10px] mb-0.5">
                <Lightbulb className="w-3 h-3 text-emerald-700 shrink-0" />
                <span>Câu Chuyện Thú Vị:</span>
              </div>
              <p className="text-[9.5px] text-stone-800 leading-snug font-normal">
                {story.story}
              </p>
            </div>
          </div>

          {/* Fixed Footer: Nút "Chọn mặc đồ này" & Flip Close (Cố định ở đáy, độc lập với vùng cuộn) */}
          <div className="shrink-0 pt-1.5 border-t border-amber-200/90 bg-[#fdfbf7] flex flex-col gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                playTingSound();
                onSelect?.(story);
              }}
              className="w-full py-1.5 px-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-xl font-bold text-[11px] shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
              title={`Mặc trang phục ${story.name} lên búp bê`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Chọn mặc đồ này</span>
            </button>
            <div className="flex items-center justify-between text-[9px] text-stone-500">
              <span className="italic truncate">Cốm Duyệt • Giữ nếp xưa</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  playFlipSound();
                  setIsFlipped(false);
                }}
                className="font-bold text-amber-800 flex items-center gap-0.5 hover:underline cursor-pointer"
                title="Lật lại mặt trước"
              >
                <span>Đóng</span>
                <RotateCw className="w-2 h-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
