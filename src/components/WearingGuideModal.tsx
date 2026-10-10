import React, { useState, useEffect } from "react";
import {
  WearingGuide,
  wearingGuidesDatabase,
  generalCulturalRules,
  findWearingGuide
} from "../data/wearingGuideDB";
import {
  X,
  BookOpen,
  Sparkles,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Info,
  Compass,
  Volume2
} from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  targetCostumeKey?: string | null;
  gender: "nu" | "nam";
  onSpeak?: (text: string) => void;
}

export const WearingGuideModal: React.FC<Props> = ({
  isOpen,
  onClose,
  targetCostumeKey,
  gender,
  onSpeak
}) => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>(() => {
    const guide = findWearingGuide(targetCostumeKey, gender);
    return guide.id;
  });

  // Keep selected guide updated when target costume changes
  useEffect(() => {
    if (targetCostumeKey) {
      const guide = findWearingGuide(targetCostumeKey, gender);
      setSelectedGuideId(guide.id);
    }
  }, [targetCostumeKey, gender]);

  if (!isOpen) return null;

  const currentGuide =
    wearingGuidesDatabase.find((g) => g.id === selectedGuideId) ||
    wearingGuidesDatabase[0];

  const handleReadGuide = () => {
    if (!onSpeak) return;
    const textToRead = `Hướng dẫn cách mặc ${currentGuide.name}. Quy tắc vàng: ${currentGuide.keyGoldenRule}. ${currentGuide.steps
      .map((s) => `Bước ${s.stepNumber}: ${s.title}. ${s.action}`)
      .join(". ")}`;
    onSpeak(textToRead);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#faf8f2] rounded-3xl border-2 border-emerald-400 shadow-2xl p-5 sm:p-6 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Title and Close Button */}
        <div className="flex items-start justify-between pb-3 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] tracking-widest font-black uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                <Compass className="w-3 h-3 text-emerald-600" />
                <span>CẨM NANG NGHI THỨC CỔ PHỤC</span>
              </span>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                {currentGuide.dynasty}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <span>🥋 Cách Mặc Đúng: {currentGuide.name}</span>
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              {currentGuide.summary}
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            {onSpeak && (
              <button
                onClick={handleReadGuide}
                className="p-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors cursor-pointer"
                title="Nghe Cốm đọc hướng dẫn từng bước"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
              aria-label="Đóng cẩm nang"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Costume Quick Switcher Tabs */}
        <div className="py-3 border-b border-stone-200">
          <div className="text-[11px] font-bold text-stone-500 mb-1.5">
            Chọn loại cổ phục cần xem hướng dẫn:
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {wearingGuidesDatabase.map((guide) => {
              const isSelected = guide.id === selectedGuideId;
              return (
                <button
                  key={guide.id}
                  onClick={() => setSelectedGuideId(guide.id)}
                  className={`py-1.5 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                    isSelected
                      ? "bg-emerald-700 text-white shadow-xs"
                      : "bg-stone-100 text-stone-700 hover:bg-emerald-50 hover:text-emerald-900"
                  }`}
                >
                  <span>{guide.gender === "nu" ? "👩" : "👨"}</span>
                  <span>{guide.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="space-y-4 my-4">
          {/* 1. KHÓA GEN VÀNG (GOLDEN RULE) */}
          <div className="p-3.5 bg-amber-50/90 border-2 border-amber-300 rounded-2xl shadow-xs">
            <div className="flex items-center gap-1.5 text-amber-900 font-black text-xs mb-1">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>QUY TẮC CỐT LÕI (BẮT BUỘC KHI MẶC)</span>
            </div>
            <p className="text-xs font-bold text-amber-950 leading-relaxed">
              {currentGuide.keyGoldenRule}
            </p>
          </div>

          {/* 2. ĐIỀU KIÊNG KỴ (TABOO) */}
          <div className="p-3 bg-red-50/80 border border-red-200 rounded-2xl flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-red-900 block mb-0.5">Kiêng kỵ tuyệt đối:</span>
              <p className="text-red-800 leading-relaxed italic">
                {currentGuide.taboo}
              </p>
            </div>
          </div>

          {/* 3. STEP-BY-STEP WEARING GUIDE (5 BƯỚC) */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-950 mb-2.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Quy trình 5 bước mặc đúng nếp xưa (Step-by-Step):</span>
            </h3>

            <div className="space-y-2.5">
              {currentGuide.steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-xs hover:border-emerald-300 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-700 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                        {step.stepNumber}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                        {step.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                      {step.badge}
                    </span>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed pl-8">
                    {step.action}
                  </p>

                  <div className="mt-2 pl-8 pt-1.5 border-t border-stone-100 flex items-start gap-1 text-[11px] text-emerald-800">
                    <span className="font-semibold text-emerald-900 shrink-0">Ý nghĩa:</span>
                    <span className="italic">{step.culturalImportance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. LƯU Ý PHỐI PHỤ KIỆN & KIÊNG KỴ CHUNG */}
          <div className="p-4 bg-emerald-950 text-emerald-50 rounded-2xl shadow-sm space-y-2.5">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>LƯU Ý CHUNG VỀ PHỐI PHỤ KIỆN & TÍNH LỊCH SỬ</span>
            </div>
            <div className="space-y-2 text-[11px] text-emerald-100/90 leading-relaxed">
              {generalCulturalRules.map((rule) => (
                <div key={rule.id} className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <strong className="text-amber-200 block mb-0.5">✦ {rule.title}:</strong>
                  <span>{rule.content}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
          <span className="text-[11px] text-stone-500 italic">
            Cốm Duyệt • Giữ trọn hồn thiêng y phục dân tộc
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            ĐÃ HIỂU CÁCH MẶC
          </button>
        </div>
      </div>
    </div>
  );
};
