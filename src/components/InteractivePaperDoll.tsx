import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { Outfit } from "../data/outfits";
import { TraditionalColor } from "../data/colors";
import { StylingLevelInfo } from "../data/accessories";
import { DialectVoice } from "../data/dialects";
import { ComMascot } from "./ComMascot";
import {
  Sparkles,
  Layers,
  Eye,
  EyeOff,
  Volume2,
  AlertTriangle,
  ShieldCheck,
  Check,
  CheckCircle2,
  RotateCw,
  X,
  BookOpen
} from "lucide-react";
import { PaperDollSvg } from "./PaperDollSvg";
import { WearingGuideModal } from "./WearingGuideModal";
import { CurrentOutfitState, WardrobeItem, WardrobeLayerType } from "../data/wardrobe";
import { evaluateOutfit, validateCulturalOutfit } from "../utils/culturalValidationEngine";
import { backgroundMap } from "../data/weather";
import { playTingSound } from "../utils/soundEffects";
import { getItemIcon } from "../utils/itemIcons";

interface Props {
  outfit: Outfit;
  currentOutfit?: CurrentOutfitState;
  sliderLevel?: number;
  color: TraditionalColor;
  levelInfo: StylingLevelInfo;
  gender: "nu" | "nam";
  dialect: DialectVoice;
  occasion: string;
  selectedLocation?: string;
  cityName?: string;
  isSpeaking: boolean;
  activeAccessories?: string[];
  onSpeak: (text: string) => void;
  onOpenLookbook: (capturedImage?: string | null) => void;
  onOpenDetails: () => void;
  onUnequipLayer?: (layer: WardrobeLayerType) => void;
  onResetOutfit?: () => void;
}

