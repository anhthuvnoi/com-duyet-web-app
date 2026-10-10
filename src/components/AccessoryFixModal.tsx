import React, { useState } from "react";
import {
  X,
  Copy,
  Check,
  Download,
  Sparkles,
  Eye,
  CheckCircle2,
  ShieldCheck,
  FileCode2,
  Headphones,
  RotateCw,
  Layers
} from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "khanmoqua" | "tainghe" | "vongtay";
}

export const AccessoryFixModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialTab = "khanmoqua"
}) => {
  const [activeTab, setActiveTab] = useState<"khanmoqua" | "tainghe" | "vongtay">(initialTab);
  const [showUnderlay, setShowUnderlay] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isExportingPng, setIsExportingPng] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const accessoryData = {
    khanmoqua: {
      id: "khanmoqua",
      title: "Khăn Mỏ Quạ Bắc Bộ (Đã Nâng Lên Sát Mí Tóc)",
      category: "Layer 70: Phụ Kiện Đầu (Headwear)",
      desc: "Nâng tọa độ Y lên sát mí tóc trán (y=64), nếp gấp nhọn mỏ quạ chuẩn nếp xưa, lộ trọn vẹn 100% đôi mắt và khuôn mặt búp bê.",
      fixedDetails: [
        "Đỉnh mỏ quạ: Chúc nhọn tại X=150, Y=64 (cách mắt Y=80 tận 16px, không che mắt).",
        "Vành khăn: Vắt chéo ôm lên hai bên thái dương (Y=58-62) và quấn ôm ra sau gáy.",
        "Màu sắc: Vải lụa đen mun cao cấp với nếp gấp sống lụa tự nhiên ở giữa trán."
      ],
      svgFileName: "khan_mo_qua_chuan.svg",
      pngFileName: "khan_mo_qua_chuan_transparent.png",
      rawSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="300" height="400" fill="none">
  <!-- LAYER 70: KHĂN MỎ QUẠ BẮC BỘ (ĐÃ FIX TỌA ĐỘ TRÁN, LỘ 100% ĐÔI MẮT) -->
  <g id="layer-acc-khan-mo-qua">
    <path
      d="M121 64
         C116 48, 126 36, 150 36
         C174 36, 184 48, 179 64
         C168 57, 158 62, 150 64
         C142 62, 132 57, 121 64 Z"
      fill="#18181B"
      stroke="#27272A"
      stroke-width="1.2"
    />
    <path d="M150 64 L146 54 L150 42 L154 54 Z" fill="#262320" opacity="0.75" />
    <line x1="150" y1="64" x2="150" y2="40" stroke="#3F3F46" stroke-width="1.2" stroke-linecap="round" />
    <path d="M150 64 L132 57 L120 65" stroke="#3F3F46" stroke-width="1.4" fill="none" stroke-linecap="round" />
    <path d="M150 64 L168 57 L180 65" stroke="#3F3F46" stroke-width="1.4" fill="none" stroke-linecap="round" />
    <path d="M121 64 Q116 75 119 86 L123 84 Q120 74 123 66 Z" fill="#18181B" />
    <path d="M179 64 Q184 75 181 86 L177 84 Q180 74 177 66 Z" fill="#18181B" />
  </g>
</svg>`
    },
    tainghe: {
      id: "tainghe",
      title: "Tai Nghe Chụp Tai Over-Ear (Đã Lật 180° & Áp 2 Tai)",
      category: "Layer 70: Phụ Kiện Đương Đại (Accessories)",
      desc: "Xoay lật ngược (flip) 180 độ lên trên, vòng cung headband cong ôm qua đỉnh đầu, hai miếng ốp tai (earcups) áp vừa khít vào hai bên tai.",
      fixedDetails: [
        "Headband: Cong vồng lên đỉnh đầu qua Y=38-42 (không còn chúi xuống ngực).",
        "Miếng ốp tai trái (Earcup): Đặt tại X=119-126, Y=73-91 (áp trúng phóc tai trái Y=82).",
        "Miếng ốp tai phải (Earcup): Đặt tại X=174-181, Y=73-91 (áp trúng phóc tai phải Y=82).",
        "Thiết kế: Đệm mút xốp êm ái, viền xanh cobalt công nghệ cao và đĩa xoay kim loại."
      ],
      svgFileName: "tai_nghe_chuan.svg",
      pngFileName: "tai_nghe_chuan_transparent.png",
      rawSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="300" height="400" fill="none">
  <!-- LAYER 70: TAI NGHE OVER-EAR (ĐÃ LẬT NGƯỢC 180 ĐỘ, HEADBAND VÒNG LÊN ĐẦU, ÁP KHÍT 2 TAI) -->
  <g id="layer-acc-tai-nghe">
    <path
      d="M123 76 C123 38, 177 38, 177 76"
      stroke="#1E293B"
      stroke-width="5"
      stroke-linecap="round"
      fill="none"
    />
    <path
      d="M124.5 75 C124.5 41, 175.5 41, 175.5 75"
      stroke="#2563EB"
      stroke-width="2.4"
      stroke-linecap="round"
      fill="none"
    />
    <path
      d="M136 43 Q150 41 164 43"
      stroke="#0F172A"
      stroke-width="3.2"
      stroke-linecap="round"
      fill="none"
    />
    <rect x="120" y="68" width="5.5" height="7" rx="1.5" fill="#94A3B8" stroke="#64748B" stroke-width="0.8" />
    <rect x="174.5" y="68" width="5.5" height="7" rx="1.5" fill="#94A3B8" stroke="#64748B" stroke-width="0.8" />
    <!-- Miếng ốp tai trái (Earcup) áp vừa khít vào tai trái búp bê x=123, y=82 -->
    <g id="earcup-left">
      <rect x="119" y="73" width="7" height="18" rx="3.5" fill="#0F172A" stroke="#334155" stroke-width="0.8" />
      <rect x="115.5" y="74.5" width="5.5" height="15" rx="2.5" fill="#2563EB" stroke="#1D4ED8" stroke-width="1" />
      <ellipse cx="118" cy="82" rx="1.8" ry="3.5" fill="#60A5FA" />
    </g>
    <!-- Miếng ốp tai phải (Earcup) áp vừa khít vào tai phải búp bê x=177, y=82 -->
    <g id="earcup-right">
      <rect x="174" y="73" width="7" height="18" rx="3.5" fill="#0F172A" stroke="#334155" stroke-width="0.8" />
      <rect x="179" y="74.5" width="5.5" height="15" rx="2.5" fill="#2563EB" stroke="#1D4ED8" stroke-width="1" />
      <ellipse cx="182" cy="82" rx="1.8" ry="3.5" fill="#60A5FA" />
    </g>
  </g>
</svg>`
    },
    vongtay: {
      id: "vongtay",
      title: "Vòng Tay Vàng Ánh Kim (Đã Dịch Sát Cổ Tay Hẹp Nhất)",
      category: "Layer 60: Trang Sức Cầm Tay (Bracelets)",
      desc: "Dịch chuyển tọa độ vào đúng cổ tay hẹp nhất của búp bê, xoay góc nghiêng theo độ dốc cẳng tay, ôm sát tự nhiên không còn trôi lơ lửng.",
      fixedDetails: [
        "Cổ tay trái: Tâm X=93.5, Y=199, xoay góc -20° ôm khít cổ tay.",
        "Cổ tay phải: Tâm X=206.5, Y=199, xoay góc +20° ôm khít cổ tay.",
        "Hiệu ứng thị giác: Thiết kế vòng xuyến đôi vàng 24K ánh kim, ôm sát cổ tay chuẩn mực."
      ],
      svgFileName: "vong_tay_vang_chuan.svg",
      pngFileName: "vong_tay_vang_chuan_transparent.png",
      rawSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="300" height="400" fill="none">
  <!-- LAYER 60: VÒNG TAY VÀNG ÁNH KIM (ĐÃ DỊCH SÁT CỔ TAY HẸP NHẤT, GÓC XOAY ÔM KHÍT) -->
  <g id="layer-acc-vong-tay-vang">
    <!-- Vòng tay trái (Cổ tay trái x=93.5, y=199, xoay -20 độ) -->
    <g id="bracelet-left" transform="rotate(-20 93.5 199)">
      <ellipse cx="93.5" cy="199" rx="5.6" ry="2.8" stroke="#B45309" stroke-width="2.8" fill="none" />
      <ellipse cx="93.5" cy="199" rx="5.6" ry="2.8" stroke="#F59E0B" stroke-width="2.0" fill="none" />
      <ellipse cx="93.2" cy="198.6" rx="5.2" ry="2.2" stroke="#FEF08A" stroke-width="1.0" fill="none" />
      <ellipse cx="94.2" cy="196.2" rx="5.2" ry="2.4" stroke="#F59E0B" stroke-width="1.5" fill="none" opacity="0.9" />
      <ellipse cx="94.0" cy="195.9" rx="4.8" ry="1.8" stroke="#FEF08A" stroke-width="0.8" fill="none" opacity="0.9" />
    </g>
    <!-- Vòng tay phải (Cổ tay phải x=206.5, y=199, xoay +20 độ) -->
    <g id="bracelet-right" transform="rotate(20 206.5 199)">
      <ellipse cx="206.5" cy="199" rx="5.6" ry="2.8" stroke="#B45309" stroke-width="2.8" fill="none" />
      <ellipse cx="206.5" cy="199" rx="5.6" ry="2.8" stroke="#F59E0B" stroke-width="2.0" fill="none" />
      <ellipse cx="206.8" cy="198.6" rx="5.2" ry="2.2" stroke="#FEF08A" stroke-width="1.0" fill="none" />
      <ellipse cx="205.8" cy="196.2" rx="5.2" ry="2.4" stroke="#F59E0B" stroke-width="1.5" fill="none" opacity="0.9" />
      <ellipse cx="206.0" cy="195.9" rx="4.8" ry="1.8" stroke="#FEF08A" stroke-width="0.8" fill="none" opacity="0.9" />
    </g>
  </g>
</svg>`
    }
  };

  const currentItem = accessoryData[activeTab];

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(currentItem.rawSvg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSvg = () => {
    const blob = new Blob([currentItem.rawSvg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = currentItem.svgFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadSuccess(currentItem.title);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const handleDownloadPng = () => {
    setIsExportingPng(true);
    const svgBlob = new Blob([currentItem.rawSvg], { type: "image/svg+xml;charset=utf-8" });
    const URLObject = window.URL || window.webkitURL || window;
    const blobURL = URLObject.createObjectURL(svgBlob);

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 900;
      canvas.height = 1200;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, 900, 1200);
        canvas.toBlob((blob) => {
          if (blob) {
            const pngUrl = URLObject.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = pngUrl;
            link.download = currentItem.pngFileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URLObject.revokeObjectURL(pngUrl);
            setDownloadSuccess(currentItem.title);
            setTimeout(() => setDownloadSuccess(null), 3000);
          }
          setIsExportingPng(false);
          URLObject.revokeObjectURL(blobURL);
        }, "image/png");
      } else {
        setIsExportingPng(false);
      }
    };
    image.onerror = () => {
      setIsExportingPng(false);
    };
    image.src = blobURL;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-emerald-100 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-emerald-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  Hiệu Chỉnh 3 Layer Phụ Kiện Chuẩn Tọa Độ
                </h2>
                <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  Fixed 100%
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Khăn mỏ quạ lộ mắt • Tai nghe xoay 180° ôm tai • Vòng tay ôm khít cổ tay
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Đóng modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Accessory Selector Tabs */}
        <div className="flex items-center justify-between px-5 pt-3 border-b border-slate-100 bg-slate-50/50 flex-wrap gap-2">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("khanmoqua")}
              className={`px-3.5 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 ${
                activeTab === "khanmoqua"
                  ? "border-emerald-600 text-emerald-700 bg-white shadow-xs"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              }`}
            >
              <span>1. Khăn Mỏ Quạ</span>
            </button>
            <button
              onClick={() => setActiveTab("tainghe")}
              className={`px-3.5 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 ${
                activeTab === "tainghe"
                  ? "border-emerald-600 text-emerald-700 bg-white shadow-xs"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              }`}
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>2. Tai Nghe Over-Ear</span>
            </button>
            <button
              onClick={() => setActiveTab("vongtay")}
              className={`px-3.5 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 ${
                activeTab === "vongtay"
                  ? "border-emerald-600 text-emerald-700 bg-white shadow-xs"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              }`}
            >
              <span>3. Vòng Tay Vàng</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 pb-1.5">
            <button
              onClick={handleDownloadPng}
              disabled={isExportingPng}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExportingPng ? "Đang xuất..." : "Tải PNG Trong Suốt"}</span>
            </button>
            <button
              onClick={handleDownloadSvg}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 text-white hover:bg-slate-900 transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải SVG</span>
            </button>
            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Đã chép!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Chép Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {downloadSuccess && (
          <div className="bg-emerald-500 text-white text-xs px-4 py-2 flex items-center justify-center gap-2 font-bold animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            <span>Đã tải thành công tệp layer {downloadSuccess} chuẩn tọa độ!</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left Canvas Preview Area */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="text-xs font-bold text-slate-600 mb-2 flex items-center justify-between w-full max-w-[280px]">
                <span>Canvas Size: 300 × 400</span>
                <span className="text-[10px] text-emerald-600 font-extrabold uppercase">
                  {showUnderlay ? "Fitting Với Búp Bê" : "Layer Trong Suốt"}
                </span>
              </div>

              {/* The 300x400 Container */}
              <div
                className="relative w-[260px] h-[347px] sm:w-[280px] sm:h-[373px] rounded-2xl overflow-hidden shadow-inner border-2 border-slate-200"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, #f1f5f9 25%, transparent 25%), linear-gradient(-45deg, #f1f5f9 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f1f5f9 75%), linear-gradient(-45deg, transparent 75%, #f1f5f9 75%)",
                  backgroundSize: "16px 16px",
                  backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
                  backgroundColor: "#ffffff"
                }}
              >
                {/* Optional Underlay: Búp bê gốc để kiểm tra Fitting */}
                {showUnderlay && (
                  <svg
                    viewBox="0 0 300 400"
                    className="absolute inset-0 w-full h-full pointer-events-none opacity-45 z-0"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Tóc sau */}
                    <ellipse cx="150" cy="67" rx="36" ry="42" fill="#1A1716" />
                    {/* Thân mình & Cánh tay */}
                    <path d="M124 118 Q118 170 120 230 L180 230 Q182 170 176 118 Z" fill="#FED7AA" />
                    <path d="M124 120 Q106 155 88 198 L98 202 Q116 160 130 128 Z" fill="#FED7AA" />
                    <path d="M176 120 Q194 155 212 198 L202 202 Q184 160 170 128 Z" fill="#FED7AA" />
                    {/* Cổ & Khuôn mặt */}
                    <rect x="143" y="96" width="14" height="23" rx="4" fill="#FED7AA" />
                    <ellipse cx="123" cy="82" rx="3.4" ry="5.5" fill="#FED7AA" />
                    <ellipse cx="177" cy="82" rx="3.4" ry="5.5" fill="#FED7AA" />
                    <ellipse cx="150" cy="78" rx="24" ry="26" fill="#FFF9F5" stroke="#FED7AA" strokeWidth="1.2" />
                    {/* Lông mày & Đôi mắt */}
                    <path d="M133.5 70 Q139.5 67.5 145.5 69.8" stroke="#382B22" strokeWidth="1.1" fill="none" />
                    <path d="M154.5 69.8 Q160.5 67.5 166.5 70" stroke="#382B22" strokeWidth="1.1" fill="none" />
                    <ellipse cx="139.5" cy="80" rx="7.0" ry="6.0" fill="#1A1513" />
                    <ellipse cx="160.5" cy="80" rx="7.0" ry="6.0" fill="#1A1513" />
                    {/* Bàn tay */}
                    <path d="M86 198 Q78 206 82 215 Q89 217 94 209 L94 198 Z" fill="#FED7AA" />
                    <path d="M214 198 Q222 206 218 215 Q211 217 206 209 L206 198 Z" fill="#FED7AA" />
                  </svg>
                )}

                {/* The Fixed Accessory Layer */}
                <div
                  className="absolute inset-0 w-full h-full z-10"
                  dangerouslySetInnerHTML={{ __html: currentItem.rawSvg }}
                />
              </div>

              {/* Fitting Toggle */}
              <button
                onClick={() => setShowUnderlay(!showUnderlay)}
                className={`mt-3 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                  showUnderlay
                    ? "bg-amber-100 text-amber-900 border-amber-300 shadow-xs"
                    : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-amber-700" />
                <span>{showUnderlay ? "Ẩn Búp Bê Nền" : "Bật Búp Bê Nền (Kiểm Tra Khớp)"}</span>
              </button>
            </div>

            {/* Right Details & Specs Area */}
            <div className="md:col-span-7 space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full uppercase">
                  {currentItem.category}
                </span>
                <h3 className="text-base font-black text-slate-900 mt-1.5">
                  {currentItem.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {currentItem.desc}
                </p>
              </div>

              {/* Detailed Fix Points */}
              <div className="space-y-2">
                <div className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Chi Tiết Khắc Phục Tọa Độ & Hình Dáng:</span>
                </div>
                {currentItem.fixedDetails.map((detail, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{detail}</span>
                  </div>
                ))}
              </div>

              {/* Technical Integration Specs */}
              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 space-y-1.5">
                <div className="font-extrabold flex items-center gap-1.5 text-blue-950">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Chuẩn Kỹ Thuật Z-Index & Absolute Positioning:</span>
                </div>
                <p className="text-[11px] text-blue-800 leading-relaxed">
                  Khung viền cố định <strong>300 × 400</strong> với gốc tọa độ <strong>(0,0)</strong> bằng tuyệt đối với Base Doll.
                  Khi dùng CSS <code className="bg-blue-100 px-1 py-0.5 rounded font-mono text-[10px]">absolute inset-0 w-full h-full</code>,
                  layer sẽ tự động rơi trúng vị trí mà không cần margin hay top/left thủ công!
                </p>
              </div>

              {/* SVG Source Preview */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <FileCode2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Mã SVG Độc Lập ({currentItem.id}):</span>
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="text-[11px] text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    {copied ? "Đã sao chép!" : "Sao chép toàn bộ"}
                  </button>
                </div>
                <pre className="p-3 bg-slate-900 text-emerald-400 rounded-xl text-[10.5px] font-mono overflow-x-auto max-h-[140px] leading-relaxed border border-slate-800 select-all">
                  {currentItem.rawSvg}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Đã đồng bộ trực tiếp lên PaperDollSvg & Tủ đồ Mix Match</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-800 text-white hover:bg-slate-900 transition-all shadow-xs"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
