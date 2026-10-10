import React, { useState } from "react";
import { X, Copy, Check, Code, Sparkles, Layers, BookOpen } from "lucide-react";
import { MalePaperDoll } from "./MalePaperDoll";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentColorHex?: string;
}

export const MaleDollCodeModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentColorHex = "#0284C7"
}) => {
  const [activeTab, setActiveTab] = useState<"svg" | "react" | "cultural">("svg");
  const [selectedOutfit, setSelectedOutfit] = useState<"giaolinh" | "nguthan">("giaolinh");
  const [level, setLevel] = useState<1 | 2 | 3 | 4>(1);
  const [copied, setCopied] = useState(false);

  // Layer visibility toggles
  const [layers, setLayers] = useState({
    base: true,
    inner: true,
    outer: true,
    waistband: true,
    accessories: true
  });

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const svgCodeSnippet = `<svg viewBox="0 0 320 460" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- LAYER 1: BASE MANNEQUIN BODY -->
  <g id="layer-base-doll-male">
    <ellipse cx="160" cy="80" rx="30" ry="24" fill="#1C1917" />
    <rect x="144" y="370" width="13" height="60" rx="6" fill="#FED7AA" />
    <rect x="163" y="370" width="13" height="60" rx="6" fill="#FED7AA" />
    <path d="M128 135 Q124 195 130 270 L190 270 Q196 195 192 135 Z" fill="#FFEDD5" />
    <path d="M128 138 Q98 198 106 250 L120 248 Q114 198 136 142 Z" fill="#FED7AA" />
    <path d="M192 138 Q222 198 214 250 L200 248 Q206 198 184 142 Z" fill="#FED7AA" />
    <rect x="151" y="115" width="18" height="24" rx="4" fill="#FED7AA" />
    <!-- Khuôn mặt tròn & đặc điểm chibi đồng bộ búp bê nữ -->
    <ellipse cx="160" cy="95" rx="24" ry="28" fill="#FFEDD5" stroke="#FED7AA" strokeWidth="1.5" />
    <circle cx="136" cy="96" r="3.5" fill="#FED7AA" />
    <circle cx="184" cy="96" r="3.5" fill="#FED7AA" />
    <!-- Lông mày kiếm nho nhã -->
    <path d="M142 86 Q150 83 156 86" stroke="#1C1917" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M164 86 Q170 83 178 86" stroke="#1C1917" strokeWidth="2" strokeLinecap="round" fill="none" />
    <!-- Mắt chấm bi cute có ánh phản quang -->
    <ellipse cx="151" cy="94" rx="2.5" ry="3.5" fill="#1C1917" />
    <ellipse cx="169" cy="94" rx="2.5" ry="3.5" fill="#1C1917" />
    <circle cx="150" cy="92.5" r="0.9" fill="#FFFFFF" />
    <circle cx="168" cy="92.5" r="0.9" fill="#FFFFFF" />
    <!-- Má hồng đào tròn trĩnh -->
    <circle cx="145" cy="101" r="4.2" fill="#FDA4AF" opacity="0.55" />
    <circle cx="175" cy="101" r="4.2" fill="#FDA4AF" opacity="0.55" />
    <!-- Nụ cười hiền hậu -->
    <path d="M156 109 Q160 113 164 109" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" fill="none" />
    <!-- Mái tóc ngắn rẽ ngôi gọn gàng -->
    <path d="M136 86 Q148 70 166 72 Q183 75 186 92 Q180 82 162 82 Q144 82 136 86 Z" fill="#1C1917" />
    <path d="M136 86 Q134 92 137 98 L139 98 Q137 92 138 88 Z" fill="#1C1917" />
    <path d="M184 86 Q186 92 183 98 L181 98 Q183 92 182 88 Z" fill="#1C1917" />
  </g>

  <!-- LAYER 2: INNER WEAR (Quần lụa trắng ống sớ & Áo trung đơn) -->
  <g id="layer-inner-wear-male">
    <path d="M134 235 L124 415 L156 415 L160 285 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
    <path d="M186 235 L196 415 L164 415 L160 285 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
    <line x1="139" y1="255" x2="133" y2="410" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="181" y1="255" x2="187" y2="410" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
    <!-- Áo lót trung đơn trắng -->
    ${selectedOutfit === "giaolinh" ? `<path d="M144 126 L160 152 L176 126" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
    <path d="M140 130 L160 156 L180 130 L182 235 L138 235 Z" fill="#FFFFFF" opacity="0.95" />` : `<rect x="150" y="118" width="20" height="15" rx="3" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
    <path d="M138 132 L182 132 L184 235 L136 235 Z" fill="#FFFFFF" opacity="0.95" />`}
  </g>

  <!-- LAYER 3: OUTERWEAR (${selectedOutfit === "giaolinh" ? "Áo Giao Lĩnh Nam" : "Áo Ngũ Thân Nam"}) -->
  <g id="layer-outerwear-male">
    ${selectedOutfit === "giaolinh" ? `<!-- Tay áo thụng buông rủ -->
    <path d="M130 140 L65 220 L94 252 L142 180 Z" fill="${currentColorHex}" stroke="#FFFFFF" strokeWidth="1" />
    <path d="M190 140 L255 220 L226 252 L178 180 Z" fill="${currentColorHex}" stroke="#FFFFFF" strokeWidth="1" />
    <!-- Thân áo Giao Lĩnh vạt chéo Hữu Nhậm -->
    <path d="M128 138 L152 138 L196 220 L202 380 L118 380 L124 220 Z" fill="${currentColorHex}" stroke="#FFFFFF" strokeWidth="1.5" />
    <line x1="140" y1="134" x2="176" y2="192" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
    <line x1="176" y1="134" x2="150" y2="170" stroke="#38BDF8" strokeWidth="3" />` : `<!-- Tay chẽn ôm gọn -->
    <path d="M130 138 L95 232 L112 238 L140 168 Z" fill="${currentColorHex}" stroke="#FFFFFF" strokeWidth="0.8" />
    <path d="M190 138 L225 232 L208 238 L180 168 Z" fill="${currentColorHex}" stroke="#FFFFFF" strokeWidth="0.8" />
    <!-- Thân áo ngũ thân & lót tà đỏ son triều Nguyễn -->
    <path d="M130 136 L190 136 L198 380 L122 380 Z" fill="${currentColorHex}" stroke="#FFFFFF" strokeWidth="1.5" />
    <path d="M122 374 L130 380 L122 380 Z" fill="#DC2626" />
    <path d="M198 374 L190 380 L198 380 Z" fill="#DC2626" />
    <rect x="148" y="119" width="24" height="14" rx="3" fill="${currentColorHex}" stroke="#FDE68A" strokeWidth="1.5" />
    <!-- Hoa văn Đoàn Hoa -->
    <circle cx="160" cy="180" r="10" fill="#FDE68A" opacity="0.85" stroke="#B45309" strokeWidth="1" />
    <circle cx="160" cy="265" r="9" fill="#FDE68A" opacity="0.85" stroke="#B45309" strokeWidth="1" />`}
  </g>

  <!-- LAYER 4: FASTENERS / BELT -->
  <g id="layer-fasteners-male">
    ${selectedOutfit === "giaolinh" ? `<!-- Đai lưng vải lụa mềm & ngọc bội cẩm thạch -->
    <rect x="132" y="212" width="56" height="14" fill="#0369A1" rx="3" stroke="#BAE6FD" strokeWidth="1.5" />
    <circle cx="160" cy="219" r="4.5" fill="#FDE68A" stroke="#0369A1" strokeWidth="1" />
    <path d="M158 226 L154 290 L162 290 L164 226 Z" fill="#0284C7" />
    <circle cx="178" cy="236" r="4" fill="#A7F3D0" stroke="#059669" strokeWidth="1" />` : `<!-- 5 hạt cúc khuy Ngũ Luân cài sườn phải -->
    <circle cx="160" cy="132" r="2.8" fill="#FDE68A" stroke="#B45309" strokeWidth="1" />
    <circle cx="172" cy="144" r="2.8" fill="#FDE68A" stroke="#B45309" strokeWidth="1" />
    <circle cx="180" cy="164" r="2.8" fill="#FDE68A" stroke="#B45309" strokeWidth="1" />
    <circle cx="182" cy="192" r="2.8" fill="#FDE68A" stroke="#B45309" strokeWidth="1" />
    <circle cx="183" cy="222" r="2.8" fill="#FDE68A" stroke="#B45309" strokeWidth="1" />`}
  </g>

  <!-- LAYER 5: ACCESSORIES (Headwear, Fan, Footwear) -->
  <g id="layer-accessories-male">
    <!-- Khăn đóng / Khăn vấn -->
    <ellipse cx="160" cy="74" rx="28" ry="12" fill="#18181B" stroke="#3F3F46" strokeWidth="2" />
    <!-- Quạt xếp nan tre cầm tay -->
    <path d="M102 245 L78 208 Q102 192 128 208 L102 245 Z" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.5" />
    <!-- Guốc mộc hoặc giày vải đen -->
    <path d="M138 415 L154 415 L153 423 L139 423 Z" fill="#78350F" />
    <path d="M166 415 L182 415 L181 423 L167 423 Z" fill="#78350F" />
  </g>
</svg>`;

  const reactCodeSnippet = `import React from "react";
import { MalePaperDoll } from "./MalePaperDoll";

export const DressingRoomMale: React.FC = () => {
  return (
    <div className="w-80 h-[450px] bg-slate-900 rounded-3xl p-4 flex items-center justify-center">
      <MalePaperDoll
        outfitType="${selectedOutfit}" // "giaolinh" | "nguthan"
        colorHex="${currentColorHex}"
        level={${level}} // 1 | 2 | 3 | 4
        layers={{
          base: ${layers.base},
          inner: ${layers.inner},
          outer: ${layers.outer},
          waistband: ${layers.waistband},
          accessories: ${layers.accessories}
        }}
      />
    </div>
  );
};`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-emerald-100 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700/60 border border-emerald-400/40 flex items-center justify-center">
              <Code className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2">
                Thiết Kế Vector SVG & Cấu Trúc Búp Bê Nam
                <span className="text-[10px] bg-amber-400/20 text-amber-200 px-2 py-0.5 rounded-full border border-amber-300/30">
                  Cốm Duyệt Chibi Flat
                </span>
              </h2>
              <p className="text-xs text-emerald-200/80">
                Đồng bộ tỉ lệ, màu da và phong cách nét vẽ chuẩn xác với búp bê nữ
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Grid: Left Preview + Right Code/Info */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* CỘT TRÁI: LIVE PREVIEW & CONTROLS */}
          <div className="md:col-span-5 flex flex-col items-center">
            {/* Controls */}
            <div className="w-full flex items-center justify-between mb-3 bg-emerald-50 p-1.5 rounded-2xl border border-emerald-200">
              <button
                onClick={() => setSelectedOutfit("giaolinh")}
                className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  selectedOutfit === "giaolinh"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-emerald-800 hover:bg-emerald-100"
                }`}
              >
                Áo Giao Lĩnh Nam
              </button>
              <button
                onClick={() => setSelectedOutfit("nguthan")}
                className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  selectedOutfit === "nguthan"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-emerald-800 hover:bg-emerald-100"
                }`}
              >
                Áo Ngũ Thân Nam
              </button>
            </div>

            {/* Level Selector */}
            <div className="w-full flex items-center justify-between mb-3 text-xs">
              <span className="font-bold text-slate-700">Nấc Phụ Kiện:</span>
              <div className="flex gap-1">
                {([1, 2, 3, 4] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setLevel(lvl)}
                    className={`w-7 h-7 rounded-lg font-bold transition-all ${
                      level === lvl
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Live SVG Canvas */}
            <div className="w-full h-80 rounded-3xl bg-gradient-to-b from-emerald-950 via-teal-950 to-slate-950 border-2 border-emerald-300 shadow-md flex items-center justify-center p-3 relative overflow-hidden">
              <MalePaperDoll
                outfitType={selectedOutfit}
                colorHex={currentColorHex}
                level={level}
                layers={layers}
              />
            </div>

            {/* Layer Toggles */}
            <div className="w-full mt-3 grid grid-cols-2 gap-1.5 text-[11px]">
              <button
                onClick={() => setLayers({ ...layers, base: !layers.base })}
                className={`p-1.5 rounded-lg border font-medium ${
                  layers.base ? "bg-emerald-50 text-emerald-900 border-emerald-300" : "bg-slate-100 text-slate-400 line-through"
                }`}
              >
                1. Thân búp bê
              </button>
              <button
                onClick={() => setLayers({ ...layers, inner: !layers.inner })}
                className={`p-1.5 rounded-lg border font-medium ${
                  layers.inner ? "bg-emerald-50 text-emerald-900 border-emerald-300" : "bg-slate-100 text-slate-400 line-through"
                }`}
              >
                2. Áo lót & Quần
              </button>
              <button
                onClick={() => setLayers({ ...layers, outer: !layers.outer })}
                className={`p-1.5 rounded-lg border font-medium ${
                  layers.outer ? "bg-emerald-50 text-emerald-900 border-emerald-300" : "bg-slate-100 text-slate-400 line-through"
                }`}
              >
                3. Thân áo ngoài
              </button>
              <button
                onClick={() => setLayers({ ...layers, waistband: !layers.waistband })}
                className={`p-1.5 rounded-lg border font-medium ${
                  layers.waistband ? "bg-emerald-50 text-emerald-900 border-emerald-300" : "bg-slate-100 text-slate-400 line-through"
                }`}
              >
                4. Đai lưng / Khuy
              </button>
              <button
                onClick={() => setLayers({ ...layers, accessories: !layers.accessories })}
                className={`p-1.5 rounded-lg border font-medium col-span-2 ${
                  layers.accessories ? "bg-emerald-50 text-emerald-900 border-emerald-300" : "bg-slate-100 text-slate-400 line-through"
                }`}
              >
                5. Phụ kiện / Giày dép (Nấc {level})
              </button>
            </div>
          </div>

          {/* CỘT PHẢI: CODE TABS & METADATA */}
          <div className="md:col-span-7 flex flex-col">
            {/* Tabs */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("svg")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === "svg"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Mã SVG Hoàn Chỉnh</span>
                </button>
                <button
                  onClick={() => setActiveTab("react")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === "react"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Cấu Trúc React Component</span>
                </button>
                <button
                  onClick={() => setActiveTab("cultural")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === "cultural"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Quy Chuẩn 5 Lớp</span>
                </button>
              </div>

              {activeTab !== "cultural" && (
                <button
                  onClick={() =>
                    handleCopy(activeTab === "svg" ? svgCodeSnippet : reactCodeSnippet)
                  }
                  className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Đã chép!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao chép</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Tab Contents */}
            <div className="flex-1 bg-slate-950 text-slate-200 p-3.5 rounded-2xl font-mono text-xs overflow-x-auto max-h-[360px] border border-slate-800">
              {activeTab === "svg" && (
                <pre className="text-[11px] leading-relaxed whitespace-pre-wrap selection:bg-emerald-700 selection:text-white">
                  {svgCodeSnippet}
                </pre>
              )}

              {activeTab === "react" && (
                <pre className="text-[11px] leading-relaxed whitespace-pre-wrap selection:bg-emerald-700 selection:text-white">
                  {reactCodeSnippet}
                </pre>
              )}

              {activeTab === "cultural" && (
                <div className="font-sans text-xs space-y-3 text-slate-300">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <h4 className="font-bold text-emerald-400 mb-1">
                      1. Tính Đồng Bộ Với Búp Bê Nữ:
                    </h4>
                    <p className="leading-relaxed">
                      Giữ nguyên tỉ lệ cơ thể (viewBox 0 0 320 460), chiều cao khuôn mặt (y=95), màu sắc da (#FFEDD5 và #FED7AA), phong cách mắt chấm bi cute và hai bên má hồng đào (#FDA4AF).
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <h4 className="font-bold text-emerald-400 mb-1">
                      2. Đặc Điểm Nam Tính Độc Bản:
                    </h4>
                    <p className="leading-relaxed">
                      Khung vai mở rộng hơn nữ một chút (128-192 so với 136-184), tư thế đứng thẳng đĩnh đạc; mái tóc ngắn đen rẽ ngôi thanh tú hoặc đội khăn đóng chuẩn nếp chữ Nhân triều Nguyễn.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <h4 className="font-bold text-emerald-400 mb-1">
                      3. Hệ Thống 5 Lớp Xếp Chồng (Layering):
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-300">
                      <li><strong>Layer Base:</strong> Khung xương, màu da, khuôn mặt và mái tóc ngắn nam giới.</li>
                      <li><strong>Layer Inner:</strong> Quần lụa trắng ống sớ thẳng tắp + Áo trung đơn trắng cổ chữ V hoặc cổ đứng thấp.</li>
                      <li><strong>Layer Outer:</strong> Áo Giao Lĩnh tay thụng vạt chéo Hữu Nhậm hoặc Áo Ngũ Thân tay chẽn lót tà đỏ son và họa tiết Đoàn Hoa.</li>
                      <li><strong>Layer Fasteners:</strong> Đai lưng vải lụa mềm treo ngọc bội cẩm thạch (Giao Lĩnh) hoặc 5 hạt cúc khuy Ngũ Luân (Ngũ Thân).</li>
                      <li><strong>Layer Accessories:</strong> Khăn đóng, quạt nan tre, guốc mộc, giày da hoặc kính mát & sneaker Gen Z theo 4 nấc.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Đã tích hợp đầy đủ trong component <code>MalePaperDoll.tsx</code> và Phòng Thử Đồ.</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors shadow-xs"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