export const InteractivePaperDoll: React.FC<Props> = ({
  outfit,
  currentOutfit,
  sliderLevel,
  color,
  levelInfo,
  gender,
  dialect,
  occasion,
  selectedLocation,
  cityName,
  isSpeaking,
  activeAccessories,
  onSpeak,
  onOpenLookbook,
  onOpenDetails,
  onUnequipLayer,
  onResetOutfit
}) => {
  // Layer visibility toggles for "Bóc tách lớp trang phục" (Inspector mode)
  const [showBase, setShowBase] = useState(true);
  const [showInner, setShowInner] = useState(true);
  const [showOuter, setShowOuter] = useState(true);
  const [showWaistband, setShowWaistband] = useState(true);
  const [showAccessories, setShowAccessories] = useState(true);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [showStandardModal, setShowStandardModal] = useState(false);
  const [showWearingGuideModal, setShowWearingGuideModal] = useState(false);

  // Location Background
  const currentLocation = selectedLocation || cityName || "Hà Nội";
  const bgImage = backgroundMap[currentLocation] || backgroundMap["Hà Nội"] || backgroundMap.default;

  // Active accessories filter
  const currentActiveAccessories = activeAccessories ?? (
    gender === "nu" ? levelInfo.accessoriesNu : levelInfo.accessoriesNam
  );

  const isAccActive = (...keywords: string[]) => {
    return currentActiveAccessories.some((acc) => {
      const lower = acc.toLowerCase();
      return keywords.some((kw) => lower.includes(kw.toLowerCase()));
    });
  };

  // Check equipped items and modern vs traditional distribution
  const equippedItems = currentOutfit
    ? (Object.values(currentOutfit).filter(Boolean) as WardrobeItem[])
    : [];
  const modernItems = equippedItems.filter((i) => i.origin === "modern");
  const tradItems = equippedItems.filter((i) => i.origin === "traditional");
  const hasModern = modernItems.length > 0;
  const isMixed = modernItems.length > 0 && tradItems.length > 0;
  const currentLvl = sliderLevel ?? levelInfo.level;

  // Cultural Validation Engine check (3 Tiers cố định: 2-3đ, 6-7đ, 8-10đ)
  const validation = evaluateOutfit(currentOutfit, occasion, outfit);
  const currentRemark = validation.feedback;

  // Ref container búp bê để chụp ảnh Lookbook chính xác qua html2canvas
  const dollContainerRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  // Determine outfit category
  const isNam = gender === "nam";
  const isNguThan = currentOutfit?.outer?.svgKey.includes("ngu_than") ?? outfit.id.includes("nguthan");

  return (
    <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-sm border border-emerald-100 flex flex-col items-center">
      {/* Top Bar: Title & Mascot Badge */}
      <div className="w-full flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-emerald-100 border border-emerald-400 flex items-center justify-center shrink-0">
            <ComMascot
              className="w-8 h-8"
              expression={
                validation.tier === "danger"
                  ? "confused"
                  : validation.tier === "warning"
                  ? "waving"
                  : "happy"
              }
            />
          </div>
          <div>
            <h3 className="text-sm font-black text-emerald-950 flex items-center gap-1.5">
              Búp Bê Cổ Phục Tương Tác
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                Nấc {levelInfo.level}
              </span>
            </h3>
            <p className="text-[11px] text-emerald-700">
              Xếp lớp di sản (Multi-Layering)
            </p>
          </div>
        </div>

        {/* Bóc Lớp & Điểm Số Kiểm Định */}
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={() => setIsInspectorOpen(!isInspectorOpen)}
            className={`p-1.5 px-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 shadow-2xs ${
              isInspectorOpen
                ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
            }`}
            title="Bóc tách các lớp trang phục"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold">Bóc Lớp</span>
          </button>

          <div
            className={`flex items-center gap-1 border px-2.5 py-1 rounded-xl font-black text-xs transition-colors shadow-2xs ${
              validation.tier === "danger"
                ? "bg-red-50 border-red-300 text-red-700"
                : validation.tier === "warning"
                ? "bg-amber-50 border-amber-300 text-amber-800"
                : "bg-emerald-50 border-emerald-300 text-emerald-800"
            }`}
            title={`Điểm kiểm định: ${validation.tierLabel}`}
          >
            {validation.tier === "danger" ? (
              <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
            ) : validation.tier === "warning" ? (
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            )}
            <span>{validation.score.toFixed(1)}/10</span>
          </div>
        </div>
      </div>

      {/* Layer Inspector Controls Drawer */}
      {isInspectorOpen && (
        <div className="w-full mb-3 bg-emerald-50/80 p-3 rounded-2xl border border-emerald-200 text-xs animate-fadeIn">
          <div className="font-bold text-emerald-950 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>Bóc tách lớp cấu tạo (Bấm để ẩn/hiện):</span>
            </span>
            <button
              onClick={() => {
                setShowBase(true);
                setShowInner(true);
                setShowOuter(true);
                setShowWaistband(true);
                setShowAccessories(true);
              }}
              className="text-[10px] text-emerald-700 underline font-semibold"
            >
              Hiện tất cả
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            <button
              onClick={() => setShowBase(!showBase)}
              className={`p-1.5 px-2 rounded-xl text-[11px] font-medium border flex items-center justify-between ${
                showBase
                  ? "bg-white text-emerald-900 border-emerald-300"
                  : "bg-slate-100 text-slate-400 border-slate-200 line-through"
              }`}
            >
              <span>1. Khuôn mặt & Vóc dáng</span>
              {showBase ? <Eye className="w-3 h-3 text-emerald-600" /> : <EyeOff className="w-3 h-3" />}
            </button>

            <button
              onClick={() => setShowInner(!showInner)}
              className={`p-1.5 px-2 rounded-xl text-[11px] font-medium border flex items-center justify-between ${
                showInner
                  ? "bg-white text-emerald-900 border-emerald-300"
                  : "bg-slate-100 text-slate-400 border-slate-200 line-through"
              }`}
            >
              <span>{isNam ? "2. Lớp trong / Quần lụa" : "2. Lớp trong / Yếm"}</span>
              {showInner ? <Eye className="w-3 h-3 text-emerald-600" /> : <EyeOff className="w-3 h-3" />}
            </button>

            <button
              onClick={() => setShowOuter(!showOuter)}
              className={`p-1.5 px-2 rounded-xl text-[11px] font-medium border flex items-center justify-between ${
                showOuter
                  ? "bg-white text-emerald-900 border-emerald-300"
                  : "bg-slate-100 text-slate-400 border-slate-200 line-through"
              }`}
            >
              <span>3. Áo khoác ngoài</span>
              {showOuter ? <Eye className="w-3 h-3 text-emerald-600" /> : <EyeOff className="w-3 h-3" />}
            </button>

            <button
              onClick={() => setShowWaistband(!showWaistband)}
              className={`p-1.5 px-2 rounded-xl text-[11px] font-medium border flex items-center justify-between ${
                showWaistband
                  ? "bg-white text-emerald-900 border-emerald-300"
                  : "bg-slate-100 text-slate-400 border-slate-200 line-through"
              }`}
            >
              <span>{isNam ? (isNguThan ? "4. 5 Hạt cúc khuy" : "4. Đai lưng thư sinh") : "4. Đai lưng / Cúc"}</span>
              {showWaistband ? <Eye className="w-3 h-3 text-emerald-600" /> : <EyeOff className="w-3 h-3" />}
            </button>

            <button
              onClick={() => setShowAccessories(!showAccessories)}
              className={`p-1.5 px-2 rounded-xl text-[11px] font-medium border flex items-center justify-between col-span-2 sm:col-span-1 ${
                showAccessories
                  ? "bg-white text-emerald-900 border-emerald-300"
                  : "bg-slate-100 text-slate-400 border-slate-200 line-through"
              }`}
            >
              <span>{isNam ? "5. Phụ kiện / Khăn đóng" : "5. Phụ kiện & Nón"}</span>
              {showAccessories ? <Eye className="w-3 h-3 text-emerald-600" /> : <EyeOff className="w-3 h-3" />}
            </button>
          </div>
        </div>
      )}

      {/* ================= MULTI-LAYER AVATAR CONTAINER ================= */}
      <div
        ref={dollContainerRef}
        id="doll-capture-container"
        className="relative w-64 sm:w-72 aspect-[3/4] mx-auto rounded-2xl overflow-hidden bg-emerald-50/50 border-2 border-[#e6decb] shadow-md select-none group"
      >
        
        {/* Layer 0: Phông nền Phong cảnh Danh thắng tự động đổi theo Địa điểm */}
        <img
          src={bgImage}
          alt={`Phông nền ${currentLocation}`}
          className="absolute inset-0 w-full h-full object-cover opacity-60 blur-[3px] z-0 transition-all duration-500 ease-in-out"
          crossOrigin="anonymous"
        />

        {/* Lớp overlay mờ đè lên trên ảnh nền để đảm bảo búp bê (ở z-10 trở lên) luôn nổi bật */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[0.5px] z-0 pointer-events-none" />

        {/* Layer 0: Background Atmosphere Subtle Warm Lighting */}
        <div
          className="absolute inset-0 z-0 opacity-15 pointer-events-none transition-colors duration-700"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${color.hex} 0%, transparent 65%)`
          }}
        />

        {/* Layer 0: Traditional Cloud & Window Arch (Khung cửa sổ Cung đình) */}
        <div className="absolute inset-3 z-0 rounded-2xl border border-stone-400/25 pointer-events-none" />

        {/* ============================================================== */}
        {/* MULTI-LAYER DOLL (CÁC LAYER NẰM KHÍT 4 GÓC CONTAINER VỚI Z-INDEX) */}
        {/* ============================================================== */}
        <PaperDollSvg
          outfit={outfit}
          currentOutfit={currentOutfit}
          color={color}
          levelInfo={levelInfo}
          gender={gender}
          activeAccessories={currentActiveAccessories}
          showBase={showBase}
          showInner={showInner}
          showOuter={showOuter}
          showWaistband={showWaistband}
          showAccessories={showAccessories}
          className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-102"
        />
      </div>

      {/* Thẻ thông tin màu trắng tách khỏi container avatar, nằm ngay bên dưới theo chiều dọc (flex-col) */}
      <div className="w-full mt-3 bg-white p-3.5 rounded-2xl shadow-xs border border-emerald-100 text-left">
        <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-xs text-slate-900 block truncate">
                {currentOutfit ? "Bộ đồ phối tự do (Mix & Match)" : outfit.name}
              </span>
              {/* Nút Phối lại */}
              {currentOutfit && onResetOutfit && (
                <button
                  type="button"
                  onClick={() => {
                    playTingSound();
                    onResetOutfit();
                  }}
                  className="px-2 py-0.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 hover:text-emerald-900 text-[10px] font-bold flex items-center gap-1 border border-emerald-300 transition-all cursor-pointer shadow-2xs"
                  title="Phối lại trang phục: Đưa về búp bê nguyên bản để tự do phối đồ"
                >
                  <RotateCw className="w-2.5 h-2.5 text-emerald-600" />
                  <span>Phối lại</span>
                </button>
              )}
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold">
              {equippedItems.length} món đang mặc • {modernItems.length > 0 ? "Có món Hiện Đại" : "Thuần Truyền Thống"}
            </span>
          </div>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-md border text-white shadow-xs shrink-0"
            style={{ backgroundColor: color.hex }}
          >
            {color.vietnameseName}
          </span>
        </div>

        {currentOutfit ? (
          <div className="space-y-1.5 mb-2">
            <div className="grid grid-cols-2 gap-1.5 text-[10px] text-slate-700">
              {/* Lớp trong */}
              <div className="p-1.5 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between gap-1">
                <div className="min-w-0 flex-1">
                  <span className="text-stone-400 block font-medium">Lớp trong:</span>
                  <div className="flex items-center gap-1">
                    {currentOutfit.inner && getItemIcon(currentOutfit.inner, "w-3 h-3 text-emerald-700 shrink-0")}
                    <strong className={`truncate block ${currentOutfit.inner ? "text-emerald-950 font-bold" : "text-stone-400 italic font-normal"}`}>
                      {currentOutfit.inner?.shortName || "Trống"}
                    </strong>
                  </div>
                </div>
                {currentOutfit.inner && onUnequipLayer && (
                  <button
                    type="button"
                    onClick={() => {
                      playTingSound();
                      onUnequipLayer("inner");
                    }}
                    className="p-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700 border border-red-100 transition-colors cursor-pointer shrink-0"
                    title="Cởi bỏ lớp trong này"
                    aria-label="Cởi bỏ lớp trong"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Áo ngoài */}
              <div className="p-1.5 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between gap-1">
                <div className="min-w-0 flex-1">
                  <span className="text-stone-400 block font-medium">Áo ngoài:</span>
                  <div className="flex items-center gap-1">
                    {currentOutfit.outer && getItemIcon(currentOutfit.outer, "w-3 h-3 text-emerald-700 shrink-0")}
                    <strong className={`truncate block ${currentOutfit.outer ? "text-emerald-950 font-bold" : "text-stone-400 italic font-normal"}`}>
                      {currentOutfit.outer?.shortName || "Không khoác"}
                    </strong>
                  </div>
                </div>
                {currentOutfit.outer && onUnequipLayer && (
                  <button
                    type="button"
                    onClick={() => {
                      playTingSound();
                      onUnequipLayer("outer");
                    }}
                    className="p-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700 border border-red-100 transition-colors cursor-pointer shrink-0"
                    title="Cởi bỏ áo ngoài này"
                    aria-label="Cởi bỏ áo ngoài"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Hạ y */}
              <div className="p-1.5 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between gap-1">
                <div className="min-w-0 flex-1">
                  <span className="text-stone-400 block font-medium">Hạ y (Dưới):</span>
                  <div className="flex items-center gap-1">
                    {currentOutfit.bottom && getItemIcon(currentOutfit.bottom, "w-3 h-3 text-emerald-700 shrink-0")}
                    <strong className={`truncate block ${currentOutfit.bottom ? "text-emerald-950 font-bold" : "text-stone-400 italic font-normal"}`}>
                      {currentOutfit.bottom?.shortName || "Trống"}
                    </strong>
                  </div>
                </div>
                {currentOutfit.bottom && onUnequipLayer && (
                  <button
                    type="button"
                    onClick={() => {
                      playTingSound();
                      onUnequipLayer("bottom");
                    }}
                    className="p-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700 border border-red-100 transition-colors cursor-pointer shrink-0"
                    title="Cởi bỏ hạ y này"
                    aria-label="Cởi bỏ hạ y"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Phụ kiện */}
              <div className="p-1.5 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between gap-1">
                <div className="min-w-0 flex-1">
                  <span className="text-stone-400 block font-medium">Phụ kiện:</span>
                  <div className="flex items-center gap-1">
                    {currentOutfit.accessory && getItemIcon(currentOutfit.accessory, "w-3 h-3 text-emerald-700 shrink-0")}
                    <strong className={`truncate block ${currentOutfit.accessory ? "text-emerald-950 font-bold" : "text-stone-400 italic font-normal"}`}>
                      {currentOutfit.accessory?.shortName || "Trống"}
                    </strong>
                  </div>
                </div>
                {currentOutfit.accessory && onUnequipLayer && (
                  <button
                    type="button"
                    onClick={() => {
                      playTingSound();
                      onUnequipLayer("accessory");
                    }}
                    className="p-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700 border border-red-100 transition-colors cursor-pointer shrink-0"
                    title="Tháo phụ kiện này"
                    aria-label="Tháo phụ kiện"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Khăn mũ & Giày dép nếu có */}
            {(currentOutfit.headwear || currentOutfit.footwear) && (
              <div className="flex flex-wrap gap-1.5 pt-1 border-t border-stone-100">
                {currentOutfit.headwear && (
                  <div className="flex items-center gap-1 bg-emerald-50/70 border border-emerald-200/60 text-[10px] px-2 py-0.5 rounded-lg text-emerald-950">
                    {getItemIcon(currentOutfit.headwear, "w-3 h-3 text-emerald-700 shrink-0")}
                    <span>Khăn/Mũ: <strong>{currentOutfit.headwear.shortName}</strong></span>
                    {onUnequipLayer && (
                      <button
                        type="button"
                        onClick={() => {
                          playTingSound();
                          onUnequipLayer("headwear");
                        }}
                        className="p-0.5 hover:bg-red-100 text-red-500 rounded cursor-pointer ml-0.5"
                        title="Tháo khăn/mũ"
                        aria-label="Tháo khăn mũ"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}
                {currentOutfit.footwear && (
                  <div className="flex items-center gap-1 bg-emerald-50/70 border border-emerald-200/60 text-[10px] px-2 py-0.5 rounded-lg text-emerald-950">
                    {getItemIcon(currentOutfit.footwear, "w-3 h-3 text-emerald-700 shrink-0")}
                    <span>Giày dép: <strong>{currentOutfit.footwear.shortName}</strong></span>
                    {onUnequipLayer && (
                      <button
                        type="button"
                        onClick={() => {
                          playTingSound();
                          onUnequipLayer("footwear");
                        }}
                        className="p-0.5 hover:bg-red-100 text-red-500 rounded cursor-pointer ml-0.5"
                        title="Tháo giày dép"
                        aria-label="Tháo giày dép"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-[11px] text-slate-600 line-clamp-1 mb-1.5">
            Lớp áo: <span className="font-semibold text-emerald-900">{outfit.layers.outerwear.split("(")[0]}</span> + <span className="font-semibold text-emerald-900">{levelInfo.headwear}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1.5 border-t border-slate-100">
          <span>Dịp: <strong className="text-slate-800">{occasion}</strong></span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowWearingGuideModal(true)}
              className="text-amber-800 hover:text-amber-900 font-black hover:underline flex items-center gap-1 cursor-pointer bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded-lg border border-amber-300 transition-colors shadow-2xs"
              title="Bấm để xem cẩm nang hướng dẫn từng bước cách mặc đúng chuẩn nếp"
            >
              <span>Cách Mặc Đúng</span> 🥋
            </button>
            <span className="text-stone-300">•</span>
            <button
              onClick={() => {
                setShowStandardModal(true);
                onOpenDetails?.();
              }}
              className="text-emerald-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
              title="Bấm để xem chi tiết quy chuẩn nếp xưa & khóa gen cổ phục"
            >
              <span>Xem quy chuẩn</span> 📖
            </button>
          </div>
        </div>
      </div>

      {/* Mascot Speech Bubble - Hiển thị chuẩn 3 Tiers văn hóa */}
      <div
        className={`w-full mt-3.5 p-3.5 rounded-2xl border text-left transition-all ${
          validation.tier === "danger"
            ? "bg-red-50 border-red-300 text-red-900 shadow-xs"
            : validation.tier === "warning"
            ? "bg-amber-50 border-amber-300 text-amber-950 shadow-xs"
            : "bg-emerald-50/90 border-emerald-200 text-emerald-950 shadow-xs"
        }`}
      >
        <div className="flex items-start gap-2.5">
          <div className="shrink-0 animate-mascot-float">
            <ComMascot
              className="w-9 h-9"
              expression={
                validation.tier === "danger"
                  ? "confused"
                  : validation.tier === "warning"
                  ? "waving"
                  : "happy"
              }
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold flex items-center gap-1.5">
                {dialect.name} nhận xét:
                {validation.tier === "danger" ? (
                  <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-black flex items-center gap-1 shadow-2xs">
                    <AlertTriangle className="w-3 h-3 text-white" />
                    <span>Sai lệch ({validation.score.toFixed(1)}/10)</span>
                  </span>
                ) : validation.tier === "warning" ? (
                  <span className="text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded-full font-black flex items-center gap-1 shadow-2xs">
                    <AlertTriangle className="w-3 h-3 text-white" />
                    <span>Sai dịp ({validation.score.toFixed(1)}/10)</span>
                  </span>
                ) : (
                  <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-black flex items-center gap-1 shadow-2xs">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                    <span>Chuẩn nếp / Slay ({validation.score.toFixed(1)}/10)</span>
                  </span>
                )}
              </span>
              <button
                onClick={() => onSpeak(currentRemark)}
                className={`p-1.5 rounded-lg flex items-center gap-1 text-[11px] font-bold transition-all cursor-pointer ${
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
            <p className="text-xs leading-relaxed mt-1 italic font-medium">
              "{currentRemark}"
            </p>
          </div>
        </div>
      </div>

      {/* CTA Button: Tạo Lookbook & Đóng Mộc (Chụp trực tiếp Container búp bê qua html2canvas) */}
      <button
        type="button"
        disabled={isCapturing}
        onClick={async () => {
          setIsCapturing(true);
          let capturedImage: string | null = null;
          if (dollContainerRef.current) {
            try {
              const canvas = await html2canvas(dollContainerRef.current, {
                backgroundColor: null,
                scale: 2,
                useCORS: true,
                logging: false
              });
              capturedImage = canvas.toDataURL("image/png");
            } catch (err) {
              console.warn("Lỗi chụp búp bê bằng html2canvas:", err);
            }
          }
          setIsCapturing(false);
          onOpenLookbook(capturedImage);
        }}
        className="w-full mt-3.5 py-3 px-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-emerald-700/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
      >
        <Sparkles className="w-4 h-4 animate-spin text-amber-200" />
        <span>{isCapturing ? "Đang chụp búp bê..." : "TẠO LOOKBOOK & ĐÓNG MỘC ĐỎ"}</span>
      </button>

      {/* ================= MODAL QUY CHUẨN CỔ PHỤC ================= */}
      {showStandardModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setShowStandardModal(false)}
        >
          <div
            className="relative w-full max-w-lg max-h-[88vh] overflow-y-auto bg-[#fbf9f4] rounded-3xl border-2 border-emerald-300 shadow-2xl p-5 sm:p-6 text-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Close Button */}
            <div className="flex items-start justify-between pb-3 border-b border-stone-200">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] tracking-widest font-black uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                    {outfit.dynasty}
                  </span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                    Điểm chuẩn: {outfit.score}/10 ★
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-1.5">
                  <BookOpen className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>Quy Chuẩn: {outfit.name}</span>
                </h3>
                {outfit.aliases && outfit.aliases.length > 0 && (
                  <p className="text-[11px] text-stone-500 italic mt-0.5">
                    ({outfit.aliases.join(", ")})
                  </p>
                )}
              </div>
              <button
                onClick={() => setShowStandardModal(false)}
                className="p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
                aria-label="Đóng cửa sổ quy chuẩn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 my-4 text-xs leading-relaxed text-left">
              {/* 1. KHÓA GEN CỐT LÕI */}
              <div className="p-3.5 bg-amber-50/90 border border-amber-300 rounded-2xl shadow-xs">
                <div className="flex items-center gap-1.5 text-amber-900 font-black mb-1">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>KHÓA GEN CỐT LÕI (BẤT DI BẤT DỊCH)</span>
                </div>
                <p className="text-amber-950 font-medium">
                  {outfit.coreRule}
                </p>
              </div>

              {/* 2. CÁCH MẶC CHUẨN NẾP XƯA */}
              <div className="p-3.5 bg-white border border-stone-200 rounded-2xl shadow-xs">
                <div className="font-bold text-emerald-950 mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>Cách Mặc Chuẩn Nếp Xưa</span>
                </div>
                <p className="text-stone-700">
                  {outfit.correctWay}
                </p>
              </div>

              {/* 3. BÓC TÁCH CÁC LỚP Y PHỤC */}
              <div className="p-3.5 bg-white border border-stone-200 rounded-2xl shadow-xs space-y-2">
                <div className="font-bold text-emerald-950 mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  <span>Chi Tiết Xếp Lớp Y Phục Triều Đình</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded-xl bg-stone-50 border border-stone-200/80">
                    <span className="text-stone-500 font-semibold block">Lớp áo ngoài:</span>
                    <strong className="text-slate-900">{outfit.layers.outerwear}</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-stone-50 border border-stone-200/80">
                    <span className="text-stone-500 font-semibold block">Lớp lót / Trung đơn:</span>
                    <strong className="text-slate-900">{outfit.layers.innerwear || "Áo lót / Yếm lụa trắng"}</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-stone-50 border border-stone-200/80">
                    <span className="text-stone-500 font-semibold block">Hạ y (Quần/Váy):</span>
                    <strong className="text-slate-900">{outfit.layers.bottom}</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-stone-50 border border-stone-200/80">
                    <span className="text-stone-500 font-semibold block">Đầu đội:</span>
                    <strong className="text-slate-900">{outfit.layers.headwear}</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-stone-50 border border-stone-200/80">
                    <span className="text-stone-500 font-semibold block">Chân đi:</span>
                    <strong className="text-slate-900">{outfit.layers.footwear}</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-stone-50 border border-stone-200/80">
                    <span className="text-stone-500 font-semibold block">Phụ kiện đi kèm:</span>
                    <strong className="text-slate-900">
                      {Array.isArray(outfit.layers.accessories) ? outfit.layers.accessories.join(", ") : outfit.layers.accessories}
                    </strong>
                  </div>
                </div>
              </div>

              {/* 4. CHẤT LIỆU VẢI & LƯU Ý GEN Z */}
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl shadow-xs space-y-2">
                <div>
                  <span className="text-emerald-950 font-bold block mb-0.5">Chất liệu vải khuyến nghị:</span>
                  <p className="text-emerald-900 text-[11px]">{outfit.recommendedFabric}</p>
                </div>
                <div className="pt-2 border-t border-emerald-100">
                  <span className="text-emerald-950 font-bold block mb-0.5">Lưu ý phối đồ ứng dụng:</span>
                  <p className="text-emerald-800 text-[11px] italic">{outfit.note}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={() => {
                  setShowStandardModal(false);
                  setShowWearingGuideModal(true);
                }}
                className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              >
                <span>🥋 Xem hướng dẫn từng bước cách mặc</span>
              </button>
              <button
                onClick={() => setShowStandardModal(false)}
                className="w-full sm:w-auto px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                ĐÃ HIỂU QUY CHUẨN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL CẨM NANG CÁCH MẶC ĐÚNG (STEP-BY-STEP) ================= */}
      <WearingGuideModal
        isOpen={showWearingGuideModal}
        onClose={() => setShowWearingGuideModal(false)}
        targetCostumeKey={
          currentOutfit?.outer
            ? (currentOutfit.outer.svgKey || currentOutfit.outer.id || currentOutfit.outer.shortName)
            : (outfit.id || outfit.name)
        }
        gender={gender}
        onSpeak={onSpeak}
      />
    </div>
  );
};
