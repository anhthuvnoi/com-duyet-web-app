import React from "react";
import { Outfit } from "../data/outfits";
import { TraditionalColor } from "../data/colors";
import { StylingLevelInfo } from "../data/accessories";
import { DialectVoice } from "../data/dialects";
import { ComMascot } from "./ComMascot";
import { Volume2, AlertTriangle, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";

interface Props {
  outfit: Outfit;
  color: TraditionalColor;
  levelInfo: StylingLevelInfo;
  gender: "nu" | "nam";
  dialect: DialectVoice;
  occasion: string;
  isSpeaking: boolean;
  onSpeak: (text: string) => void;
  onOpenLookbook: () => void;
  onOpenDetails: () => void;
}

export const InteractiveMannequin: React.FC<Props> = ({
  outfit,
  color,
  levelInfo,
  gender,
  dialect,
  occasion,
  isSpeaking,
  onSpeak,
  onOpenLookbook,
  onOpenDetails
}) => {
  // Check if Level 4 on solemn occasions
  const isSolemnOccasion = occasion === "Đi chùa/Đi di tích" || occasion === "Lễ cưới/Ăn hỏi";
  const hasCulturalWarning = levelInfo.level === 4 && isSolemnOccasion;

  const currentRemark = hasCulturalWarning
    ? dialect.evaluateWarning(outfit.name, occasion)
    : dialect.evaluateGood(outfit.score, outfit.name);

  return (
    <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-emerald-100 flex flex-col items-center">
      {/* Header bar */}
      <div className="w-full flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">{dialect.avatarEmoji}</span>
          <div>
            <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-1.5">
              Búp Bê Cốm Duyệt
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                Level {levelInfo.level}
              </span>
            </h3>
            <p className="text-[11px] text-emerald-700">{dialect.name} thẩm định</p>
          </div>
        </div>

        {/* Score Badge */}
        <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-xs font-black text-amber-900">{outfit.score}/10</span>
        </div>
      </div>

      {/* Model Canvas Frame */}
      <div className="relative w-full h-84 sm:h-96 rounded-2xl overflow-hidden bg-gradient-to-b from-emerald-900 via-teal-950 to-slate-900 border-2 border-emerald-200 shadow-md flex items-center justify-center group">
        {/* Costume Photo */}
        <img
          src={outfit.img}
          alt={outfit.name}
          className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80";
          }}
        />

        {/* Dynamic Color Tone Hue Overlay */}
        <div
          className="absolute inset-0 mix-blend-color opacity-35 pointer-events-none transition-colors duration-500"
          style={{ backgroundColor: color.hex }}
        />

        {/* Top Floating Badge: Dynasty */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1">
          <span>🏛️</span>
          <span>{outfit.dynasty}</span>
        </div>

        {/* Top Right: Cultural Status Badge */}
        <div className="absolute top-3 right-3">
          {hasCulturalWarning ? (
            <div className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg border border-red-300 flex items-center gap-1 animate-pulse">
              <AlertTriangle className="w-3 h-3" />
              <span>LỆCH NẾP LỄ NGHI</span>
            </div>
          ) : (
            <div className="bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg border border-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-200" />
              <span>CHUẨN NẾP ĐẠO NHẬM</span>
            </div>
          )}
        </div>

        {/* Bottom Floating Info Pill */}
        <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-emerald-100 text-left">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-xs text-slate-900 truncate">{outfit.name}</span>
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-md border text-white"
              style={{ backgroundColor: color.hex }}
            >
              {color.vietnameseName}
            </span>
          </div>

          <div className="text-[11px] text-slate-600 line-clamp-1 mb-1.5">
            Phối cùng: <span className="font-medium text-emerald-800">{levelInfo.footwear}</span> + <span className="font-medium text-emerald-800">{levelInfo.headwear}</span>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
            <span>Dịp: <strong className="text-slate-800">{occasion}</strong></span>
            <button
              onClick={onOpenDetails}
              className="text-emerald-700 font-bold hover:underline"
            >
              Xem quy chuẩn 📖
            </button>
          </div>
        </div>
      </div>

      {/* Mascot Speech Bubble */}
      <div
        className={`w-full mt-4 p-3.5 rounded-2xl border text-left transition-all ${
          hasCulturalWarning
            ? "bg-red-50 border-red-200 text-red-900"
            : "bg-emerald-50/90 border-emerald-200 text-emerald-950"
        }`}
      >
        <div className="flex items-start gap-2.5">
          <div className="shrink-0 animate-mascot-float">
            <ComMascot
              className="w-9 h-9"
              expression={hasCulturalWarning ? "confused" : "waving"}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold flex items-center gap-1">
                {dialect.name} nhận xét:
                {hasCulturalWarning && (
                  <span className="text-[10px] bg-red-200 text-red-800 px-1.5 py-0.2 rounded font-bold">
                    Cần sửa
                  </span>
                )}
              </span>
              <button
                onClick={() => onSpeak(currentRemark)}
                className={`p-1.5 rounded-lg flex items-center gap-1 text-[11px] font-bold transition-all ${
                  isSpeaking
                    ? "bg-emerald-600 text-white animate-pulse"
                    : "bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                }`}
                title="Nghe Cốm đọc bằng giọng 3 miền"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isSpeaking ? "Đang nói..." : "Nghe giọng"}</span>
              </button>
            </div>
            <p className="text-xs leading-relaxed mt-1 italic">
              "{currentRemark}"
            </p>
          </div>
        </div>
      </div>

      {/* CTA Button: Tạo Lookbook & Đóng Mộc */}
      <button
        onClick={onOpenLookbook}
        className="w-full mt-4 py-3.5 px-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-sm rounded-2xl shadow-lg shadow-emerald-700/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
      >
        <Sparkles className="w-4 h-4 animate-spin text-amber-200" />
        <span>TẠO LOOKBOOK & ĐÓNG MỘC ĐỎ</span>
      </button>
    </div>
  );
};
