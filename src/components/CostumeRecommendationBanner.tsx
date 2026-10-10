/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Sparkles, CheckCircle2, ChevronRight, Volume2, Award } from "lucide-react";
import { RecommendationRankItem, OccasionType } from "../data/costumeRecommendation";
import { playTingSound } from "../utils/soundEffects";

interface Props {
  occasion: OccasionType;
  gender: "nu" | "nam";
  topRecommendations: RecommendationRankItem[];
  primaryRecommendation: RecommendationRankItem;
  secondaryRecommendation: RecommendationRankItem | null;
  onApplyOutfit: (storyId: string) => void;
  onSpeak?: (text: string) => void;
}

export const CostumeRecommendationBanner: React.FC<Props> = ({
  occasion,
  gender,
  topRecommendations,
  primaryRecommendation,
  secondaryRecommendation,
  onApplyOutfit,
  onSpeak
}) => {
  if (!primaryRecommendation) return null;

  const primary = primaryRecommendation;
  const secondary =
    secondaryRecommendation && secondaryRecommendation.score >= 80 && secondaryRecommendation.score !== primary.score
      ? secondaryRecommendation
      : null;

  const handleSpeakAdvice = () => {
    if (!onSpeak) return;
    const speech = `Cốm đề cử cho dịp ${occasion}: Trang phục phù hợp nhất là ${primary.costume.name} với độ phù hợp ${primary.score} phần trăm! ${primary.costume.vibeTip}`;
    onSpeak(speech);
  };

  return (
    <div className="mt-3 relative overflow-hidden rounded-2xl border-2 border-emerald-400 bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-700 text-white p-3.5 shadow-sm transition-all">
      {/* Background soft glow decoration */}
      <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
      <div className="absolute left-1/3 -top-10 w-24 h-24 bg-amber-300/15 rounded-full blur-lg pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Mascot recommendation title & primary badge */}
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 bg-amber-400 text-amber-950 font-black text-[11px] px-2.5 py-0.5 rounded-full shadow-xs">
              <Sparkles className="w-3.5 h-3.5 fill-amber-950" />
              <span>CỐM ĐỀ CỬ</span>
            </span>

            <span className="text-[11px] text-emerald-100 font-medium">
              cho dịp <strong className="text-white underline decoration-amber-300 underline-offset-2">{occasion}</strong> ({gender === "nu" ? "Nữ" : "Nam"}):
            </span>
          </div>

          {/* Primary Recommendation Headline */}
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm sm:text-base font-black tracking-tight text-white flex items-center gap-1.5">
              <span>✨ {primary.costume.name}</span>
            </h4>
            <span className="bg-white/20 backdrop-blur-xs text-amber-200 border border-amber-300/40 text-[11px] font-black px-2 py-0.5 rounded-lg shadow-2xs">
              Phù hợp {primary.score}%
            </span>

            {/* Secondary co-top option if applicable */}
            {secondary && (
              <span className="text-xs text-emerald-100 flex items-center gap-1 font-semibold">
                <span>hoặc</span>
                <button
                  type="button"
                  onClick={() => {
                    playTingSound();
                    onApplyOutfit(secondary.costume.storyId);
                  }}
                  className="bg-emerald-800/80 hover:bg-emerald-800 text-amber-100 border border-emerald-400/40 text-[11px] font-bold px-2 py-0.5 rounded-lg transition-colors cursor-pointer"
                  title={`Xem thêm ${secondary.costume.name} (${secondary.score}%)`}
                >
                  {secondary.costume.name} ({secondary.score}%)
                </button>
              </span>
            )}
          </div>

          {/* Cultural Tip snippet */}
          <p className="text-[11px] text-emerald-100 leading-relaxed italic line-clamp-2">
            💡 {primary.costume.vibeTip}
          </p>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
          {onSpeak && (
            <button
              type="button"
              onClick={handleSpeakAdvice}
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 transition-all cursor-pointer"
              title="Nghe Cốm đọc lời khuyên"
              aria-label="Nghe Cốm đọc lời khuyên"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              playTingSound();
              onApplyOutfit(primary.costume.storyId);
            }}
            className="py-2 px-3 sm:px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs shadow-md flex items-center gap-1.5 transition-all transform active:scale-95 cursor-pointer"
            title={`Mặc ngay ${primary.costume.name} lên búp bê`}
          >
            <span>Mặc ngay</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
