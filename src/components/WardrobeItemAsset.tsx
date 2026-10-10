import React from "react";
import { WardrobeItem } from "../data/wardrobe";

export interface AssetComponentProps {
  color?: string;
  className?: string;
  gender?: "nu" | "nam";
}

// 1. Kính Mát
export const KinhMatComponent: React.FC<AssetComponentProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="132 72 36 12" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="acc-sunglasses">
      <rect x="135" y="74" width="12" height="7" rx="2" fill="#09090B" />
      <rect x="153" y="74" width="12" height="7" rx="2" fill="#09090B" />
      <line x1="147" y1="77" x2="153" y2="77" stroke="#09090B" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

// 2. Tai Nghe Over-Ear
export const TaiNgheComponent: React.FC<AssetComponentProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="112 34 76 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="acc-headphones">
      {/* Vòng cung headband cong vòng lên trên đỉnh đầu */}
      <path d="M123 76 C123 38, 177 38, 177 76" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M124.5 75 C124.5 41, 175.5 41, 175.5 75" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M136 43 Q150 41 164 43" stroke="#0F172A" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <rect x="120" y="68" width="5.5" height="7" rx="1.5" fill="#94A3B8" stroke="#64748B" strokeWidth="0.8" />
      <rect x="174.5" y="68" width="5.5" height="7" rx="1.5" fill="#94A3B8" stroke="#64748B" strokeWidth="0.8" />
      {/* Miếng ốp tai trái */}
      <rect x="119" y="73" width="7" height="18" rx="3.5" fill="#0F172A" stroke="#334155" strokeWidth="0.8" />
      <rect x="115.5" y="74.5" width="5.5" height="15" rx="2.5" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1" />
      <ellipse cx="118" cy="82" rx="1.8" ry="3.5" fill="#60A5FA" />
      {/* Miếng ốp tai phải */}
      <rect x="174" y="73" width="7" height="18" rx="3.5" fill="#0F172A" stroke="#334155" strokeWidth="0.8" />
      <rect x="179" y="74.5" width="5.5" height="15" rx="2.5" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1" />
      <ellipse cx="182" cy="82" rx="1.8" ry="3.5" fill="#60A5FA" />
    </g>
  </svg>
);

// 3. Túi Kẹp Nách Y2K
export const TuiKepNachComponent: React.FC<AssetComponentProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="106 133 26 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="acc-baguette">
      <path d="M120 135 Q110 160 118 190" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <rect x="108" y="180" width="22" height="15" rx="3.5" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.2" />
      <circle cx="119" cy="187" r="1.8" fill="#FDE68A" />
    </g>
  </svg>
);

// 4. Túi Gấm Thêu Sen Cầm Tay
export const TuiTheuComponent: React.FC<AssetComponentProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="200 214 28 65" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="acc-bag-right">
      <path d="M211 216 Q209 230 213 240" stroke="#D97706" strokeWidth="1.5" fill="none" />
      <path d="M204 242 Q213 236 222 242 L225 260 Q213 268 201 260 Z" fill="#BE123C" stroke="#FDE68A" strokeWidth="1.2" />
      <circle cx="213" cy="252" r="4.2" fill="#FDE68A" />
      <circle cx="213" cy="252" r="1.8" fill="#E11D48" />
      <circle cx="213" cy="266" r="1.5" fill="#F59E0B" />
      <line x1="213" y1="266" x2="213" y2="276" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

// 5. Quạt Xếp Nan Tre Đề Thơ
export const QuatXepComponent: React.FC<AssetComponentProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="62 160 54 74" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="acc-fan-left">
      <line x1="89" y1="214" x2="89" y2="230" stroke="#92400E" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M89 212 L64 176 Q89 158 114 176 Z" fill="#FFFBEB" stroke="#B45309" strokeWidth="1.5" />
      <line x1="89" y1="212" x2="74" y2="170" stroke="#D97706" strokeWidth="1" />
      <line x1="89" y1="212" x2="89" y2="166" stroke="#D97706" strokeWidth="1" />
      <line x1="89" y1="212" x2="104" y2="170" stroke="#D97706" strokeWidth="1" />
      <circle cx="86" cy="180" r="3" fill="#F43F5E" opacity="0.85" />
      <circle cx="89" cy="216" r="2.2" fill="#DC2626" />
      <line x1="89" y1="218" x2="89" y2="232" stroke="#DC2626" strokeWidth="1.5" />
    </g>
  </svg>
);

