import React from "react";

export interface MalePaperDollLayers {
  base?: boolean;
  inner?: boolean;
  outer?: boolean;
  waistband?: boolean;
  accessories?: boolean;
}

export interface MalePaperDollProps {
  outfitType: "giaolinh" | "nguthan";
  colorHex?: string;
  level?: 1 | 2 | 3 | 4;
  layers?: MalePaperDollLayers;
  className?: string;
}

/**
 * MalePaperDoll - Búp Bê Nam Cốm Duyệt Vector Flat Design
 * Đồng bộ tuyệt đối phong cách búp bê giấy chibi với búp bê nữ:
 * - Tỉ lệ cơ thể chuẩn mực viewBox 0 0 320 460
 * - Màu da đồng nhất (#FFEDD5 và #FED7AA)
 * - Mắt chấm bi cute có ánh phản quang long lanh, má hồng đào tròn trĩnh, nụ cười hiền hòa
 * - Đặc điểm riêng nam giới: Vai rộng đĩnh đạc, tóc ngắn đen rẽ ngôi thư sinh / khăn đóng, 5 khuy ngũ luân hoặc đai lưng ngọc bội
 * - Cấu trúc xếp lớp (Layer System) tách biệt 5 tầng: Base -> Inner -> Outer -> Fasteners -> Accessories
 */
