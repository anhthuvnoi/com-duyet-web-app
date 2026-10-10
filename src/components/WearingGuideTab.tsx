import React, { useState } from "react";
import {
  wearingGuidesDatabase,
  generalCulturalRules,
  WearingGuide
} from "../data/wearingGuideDB";
import { DialectVoice } from "../data/dialects";
import { ComMascot } from "./ComMascot";
import {
  Sparkles,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Volume2,
  Compass
} from "lucide-react";

interface Props {
  dialect: DialectVoice;
  onSpeak: (text: string) => void;
  onSelectCostumeToDress?: (costumeId: string) => void;
}

export const WearingGuideTab: React.FC<Props> = ({
  dialect,
  onSpeak,
  onSelectCostumeToDress
}) => {
  const [activeGuideId, setActiveGuideId] = useState<string>("tu_than_nu");

  const currentGuide =
    wearingGuidesDatabase.find((g) => g.id === activeGuideId) ||
    wearingGuidesDatabase[0];

  const handleReadGuide = () => {
    const textToRead = `Cốm hướng dẫn bạn cách mặc ${currentGuide.name}. Quy tắc vàng: ${currentGuide.keyGoldenRule}. ${currentGuide.steps
      .map((s) => `Bước ${s.stepNumber}: ${s.title}. ${s.action}`)
      .join(". ")}`;
    onSpeak(textToRead);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* ================= HERO BANNER ================= */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-emerald-700/40 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-emerald-800/80 border border-emerald-400/40 px-3 py-1 rounded-full text-xs font-bold text-emerald-200 mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-300" />
            <span>CẨM NANG NGHI THỨC & QUY CHUẨN NẾP XƯA</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-black tracking-tight mb-2">
            Cách Mặc Đúng Cổ Phục Việt
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-4">
            "Y phục xứng kỳ đức" — Người xưa mặc áo không chỉ để che thân mà còn để biểu đạt lễ nghi, đạo lý làm người và lòng kính ngưỡng trời đất. Hãy cùng Cốm tìm hiểu quy trình mặc chuẩn chỉ từ trong ra ngoài!
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleReadGuide}
              className="py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe {dialect.name} đọc hướng dẫn</span>
            </button>
          </div>
        </div>

        {/* Mascot decoration */}
        <div className="hidden md:block absolute right-8 -bottom-4 animate-mascot-float opacity-90">
          <ComMascot className="w-36 h-36" expression="happy" />
        </div>
      </div>

      {/* ================= COSTUME SELECTOR TABS ================= */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-xs border border-emerald-100">
        <h3 className="text-xs font-bold text-emerald-950 uppercase tracking-wider mb-3">
          Chọn loại cổ phục muốn xem quy trình mặc:
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {wearingGuidesDatabase.map((guide) => {
            const isSelected = guide.id === activeGuideId;
            return (
              <button
                key={guide.id}
                onClick={() => setActiveGuideId(guide.id)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-emerald-700 text-white border-emerald-700 shadow-md ring-2 ring-emerald-300"
                    : "bg-stone-50 hover:bg-emerald-50 text-slate-800 border-stone-200"
                }`}
              >
                <div className="flex items-center justify-between text-base mb-1">
                  <span>{guide.gender === "nu" ? "👩" : "👨"}</span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {guide.dynasty.split("(")[0]}
                  </span>
                </div>
                <div className="font-bold text-xs truncate">{guide.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= CURRENT GUIDE DETAILS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Rules & Taboos */}
        <div className="lg:col-span-4 space-y-4">
          {/* Golden Rule Card */}
          <div className="bg-amber-50/95 border-2 border-amber-300 p-5 rounded-3xl shadow-xs text-amber-950 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-black text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>QUY TẮC CỐT LÕI (BẮT BUỘC)</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-amber-950 leading-relaxed">
              {currentGuide.keyGoldenRule}
            </p>
          </div>

          {/* Taboo Card */}
          <div className="bg-red-50 border border-red-200 p-4 rounded-3xl shadow-xs text-red-900 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-xs">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>ĐIỀU KIÊNG KỴ KHI MẶC:</span>
            </div>
            <p className="text-xs text-red-800 italic leading-relaxed">
              {currentGuide.taboo}
            </p>
          </div>

          {/* General Rules Box */}
          <div className="bg-emerald-950 text-emerald-50 p-5 rounded-3xl shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>LƯU Ý CHUNG VỀ PHỤ KIỆN</span>
            </div>
            <div className="space-y-2 text-[11px] text-emerald-100/90 leading-relaxed">
              {generalCulturalRules.map((r) => (
                <div key={r.id} className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <strong className="text-amber-200 block mb-0.5">✦ {r.title}:</strong>
                  <span>{r.content}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: 5 Steps */}
        <div className="lg:col-span-8 bg-white p-5 sm:p-6 rounded-3xl shadow-xs border border-emerald-100 space-y-4">
          {/* Header tiêu đề quy trình các bước mặc */}
          <div className="pb-3 border-b border-stone-100">
            <h3 className="text-base sm:text-lg font-black text-emerald-950">
              Quy trình 5 bước mặc: {currentGuide.name}
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              {currentGuide.summary}
            </p>
          </div>

          <div className="space-y-3">
            {currentGuide.steps.map((step) => (
              <div
                key={step.stepNumber}
                className="p-4 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-300 transition-all hover:shadow-xs text-left"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-emerald-700 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                      {step.stepNumber}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                      {step.title}
                    </h4>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    {step.badge}
                  </span>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed pl-9 mb-2">
                  {step.action}
                </p>

                <div className="pl-9 pt-2 border-t border-stone-200/60 flex items-start gap-1.5 text-[11px] text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="italic leading-relaxed">
                    <strong>Ý nghĩa nếp xưa:</strong> {step.culturalImportance}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