// 6. Vòng Tay Vàng Ánh Kim
export const VongTayComponent: React.FC<AssetComponentProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="86 193 128 12" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="acc-bracelets">
      {/* Vòng tay trái ôm sát cổ tay x=93.5, y=199 */}
      <g id="acc-bracelet-left" transform="rotate(-20 93.5 199)">
        <ellipse cx="93.5" cy="199" rx="5.6" ry="2.8" stroke="#B45309" strokeWidth="2.8" fill="none" />
        <ellipse cx="93.5" cy="199" rx="5.6" ry="2.8" stroke="#F59E0B" strokeWidth="2.0" fill="none" />
        <ellipse cx="93.2" cy="198.6" rx="5.2" ry="2.2" stroke="#FEF08A" strokeWidth="1.0" fill="none" />
        <ellipse cx="94.2" cy="196.2" rx="5.2" ry="2.4" stroke="#F59E0B" strokeWidth="1.5" fill="none" opacity="0.9" />
      </g>
      {/* Vòng tay phải ôm sát cổ tay x=206.5, y=199 */}
      <g id="acc-bracelet-right" transform="rotate(20 206.5 199)">
        <ellipse cx="206.5" cy="199" rx="5.6" ry="2.8" stroke="#B45309" strokeWidth="2.8" fill="none" />
        <ellipse cx="206.5" cy="199" rx="5.6" ry="2.8" stroke="#F59E0B" strokeWidth="2.0" fill="none" />
        <ellipse cx="206.8" cy="198.6" rx="5.2" ry="2.2" stroke="#FEF08A" strokeWidth="1.0" fill="none" />
        <ellipse cx="205.8" cy="196.2" rx="5.2" ry="2.4" stroke="#F59E0B" strokeWidth="1.5" fill="none" opacity="0.9" />
      </g>
    </g>
  </svg>
);

// 7. Dải Thắt Lưng Lụa Ngũ Sắc
export const DaiThatLungComponent: React.FC<AssetComponentProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="128 183 44 125" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="acc-belt-tuthan">
      <rect x="130" y="185" width="40" height="9" fill="#EAB308" rx="2" />
      <path d="M142 192 L136 290 L144 290 L148 192 Z" fill="#3B82F6" />
      <path d="M150 192 L154 305 L162 305 L156 192 Z" fill="#EF4444" />
      <circle cx="150" cy="189.5" r="4" fill="#F59E0B" />
    </g>
  </svg>
);

// 8. Khăn Vấn Nhung Đen
export const KhanVanComponent: React.FC<AssetComponentProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="120 46 60 25" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="acc-hat-khanvan">
      <ellipse cx="150" cy="58" rx="27" ry="10" fill="#1C1917" stroke="#44403C" strokeWidth="2" />
      <path d="M144 54 L150 60 L156 54" stroke="#A8A29E" strokeWidth="1.5" />
    </g>
  </svg>
);

// 9. Khăn Đóng Nam / Khăn Xếp
export const KhanDongComponent: React.FC<AssetComponentProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="120 46 60 26" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="acc-hat-khandong">
      <ellipse cx="150" cy="58" rx="27" ry="11" fill="#18181B" stroke="#3F3F46" strokeWidth="2" />
      <path d="M138 54 L150 61 L162 54" stroke="#A1A1AA" strokeWidth="1.8" />
      <path d="M142 50 L150 56 L158 50" stroke="#71717A" strokeWidth="1.5" />
    </g>
  </svg>
);

// 10. Khăn Mỏ Quạ
export const KhanMoQuaComponent: React.FC<AssetComponentProps> = ({
  color = "#1E3A8A",
  className = "w-full h-full"
}) => {
  const isGamVang = color === "#CA8A04" || color === "#EAB308" || color === "#D97706" || color === "#B45309";
  return (
    <svg viewBox="114 34 72 54" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="assetIndigoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="50%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="assetGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B45309" />
          <stop offset="50%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>
      <g id="acc-hat-khanmoqua">
        {/* Vòm khăn trùm đỉnh đầu */}
        <path
          d="M121 64
             C116 48, 126 36, 150 36
             C174 36, 184 48, 179 64
             C168 57, 158 62, 150 64
             C142 62, 132 57, 121 64 Z"
          fill={isGamVang ? "url(#assetGoldGrad)" : "url(#assetIndigoGrad)"}
          stroke={isGamVang ? "#B45309" : "#1D4ED8"}
          strokeWidth="1.2"
        />
        {/* Sống gập nếp hình mỏ quạ ở chính giữa trán */}
        <path d="M150 64 L146 54 L150 42 L154 54 Z" fill={isGamVang ? "#78350F" : "#172554"} opacity="0.85" />
        <line x1="150" y1="64" x2="150" y2="40" stroke={isGamVang ? "#FEF08A" : "#93C5FD"} strokeWidth="1.6" strokeLinecap="round" />
        {/* Nếp gập viền khăn vắt chéo sang hai bên thái dương */}
        <path d="M150 64 L132 57 L120 65" stroke={isGamVang ? "#78350F" : "#93C5FD"} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M150 64 L168 57 L180 65" stroke={isGamVang ? "#78350F" : "#93C5FD"} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        {isGamVang && (
          <>
            <path d="M149 62.5 L133 56 L121.5 63.5" stroke="#FEF08A" strokeWidth="0.8" fill="none" />
            <path d="M151 62.5 L167 56 L178.5 63.5" stroke="#FEF08A" strokeWidth="0.8" fill="none" />
          </>
        )}
        {/* Dải khăn ôm vòng ra sau mang tai */}
        <path d="M121 64 Q116 75 119 86 L123 84 Q120 74 123 66 Z" fill={isGamVang ? "#D97706" : "#1E3A8A"} />
        <path d="M179 64 Q184 75 181 86 L177 84 Q180 74 177 66 Z" fill={isGamVang ? "#D97706" : "#1E3A8A"} />
      </g>
    </svg>
  );
};

