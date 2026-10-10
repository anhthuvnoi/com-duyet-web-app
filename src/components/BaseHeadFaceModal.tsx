import React, { useState } from "react";
import { X, Copy, Check, Download, Layers, Sparkles, Eye, ShieldCheck } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const BaseHeadFaceModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [showBodyOverlay, setShowBodyOverlay] = useState(true);
  const [showGridGuide, setShowGridGuide] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "svgCode" | "specs">("preview");

  if (!isOpen) return null;

  const rawSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="300" height="400" fill="none">
  <!-- 
    =======================================================================
    VIỆT PHỤC CỐM DUYỆT - LAYER KHUÔN MẶT VÀ ĐẦU (BASE HEAD & FACE LAYER)
    Định dạng: SVG Chuẩn Vector Tinh Gọn (Nền Trong Suốt)
    Tỷ lệ Canvas: 300 x 400 (viewBox="0 0 300 400")
    Đặc điểm:
      1. Khuôn mặt hình trái xoan (Oval Face) thanh tú, cằm thon gọn nhẹ nhàng.
      2. Phóng to 10% - 15% so với bản gốc tạo tỷ lệ Chibi đầy đặn, bắt mắt.
      3. Cằm hạ nhẹ (y=104) che bớt cổ dài màu đỏ/trắng, tạo cảm giác cổ ngắn lại tự nhiên.
      4. Ngũ quan cân đối 100% qua trục dọc trung tâm X=150:
         - Đôi mắt to tròn hơn, đen láy lấp lánh (catchlight) mềm mại có chiều sâu.
         - Má hồng phớt nhẹ tự nhiên (soft rosy cheeks) đối xứng.
         - Miệng nhỏ nhắn mỉm cười nhẹ nhàng ở chính giữa thẳng trục cằm & cổ.
         - Lông mày thanh tú cong nhẹ đối xứng phía trên mắt.
      5. Mái tóc đen dài buông rủ, tóc mái bằng (bangs) dày dặn cắt ngang trên trán,
         kẹp tóc bông hoa đào hồng nhụy vàng lá xanh cài phía trên bên phải.
    =======================================================================
  -->
  <defs>
    <radialGradient id="softBlushGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FB7185" stop-opacity="0.75" />
      <stop offset="65%" stop-color="#FDA4AF" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#FDA4AF" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="softNeckShadow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F8CBB0" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#FFEFE5" stop-opacity="0" />
    </linearGradient>
  </defs>

  <g id="layer-base-head-face">
    <!-- 1. MÁI TÓC ĐEN DÀI THẲNG BUÔNG RỦ PHÍA SAU (TỶ LỆ PHÓNG TO 12-15%) -->
    <g id="back-hair">
      <ellipse cx="150" cy="67" rx="36" ry="42" fill="#1A1716" />
      <path d="M113 75 C103 130 99 185 103 250 C105 253 111 253 113 250 C117 195 121 140 125 85 Z" fill="#1A1716" />
      <path d="M187 75 C197 130 201 185 197 250 C195 253 189 253 187 250 C183 195 179 140 175 85 Z" fill="#1A1716" />
      <path d="M113 78 Q105 160 111 246 Q150 254 189 246 Q195 160 187 78 Z" fill="#1A1716" opacity="0.98" />
    </g>

    <!-- 2. KHỚP CỔ NỐI LIỀN MƯỢT MÀ VỚI THÂN HÌNH (CẰM HẠ THẤP GIÚP CỔ NGẮN TỰ NHIÊN) -->
    <g id="neck-joint">
      <rect x="143" y="96" width="14" height="23" rx="4" fill="#FFEFE5" stroke="#F6CEB4" stroke-width="0.8" />
      <path d="M143 102 Q150 107 157 102 L157 106 Q150 111 143 106 Z" fill="url(#softNeckShadow)" />
    </g>

    <!-- 3. TAI VÀ KHUÔN MẶT HÌNH TRÁI XOAN (OVAL FACE - TO HƠN 12-15%, THANH TÚ, CÂN XỨNG) -->
    <g id="face-and-ears">
      <ellipse cx="123" cy="82" rx="3.4" ry="5.5" fill="#FFF8F1" stroke="#F6CEB4" stroke-width="0.8" />
      <path d="M122.5 80.5 Q124 82 122.5 83.5" stroke="#FBBF9E" stroke-width="0.7" fill="none" />
      <ellipse cx="177" cy="82" rx="3.4" ry="5.5" fill="#FFF8F1" stroke="#F6CEB4" stroke-width="0.8" />
      <path d="M177.5 80.5 Q176 82 177.5 83.5" stroke="#FBBF9E" stroke-width="0.7" fill="none" />
      <path
        d="M124.5 66
           C123.5 73 123.5 80 123.5 80
           C123.5 87 128 94 135 98
           C142 102.8 146.5 104 150 104
           C153.5 104 158 102.8 165 98
           C172 94 176.5 87 176.5 80
           C176.5 73 175.5 66 175.5 66
           C174 49 126 49 124.5 66 Z"
        fill="#FFF8F1"
        stroke="#F6CEB4"
        stroke-width="1.0"
      />
    </g>

    <!-- 4. LÔNG MÀY THANH TÚ, CONG NHẸ ÔN HÒA (ĐỐI XỨNG CÂN BẰNG QUA X=150) -->
    <g id="eyebrows">
      <path d="M133.5 70 Q139.5 67.5 145.5 69.8" stroke="#382B22" stroke-width="1.1" stroke-linecap="round" fill="none" />
      <path d="M154.5 69.8 Q160.5 67.5 166.5 70" stroke="#382B22" stroke-width="1.1" stroke-linecap="round" fill="none" />
      <path d="M135 75.5 Q139.5 74 144 75.8" stroke="#C4A794" stroke-width="0.75" stroke-linecap="round" fill="none" />
      <path d="M156 75.8 Q160.5 74 165 75.5" stroke="#C4A794" stroke-width="0.75" stroke-linecap="round" fill="none" />
    </g>

    <!-- 5. ĐÔI MẮT TO TRÒN HƠN TƯƠNG XỨNG VỚI MẶT TRÁI XOAN MỚI (CY=80) -->
    <g id="sparkling-eyes">
      <ellipse cx="139.5" cy="80" rx="7.0" ry="6.0" fill="#FFFFFF" />
      <ellipse cx="160.5" cy="80" rx="7.0" ry="6.0" fill="#FFFFFF" />

      <ellipse cx="139.5" cy="80.2" rx="5.6" ry="5.9" fill="#1A1513" />
      <ellipse cx="160.5" cy="80.2" rx="5.6" ry="5.9" fill="#1A1513" />

      <ellipse cx="139.5" cy="80.5" rx="3.4" ry="3.7" fill="#0C0A09" />
      <ellipse cx="160.5" cy="80.5" rx="3.4" ry="3.7" fill="#0C0A09" />

      <path d="M136.2 82.2 Q139.5 85 142.8 82.2" stroke="#4A3B32" stroke-width="0.9" stroke-linecap="round" fill="none" />
      <path d="M157.2 82.2 Q160.5 85 163.8 82.2" stroke="#4A3B32" stroke-width="0.9" stroke-linecap="round" fill="none" />

      <circle cx="137.7" cy="78.2" r="1.8" fill="#FFFFFF" />
      <circle cx="158.7" cy="78.2" r="1.8" fill="#FFFFFF" />

      <circle cx="141.5" cy="82.2" r="1.1" fill="#FFFFFF" />
      <circle cx="162.5" cy="82.2" r="1.1" fill="#FFFFFF" />

      <circle cx="138.0" cy="82.8" r="0.6" fill="#FFFFFF" opacity="0.85" />
      <circle cx="159.0" cy="82.8" r="0.6" fill="#FFFFFF" opacity="0.85" />

      <path d="M132.5 78.8 Q139.5 74.8 146.5 79" stroke="#231B16" stroke-width="1.4" stroke-linecap="round" fill="none" />
      <path d="M132.5 79 Q131.2 78 132 77.2" stroke="#231B16" stroke-width="0.9" stroke-linecap="round" fill="none" />
      <path d="M167.5 78.8 Q160.5 74.8 153.5 79" stroke="#231B16" stroke-width="1.4" stroke-linecap="round" fill="none" />
      <path d="M167.5 79 Q168.8 78 168 77.2" stroke="#231B16" stroke-width="0.9" stroke-linecap="round" fill="none" />

      <path d="M136 85.4 Q139.5 86.3 143 85.4" stroke="#8C796D" stroke-width="0.65" stroke-linecap="round" fill="none" />
      <path d="M164 85.4 Q160.5 86.3 157 85.4" stroke="#8C796D" stroke-width="0.65" stroke-linecap="round" fill="none" />
    </g>

    <!-- 6. MÁ HỒNG PHỚT NHẸ TỰ NHIÊN & CHẤM MŨI XINH (ĐỐI XỨNG CÂN BẰNG X=150±17.5) -->
    <g id="blush-and-nose">
      <circle cx="132.5" cy="87" r="5.8" fill="url(#softBlushGrad)" />
      <circle cx="167.5" cy="87" r="5.8" fill="url(#softBlushGrad)" />
      <circle cx="150" cy="87" r="0.8" fill="#E59871" opacity="0.75" />
    </g>

    <!-- 7. KHUÔN MIỆNG NHỎ NHẮN CHÍNH GIỮA TRỤC DỌC X=150 (NATURAL SWEET SMILE) -->
    <g id="smiling-mouth">
      <path d="M146.8 93.8 Q150 96.4 153.2 93.8" stroke="#DF4763" stroke-width="1.2" stroke-linecap="round" fill="none" />
      <ellipse cx="150" cy="95.3" rx="2.0" ry="0.8" fill="#FB7185" opacity="0.32" />
    </g>

    <!-- 8. TÓC MÁI BẰNG CẮT GỌN TRÊN HÀNG LÔNG MÀY (NEAT STRAIGHT BANGS - TỶ LỆ MỚI) -->
    <g id="front-bangs">
      <path
        d="M122 68
           C121 51 133 40 150 40
           C167 40 179 51 178 68
           C177 63 172 61 168 62
           Q159 62.8 150 63
           Q141 62.8 132 62
           C128 61 123 63 122 68 Z"
        fill="#1A1716"
      />
      <path d="M122 66 Q120 78 122 90 Q124 90 125 81 Q126 70 128 64 Z" fill="#1A1716" />
      <path d="M178 66 Q180 78 178 90 Q176 90 175 81 Q174 70 172 64 Z" fill="#1A1716" />
    </g>

    <!-- 9. KẸP TÓC BÔNG HOA MAI / HOA ĐÀO (FLOWER HAIR CLIP - PHÓNG TO TƯƠNG XỨNG) -->
    <g id="blossom-hairpin">
      <path d="M174.5 49.5 Q179 48.5 178.5 53 Q175.5 54 174.5 49.5 Z" fill="#22C55E" />
      <circle cx="170" cy="51" r="2.8" fill="#F472B6" />
      <circle cx="173" cy="53.2" r="2.8" fill="#F472B6" />
      <circle cx="171.8" cy="56.5" r="2.8" fill="#F472B6" />
      <circle cx="168.2" cy="56.5" r="2.8" fill="#F472B6" />
      <circle cx="167" cy="53.2" r="2.8" fill="#F472B6" />
      <circle cx="170" cy="54" r="1.8" fill="#FDE047" stroke="#F59E0B" stroke-width="0.4" />
      <circle cx="169.6" cy="53.6" r="0.6" fill="#FFFFFF" />
    </g>
  </g>
