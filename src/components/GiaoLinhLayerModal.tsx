import React, { useState, useRef } from "react";
import {
  X,
  Copy,
  Check,
  Download,
  Layers,
  Sparkles,
  Eye,
  CheckCircle2,
  Palette,
  ShieldCheck,
  FileCode2,
  Sliders
} from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const GiaoLinhLayerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"preview" | "svgCode" | "specs">("preview");
  const [copied, setCopied] = useState(false);
  const [colorTheme, setColorTheme] = useState<"black" | "blue" | "emerald" | "crimson">("black");
  const [showMannequinUnderlay, setShowMannequinUnderlay] = useState(false);
  const [isExportingPng, setIsExportingPng] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  // Theme palettes
  const themeConfigs = {
    black: {
      name: "Đen Mực Nhung (Búp Bê Gốc)",
      robeGrad: ["#141211", "#1E1B19", "#2B2724", "#1E1B19", "#141211"],
      collarGrad: ["#36302C", "#24201E", "#161413"],
      robeStroke: "#272523",
      collarLapel: "#1F1D1C",
      collarHighlight: "#3D3734",
      sleeveFold: "#2D2825",
      sleeveCuff: "#38332F",
      drapeFold: "#12100F",
      badgeColor: "bg-stone-900 text-stone-100"
    },
    blue: {
      name: "Xanh Lam Chàm (Ảnh Mẫu Người Thật)",
      robeGrad: ["#0F1E36", "#1E3A5F", "#2A4D7C", "#1E3A5F", "#0F1E36"],
      collarGrad: ["#3A5E94", "#1E3A5F", "#142640"],
      robeStroke: "#1B3354",
      collarLapel: "#1B3354",
      collarHighlight: "#4A78BC",
      sleeveFold: "#254774",
      sleeveCuff: "#3B69A8",
      drapeFold: "#0B1728",
      badgeColor: "bg-blue-900 text-blue-100"
    },
    emerald: {
      name: "Xanh Cốm Đại Việt (Thanh Nhã)",
      robeGrad: ["#064E3B", "#047857", "#059669", "#047857", "#064E3B"],
      collarGrad: ["#10B981", "#059669", "#064E3B"],
      robeStroke: "#065F46",
      collarLapel: "#065F46",
      collarHighlight: "#34D399",
      sleeveFold: "#047857",
      sleeveCuff: "#10B981",
      drapeFold: "#022C22",
      badgeColor: "bg-emerald-800 text-emerald-100"
    },
    crimson: {
      name: "Đỏ Chu Sa Cung Đình (Quyền Quý)",
      robeGrad: ["#7F1D1D", "#991B1B", "#B91C1C", "#991B1B", "#7F1D1D"],
      collarGrad: ["#DC2626", "#991B1B", "#7F1D1D"],
      robeStroke: "#991B1B",
      collarLapel: "#991B1B",
      collarHighlight: "#EF4444",
      sleeveFold: "#B91C1C",
      sleeveCuff: "#F87171",
      drapeFold: "#450A0A",
      badgeColor: "bg-rose-900 text-rose-100"
    }
  };

  const currentTheme = themeConfigs[colorTheme];

  const generateRawSvg = (theme = currentTheme) => {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="300" height="400" fill="none">
  <!-- 
    =======================================================================
    VIỆT PHỤC CỐM DUYỆT - LAYER ÁO GIAO LĨNH NỮ 2D CHUẨN PHOM DÁNG NGƯỜI THẬT
    Tác giả: 2D Game Fashion Artist
    Định dạng: Vector Illustration (Soft Shading) - Nền Trong Suốt (Z-Index Layer)
    Tỷ lệ Canvas: 300 x 400 (viewBox="0 0 300 400")
    Đặc điểm phom dáng:
      1. Chiều dài vạt áo: Kéo dài từ vai (y=118) xuống tận bắp chân dưới (y=346),
         che gần hết cơ thể, chỉ để lộ một đoạn ống quần lụa trắng và giày.
      2. Cổ áo Giao Lĩnh: Vạt chéo chữ Y đắp lên ngực chuẩn Hữu Nhậm (trái đè phải),
         nẹp viền cổ may bản to phẳng phiu sắc nét, lộ nhẹ cổ trung đơn trắng ngà.
      3. Tay áo thụng: Dài che kín cánh tay, ống tay rộng và chùng nhẹ cổ kính.
      4. Dải lụa thắt eo: Bản lụa trắng to quấn quanh bụng, có 2 dải lụa dài rủ
         buông thõng xuống tận qua đầu gối (y=324, qua gối y=285).
      5. Fitting chuẩn: KHÔNG dính mặt hay tay chân búp bê, sẵn sàng làm layer Z-index.
    =======================================================================
  -->
  <defs>
    <!-- Gradient chuyển sắc thân áo -->
    <linearGradient id="glFabricGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${theme.robeGrad[0]}" />
      <stop offset="25%" stop-color="${theme.robeGrad[1]}" />
      <stop offset="50%" stop-color="${theme.robeGrad[2]}" />
      <stop offset="75%" stop-color="${theme.robeGrad[3]}" />
      <stop offset="100%" stop-color="${theme.robeGrad[4]}" />
    </linearGradient>

    <!-- Gradient nẹp cổ giao lĩnh -->
    <linearGradient id="glCollarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.collarGrad[0]}" />
      <stop offset="50%" stop-color="${theme.collarGrad[1]}" />
      <stop offset="100%" stop-color="${theme.collarGrad[2]}" />
    </linearGradient>

    <!-- Gradient dải lụa trắng ngà thướt tha -->
    <linearGradient id="glWhiteSashGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F1F5F9" />
      <stop offset="35%" stop-color="#FFFFFF" />
      <stop offset="70%" stop-color="#F8FAFC" />
      <stop offset="100%" stop-color="#E2E8F0" />
    </linearGradient>
  </defs>

  <g id="layer-ao-giao-linh-chuan">
    <!-- 1. CỔ ÁO LÓT TRUNG ĐƠN TRẮNG NGÀ BÊN TRONG -->
    <g id="gl-inner-collar">
      <path d="M142 104 L150 115 L158 104 Z" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="0.8" />
      <path d="M144 104 L150 113 L156 104" stroke="#CBD5E1" stroke-width="0.6" fill="none" />
    </g>

    <!-- 2. TAY ÁO THỤNG RỘNG VÀ CHÙNG NHẸ (SLEEVES) -->
    <g id="gl-sleeves">
      <!-- Tay áo bên trái -->
      <path
        d="M122 118
           Q96 142 88 198
           L102 203
           Q116 182 126 154
           L124 134 Z"
        fill="${theme.robeGrad[1]}"
        stroke="${theme.robeStroke}"
        stroke-width="1.2"
      />
      <!-- Nếp gấp chùng ống tay trái -->
      <path d="M92 195 Q108 175 120 156" stroke="${theme.sleeveFold}" stroke-width="1.2" fill="none" />
      <path d="M96 200 Q112 182 124 162" stroke="${theme.drapeFold}" stroke-width="1" fill="none" />
      <path d="M88 198 L102 203" stroke="${theme.sleeveCuff}" stroke-width="1.8" stroke-linecap="round" />

      <!-- Tay áo bên phải -->
      <path
        d="M178 118
           Q204 142 212 198
           L198 203
           Q184 182 174 154
           L176 134 Z"
        fill="${theme.robeGrad[1]}"
        stroke="${theme.robeStroke}"
        stroke-width="1.2"
      />
      <!-- Nếp gấp chùng ống tay phải -->
      <path d="M208 195 Q192 175 180 156" stroke="${theme.sleeveFold}" stroke-width="1.2" fill="none" />
      <path d="M204 200 Q188 182 176 162" stroke="${theme.drapeFold}" stroke-width="1" fill="none" />
      <path d="M212 198 L198 203" stroke="${theme.sleeveCuff}" stroke-width="1.8" stroke-linecap="round" />
    </g>

    <!-- 3. THÂN ÁO DÀNG DÀI THƯỚT THA ĐẾN BẮP CHÂN DƯỚI (LONG ROBE BODY) -->
    <g id="gl-robe-body">
      <!-- Thân chính kéo dài từ vai (y=118) xuống bắp chân dưới (y=346) -->
      <path
        d="M122 118
           Q120 180 121 210
           Q119 265 114 346
           Q150 351 186 346
           Q181 265 179 210
           Q180 180 178 118 Z"
        fill="url(#glFabricGrad)"
        stroke="${theme.robeStroke}"
        stroke-width="1.2"
      />

      <!-- Nếp rủ vải mềm mại dọc theo thân áo -->
      <path d="M134 196 Q130 265 125 346" stroke="${theme.drapeFold}" stroke-width="1.4" fill="none" />
      <path d="M136 198 Q132 265 127 346" stroke="${theme.sleeveFold}" stroke-width="0.8" fill="none" />
      <path d="M166 196 Q170 265 175 346" stroke="${theme.drapeFold}" stroke-width="1.4" fill="none" />
      <path d="M164 198 Q168 265 173 346" stroke="${theme.sleeveFold}" stroke-width="0.8" fill="none" />
      <path d="M150 200 Q152 270 150 348" stroke="${theme.drapeFold}" stroke-width="1.2" fill="none" />

      <!-- Bóng đổ nhẹ hai bên mạn sườn -->
      <path d="M121 210 Q119 265 114 346 L120 346 Q124 265 126 210 Z" fill="${theme.drapeFold}" opacity="0.45" />
      <path d="M179 210 Q181 265 186 346 L180 346 Q176 265 174 210 Z" fill="${theme.drapeFold}" opacity="0.45" />

      <!-- Đường gấu áo viền may tinh tế -->
      <path d="M114 346 Q150 351 186 346" stroke="${theme.sleeveCuff}" stroke-width="1.5" fill="none" />
    </g>

    <!-- 4. CỔ ÁO GIAO LĨNH VẠT CHÉO CHỮ Y BẢN TO (HỮU NHẬM: TRÁI ĐÈ PHẢI) -->
    <g id="gl-lapel-collar">
      <!-- Vạt dưới bên phải (chạy từ vai phải chéo qua nách trái) -->
      <path
        d="M168 117
           L174 118
           L136 172
           L132 166 Z"
        fill="${theme.collarLapel}"
        stroke="${theme.robeStroke}"
        stroke-width="1"
      />
      <line x1="170" y1="117" x2="134" y2="169" stroke="${theme.sleeveCuff}" stroke-width="2.2" />

      <!-- Vạt trên bên trái (HỮU NHẬM: chạy từ vai trái đè chéo sang sườn phải) -->
      <path
        d="M132 117
           L126 118
           L168 184
           L174 178 Z"
        fill="url(#glCollarGrad)"
        stroke="${theme.robeStroke}"
        stroke-width="1"
      />
      <!-- Nẹp cổ may bản to phẳng phiu sắc nét -->
      <line x1="128" y1="117" x2="172" y2="182" stroke="${theme.collarHighlight}" stroke-width="3" stroke-linecap="round" />
      <line x1="126.5" y1="117.5" x2="170.5" y2="182.5" stroke="#FFFFFF" stroke-opacity="0.35" stroke-width="0.8" />
      <line x1="130" y1="116.5" x2="174" y2="181.5" stroke="${theme.drapeFold}" stroke-width="0.8" />

      <!-- Bóng đổ nhẹ dưới mép nẹp vạt chéo -->
      <path d="M130 120 L174 186 L174 190 L130 124 Z" fill="#0C0A09" opacity="0.35" />
    </g>

    <!-- 5. ĐAI THẮT EO LỤA TRẮNG TO BẢN & 2 DẢI LỤA DÀI BUÔNG RỦ QUA ĐẦU GỐI -->
    <g id="gl-silk-sash">
      <!-- Bản đai lụa quấn ngang eo (To bản, phẳng phiu, mềm mại) -->
      <path
        d="M123 182
           Q150 186 177 182
           L178 198
           Q150 202 122 198 Z"
        fill="url(#glWhiteSashGrad)"
        stroke="#E2E8F0"
        stroke-width="1.2"
      />
      <!-- Các nếp gấp lụa ngang tự nhiên trên thân đai -->
      <path d="M125 188 Q150 191 175 188" stroke="#CBD5E1" stroke-width="1" fill="none" />
      <path d="M126 193 Q150 196 174 193" stroke="#CBD5E1" stroke-width="0.8" fill="none" stroke-dasharray="8 2" />
      <!-- Bóng đổ nhẹ dưới mép đai lụa -->
      <path d="M122 198 Q150 202 178 198 L178 201 Q150 205 122 201 Z" fill="#0C0A09" opacity="0.25" />

      <!-- Nút thắt nơ lụa mềm mại chính giữa eo -->
      <g id="gl-sash-knot">
        <ellipse cx="150" cy="191" rx="5" ry="3.5" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" />
        <ellipse cx="150" cy="191" rx="3" ry="2" fill="#F8FAFC" />
        <path d="M147 189 Q150 192 153 189" stroke="#CBD5E1" stroke-width="0.9" fill="none" />
      </g>

      <!-- HAI DẢI LỤA DÀI BUÔNG THÕNG QUA ĐẦU GỐI (DÀI ĐẾN Y=324, ĐẦU GỐI TẠI Y=285) -->
      <!-- Dải lụa thứ nhất (Bên trái): mềm mại, rủ thẳng xuống qua đầu gối -->
      <path
        d="M147 193
           Q144 235 142 270
           Q140 295 143 322
           L149 320
           Q147 295 148 270
           Q150 235 151 193 Z"
        fill="url(#glWhiteSashGrad)"
        stroke="#E2E8F0"
        stroke-width="1"
      />
      <!-- Nếp sóng mềm trên dải lụa trái -->
      <path d="M146 196 Q144 240 144 285 Q143 305 146 320" stroke="#CBD5E1" stroke-width="0.8" fill="none" />
      <line x1="143" y1="322" x2="149" y2="320" stroke="#CBD5E1" stroke-width="1" />

      <!-- Dải lụa thứ hai (Bên phải): lượn nhẹ bay bổng, rủ xuống dài hơn qua đầu gối -->
      <path
        d="M151 193
           Q154 235 156 270
           Q158 298 155 326
           L149 324
           Q152 298 150 270
           Q148 235 147 193 Z"
        fill="#FFFFFF"
        stroke="#E2E8F0"
        stroke-width="1"
      />
      <!-- Nếp sóng mềm trên dải lụa phải -->
      <path d="M150 196 Q153 240 153 285 Q154 308 152 325" stroke="#CBD5E1" stroke-width="0.8" fill="none" />
      <line x1="149" y1="324" x2="155" y2="326" stroke="#CBD5E1" stroke-width="1" />

      <!-- Bóng đổ nhẹ giữa hai dải lụa tạo chiều sâu lớp lang -->
      <path d="M149 200 L150 270 L148 270 Z" fill="#CBD5E1" opacity="0.6" />
    </g>
  </g>
</svg>`;
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(generateRawSvg());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSvg = () => {
    const svgData = generateRawSvg();
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ao_giao_linh_chuan_${colorTheme}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadSuccess("SVG");
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const handleDownloadPng = () => {
    setIsExportingPng(true);
    const svgString = generateRawSvg();
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const URLObject = window.URL || window.webkitURL || window;
    const blobURL = URLObject.createObjectURL(svgBlob);

    const image = new Image();
    image.onload = () => {
      // 3x resolution for high-res crisp vector rasterization (900 x 1200)
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
            link.download = `ao_giao_linh_chuan_transparent_${colorTheme}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URLObject.revokeObjectURL(pngUrl);
            setDownloadSuccess("PNG");
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
        <div className="p-4 sm:p-5 border-b border-emerald-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 via-white to-teal-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  Layer Áo Giao Lĩnh 2D Chuẩn Phom Dáng
                </h2>
                <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  Chuẩn Ảnh Người Thật
                </span>
              </div>
              <p className="text-xs text-slate-500">
                2D Fashion Game Layer • Vạt Dài Bắp Chân • Cổ Vạt Chéo Chữ Y • Đai Lụa Rủ Qua Gối
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

        {/* Tab Navigation */}
        <div className="flex items-center justify-between px-5 pt-3 border-b border-slate-100 bg-slate-50/50">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-3.5 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 ${
                activeTab === "preview"
                  ? "border-emerald-600 text-emerald-700 bg-white shadow-xs"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Xem Thử & Kiểm Tra Fitting</span>
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`px-3.5 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 ${
                activeTab === "specs"
                  ? "border-emerald-600 text-emerald-700 bg-white shadow-xs"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Thông Số Kỹ Thuật 2D</span>
            </button>
            <button
              onClick={() => setActiveTab("svgCode")}
              className={`px-3.5 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 ${
                activeTab === "svgCode"
                  ? "border-emerald-600 text-emerald-700 bg-white shadow-xs"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>Mã Nguồn SVG Tinh Gọn</span>
            </button>
          </div>

          {/* Quick Download & Copy Buttons in Header Tab */}
          <div className="flex items-center gap-2 pb-1.5">
            <button
              onClick={handleDownloadPng}
              disabled={isExportingPng}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-xs"
              title="Xuất file ảnh PNG trong suốt độ phân giải cao"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExportingPng ? "Đang xuất..." : "Tải PNG Trong Suốt"}</span>
            </button>
            <button
              onClick={handleDownloadSvg}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 text-white hover:bg-slate-900 transition-all flex items-center gap-1.5 shadow-xs"
              title="Tải tệp SVG chuẩn vector"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải SVG</span>
            </button>
            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-xs"
              title="Sao chép code SVG vào clipboard"
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
            <span>Đã tải thành công tệp {downloadSuccess} Áo Giao Lĩnh nền trong suốt hoàn hảo!</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {activeTab === "preview" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Left Canvas Preview Area: 300x400 Container */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="text-xs font-bold text-slate-600 mb-2 flex items-center justify-between w-full max-w-[280px]">
                  <span>Canvas Preview (300 × 400)</span>
                  <span className="text-[10px] text-emerald-600 font-extrabold uppercase">
                    {showMannequinUnderlay ? "Mặc Trên Búp Bê" : "Layer Trong Suốt"}
                  </span>
                </div>

                {/* The Doll / Robe Frame with Transparent Checkerboard */}
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
                  {showMannequinUnderlay && (
                    <svg
                      viewBox="0 0 300 400"
                      className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Body silhouette */}
                      <path d="M124 118 Q118 170 120 230 L180 230 Q182 170 176 118 Z" fill="#FED7AA" />
                      <rect x="135" y="230" width="12" height="138" rx="5" fill="#FED7AA" />
                      <rect x="153" y="230" width="12" height="138" rx="5" fill="#FED7AA" />
                      <path d="M124 120 Q106 155 88 198 L98 202 Q116 160 130 128 Z" fill="#FED7AA" />
                      <path d="M176 120 Q194 155 212 198 L202 202 Q184 160 170 128 Z" fill="#FED7AA" />
                      <rect x="143" y="96" width="14" height="23" rx="4" fill="#FED7AA" />
                      <ellipse cx="150" cy="78" rx="24" ry="26" fill="#FFF9F5" stroke="#FED7AA" strokeWidth="1.2" />
                      <line x1="140" y1="112" x2="140" y2="124" stroke="#CBD5E1" strokeWidth="1.6" />
                      <line x1="160" y1="112" x2="160" y2="124" stroke="#CBD5E1" strokeWidth="1.6" />
                      {/* White silk trousers under layer */}
                      <path d="M120 198 L180 198 L184 258 L116 258 Z" fill="#F8FAFC" />
                      <path d="M116 252 L116 365 L147 365 L149 256 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
                      <path d="M184 252 L184 365 L153 365 L151 256 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
                    </svg>
                  )}

                  {/* The Pure Giao Linh Layer SVG */}
                  <div
                    className="absolute inset-0 w-full h-full z-10"
                    dangerouslySetInnerHTML={{ __html: generateRawSvg() }}
                  />
                </div>

                {/* Layer Toggle: Bật/Tắt búp bê nền */}
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => setShowMannequinUnderlay(!showMannequinUnderlay)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                      showMannequinUnderlay
                        ? "bg-amber-100 text-amber-900 border-amber-300 shadow-xs"
                        : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 text-amber-700" />
                    <span>{showMannequinUnderlay ? "Ẩn Búp Bê Gốc (Chỉ Xem Áo)" : "Thử Đắp Lên Búp Bê (Fitting)"}</span>
                  </button>
                </div>
              </div>

              {/* Right Controls & Feature Breakdown Area */}
              <div className="md:col-span-7 space-y-4">
                {/* 1. Theme Color Selector */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-extrabold text-slate-700 mb-2.5 flex items-center gap-1.5">
                    <Palette className="w-4 h-4 text-emerald-600" />
                    <span>Tùy Chọn Tông Màu Áo Giao Lĩnh:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setColorTheme("black")}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 text-left ${
                        colorTheme === "black"
                          ? "bg-stone-900 text-white border-stone-950 shadow-md ring-2 ring-emerald-400"
                          : "bg-white text-stone-800 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full bg-stone-900 border border-stone-700 shrink-0" />
                      <div>
                        <div className="font-bold text-[11px]">Đen Mực Nhung</div>
                        <div className="text-[10px] opacity-75">Búp bê đang mặc</div>
                      </div>
                    </button>

                    <button
                      onClick={() => setColorTheme("blue")}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 text-left ${
                        colorTheme === "blue"
                          ? "bg-blue-900 text-white border-blue-950 shadow-md ring-2 ring-blue-400"
                          : "bg-white text-slate-800 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full bg-blue-800 border border-blue-600 shrink-0" />
                      <div>
                        <div className="font-bold text-[11px]">Xanh Lam Chàm</div>
                        <div className="text-[10px] opacity-75">Chuẩn ảnh mẫu thật</div>
                      </div>
                    </button>

                    <button
                      onClick={() => setColorTheme("emerald")}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 text-left ${
                        colorTheme === "emerald"
                          ? "bg-emerald-800 text-white border-emerald-950 shadow-md ring-2 ring-emerald-400"
                          : "bg-white text-slate-800 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full bg-emerald-700 border border-emerald-500 shrink-0" />
                      <div>
                        <div className="font-bold text-[11px]">Xanh Cốm Đại Việt</div>
                        <div className="text-[10px] opacity-75">Sắc thái cung đình</div>
                      </div>
                    </button>

                    <button
                      onClick={() => setColorTheme("crimson")}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 text-left ${
                        colorTheme === "crimson"
                          ? "bg-rose-900 text-white border-rose-950 shadow-md ring-2 ring-rose-400"
                          : "bg-white text-slate-800 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full bg-rose-800 border border-rose-600 shrink-0" />
                      <div>
                        <div className="font-bold text-[11px]">Đỏ Chu Sa</div>
                        <div className="text-[10px] opacity-75">Hỷ lễ & Dạ tiệc</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* 2. Key Design Enhancements (Dựa sát ảnh người thật) */}
                <div className="space-y-2.5">
                  <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-emerald-950 font-black">Chiều dài vạt áo chuẩn bắp chân (y=346):</strong>
                      <p className="text-emerald-800 text-[11px] mt-0.5 leading-relaxed">
                        Khắc phục hoàn toàn lỗi áo lửng ngắn cũn cỡn. Vạt áo thướt tha phủ dài xuống bắp chân dưới,
                        che trọn thân mình và để lộ vừa vặn một đoạn ống quần lụa trắng phía dưới.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-blue-950 font-black">Cổ áo chữ Y bản to (Hữu Nhậm):</strong>
                      <p className="text-blue-800 text-[11px] mt-0.5 leading-relaxed">
                        Nẹp viền cổ may phẳng phiu, sắc nét, vạt trái đắp chéo đè lên vạt phải chuẩn nếp xưa Đại Việt,
                        hé lộ lớp cổ áo lót trung đơn trắng ngà thanh nhã.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-amber-950 font-black">Tay áo thụng rộng chùng nhẹ:</strong>
                      <p className="text-amber-800 text-[11px] mt-0.5 leading-relaxed">
                        Che kín hoàn toàn cánh tay, mở rộng và võng nhẹ ở khuỷu tay tạo phong thái cổ kính,
                        khớp chính xác với cổ tay búp bê tại y=198-203.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-200 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-purple-950 font-black">Dải lụa thắt eo buông dài qua đầu gối:</strong>
                      <p className="text-purple-800 text-[11px] mt-0.5 leading-relaxed">
                        Xóa bỏ hoàn toàn chiếc đai nâu cứng nhắc trước đây. Thay bằng dải lụa trắng to bản thắt quanh bụng
                        với hai dải lụa mềm buông thõng thướt tha xuống tận y=324 (vượt qua đầu gối y=285).
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Export Action Bar */}
                <div className="pt-2 flex flex-wrap gap-2.5">
                  <button
                    onClick={handleDownloadPng}
                    disabled={isExportingPng}
                    className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-md shadow-emerald-200 flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isExportingPng ? "Đang xuất PNG..." : "Tải PNG Trong Suốt (HD)"}</span>
                  </button>
                  <button
                    onClick={handleDownloadSvg}
                    className="py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-black transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Tải SVG Vector</span>
                  </button>
                  <button
                    onClick={handleCopyCode}
                    className="py-2.5 px-3.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                    <span>{copied ? "Đã chép" : "Chép SVG"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <h4 className="text-sm font-black text-emerald-950 mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Bảng Thông Số Kỹ Thuật Layer 2D Game Fashion Artist
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Thiết kế được chuẩn hóa đồng bộ 100% với hệ thống búp bê Cốm Duyệt theo cấu trúc Z-index nhiều lớp,
                  đảm bảo đắp vừa khít lên cơ thể búp bê mà không dính khuôn mặt hay tay chân.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">1. Canvas & ViewBox</div>
                  <div className="font-extrabold text-slate-800 text-sm">300 × 400 (Tỷ lệ dọc 3:4)</div>
                  <div className="text-slate-600 text-[11px]">Trục đối xứng cơ thể trung tâm: X = 150</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">2. Vị trí khớp vai & cổ</div>
                  <div className="font-extrabold text-slate-800 text-sm">Vai: Y = 118 | Cổ: Y = 104 - 115</div>
                  <div className="text-slate-600 text-[11px]">Khớp hoàn hảo với vai búp bê (x=122 đến x=178)</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">3. Chiều dài vạt áo (Robe Length)</div>
                  <div className="font-extrabold text-emerald-700 text-sm">Kéo dài đến Y = 346 (Bắp chân dưới)</div>
                  <div className="text-slate-600 text-[11px]">Chỉ để lộ ống quần lụa trắng (Y=346 - 365) & giày (Y=368)</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">4. Dải lụa thắt eo & Dải buông</div>
                  <div className="font-extrabold text-blue-700 text-sm">Bản eo: Y=182-198 | Dải rủ: Y=324</div>
                  <div className="text-slate-600 text-[11px]">Vượt qua đầu gối búp bê (Y=285) đến tận Y=324-326</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">5. Ống tay thụng (Wide Sleeves)</div>
                  <div className="font-extrabold text-purple-700 text-sm">Khớp cổ tay: X=88-102 & X=198-212</div>
                  <div className="text-slate-600 text-[11px]">Che kín cánh tay, ống chùng nhẹ mềm rủ tự nhiên</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">6. Tách Lớp & Z-Index</div>
                  <div className="font-extrabold text-amber-700 text-sm">Z-Index: Layer 40 (Torso) & 50 (Sleeves)</div>
                  <div className="text-slate-600 text-[11px]">Hoàn toàn trong suốt, không dính mặt hay bàn tay/chân</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "svgCode" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">
                  Mã SVG Độc Lập ({colorTheme.toUpperCase()} THEME)
                </span>
                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Đã sao chép" : "Sao chép mã"}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-900 text-emerald-400 rounded-2xl text-[11px] font-mono overflow-x-auto max-h-[380px] leading-relaxed border border-slate-800 select-all">
                {generateRawSvg()}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Layer đã được áp dụng trực tiếp lên búp bê và tủ đồ Cốm Duyệt</span>
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