// 11. Nón Quai Thao
export const NonQuaiThaoComponent: React.FC<AssetComponentProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="102 30 96 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="acc-hat-nonquaithao">
      <ellipse cx="150" cy="48" rx="46" ry="17" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
      <ellipse cx="150" cy="48" rx="22" ry="8" fill="#FDE047" stroke="#A16207" strokeWidth="1" />
      <path d="M110 52 Q106 115 114 155" stroke="#EF4444" strokeWidth="3" fill="none" />
      <path d="M190 52 Q194 115 186 155" stroke="#10B981" strokeWidth="3" fill="none" />
    </g>
  </svg>
);

// 12. Giày Cao Gót Mũi Nhọn
export const GiayCaoGotComponent: React.FC<AssetComponentProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="130 362 46 16" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="acc-shoes-highheels">
      <rect x="133" y="366" width="2.5" height="10" rx="0.8" fill="#18181B" />
      <path d="M132 364 Q137 366 141 364 L150 369 Q146 373 138 371 L132 367 Z" fill="#18181B" />
      <rect x="156" y="366" width="2.5" height="10" rx="0.8" fill="#18181B" />
      <path d="M155 364 Q160 366 164 364 L173 369 Q169 373 161 371 L155 367 Z" fill="#18181B" />
    </g>
  </svg>
);

// 13. Sneaker Chunky Trắng
export const SneakerComponent: React.FC<AssetComponentProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="126 360 48 16" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="acc-shoes-sneaker">
      <rect x="129" y="364" width="18" height="9" rx="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
      <rect x="153" y="364" width="18" height="9" rx="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
      <line x1="135" y1="367" x2="143" y2="367" stroke="#3B82F6" strokeWidth="1.5" />
      <line x1="159" y1="367" x2="167" y2="367" stroke="#3B82F6" strokeWidth="1.5" />
    </g>
  </svg>
);

// 14. Guốc Mộc Cổ Truyền
export const GuocMocComponent: React.FC<AssetComponentProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="128 359 45 15" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="acc-shoes-guoc">
      <path d="M131 364 L146 364 L145 371 L132 371 Z" fill="#78350F" />
      <rect x="135" y="362" width="6" height="3" fill="#1C1917" rx="1" />
      <path d="M155 364 L170 364 L169 371 L156 371 Z" fill="#78350F" />
      <rect x="159" y="362" width="6" height="3" fill="#1C1917" rx="1" />
    </g>
  </svg>
);

// 15. Giày Tây Oxford
export const GiayTayComponent: React.FC<AssetComponentProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="126 360 48 16" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="acc-shoes-oxford">
      <path d="M128 365 Q135 361 146 364 L148 371 Q142 374 129 373 Z" fill="#09090B" stroke="#27272A" strokeWidth="1" />
      <path d="M152 365 Q161 361 170 364 L172 371 Q166 374 153 373 Z" fill="#09090B" stroke="#27272A" strokeWidth="1" />
      <rect x="129" y="371" width="5" height="3" fill="#000000" rx="0.5" />
      <rect x="153" y="371" width="5" height="3" fill="#000000" rx="0.5" />
      <line x1="135" y1="365" x2="142" y2="365" stroke="#71717A" strokeWidth="0.8" />
      <line x1="158" y1="365" x2="165" y2="365" stroke="#71717A" strokeWidth="0.8" />
    </g>
  </svg>
);