</svg>`;

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(rawSvgCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSvg = () => {
    const blob = new Blob([rawSvgCode], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "base_head_face_doll.svg";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPng = () => {
    const img = new Image();
    const svgBlob = new Blob([rawSvgCode], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      // High-resolution 2x (600x800)
      canvas.width = 600;
      canvas.height = 800;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, 600, 800);
        ctx.drawImage(img, 0, 0, 600, 800);
        const pngUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = "base_head_face_doll_transparent.png";
        link.click();
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-emerald-100 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-emerald-100 flex items-center justify-between bg-emerald-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-emerald-950 flex items-center gap-2">
                Layer Khuôn Mặt Gốc 2D Chibi
                <span className="text-[10px] bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                  Khớp nối 100%
                </span>
              </h2>
              <p className="text-xs text-emerald-700">
                Chuẩn vector 2D, mắt đen láy catchlight long lanh, tỉa mái trên mày & kẹp hoa đào
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-white transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 px-4 bg-stone-50 gap-2 pt-2">
          <button
            onClick={() => setActiveTab("preview")}
            className={`px-3 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === "preview"
                ? "bg-white text-emerald-900 border-emerald-600 shadow-2xs"
                : "text-stone-500 hover:text-stone-900 border-transparent"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Xem trước & Kiểm tra khớp layer</span>
          </button>

          <button
            onClick={() => setActiveTab("svgCode")}
            className={`px-3 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === "svgCode"
                ? "bg-white text-emerald-900 border-emerald-600 shadow-2xs"
                : "text-stone-500 hover:text-stone-900 border-transparent"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Mã SVG Vector Tinh Gọn</span>
          </button>

          <button
            onClick={() => setActiveTab("specs")}
            className={`px-3 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === "specs"
                ? "bg-white text-emerald-900 border-emerald-600 shadow-2xs"
                : "text-stone-500 hover:text-stone-900 border-transparent"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Thông số tọa độ & Khớp cổ</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {activeTab === "preview" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              {/* Left: Interactive Canvas Box */}
              <div className="md:col-span-6 flex flex-col items-center">
                <div className="relative w-64 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-stone-300 shadow-inner bg-[repeating-conic-gradient(#f1f5f9_0%_25%,#ffffff_0%_50%)] bg-[length:16px_16px] flex items-center justify-center">
                  {/* Base Body undergarment (optional overlay check) */}
                  {showBodyOverlay && (
                    <svg
                      viewBox="0 0 300 400"
                      className="absolute inset-0 w-full h-full pointer-events-none opacity-85"
                      fill="none"
                    >
                      <path d="M124 118 Q118 170 120 230 L180 230 Q182 170 176 118 Z" fill="#FFF7ED" />
                      <rect x="135" y="230" width="12" height="138" rx="5" fill="#FED7AA" />
                      <rect x="153" y="230" width="12" height="138" rx="5" fill="#FED7AA" />
                      {/* Áo hai dây trắng */}
                      <line x1="140" y1="112" x2="140" y2="124" stroke="#CBD5E1" strokeWidth="1.6" />
                      <line x1="160" y1="112" x2="160" y2="124" stroke="#CBD5E1" strokeWidth="1.6" />
                      <path d="M134 124 L166 124 L169 194 Q150 198 131 194 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />
                      {/* Quần đùi trắng */}
                      <path d="M130 194 L170 194 L172 242 L152 242 L150 216 L148 242 L128 242 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />
                      <line x1="150" y1="194" x2="150" y2="216" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 1.5" />
                      {/* Cánh tay */}
                      <path d="M124 120 Q106 155 88 198 L98 202 Q116 160 130 128 Z" fill="#FED7AA" />
                      <path d="M176 120 Q194 155 212 198 L202 202 Q184 160 170 128 Z" fill="#FED7AA" />
                      {/* Dép */}
                      <ellipse cx="140" cy="368" rx="8" ry="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
                      <ellipse cx="160" cy="368" rx="8" ry="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
                    </svg>
                  )}

                  {/* Grid guide */}
                  {showGridGuide && (
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Center Axis */}
                      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-red-400/70 border-dashed" />
                      {/* Neck Joint Line */}
                      <div className="absolute top-[24%] left-0 right-0 h-[1px] bg-blue-500/70" />
                      <div className="absolute top-[29.5%] left-0 right-0 h-[1px] bg-blue-500/70" />
                    </div>
                  )}

                  {/* The exact Raw SVG Layer */}
                  <div
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    dangerouslySetInnerHTML={{ __html: rawSvgCode }}
                  />
                </div>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setShowBodyOverlay(!showBodyOverlay)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                      showBodyOverlay
                        ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                        : "bg-stone-100 text-stone-500 border-stone-200"
                    }`}
                  >
                    {showBodyOverlay ? "✓ Đang ghép thân búp bê" : "Chỉ xem Layer Đầu/Mặt"}
                  </button>
                  <button
                    onClick={() => setShowGridGuide(!showGridGuide)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                      showGridGuide
                        ? "bg-blue-50 text-blue-800 border-blue-300"
                        : "bg-stone-100 text-stone-500 border-stone-200"
                    }`}
                  >
                    {showGridGuide ? "✓ Đang hiện trục tọa độ" : "Hiện trục tọa độ"}
                  </button>
                </div>
              </div>

              {/* Right: Feature Highlights & Export Buttons */}
              <div className="md:col-span-6 space-y-3.5">
                <div className="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-2">
                  <h4 className="font-bold text-xs text-emerald-950 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    Đặc điểm thiết kế đã tối ưu:
                  </h4>
                  <ul className="text-xs text-slate-700 space-y-1.5 pl-1">
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span><strong>Dáng mặt trái xoan (Oval Face) & To hơn 10-15%:</strong> Phom mặt oval thanh tú, cằm thon gọn nhẹ nhàng nhưng bầu bĩnh, bắt mắt, không còn nhỏ hay tròn đơn điệu.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span><strong>Hạ cằm khắc phục cổ dài:</strong> Cằm hạ xuống y=104 che bớt phần cổ dài màu đỏ/trắng, tạo cảm giác cổ ngắn lại thon gọn, tự nhiên, không còn cảm giác lọt thỏm hay cổ quá dài.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span><strong>Đôi mắt to tròn hơn & Catchlight:</strong> Mắt to tròn đen láy mềm mại, catchlight đa tầng long lanh có chiều sâu. Tăng kích thước tương xứng với mặt trái xoan mới to hơn.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span><strong>Ngũ quan cân đối tuyệt đối:</strong> Lông mày thanh tú cong nhẹ, má phớt hồng nhẹ nhàng đối xứng, miệng mỉm cười tự nhiên thẳng trục cằm & cổ (x=150).</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span><strong>Tóc mái bằng & Kẹp hoa đào:</strong> Mái bằng cắt tỉa dày dặn, phóng to tương xứng tỷ lệ đầu; kẹp hoa đào 5 cánh hồng nhụy vàng lá xanh cài phía trên bên phải.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span><strong>Kỹ thuật lắp ghép (Layer Fitting):</strong> Giữ nguyên tọa độ gốc 300x400, trục tim x=150, khớp khít 100% với thân búp bê, trang phục Việt phục và phụ kiện.</span>
                    </li>
                  </ul>
                </div>

                {/* Export Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={handleDownloadSvg}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Xuất file SVG nền trong suốt</span>
                  </button>
                  <button
                    onClick={handleDownloadPng}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Xuất file PNG nền trong suốt</span>
                  </button>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="w-full py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Đã sao chép mã SVG vào bộ nhớ tạm!" : "Sao chép mã SVG"}</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === "svgCode" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Mã SVG gốc (Canvas 300x400):</span>
                <button
                  onClick={handleCopyCode}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 hover:bg-emerald-700"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? "Đã chép" : "Sao chép"}</span>
                </button>
              </div>
              <pre className="p-3 bg-slate-900 text-slate-100 text-[11px] rounded-2xl overflow-x-auto max-h-96 font-mono leading-relaxed select-all">
                {rawSvgCode}
              </pre>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5">
                <h4 className="font-bold text-slate-900">Bảng tọa độ khớp nối chuẩn (Golden Calibration Matrix):</h4>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 bg-white rounded-lg border border-stone-100">
                    <span className="text-stone-400 block">Kích thước Canvas (viewBox):</span>
                    <strong>0 0 300 400</strong> (Tỷ lệ dọc 3:4)
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-stone-100">
                    <span className="text-stone-400 block">Dáng khuôn mặt & Tỷ lệ:</span>
                    <strong>Trái xoan (Oval Face) +12%</strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-stone-100">
                    <span className="text-stone-400 block">Trục đối xứng cơ thể:</span>
                    <strong>x = 150</strong> (Đường trục tim)
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-stone-100">
                    <span className="text-stone-400 block">Tọa độ đỉnh cằm (Hạ che cổ):</span>
                    <strong>y = 104</strong> (Che 8px cổ đỏ/trắng)
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-stone-100">
                    <span className="text-stone-400 block">Tâm đôi mắt (Eye Centers):</span>
                    <strong>(139.5, 80)</strong> và <strong>(160.5, 80)</strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-stone-100">
                    <span className="text-stone-400 block">Gấu tóc mái (Bangs Bottom):</span>
                    <strong>y = 62 đến 63</strong> (Trên mày)
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-stone-100">
                    <span className="text-stone-400 block">Lông mày thanh tú:</span>
                    <strong>y = 67.5 đến 70</strong> (Hiển thị rõ 100%)
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-stone-100">
                    <span className="text-stone-400 block">Khuôn miệng mỉm cười:</span>
                    <strong>x = 150, y = 93.8 .. 95.3</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
