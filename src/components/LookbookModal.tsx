import React, { useState } from "react";
import { Outfit } from "../data/outfits";
import { TraditionalColor } from "../data/colors";
import { CityWeather, backgroundMap } from "../data/weather";
import { StylingLevelInfo } from "../data/accessories";
import { DialectVoice } from "../data/dialects";
import { exportLookbookToImage } from "../utils/lookbookGenerator";
import { PaperDollSvg } from "./PaperDollSvg";
import { CurrentOutfitState } from "../data/wardrobe";
import { validateCulturalOutfit } from "../utils/culturalValidationEngine";
import { X, Download, Share2, Check, Sparkles, Volume2, ShieldCheck, MapPin, AlertTriangle } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  outfit: Outfit;
  currentOutfit?: CurrentOutfitState | null;
  capturedDollImage?: string | null;
  color: TraditionalColor;
  city: CityWeather;
  selectedLocation?: string;
  levelInfo: StylingLevelInfo;
  gender: "nu" | "nam";
  dialect: DialectVoice;
  occasion: string;
  activeAccessories?: string[];
  onSpeak: (text: string) => void;
}

export const LookbookModal: React.FC<Props> = ({
  isOpen,
  onClose,
  outfit,
  currentOutfit,
  capturedDollImage,
  color,
  city,
  selectedLocation,
  levelInfo,
  gender,
  dialect,
  occasion,
  activeAccessories,
  onSpeak
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Cultural Validation Engine check (3 Tiers cố định: 2-3đ, 6-7đ, 8-10đ)
  const validation = validateCulturalOutfit(currentOutfit, outfit, occasion);

  const displayLocation = selectedLocation || city.cityName || "Hà Nội";
  const displayBg = backgroundMap[displayLocation] || backgroundMap[city.cityName] || backgroundMap["Hà Nội"] || backgroundMap.default;

  const accessories = activeAccessories && activeAccessories.length > 0
    ? activeAccessories
    : (gender === "nu" ? levelInfo.accessoriesNu : levelInfo.accessoriesNam);

  const displayOutfitTitle =
    currentOutfit?.outer?.name ||
    currentOutfit?.inner?.name ||
    (currentOutfit && Object.values(currentOutfit).some(Boolean)
      ? "Bộ Phối Cổ Phục Tự Do"
      : outfit.name);

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      const dataUrl = await exportLookbookToImage({
        outfit,
        currentOutfit,
        capturedDollImage,
        color,
        city,
        levelInfo,
        gender,
        mascotName: dialect.name,
        occasion,
        validation
      });
      if (dataUrl) {
        const link = document.createElement("a");
        link.download = `com-duyet-${outfit.id}-score${validation.score.toFixed(1)}.png`;
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      console.error("Export error", err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyFormula = () => {
    const text = `👘 BỘ SƯU TẬP CỐM DUYỆT - VIỆT PHỤC REMIX GEN Z 👘
• Bộ phối: ${displayOutfitTitle}
• Dịp diện: ${occasion}
• Sắc màu: ${color.name} (Ý nghĩa: ${color.meaning})
• Nấc phong cách: Nấc ${levelInfo.level} - ${levelInfo.title}
• Con dấu kiểm định: "${validation.seal}" (${validation.score.toFixed(1)}/10)
• Mức đánh giá: ${validation.tierLabel}
• Địa điểm & Thời tiết: ${displayLocation} (${city.temp}) - Gợi ý vải: ${city.fabricAdvice}
• Áo khoác ngoài: ${currentOutfit?.outer?.name || "Không khoác"}
• Lớp trong: ${currentOutfit?.inner?.name || "Trống"}
• Hạ y: ${currentOutfit?.bottom?.name || "Trống"}
• Giày dép: ${currentOutfit?.footwear?.name || "Chưa chọn"}
• Phụ kiện: ${currentOutfit?.headwear?.name || currentOutfit?.accessory?.name || accessories.join(", ")}
• Lời nhận xét từ Bé Cốm: "${validation.feedback}"
"Mặc chất Việt - Bật chất riêng - Cốm duyệt liền!"`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getSealBg = () => {
    switch (validation.tier) {
      case "success":
        return "bg-gradient-to-br from-emerald-600 to-teal-800 border-white text-white";
      case "warning":
        return "bg-gradient-to-br from-amber-500 to-yellow-700 border-white text-white";
      case "danger":
      default:
        return "bg-gradient-to-br from-red-600 to-rose-800 border-white text-white";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl relative border-2 border-emerald-300 max-h-[92vh] flex flex-col my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors z-10 cursor-pointer"
          aria-label="Đóng cửa sổ"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center pb-3 border-b border-emerald-100 pr-8">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-1">
            <span>{dialect.avatarEmoji}</span>
            <span>CULTURAL VALIDATION ENGINE • CỐM DUYỆT</span>
          </div>
          <h2 className="text-xl font-black text-emerald-950">Lookbook Việt Phục Remix</h2>
          <p className="text-xs text-emerald-600 mt-0.5">
            Được kiểm định nếp xưa và đóng mộc bởi <strong className="text-emerald-800">Bé Cốm Duyệt</strong>
          </p>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {/* Card Preview with Official Seal */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-300 shadow-lg bg-white">
            {/* Visual Búp Bê Portrait Container (Khổ dọc aspect-[3/4]) */}
            <div className="relative w-64 sm:w-72 aspect-[3/4] mx-auto bg-emerald-50/50 border-b-2 border-emerald-200/80 rounded-2xl overflow-hidden">
              {capturedDollImage ? (
                /* Cách A: Render trực tiếp ảnh base64 chụp từ container búp bê */
                <img
                  src={capturedDollImage}
                  alt={`Búp bê ${displayOutfitTitle}`}
                  className="absolute inset-0 w-full h-full object-cover z-10 drop-shadow-md"
                />
              ) : (
                /* Cách B: Render các layer đồng bộ chính xác từ currentOutfit & vị trí */
                <>
                  {/* Phông nền danh thắng theo địa điểm đã chọn */}
                  <img
                    src={displayBg}
                    alt={`Phong cảnh ${displayLocation}`}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 blur-[3px] z-0 transition-all duration-500 ease-in-out"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-[0.5px] z-0 pointer-events-none" />

                  {/* Subtle background warm glow */}
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none z-0"
                    style={{
                      background: `radial-gradient(circle at 50% 35%, ${color.hex} 0%, transparent 70%)`
                    }}
                  />
                  {/* Traditional border frame */}
                  <div className="absolute inset-3 rounded-2xl border border-stone-400/25 pointer-events-none z-0" />

                  {/* Búp Bê SVG with active layers */}
                  <PaperDollSvg
                    outfit={outfit}
                    currentOutfit={currentOutfit || undefined}
                    color={color}
                    levelInfo={levelInfo}
                    gender={gender}
                    activeAccessories={accessories}
                    className="absolute inset-0 w-full h-full drop-shadow-md"
                  />
                </>
              )}

              {/* Location Badge */}
              <div className="absolute top-2.5 left-3 z-[80] pointer-events-none">
                <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-bold text-slate-800 border border-stone-200 shadow-2xs">
                  <span className="text-emerald-600">📍</span>
                  <span>{displayLocation}</span>
                </span>
              </div>

              {/* DẤU MỘC ĐỎ DYNAMIC CỐM DUYỆT (3 Tiers: Đỏ, Vàng/Cam, Xanh lá) */}
              <div
                className={`absolute top-3 right-3 p-2 rounded-full border-4 shadow-2xl rotate-12 flex flex-col items-center justify-center text-center w-24 h-24 sm:w-26 sm:h-26 select-none z-[80] transition-transform animate-pulse ${getSealBg()}`}
              >
                <span className="text-[8px] font-bold tracking-wider">CỐM DUYỆT</span>
                <span className="text-[9px] sm:text-[10px] font-black tracking-tighter leading-tight my-0.5 uppercase px-1">
                  {validation.seal}
                </span>
                <span className="text-[8px] sm:text-[9px] font-bold">
                  {validation.score.toFixed(1)}/10
                </span>
              </div>

              {/* Bottom overlay inside portrait card */}
              <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-md px-3.5 py-2 rounded-2xl text-white flex items-center justify-between z-[80]">
                <div className="min-w-0 flex-1 pr-2">
                  <div className="text-sm font-black flex items-center gap-1.5 truncate">
                    <span className="truncate">{displayOutfitTitle}</span>
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block border border-white/60 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                  </div>
                  <div className="text-[11px] text-emerald-200">{outfit.dynasty} • Nấc {levelInfo.level}</div>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-xs text-white font-black px-2 py-0.5 rounded-lg ${
                    validation.tier === "success"
                      ? "bg-emerald-600"
                      : validation.tier === "warning"
                      ? "bg-amber-500"
                      : "bg-red-600"
                  }`}>
                    ★ {validation.score.toFixed(1)}/10
                  </span>
                </div>
              </div>
            </div>

            {/* Content summary box */}
            <div className="p-4 bg-white text-slate-800 space-y-3">
              {/* Warnings banner if any (3 Tiers: Red for danger, Amber for warning) */}
              {validation.warnings.length > 0 && (
                <div className={`rounded-xl p-2.5 text-xs flex items-start gap-2 border ${
                  validation.tier === "danger"
                    ? "bg-red-50 border-red-300 text-red-800"
                    : "bg-amber-50 border-amber-300 text-amber-900"
                }`}>
                  <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${
                    validation.tier === "danger" ? "text-red-600" : "text-amber-600"
                  }`} />
                  <div>
                    <div className="font-bold">
                      {validation.tier === "danger" ? "⚠️ Cảnh báo sai lệch nếp xưa:" : "💡 Lưu ý bối cảnh sự kiện:"}
                    </div>
                    <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-[11px]">
                      {validation.warnings.map((w, idx) => (
                        <li key={idx}>{w}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Color & Occasion Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-4 h-4 rounded-full border border-slate-300 inline-block shrink-0 shadow-sm"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="font-bold text-slate-800">{color.name}</span>
                </div>
                <div className="bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-lg font-bold">
                  Dịp: {occasion}
                </div>
              </div>

              {/* Styling Level */}
              <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-200 text-xs space-y-1">
                <div className="font-bold text-emerald-950 flex items-center justify-between">
                  <span>Nấc {levelInfo.level}: {levelInfo.title}</span>
                  <span className={`text-[11px] font-black px-2 py-0.5 rounded-md text-white ${
                    validation.tier === "success"
                      ? "bg-emerald-600"
                      : validation.tier === "warning"
                      ? "bg-amber-500"
                      : "bg-red-600"
                  }`}>
                    {validation.tierLabel}
                  </span>
                </div>
                <p className="text-slate-600 italic">"{levelInfo.vibe}"</p>
                <div className="pt-1 text-[11px] text-emerald-900 font-medium">
                  <strong>Phụ kiện:</strong> {accessories.join(", ")}
                </div>
              </div>

              {/* Mảnh ghép cấu tạo trang phục đang mặc đồng bộ chính xác */}
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="font-bold text-slate-800">🧩 Các mảnh ghép cấu tạo đang mặc:</div>
                <div className="text-[11px] text-slate-600 space-y-0.5">
                  <div>• <strong>Áo khoác ngoài:</strong> {currentOutfit?.outer?.name || (outfit.layers ? outfit.layers.outerwear : "Không khoác")}</div>
                  <div>• <strong>Lớp trong:</strong> {currentOutfit?.inner?.name || (outfit.layers ? outfit.layers.innerwear : "Trống")}</div>
                  <div>• <strong>Hạ y (Quần/Váy):</strong> {currentOutfit?.bottom?.name || (outfit.layers ? outfit.layers.bottom : "Trống")}</div>
                  <div>• <strong>Giày dép:</strong> {currentOutfit?.footwear?.name || (outfit.layers ? outfit.layers.footwear : "Guốc mộc")}</div>
                  <div>• <strong>Phụ kiện & Mũ:</strong> {currentOutfit?.headwear?.name || currentOutfit?.accessory?.name || accessories.join(", ")}</div>
                </div>
              </div>

              {/* Weather & Fabric */}
              <div className="bg-sky-50 p-2.5 rounded-xl border border-sky-200 text-xs flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sky-950">
                    Khí hậu {city.cityName} ({city.temp}): {city.weatherDesc}
                  </div>
                  <div className="text-sky-800 text-[11px] mt-0.5">
                    💡 Khuyên dùng: {city.fabricAdvice}
                  </div>
                </div>
              </div>

              {/* Core Gen Rule Locked */}
              <div className="bg-amber-50/80 p-2.5 rounded-xl border border-amber-200 text-xs">
                <div className="font-bold text-amber-950 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span>Quy chuẩn bất biến (Khóa gen cốt lõi):</span>
                </div>
                <p className="text-amber-900 text-[11px] mt-0.5 leading-relaxed">
                  {outfit.coreRule}
                </p>
              </div>

              {/* Lời Cốm căn dặn (Đồng bộ Cultural Validation Engine) */}
              <div className="bg-emerald-950 text-emerald-50 p-3.5 rounded-2xl text-xs flex items-start justify-between gap-3 shadow-inner">
                <div className="flex items-start gap-2.5">
                  <span className="text-2xl shrink-0 mt-0.5">{dialect.avatarEmoji}</span>
                  <div>
                    <span className="text-[10px] font-black uppercase text-amber-300 block mb-0.5">
                      Đánh giá từ Cốm Duyệt ({validation.seal}):
                    </span>
                    <p className="italic text-[11px] leading-relaxed text-emerald-100">
                      "{validation.feedback}"
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onSpeak(validation.feedback)}
                  className="p-2 bg-emerald-800 hover:bg-emerald-700 rounded-xl text-white shrink-0 cursor-pointer transition-colors shadow-xs"
                  title="Nghe Cốm nhận xét"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="pt-3 border-t border-emerald-100 flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
          >
            {isExporting ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Đang xuất thẻ PNG...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>TẢI THẺ LOOKBOOK (PNG)</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopyFormula}
            className="py-3 px-4 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-700" />
                <span className="text-emerald-700">Đã chép công thức!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>SAO CHÉP CÔNG THỨC</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