// 16. Yếm Đào Cổ Truyền
export const YemDaoComponent: React.FC<AssetComponentProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="132 98 36 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="layer-inner-yem">
      <path d="M143 100 Q150 107 157 100" stroke="#DC2626" strokeWidth="2" />
      <path d="M136 118 L150 108 L164 118 L166 195 L134 195 Z" fill="#F43F5E" stroke="#E11D48" strokeWidth="1.5" />
      <circle cx="150" cy="144" r="4" fill="#FDE68A" />
      <circle cx="150" cy="144" r="1.8" fill="#E11D48" />
      <path d="M144 144 Q150 138 156 144" stroke="#FDE68A" strokeWidth="1" />
    </g>
  </svg>
);

// 17. Áo Croptop Nữ
export const CroptopComponent: React.FC<AssetComponentProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="130 106 40 72" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="layer-inner-croptop">
      <path d="M132 120 L168 120 L167 175 L133 175 Z" fill="#EC4899" stroke="#DB2777" strokeWidth="1.5" rx="3" />
      <line x1="140" y1="120" x2="140" y2="108" stroke="#DB2777" strokeWidth="2.5" />
      <line x1="160" y1="120" x2="160" y2="108" stroke="#DB2777" strokeWidth="2.5" />
      <path d="M133 175 Q150 181 167 175" stroke="#BE185D" strokeWidth="1.5" />
    </g>
  </svg>
);

// 18. Áo Phông Graphic T-Shirt
export const TshirtComponent: React.FC<AssetComponentProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="122 110 56 88" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="layer-inner-tshirt">
      <path d="M126 116 L174 116 L176 195 L124 195 Z" fill="#F4F4F5" stroke="#E4E4E7" strokeWidth="1.5" />
      <ellipse cx="150" cy="116" rx="14" ry="7" fill="#E4E4E7" />
      <circle cx="150" cy="150" r="7" fill="#3B82F6" opacity="0.8" />
    </g>
  </svg>
);

// 19. Áo Trung Đơn Trắng
export const TrungDonComponent: React.FC<AssetComponentProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="126 98 48 110" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="layer-inner-trung-don">
      <rect x="142" y="100" width="16" height="18" rx="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
      <path d="M140 108 L150 128 L160 108" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M130 114 L170 114 L172 205 L128 205 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />
    </g>
  </svg>
);

// 20. Váy Đụp Đen
export const VayDupComponent: React.FC<AssetComponentProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="102 208 96 152" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="layer-bottom-vay-dup">
      <path d="M128 210 L104 355 Q150 365 196 355 L172 210 Z" fill="#18181B" stroke="#27272A" strokeWidth="2" />
      <path d="M122 220 Q150 230 178 220" stroke="#3F3F46" strokeWidth="1" />
      <line x1="150" y1="212" x2="150" y2="358" stroke="#27272A" strokeWidth="1" opacity="0.4" />
    </g>
  </svg>
);

// 21. Quần Jeans Ống Rộng / Jean Nam
export const JeansComponent: React.FC<AssetComponentProps> = ({
  color = "#2563EB",
  className = "w-full h-full"
}) => (
  <svg viewBox="112 194 76 174" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="layer-bottom-jeans">
      <path d="M120 196 L180 196 L184 252 L116 252 Z" fill={color} />
      <path d="M116 248 L114 365 L146 365 L149 250 Z" fill={color} stroke="#1D4ED8" strokeWidth="1.8" />
      <path d="M184 248 L186 365 L154 365 L151 250 Z" fill={color} stroke="#1D4ED8" strokeWidth="1.8" />
      <rect x="122" y="196" width="56" height="8" fill="#1E40AF" rx="2" />
      <line x1="150" y1="204" x2="150" y2="250" stroke="#FBBF24" strokeWidth="1" strokeDasharray="3 2" />
    </g>
  </svg>
);

// 22. Chân Váy Tennis Xếp Ly
export const VayXepLyComponent: React.FC<AssetComponentProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="108 194 84 88" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="layer-bottom-tennis">
      <path d="M124 198 L110 275 Q150 282 190 275 L176 198 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
      <line x1="126" y1="200" x2="120" y2="275" stroke="#CBD5E1" strokeWidth="1" />
      <line x1="138" y1="200" x2="136" y2="278" stroke="#CBD5E1" strokeWidth="1" />
      <line x1="150" y1="200" x2="150" y2="280" stroke="#CBD5E1" strokeWidth="1" />
      <line x1="162" y1="200" x2="164" y2="278" stroke="#CBD5E1" strokeWidth="1" />
      <line x1="174" y1="200" x2="180" y2="275" stroke="#CBD5E1" strokeWidth="1" />
      <rect x="122" y="196" width="56" height="7" fill="#0F172A" rx="1.5" />
    </g>
  </svg>
);