export const MalePaperDoll: React.FC<MalePaperDollProps> = ({
  outfitType = "giaolinh",
  colorHex = "#0284C7",
  level = 1,
  layers = {
    base: true,
    inner: true,
    outer: true,
    waistband: true,
    accessories: true
  },
  className = "w-auto h-full max-h-full"
}) => {
  const showBase = layers.base ?? true;
  const showInner = layers.inner ?? true;
  const showOuter = layers.outer ?? true;
  const showWaistband = layers.waistband ?? true;
  const showAccessories = layers.accessories ?? true;

  const isGiaoLinh = outfitType === "giaolinh";
  const isNguThan = outfitType === "nguthan";

  return (
    <svg
      viewBox="0 0 320 460"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ============================================================== */}
      {/* LAYER 1: BASE MANNEQUIN BODY (NHÂN VẬT BÚP BÊ NAM NỀN) */}
      {/* ============================================================== */}
      {showBase && (
        <g id="male-doll-layer-base">
          {/* Tóc sau ngắn gọn gàng */}
          <ellipse cx="160" cy="80" rx="30" ry="24" fill="#1C1917" />

          {/* Đôi chân và bàn chân da hồng hào */}
          <rect x="144" y="370" width="13" height="60" rx="6" fill="#FED7AA" />
          <rect x="163" y="370" width="13" height="60" rx="6" fill="#FED7AA" />

          {/* Thân mình (Torso) - Khung vai rộng hơn nữ một chút (128-192 so với 136-184 của nữ) */}
          <path
            d="M128 135 Q124 195 130 270 L190 270 Q196 195 192 135 Z"
            fill="#FFEDD5"
          />

          {/* Cánh tay (Arms Base) - Dáng đứng khoan thai, chững chạc */}
          <path
            d="M128 138 Q98 198 106 250 L120 248 Q114 198 136 142 Z"
            fill="#FED7AA"
          />
          <path
            d="M192 138 Q222 198 214 250 L200 248 Q206 198 184 142 Z"
            fill="#FED7AA"
          />

          {/* Bàn tay tròn trịa dễ thương */}
          <circle cx="113" cy="249" r="6" fill="#FED7AA" />
          <circle cx="207" cy="249" r="6" fill="#FED7AA" />

          {/* Cổ (Neck) - Vững vàng, nam tính nhẹ nhàng */}
          <rect x="151" y="115" width="18" height="24" rx="4" fill="#FED7AA" />

          {/* Khuôn mặt (Face) - Hình oval tròn dễ thương chuẩn chibi flat design y hệt búp bê nữ */}
          <ellipse
            cx="160"
            cy="95"
            rx="24"
            ry="28"
            fill="#FFEDD5"
            stroke="#FED7AA"
            strokeWidth="1.5"
          />

          {/* Đôi tai hai bên nhỏ nhắn */}
          <circle cx="136" cy="96" r="3.5" fill="#FED7AA" />
          <circle cx="184" cy="96" r="3.5" fill="#FED7AA" />
          <circle cx="136" cy="96" r="1.8" fill="#FDBA74" opacity="0.6" />
          <circle cx="184" cy="96" r="1.8" fill="#FDBA74" opacity="0.6" />

          {/* Lông mày kiếm nho nhã, nam tính nhẹ nhàng */}
          <path
            d="M142 86 Q150 83 156 86"
            stroke="#1C1917"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M164 86 Q170 83 178 86"
            stroke="#1C1917"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Đôi mắt chấm bi đen tròn đáng yêu có ánh phản chiếu long lanh */}
          <ellipse cx="151" cy="94" rx="2.5" ry="3.5" fill="#1C1917" />
          <ellipse cx="169" cy="94" rx="2.5" ry="3.5" fill="#1C1917" />
          <circle cx="150" cy="92.5" r="0.9" fill="#FFFFFF" />
          <circle cx="168" cy="92.5" r="0.9" fill="#FFFFFF" />

          {/* Đôi má hồng tròn trĩnh dễ thương đặc trưng của Cốm */}
          <circle cx="145" cy="101" r="4.2" fill="#FDA4AF" opacity="0.55" />
          <circle cx="175" cy="101" r="4.2" fill="#FDA4AF" opacity="0.55" />

          {/* Nụ cười mỉm hiền từ, phúc hậu */}
          <path
            d="M156 109 Q160 113 164 109"
            stroke="#E11D48"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Mái tóc ngắn phía trước rẽ ngôi thanh tú, mai tóc gọn gàng */}
          <path
            d="M136 86 Q148 70 166 72 Q183 75 186 92 Q180 82 162 82 Q144 82 136 86 Z"
            fill="#1C1917"
          />
          <path
            d="M136 86 Q134 92 137 98 L139 98 Q137 92 138 88 Z"
            fill="#1C1917"
          />
          <path
            d="M184 86 Q186 92 183 98 L181 98 Q183 92 182 88 Z"
            fill="#1C1917"
          />
        </g>
      )}

      {/* ============================================================== */}
      {/* LAYER 2: INNER WEAR (ÁO LÓT TRẮNG TRUNG ĐƠN & QUẦN LỤA ỐNG SỚ) */}
      {/* ============================================================== */}
      {showInner && (
        <g id="male-doll-layer-inner">
          {/* Quần lụa trắng ống sớ thẳng tắp, phom rộng rãi thoải mái */}
          <path
            d="M134 235 L124 415 L156 415 L160 285 Z"
            fill="#F8FAFC"
            stroke="#E2E8F0"
            strokeWidth="1.5"
          />
          <path
            d="M186 235 L196 415 L164 415 L160 285 Z"
            fill="#F8FAFC"
            stroke="#E2E8F0"
            strokeWidth="1.5"
          />
          {/* Nếp gấp ống sớ thẳng thớm */}
          <line
            x1="139"
            y1="255"
            x2="133"
            y2="410"
            stroke="#CBD5E1"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <line
            x1="181"
            y1="255"
            x2="187"
            y2="410"
            stroke="#CBD5E1"
            strokeWidth="1"
            strokeDasharray="3 3"
          />

          {/* Áo lót trong trung đơn trắng */}
          {isGiaoLinh ? (
            /* Áo lót cổ V giao lĩnh đắp chéo */
            <g id="inner-male-giaolinh">
              <path
                d="M144 126 L160 152 L176 126"
                stroke="#FFFFFF"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M140 130 L160 156 L180 130 L182 235 L138 235 Z"
                fill="#FFFFFF"
                opacity="0.95"
              />
            </g>
          ) : (
            /* Áo cánh trắng lót cổ đứng thấp của Áo Ngũ Thân */
            <g id="inner-male-nguthan">
              <rect
                x="150"
                y="118"
                width="20"
                height="15"
                rx="3"
                fill="#FFFFFF"
                stroke="#E2E8F0"
                strokeWidth="1"
              />
              <path
                d="M138 132 L182 132 L184 235 L136 235 Z"
                fill="#FFFFFF"
                opacity="0.95"
              />
            </g>
          )}
        </g>
      )}

      {/* ============================================================== */}
      {/* LAYER 3: OUTERWEAR (ÁO KHOÁC CHÍNH / TÀ ÁO NAM GIỚI) */}
      {/* ============================================================== */}
      {showOuter && (
        <g id="male-doll-layer-outer">
          {isGiaoLinh ? (
            /* ================= ÁO GIAO LĨNH NAM (XANH THANH THIÊN / TAY THỤNG RỘNG) ================= */
            <g id="coat-male-giaolinh">
              {/* Tay áo thụng buông dài phóng khoáng */}
              <path
                d="M130 140 L65 220 L94 252 L142 180 Z"
                fill={colorHex}
                stroke="#FFFFFF"
                strokeWidth="1"
              />
              <path
                d="M190 140 L255 220 L226 252 L178 180 Z"
                fill={colorHex}
                stroke="#FFFFFF"
                strokeWidth="1"
              />

              {/* Viền lót cổ tay áo màu trắng tương phản tinh tế */}
              <path d="M65 220 L72 228 L100 244 L94 252 Z" fill="#FFFFFF" />
              <path d="M255 220 L248 228 L220 244 L226 252 Z" fill="#FFFFFF" />

              {/* Thân áo Giao Lĩnh nam dáng thụng dài quá gối */}
              <path
                d="M128 138 L152 138 L196 220 L202 380 L118 380 L124 220 Z"
                fill={colorHex}
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />

              {/* Nếp vạt chéo Hữu Nhậm cổ chữ V (vạt trái đè lên vạt phải) */}
              <line
                x1="140"
                y1="134"
                x2="176"
                y2="192"
                stroke="#FFFFFF"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <line
                x1="176"
                y1="134"
                x2="150"
                y2="170"
                stroke="#38BDF8"
                strokeWidth="3"
              />
              <line
                x1="160"
                y1="225"
                x2="160"
                y2="380"
                stroke="#0369A1"
                strokeWidth="1"
                strokeDasharray="4 2"
              />
            </g>
          ) : (
            /* ================= ÁO NGŨ THÂN NAM (TAY CHẼN / ĐOÀN HOA / LÓT TÀ ĐỎ SON) ================= */
            <g id="coat-male-nguthan">
              {/* Tay chẽn ôm gọn cánh tay đĩnh đạc */}
              <path
                d="M130 138 L95 232 L112 238 L140 168 Z"
                fill={colorHex}
                stroke="#FFFFFF"
                strokeWidth="0.8"
              />
              <path
                d="M190 138 L225 232 L208 238 L180 168 Z"
                fill={colorHex}
                stroke="#FFFFFF"
                strokeWidth="0.8"
              />

              {/* Cổ tay áo lót trắng 1-2cm */}
              <rect x="95" y="230" width="17" height="4" fill="#FFFFFF" rx="1" />
              <rect x="208" y="230" width="17" height="4" fill="#FFFFFF" rx="1" />

              {/* Thân áo ngũ thân dài chấm gối */}
              <path
                d="M130 136 L190 136 L198 380 L122 380 Z"
                fill={colorHex}
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />

              {/* Lớp lót tà trong màu đỏ son quý phái triều Nguyễn (thấp thoáng khi bước đi) */}
              <path d="M122 374 L130 380 L122 380 Z" fill="#DC2626" />
              <path d="M198 374 L190 380 L198 380 Z" fill="#DC2626" />

              {/* Cổ đứng lập lĩnh cao 2.5cm đứng phom */}
              <rect
                x="148"
                y="119"
                width="24"
                height="14"
                rx="3"
                fill={colorHex}
                stroke="#FDE68A"
                strokeWidth="1.5"
              />

              {/* Vạt phụ cài khuy sườn phải */}
              <path
                d="M160 133 Q180 142 184 175 L184 245"
                stroke="#FDE68A"
                strokeWidth="2.5"
                fill="none"
              />

              {/* HỌA TIẾT ĐOÀN HOA (CIRCULAR EMBROIDERED MEDALLIONS) */}
              {/* Hoa văn ngực */}
              <circle
                cx="160"
                cy="180"
                r="10"
                fill="#FDE68A"
                opacity="0.85"
                stroke="#B45309"
                strokeWidth="1"
              />
              <circle
                cx="160"
                cy="180"
                r="6"
                fill={colorHex}
                stroke="#B45309"
                strokeWidth="0.8"
              />
              <circle cx="160" cy="180" r="2.5" fill="#DC2626" />

              {/* Hoa văn bụng */}
              <circle
                cx="160"
                cy="265"
                r="9"
                fill="#FDE68A"
                opacity="0.85"
                stroke="#B45309"
                strokeWidth="1"
              />
              <circle
                cx="160"
                cy="265"
                r="5"
                fill={colorHex}
                stroke="#B45309"
                strokeWidth="0.8"
              />
              <circle cx="160" cy="265" r="2" fill="#DC2626" />

              {/* Hoa văn hai bên tà dưới */}
              <circle
                cx="145"
                cy="335"
                r="8"
                fill="#FDE68A"
                opacity="0.85"
                stroke="#B45309"
                strokeWidth="0.8"
              />
              <circle
                cx="175"
                cy="335"
                r="8"
                fill="#FDE68A"
                opacity="0.85"
                stroke="#B45309"
                strokeWidth="0.8"
              />

              {/* Hoa văn cánh tay */}
              <circle
                cx="114"
                cy="195"
                r="6.5"
                fill="#FDE68A"
                opacity="0.85"
                stroke="#B45309"
                strokeWidth="0.8"
              />
              <circle
                cx="206"
                cy="195"
                r="6.5"
                fill="#FDE68A"
                opacity="0.85"
                stroke="#B45309"
                strokeWidth="0.8"
              />
            </g>
          )}
        </g>
      )}

      {/* ============================================================== */}
      {/* LAYER 4: WAISTBAND & FASTENERS (ĐAI LƯNG VẢI & 5 HẠT CÚC KHUY) */}
      {/* ============================================================== */}
      {showWaistband && (
        <g id="male-doll-layer-waistband">
          {isGiaoLinh ? (
            /* Đai lưng vải lụa mềm thắt eo + dải buông + ngọc bội cẩm thạch */
            <g id="belt-male-giaolinh">
              <rect
                x="132"
                y="212"
                width="56"
                height="14"
                fill="#0369A1"
                rx="3"
                stroke="#BAE6FD"
                strokeWidth="1.5"
              />
              <circle
                cx="160"
                cy="219"
                r="4.5"
                fill="#FDE68A"
                stroke="#0369A1"
                strokeWidth="1"
              />
              <path
                d="M158 226 L154 290 L162 290 L164 226 Z"
                fill="#0284C7"
              />
              {/* Ngọc bội cẩm thạch treo bên hông */}
              <circle
                cx="178"
                cy="236"
                r="4"
                fill="#A7F3D0"
                stroke="#059669"
                strokeWidth="1"
              />
              <line
                x1="178"
                y1="226"
                x2="178"
                y2="232"
                stroke="#EF4444"
                strokeWidth="1.5"
              />
            </g>
          ) : (
            /* 5 HẠT CÚC KHUY KIM HOÀN / NGỌC BÍCH BIỂU TƯỢNG NGŨ LUÂN */
            <g id="buttons-male-nguthan">
              <circle
                cx="160"
                cy="132"
                r="2.8"
                fill="#FDE68A"
                stroke="#B45309"
                strokeWidth="1"
              />
              <circle
                cx="172"
                cy="144"
                r="2.8"
                fill="#FDE68A"
                stroke="#B45309"
                strokeWidth="1"
              />
              <circle
                cx="180"
                cy="164"
                r="2.8"
                fill="#FDE68A"
                stroke="#B45309"
                strokeWidth="1"
              />
              <circle
                cx="182"
                cy="192"
                r="2.8"
                fill="#FDE68A"
                stroke="#B45309"
                strokeWidth="1"
              />
              <circle
                cx="183"
                cy="222"
                r="2.8"
                fill="#FDE68A"
                stroke="#B45309"
                strokeWidth="1"
              />
            </g>
          )}
        </g>
      )}

      {/* ============================================================== */}
      {/* LAYER 5: ACCESSORIES (PHỤ KIỆN ĐẦU, CẦM TAY & GIÀY DÉP) */}
      {/* ============================================================== */}
      {showAccessories && (
        <g id="male-doll-layer-accessories">
          {/* 5A. PHỤ KIỆN ĐẦU THEO NẤC STYLING */}
          {level === 1 ? (
            isNguThan ? (
              /* Khăn đóng đen chữ Nhân triều Nguyễn */
              <g id="hat-male-khandong">
                <ellipse
                  cx="160"
                  cy="74"
                  rx="28"
                  ry="12"
                  fill="#18181B"
                  stroke="#3F3F46"
                  strokeWidth="2"
                />
                <path
                  d="M148 70 L160 77 L172 70"
                  stroke="#A1A1AA"
                  strokeWidth="1.8"
                  fill="none"
                />
                <path
                  d="M152 66 L160 72 L168 66"
                  stroke="#71717A"
                  strokeWidth="1.5"
                  fill="none"
                />
                <ellipse cx="160" cy="69" rx="25" ry="9" fill="#27272A" />
              </g>
            ) : (
              /* Khăn vấn nho sinh hoặc tóc bới gọn */
              <g id="hat-male-khanvan">
                <ellipse
                  cx="160"
                  cy="73"
                  rx="27"
                  ry="11"
                  fill="#292524"
                  stroke="#44403C"
                  strokeWidth="1.5"
                />
                <circle cx="160" cy="67" r="5" fill="#1C1917" />
              </g>
            )
          ) : level === 2 ? (
            /* Khăn đóng đen chữ Nhất gọn gàng */
            <g id="hat-male-khandong-nhe">
              <ellipse
                cx="160"
                cy="74"
                rx="26"
                ry="10"
                fill="#1C1917"
                stroke="#52525B"
                strokeWidth="1.5"
              />
              <path
                d="M154 71 L160 75 L166 71"
                stroke="#A1A1AA"
                strokeWidth="1.2"
                fill="none"
              />
            </g>
          ) : level === 3 ? (
            /* Kính mắt gọng tròn tri thức tân thời */
            <g id="glasses-male-intellectual">
              <circle
                cx="151"
                cy="95"
                r="5.5"
                stroke="#D97706"
                strokeWidth="1.2"
                fill="none"
              />
              <circle
                cx="169"
                cy="95"
                r="5.5"
                stroke="#D97706"
                strokeWidth="1.2"
                fill="none"
              />
              <line
                x1="156.5"
                y1="95"
                x2="163.5"
                y2="95"
                stroke="#D97706"
                strokeWidth="1.5"
              />
              <line
                x1="145.5"
                y1="95"
                x2="139"
                y2="92"
                stroke="#D97706"
                strokeWidth="1.2"
              />
              <line
                x1="174.5"
                y1="95"
                x2="181"
                y2="92"
                stroke="#D97706"
                strokeWidth="1.2"
              />
            </g>
          ) : (
            /* Kính mát đen + Tai nghe over-ear Gen Z */
            <g id="glasses-male-genz">
              <rect x="144" y="91" width="13" height="7" rx="2" fill="#09090B" />
              <rect x="163" y="91" width="13" height="7" rx="2" fill="#09090B" />
              <line
                x1="157"
                y1="94"
                x2="163"
                y2="94"
                stroke="#09090B"
                strokeWidth="2"
              />
              <path
                d="M134 126 Q160 138 186 126"
                stroke="#3B82F6"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="134" cy="126" r="6" fill="#1D4ED8" />
              <circle cx="186" cy="126" r="6" fill="#1D4ED8" />
            </g>
          )}

          {/* 5B. VÒNG TAY / ĐỒNG HỒ CHO NAM */}
          {level === 4 ? (
            <g id="bracelet-male-leather">
              <rect x="200" y="241" width="13" height="6.5" rx="2" fill="#292524" stroke="#44403C" strokeWidth="1" />
              <circle cx="203" cy="244.2" r="1" fill="#E2E8F0" />
              <circle cx="209" cy="244.2" r="1" fill="#E2E8F0" />
            </g>
          ) : level === 3 ? (
            <g id="watch-male-luxury">
              <rect x="106" y="241.5" width="10" height="5.5" rx="1.5" fill="#1C1917" stroke="#44403C" strokeWidth="0.8" />
              <circle cx="111" cy="244" r="3.2" fill="#F8FAFC" stroke="#D97706" strokeWidth="1.2" />
              <circle cx="111" cy="244" r="0.8" fill="#0F172A" />
            </g>
          ) : null}

          {/* 5C. CẦM TAY TRÁI: QUẠT XẾP */}
          <g id="fan-male-bamboo">
            <line x1="102" y1="244" x2="102" y2="256" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
            <path
              d="M102 242 L76 205 Q102 186 128 205 Z"
              fill="#FEF3C7"
              stroke="#B45309"
              strokeWidth="1.5"
            />
            <line x1="102" y1="242" x2="86" y2="200" stroke="#D97706" strokeWidth="1" />
            <line x1="102" y1="242" x2="102" y2="195" stroke="#D97706" strokeWidth="1" />
            <line x1="102" y1="242" x2="118" y2="200" stroke="#D97706" strokeWidth="1" />
            <circle cx="102" cy="244" r="2.2" fill="#DC2626" />
          </g>

          {/* 5D. CẦM TAY PHẢI: TÚI ĐEO / TÚI VẢI */}
          {level === 4 ? (
            <g id="bag-male-streetwear">
              <path
                d="M136 142 L200 248"
                stroke="#09090B"
                strokeWidth="2.5"
                strokeDasharray="3 2"
              />
              <rect
                x="190"
                y="240"
                width="22"
                height="26"
                rx="4"
                fill="#18181B"
                stroke="#27272A"
                strokeWidth="1.5"
              />
              <circle cx="201" cy="250" r="2.5" fill="#E4E4E7" />
            </g>
          ) : level === 3 ? (
            <g id="bag-male-leather">
              <path d="M142 142 L204 256" stroke="#451A03" strokeWidth="2.2" />
              <rect x="192" y="248" width="24" height="22" rx="3" fill="#78350F" stroke="#451A03" strokeWidth="1.2" />
              <circle cx="204" cy="257" r="2" fill="#FDE68A" />
            </g>
          ) : (
            <g id="bag-male-linen">
              <path d="M206 248 L206 264" stroke="#8D6E63" strokeWidth="1.8" />
              <path
                d="M196 264 Q206 260 216 264 L218 288 Q206 294 194 288 Z"
                fill="#EFEBE9"
                stroke="#8D6E63"
                strokeWidth="1.2"
              />
            </g>
          )}

          {/* 5E. GIÀY DÉP CHO NAM */}
          {level === 4 ? (
            /* Sneaker chunky trắng năng động */
            <g id="shoes-male-sneaker">
              <rect
                x="136"
                y="415"
                width="22"
                height="9"
                rx="3"
                fill="#FFFFFF"
                stroke="#CBD5E1"
                strokeWidth="1.5"
              />
              <rect
                x="162"
                y="415"
                width="22"
                height="9"
                rx="3"
                fill="#FFFFFF"
                stroke="#CBD5E1"
                strokeWidth="1.5"
              />
              <line
                x1="142"
                y1="418"
                x2="150"
                y2="418"
                stroke="#3B82F6"
                strokeWidth="1.5"
              />
              <line
                x1="168"
                y1="418"
                x2="176"
                y2="418"
                stroke="#3B82F6"
                strokeWidth="1.5"
              />
            </g>
          ) : isGiaoLinh ? (
            /* Guốc mộc truyền thống hai quai đen */
            <g id="shoes-male-guocmoc">
              <path
                d="M138 415 L154 415 L153 423 L139 423 Z"
                fill="#78350F"
              />
              <rect x="142" y="413" width="8" height="3" fill="#1C1917" rx="1" />
              <path
                d="M166 415 L182 415 L181 423 L167 423 Z"
                fill="#78350F"
              />
              <rect x="170" y="413" width="8" height="3" fill="#1C1917" rx="1" />
            </g>
          ) : (
            /* Giày da đen bóng lịch lãm */
            <g id="shoes-male-leather">
              <path
                d="M136 415 Q154 413 158 423 L135 423 Z"
                fill="#09090B"
                stroke="#27272A"
                strokeWidth="1"
              />
              <path
                d="M162 415 Q180 413 184 423 L161 423 Z"
                fill="#09090B"
                stroke="#27272A"
                strokeWidth="1"
              />
              <ellipse
                cx="147"
                cy="417"
                rx="4"
                ry="1.5"
                fill="#71717A"
                opacity="0.6"
              />
              <ellipse
                cx="173"
                cy="417"
                rx="4"
                ry="1.5"
                fill="#71717A"
                opacity="0.6"
              />
            </g>
          )}
        </g>
      )}
    </svg>
  );
};
export default MalePaperDoll;