// 23. Quần Cargo Túi Hộp
export const CargoComponent: React.FC<AssetComponentProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="106 194 88 174" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="layer-bottom-cargo">
      <path d="M120 196 L180 196 L184 256 L116 256 Z" fill="#374151" />
      <path d="M116 250 L114 365 L147 365 L149 252 Z" fill="#374151" stroke="#1F2937" strokeWidth="1.5" />
      <path d="M184 250 L186 365 L153 365 L151 252 Z" fill="#374151" stroke="#1F2937" strokeWidth="1.5" />
      <rect x="108" y="250" width="14" height="22" rx="3" fill="#1F2937" stroke="#111827" strokeWidth="1.2" />
      <rect x="178" y="250" width="14" height="22" rx="3" fill="#1F2937" stroke="#111827" strokeWidth="1.2" />
      <line x1="150" y1="198" x2="150" y2="252" stroke="#1F2937" strokeWidth="1.2" />
    </g>
  </svg>
);

// 24. Quần Lụa Trắng / Quần Ống Sớ
export const QuanLuaComponent: React.FC<AssetComponentProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="114 196 72 172" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="layer-bottom-quan-lua">
      <path d="M120 198 L180 198 L184 258 L116 258 Z" fill="#F8FAFC" />
      <path d="M116 252 L116 365 L147 365 L149 256 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
      <path d="M184 252 L184 365 L153 365 L151 256 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
      <line x1="131" y1="220" x2="125" y2="360" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="169" y1="220" x2="175" y2="360" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
    </g>
  </svg>
);

// 25. Áo Blazer Đen
export const BlazerComponent: React.FC<AssetComponentProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="84 116 132 118" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="layer-sleeves-blazer">
      <path d="M124 118 L86 195 L104 200 L130 148 Z" fill="#27272A" />
      <path d="M176 118 L214 195 L196 200 L170 148 Z" fill="#27272A" />
    </g>
    <g id="layer-outer-blazer">
      <path d="M126 118 L144 118 L162 230 L138 230 Z" fill="#27272A" stroke="#18181B" strokeWidth="1.5" />
      <path d="M174 118 L156 118 L138 230 L162 230 Z" fill="#27272A" stroke="#18181B" strokeWidth="1.5" />
      <path d="M136 118 L150 165 L142 205" stroke="#3F3F46" strokeWidth="2" fill="none" />
      <path d="M164 118 L150 165 L158 205" stroke="#3F3F46" strokeWidth="2" fill="none" />
      <circle cx="150" cy="210" r="2.5" fill="#FDE68A" />
    </g>
  </svg>
);

// 26. Áo Nhật Bình
export const NhatBinhComponent: React.FC<AssetComponentProps> = ({
  color = "#D97706",
  className = "w-full h-full"
}) => (
  <svg viewBox="66 116 168 226" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="layer-sleeves-nu-nhatbinh">
      <path d="M126 118 L68 202 L98 210 L130 148 Z" fill={color} />
      <path d="M174 118 L232 202 L202 210 L170 148 Z" fill={color} />
      <path d="M72 198 L86 202 L96 186 L82 182 Z" fill="#0284C7" />
      <path d="M78 202 L90 206 L99 190 L88 186 Z" fill="#EF4444" />
      <path d="M228 198 L214 202 L204 186 L218 182 Z" fill="#0284C7" />
      <path d="M222 202 L210 206 L201 190 L212 186 Z" fill="#EF4444" />
    </g>
    <g id="layer-outer-nu-nhatbinh">
      <path d="M130 118 L170 118 L185 340 L115 340 Z" fill={color} stroke="#FFFFFF" strokeWidth="1.5" />
      <line x1="150" y1="118" x2="150" y2="340" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.4" />
      <rect x="137" y="117" width="26" height="110" fill="#F59E0B" stroke="#B45309" strokeWidth="2" rx="3" />
      <rect x="140" y="120" width="20" height="104" fill="#FEF3C7" opacity="0.9" />
      <path d="M115 326 Q132 316 150 326 Q168 316 185 326 L185 340 L115 340 Z" fill="#0284C7" />
      <path d="M115 333 Q132 325 150 333 Q168 325 185 333 L185 340 L115 340 Z" fill="#EF4444" />
    </g>
  </svg>
);

// 27. Áo Tứ Thân
export const TuThanComponent: React.FC<AssetComponentProps> = ({
  color = "#047857",
  className = "w-full h-full"
}) => (
  <svg viewBox="88 116 124 236" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="layer-sleeves-nu-tuthan">
      <path d="M126 118 L90 195 L106 202 L130 145 Z" fill={color} opacity="0.95" />
      <path d="M174 118 L210 195 L194 202 L170 145 Z" fill={color} opacity="0.95" />
    </g>
    <g id="layer-outer-nu-tuthan">
      <path d="M130 125 L170 125 L182 350 L118 350 Z" fill="#047857" opacity="0.85" />
      <path d="M126 125 L136 195 L112 335 L106 330 L122 150 Z" fill={color} />
      <path d="M174 125 L164 195 L188 335 L194 330 L178 150 Z" fill={color} />
    </g>
  </svg>
);

// 28. Áo Giao Lĩnh
export const GiaoLinhComponent: React.FC<AssetComponentProps> = ({
  color,
  gender = "nu",
  className = "w-full h-full"
}) => (
  <svg viewBox="82 102 136 248" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {gender === "nam" ? (
      <>
        <g id="layer-sleeves-nam-giaolinh">
          <path d="M120 118 L68 195 L96 208 L126 150 Z" fill={color || "#065F46"} />
          <path d="M180 118 L232 195 L204 208 L174 150 Z" fill={color || "#065F46"} />
        </g>
        <g id="layer-outer-nam-giaolinh">
          <path d="M122 118 L138 118 L176 195 L182 345 L118 345 L120 195 Z" fill={color || "#065F46"} stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="130" y1="116" x2="164" y2="162" stroke="#FFFFFF" strokeWidth="4" />
          <line x1="166" y1="116" x2="142" y2="144" stroke="#FDE68A" strokeWidth="3" />
        </g>
      </>
    ) : (
      <>
        {/* Tay áo thụng rộng chùng nhẹ */}
        <g id="layer-sleeves-nu-giaolinh">
          <path d="M122 118 Q96 142 88 198 L102 203 Q116 182 126 154 L124 134 Z" fill={color || "#18181B"} stroke="#27272A" strokeWidth="1.2" />
          <path d="M92 195 Q108 175 120 156" stroke="#2D2825" strokeWidth="1" fill="none" />
          <path d="M178 118 Q204 142 212 198 L198 203 Q184 182 174 154 L176 134 Z" fill={color || "#18181B"} stroke="#27272A" strokeWidth="1.2" />
          <path d="M208 195 Q192 175 180 156" stroke="#2D2825" strokeWidth="1" fill="none" />
        </g>

        {/* Thân áo dáng dài thướt tha xuống bắp chân dưới */}
        <g id="layer-outer-nu-giaolinh">
          <path d="M142 104 L150 115 L158 104 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.8" />
          <path
            d="M122 118 Q120 180 121 210 Q119 265 114 346 Q150 351 186 346 Q181 265 179 210 Q180 180 178 118 Z"
            fill={color || "#18181B"}
            stroke="#27272A"
            strokeWidth="1.2"
          />
          <path d="M134 196 Q130 265 125 346" stroke="#12100F" strokeWidth="1.2" fill="none" />
          <path d="M166 196 Q170 265 175 346" stroke="#12100F" strokeWidth="1.2" fill="none" />
          <path d="M114 346 Q150 351 186 346" stroke="#3F3F46" strokeWidth="1" fill="none" />

          {/* Cổ vạt chéo chữ Y bản to Hữu Nhậm */}
          <path d="M168 117 L174 118 L136 172 L132 166 Z" fill="#1F1D1C" stroke="#27272A" strokeWidth="0.8" />
          <line x1="170" y1="117" x2="134" y2="169" stroke="#3F3F46" strokeWidth="2" />
          <path d="M132 117 L126 118 L168 184 L174 178 Z" fill="#24201E" stroke="#27272A" strokeWidth="0.8" />
          <line x1="128" y1="117" x2="172" y2="182" stroke="#3F3F46" strokeWidth="2.8" strokeLinecap="round" />

          {/* Dải lụa trắng thắt eo to bản & 2 dải lụa rủ dài qua đầu gối */}
          <path d="M123 182 Q150 186 177 182 L178 198 Q150 202 122 198 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
          <ellipse cx="150" cy="191" rx="5" ry="3.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
          <path d="M147 193 Q144 235 142 270 Q140 295 143 322 L149 320 Q147 295 148 270 Q150 235 151 193 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.8" />
          <path d="M151 193 Q154 235 156 270 Q158 298 155 326 L149 324 Q152 298 150 270 Q148 235 147 193 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
        </g>
      </>
    )}
  </svg>
);

// 29. Áo Ngũ Thân
export const NguThanComponent: React.FC<AssetComponentProps> = ({
  color,
  gender = "nu",
  className = "w-full h-full"
}) => (
  <svg viewBox="82 102 136 250" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {gender === "nam" ? (
      <>
        <g id="layer-sleeves-nam-nguthan">
          <path d="M122 118 L84 200 L100 205 L126 145 Z" fill={color || "#1E3A8A"} />
          <path d="M178 118 L216 200 L200 205 L174 145 Z" fill={color || "#1E3A8A"} />
        </g>
        <g id="layer-outer-nam-nguthan">
          <path d="M124 116 L176 116 L182 350 L118 350 Z" fill={color || "#1E3A8A"} stroke="#FFFFFF" strokeWidth="1.5" />
          <rect x="141" y="103" width="18" height="14" rx="3" fill={color || "#1E3A8A"} stroke="#FDE68A" strokeWidth="1.5" />
          <path d="M150 116 Q168 126 172 155 L172 225" stroke="#FDE68A" strokeWidth="2.5" fill="none" />
        </g>
      </>
    ) : (
      <>
        <g id="layer-sleeves-nu-nguthan">
          <path d="M124 118 L88 198 L102 202 L130 148 Z" fill={color || "#9333EA"} />
          <path d="M176 118 L212 198 L198 202 L170 148 Z" fill={color || "#9333EA"} />
        </g>
        <g id="layer-outer-nu-nguthan">
          <path d="M130 118 L170 118 L182 340 L118 340 Z" fill={color || "#9333EA"} stroke="#FFFFFF" strokeWidth="1.5" />
          <rect x="141" y="105" width="18" height="12" rx="3" fill={color || "#9333EA"} stroke="#FDE68A" strokeWidth="1.5" />
          <path d="M150 117 Q165 125 168 155 L168 220" stroke="#FDE68A" strokeWidth="2.5" fill="none" />
        </g>
      </>
    )}
  </svg>
);

// 30. Áo Dài Cách Tân
export const AoDaiComponent: React.FC<AssetComponentProps> = ({
  color = "#84CC16",
  className = "w-full h-full"
}) => (
  <svg viewBox="86 110 128 222" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="layer-sleeves-nu-aodai">
      <path d="M124 118 L88 196 L102 201 L132 145 Z" fill={color} />
      <path d="M176 118 L212 196 L198 201 L168 145 Z" fill={color} />
    </g>
    <g id="layer-outer-nu-aodai">
      <ellipse cx="150" cy="112" rx="10" ry="5.5" fill={color} stroke="#FDE68A" strokeWidth="1.5" />
      <path d="M134 118 L166 118 L175 330 L125 330 Z" fill={color} stroke="#FFFFFF" strokeWidth="1.5" />
    </g>
  </svg>
);

// Master Renderer: Tự động ánh xạ từng WardrobeItem sang đúng vector component của búp bê
export interface WardrobeItemAssetProps {
  item: WardrobeItem;
  color?: string;
  gender?: "nu" | "nam";
  className?: string;
}

export const WardrobeItemAsset: React.FC<WardrobeItemAssetProps> = ({
  item,
  color,
  gender = "nu",
  className = "w-full h-full"
}) => {
  const sId = (item.id || "").toLowerCase();
  const sKey = (item.svgKey || "").toLowerCase();
  const sName = (item.name || "").toLowerCase();
  const sShort = (item.shortName || "").toLowerCase();
  const combined = `${sId} ${sKey} ${sName} ${sShort}`;

  // Kính mát / Kính râm
  if (combined.includes("kinh")) {
    return <KinhMatComponent className={className} />;
  }

  // Tai nghe Over-ear
  if (combined.includes("tai_nghe") || combined.includes("tai nghe")) {
    return <TaiNgheComponent className={className} />;
  }

  // Túi kẹp nách Y2K
  if (combined.includes("kep_nach") || combined.includes("kẹp nách")) {
    return <TuiKepNachComponent className={className} />;
  }

  // Túi gấm / Túi thêu
  if (combined.includes("tui_theu") || combined.includes("tui_gam") || combined.includes("túi thêu") || combined.includes("túi gấm")) {
    return <TuiTheuComponent className={className} />;
  }

  // Quạt xếp / Quạt nan
  if (combined.includes("quat") || combined.includes("quạt")) {
    return <QuatXepComponent className={className} />;
  }

  // Vòng tay vàng
  if (combined.includes("vong_tay") || combined.includes("vòng tay")) {
    return <VongTayComponent className={className} />;
  }

  // Dải thắt lưng lụa ngũ sắc
  if (combined.includes("that_lung") || combined.includes("thắt lưng")) {
    return <DaiThatLungComponent className={className} />;
  }

  // Khăn vấn
  if (combined.includes("khan_van") || combined.includes("khăn vấn")) {
    return <KhanVanComponent className={className} />;
  }

  // Khăn đóng nam
  if (combined.includes("khan_dong") || combined.includes("khăn đóng")) {
    return <KhanDongComponent className={className} />;
  }

  // Khăn mỏ quạ
  if (combined.includes("mo_qua") || combined.includes("mỏ quạ")) {
    const moQuaColor = combined.includes("theu") || combined.includes("gam") ? "#CA8A04" : "#1E3A8A";
    return <KhanMoQuaComponent color={moQuaColor} className={className} />;
  }

  // Nón quai thao
  if (combined.includes("quai_thao") || combined.includes("quai thao")) {
    return <NonQuaiThaoComponent className={className} />;
  }

  // Giày cao gót
  if (combined.includes("cao_got") || combined.includes("cao gót")) {
    return <GiayCaoGotComponent className={className} />;
  }

  // Sneaker
  if (combined.includes("sneaker")) {
    return <SneakerComponent className={className} />;
  }

  // Guốc mộc
  if (combined.includes("guoc") || combined.includes("guốc")) {
    return <GuocMocComponent className={className} />;
  }

  // Giày tây
  if (combined.includes("giay_tay") || combined.includes("giày tây") || combined.includes("oxford")) {
    return <GiayTayComponent className={className} />;
  }

  // Yếm đào
  if (combined.includes("yem") || combined.includes("yếm")) {
    return <YemDaoComponent className={className} />;
  }

  // Croptop
  if (combined.includes("croptop") || combined.includes("crop")) {
    return <CroptopComponent className={className} />;
  }

  // T-shirt / Áo phông
  if (combined.includes("tshirt") || combined.includes("phong") || combined.includes("phông") || combined.includes("thun")) {
    return <TshirtComponent className={className} />;
  }

  // Áo trong / Trung đơn
  if (combined.includes("trung_don") || combined.includes("áo trong") || combined.includes("lót")) {
    return <TrungDonComponent className={className} />;
  }

  // Váy đụp
  if (combined.includes("vay_dup") || combined.includes("váy đụp")) {
    return <VayDupComponent className={className} />;
  }

  // Quần jeans
  if (combined.includes("jean") || combined.includes("bò")) {
    const jeanColor = combined.includes("nam") ? "#3B82F6" : "#2563EB";
    return <JeansComponent color={jeanColor} className={className} />;
  }

  // Chân váy tennis xếp ly
  if (combined.includes("tennis") || combined.includes("xep_ly") || combined.includes("xếp ly")) {
    return <VayXepLyComponent className={className} />;
  }

  // Quần cargo
  if (combined.includes("cargo") || combined.includes("tui_hop") || combined.includes("túi hộp")) {
    return <CargoComponent className={className} />;
  }

  // Quần lụa trắng / Quần ống sớ
  if (combined.includes("quan_lua") || combined.includes("ong_so") || combined.includes("quần lụa") || combined.includes("ống sớ")) {
    return <QuanLuaComponent className={className} />;
  }

  // Áo Blazer
  if (combined.includes("blazer") || combined.includes("vest")) {
    return <BlazerComponent className={className} />;
  }

  // Áo Nhật Bình
  if (combined.includes("nhat_binh") || combined.includes("nhatbinh") || combined.includes("nhật bình")) {
    return <NhatBinhComponent color={color || item.colorPreview} className={className} />;
  }

  // Áo Tứ Thân
  if (combined.includes("tu_than") || combined.includes("tuchan") || combined.includes("tứ thân")) {
    return <TuThanComponent color={color || item.colorPreview} className={className} />;
  }

  // Áo Giao Lĩnh
  if (combined.includes("giao_linh") || combined.includes("giaulinh") || combined.includes("giao lĩnh")) {
    const isNamItem = item.gender === "nam" || gender === "nam";
    return <GiaoLinhComponent color={color || item.colorPreview} gender={isNamItem ? "nam" : "nu"} className={className} />;
  }

  // Áo Dài
  if (combined.includes("ao_dai") || combined.includes("aodai") || combined.includes("áo dài")) {
    return <AoDaiComponent color={color || item.colorPreview} className={className} />;
  }

  // Áo Ngũ Thân
  if (combined.includes("ngu_than") || combined.includes("nguthan") || combined.includes("ngũ thân")) {
    const isNamItem = item.gender === "nam" || gender === "nam";
    return <NguThanComponent color={color || item.colorPreview} gender={isNamItem ? "nam" : "nu"} className={className} />;
  }

  // Fallback an toàn nếu có item lạ: render ảnh hoặc màu nền đặc trưng
  if (item.imageUrl || item.thumbnail) {
    return (
      <img
        src={item.imageUrl || item.thumbnail}
        alt={item.name}
        className={`${className} object-contain`}
      />
    );
  }

  return (
    <div
      className={`${className} rounded-lg flex items-center justify-center`}
      style={{ backgroundColor: color || item.colorPreview || "#10B981" }}
    />
  );
};
