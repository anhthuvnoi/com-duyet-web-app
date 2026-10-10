import React from "react";
import { Outfit } from "../data/outfits";
import { TraditionalColor } from "../data/colors";
import { StylingLevelInfo } from "../data/accessories";
import { CurrentOutfitState, WardrobeItem } from "../data/wardrobe";

export interface PaperDollSvgProps {
  outfit?: Outfit;
  currentOutfit?: CurrentOutfitState;
  color: TraditionalColor;
  levelInfo: StylingLevelInfo;
  gender: "nu" | "nam";
  activeAccessories?: string[];
  showBase?: boolean;
  showInner?: boolean;
  showOuter?: boolean;
  showWaistband?: boolean;
  showAccessories?: boolean;
  className?: string;
}

/**
 * PaperDollSvg - Hệ Thống Búp Bê Xếp Lớp (Multi-Layering) Vector Chibi Cốm Duyệt
 * Đồng bộ tuyệt đối theo chuẩn Avatar Container & Z-index:
 * Nền (0) -> Cơ thể (10) -> Áo trong (20) -> Quần/Váy (30) -> Áo ngoài (40) -> Tay áo (50) -> Bàn tay (55) -> Phụ kiện cầm tay & Đai (60) -> Giày (62) -> Tóc/Nón (70)
 * Canvas đồng bộ 300x400 (khổ dọc tỷ lệ vàng 3:4).
 */
export const PaperDollSvg: React.FC<PaperDollSvgProps> = ({
  outfit,
  currentOutfit,
  color,
  levelInfo,
  gender,
  activeAccessories,
  showBase = true,
  showInner = true,
  showOuter = true,
  showWaistband = true,
  showAccessories = true,
  className = "w-full h-full"
}) => {
  const currentActiveAccessories = activeAccessories ?? (
    gender === "nu" ? levelInfo.accessoriesNu : levelInfo.accessoriesNam
  );

  const isAccActive = (...keywords: string[]) => {
    if (currentOutfit) {
      const activeKeys = [
        currentOutfit.accessory?.svgKey,
        currentOutfit.accessory?.id,
        currentOutfit.accessory?.name,
        currentOutfit.headwear?.svgKey,
        currentOutfit.headwear?.id,
        currentOutfit.headwear?.name,
        currentOutfit.footwear?.svgKey,
        currentOutfit.footwear?.id,
        currentOutfit.footwear?.name
      ].filter(Boolean) as string[];

      const matchesKey = keywords.some((kw) => {
        const lkw = kw.toLowerCase();
        return activeKeys.some((k) => k.toLowerCase().includes(lkw));
      });
      if (matchesKey) return true;
    }

    return currentActiveAccessories.some((acc) => {
      const lower = acc.toLowerCase();
      return keywords.some((kw) => lower.includes(kw.toLowerCase()));
    });
  };

  const isNam = gender === "nam";

  // Helper function to check if a wardrobe item matches any keyword in its id, svgKey, or name
  const itemMatches = (item: WardrobeItem | null | undefined, ...keywords: string[]): boolean => {
    if (!item) return false;
    const sId = (item.id || "").toLowerCase();
    const sKey = (item.svgKey || "").toLowerCase();
    const sName = (item.name || "").toLowerCase();
    const sShort = (item.shortName || "").toLowerCase();
    return keywords.some((kw) => {
      const lkw = kw.toLowerCase();
      return (
        sId.includes(lkw) ||
        sKey.includes(lkw) ||
        sName.includes(lkw) ||
        sShort.includes(lkw)
      );
    });
  };

  const hasOuter = currentOutfit ? currentOutfit.outer !== null : false;
  const hasInner = currentOutfit ? currentOutfit.inner !== null : false;
  const hasBottom = currentOutfit ? currentOutfit.bottom !== null : false;
  const hasFootwear = currentOutfit ? currentOutfit.footwear !== null : false;

  // Outerwear resolution
  const isNhatBinh = currentOutfit
    ? itemMatches(currentOutfit.outer, "nhat_binh", "nhatbinh", "nhật bình")
    : (outfit?.id.includes("nhatbinh") ?? false);

  const isTuThan = currentOutfit
    ? itemMatches(currentOutfit.outer, "tu_than", "tuchan", "tứ thân")
    : (outfit?.id.includes("tuchan") ?? false);

  const isGiaoLinh = currentOutfit
    ? itemMatches(currentOutfit.outer, "giao_linh", "giaulinh", "giao lĩnh")
    : (outfit?.id.includes("giaulinh") ?? false);

  const isAoDai = currentOutfit
    ? itemMatches(currentOutfit.outer, "ao_dai", "aodai", "áo dài")
    : (outfit?.id.includes("aodai") ?? false);

  const isNguThan = isAoDai
    ? false
    : currentOutfit
    ? itemMatches(currentOutfit.outer, "ngu_than", "nguthan", "ngũ thân")
    : (outfit?.id.includes("nguthan") ?? false);

  const isBlazer = currentOutfit
    ? itemMatches(currentOutfit.outer, "blazer", "vest")
    : false;

  // Innerwear resolution
  const isYemDao = currentOutfit
    ? itemMatches(currentOutfit.inner, "yem", "yếm")
    : (!isNam && isTuThan);

  const isCroptop = currentOutfit
    ? itemMatches(currentOutfit.inner, "croptop", "crop")
    : false;

  const isTshirt = currentOutfit
    ? itemMatches(currentOutfit.inner, "tshirt", "phong", "phông", "thun")
    : false;

  // Bottoms resolution
  const isVayDup = currentOutfit
    ? itemMatches(currentOutfit.bottom, "vay_dup", "váy đụp")
    : (!isNam && isTuThan);

  const isJeans = currentOutfit
    ? itemMatches(currentOutfit.bottom, "jean", "bò")
    : false;

  const isTennisSkirt = currentOutfit
    ? itemMatches(currentOutfit.bottom, "tennis", "xep_ly", "xếp ly")
    : false;

  const isCargo = currentOutfit
    ? itemMatches(currentOutfit.bottom, "cargo", "tui_hop", "túi hộp")
    : false;

  // Footwear resolution: Đổi phần giày sneaker thành giày cao gót mũi nhọn cho Áo Dài
  const isCaoGot = isAoDai
    ? (currentOutfit ? !itemMatches(currentOutfit.footwear, "guoc", "sneaker", "giay_tay") || itemMatches(currentOutfit.footwear, "cao_got") : true)
    : currentOutfit
    ? itemMatches(currentOutfit.footwear, "cao_got", "cao gót", "gót")
    : isAccActive("cao gót", "gót");

  const isSneaker = isAoDai
    ? false
    : currentOutfit
    ? itemMatches(currentOutfit.footwear, "sneaker", "thể thao")
    : isAccActive("sneaker");

  const isGuocMoc = currentOutfit
    ? itemMatches(currentOutfit.footwear, "guoc", "mộc", "guốc")
    : isAccActive("guốc", "mộc");

  const isGiayTay = currentOutfit
    ? itemMatches(currentOutfit.footwear, "giay_tay", "giày tây", "oxford")
    : isAccActive("giày tây", "oxford");

  // Headwear resolution
  const isKhanVan = currentOutfit
    ? (itemMatches(currentOutfit.headwear, "khan_van", "khăn vấn", "vành") ||
       itemMatches(currentOutfit.accessory, "khan_van", "khăn vấn", "vành"))
    : (!isNam && isAccActive("khăn vấn", "khăn", "mấn", "vành"));

  const isKhanDong = currentOutfit
    ? (itemMatches(currentOutfit.headwear, "khan_dong", "khan_xep", "khăn đóng", "khăn xếp") ||
       itemMatches(currentOutfit.accessory, "khan_dong", "khan_xep", "khăn đóng", "khăn xếp"))
    : (isNam && isAccActive("khăn đóng", "khăn xếp", "đóng", "xếp"));

  const isKhanMoQua = currentOutfit
    ? (itemMatches(currentOutfit.headwear, "mo_qua", "mỏ quạ") ||
       itemMatches(currentOutfit.accessory, "mo_qua", "mỏ quạ"))
    : (!isNam && isAccActive("mỏ quạ"));

  const isKhanMoQuaGamVang = isKhanMoQua && (
    currentOutfit
      ? (itemMatches(currentOutfit.headwear, "gam_vang", "theu", "gam", "vang", "vàng", "gấm", "thêu", "den_theu") ||
         itemMatches(currentOutfit.accessory, "gam_vang", "theu", "gam", "vang", "vàng", "gấm", "thêu", "den_theu"))
      : isAccActive("gấm", "thêu", "vàng")
  );

  const isNonQuaiThao = currentOutfit
    ? (itemMatches(currentOutfit.headwear, "quai_thao", "quai thao", "ba tầm") ||
       itemMatches(currentOutfit.accessory, "quai_thao", "quai thao", "ba tầm"))
    : (!isNam && isAccActive("quai thao", "nón quai thao"));

  const isTramCai = currentOutfit
    ? (itemMatches(currentOutfit.headwear, "tram", "trâm", "kẹp tóc") ||
       itemMatches(currentOutfit.accessory, "tram", "trâm", "kẹp tóc"))
    : isAccActive("trâm", "kẹp tóc", "trâm cài tóc");

  // Jewelry & Handhelds
  const isHoaTai = currentOutfit
    ? itemMatches(currentOutfit.accessory, "hoa_tai", "khuyen_tai", "hoa tai", "khuyên tai")
    : isAccActive("hoa tai", "khuyên tai");

  const isVongCo = currentOutfit
    ? itemMatches(currentOutfit.accessory, "vong_co", "kieng", "kiềng", "vòng cổ")
    : isAccActive("vòng cổ", "kiềng");

  // KÍNH RÂM: CHỈ xóa hoàn toàn chiếc kính râm đang nằm trên khu vực khuôn mặt/cổ áo khi diện Áo Dài
  const isKinhRam = isAoDai
    ? false
    : currentOutfit
    ? itemMatches(currentOutfit.accessory, "kinh", "kính")
    : isAccActive("kính", "kính mát", "kính râm");

  const isTaiNghe = currentOutfit
    ? itemMatches(currentOutfit.accessory, "tai_nghe", "tai nghe")
    : isAccActive("tai nghe");

  const isVongTay = currentOutfit
    ? itemMatches(currentOutfit.accessory, "vong_tay", "vòng tay")
    : isAccActive("vòng tay");

  const isQuatXep = currentOutfit
    ? itemMatches(currentOutfit.accessory, "quat", "quạt")
    : isAccActive("quạt");

  const isTuiKepNach = currentOutfit
    ? itemMatches(currentOutfit.accessory, "kep_nach", "kẹp nách")
    : false;

  const isTuiTheu = currentOutfit
    ? itemMatches(currentOutfit.accessory, "tui_theu", "tui_gam", "túi thêu", "túi gấm")
    : isAccActive("túi thêu", "túi");

  const isDaiThatLung = currentOutfit
    ? itemMatches(currentOutfit.accessory, "that_lung", "dai_that_lung", "thắt lưng", "dải lụa")
    : isTuThan;

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* ============================================================== */}
      {/* LAYER 10: BASE MANNEQUIN BODY SILHOUETTE (CƠ THỂ & KHUÔN MẶT GỐC) */}
      {/* ============================================================== */}
      {showBase && (
        <svg
          viewBox="0 0 300 400"
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Má hồng chuyển sắc mềm mại */}
            <radialGradient id="dollBlushGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FB7185" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#FDA4AF" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FDA4AF" stopOpacity="0" />
            </radialGradient>
            {/* Bóng đổ nhẹ dưới cằm/cổ */}
            <linearGradient id="dollNeckShadow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FDBA74" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FED7AA" stopOpacity="0" />
            </linearGradient>
          </defs>

          {isNam ? (
            /* BÚP BÊ NAM GIỚI */
            <g id="layer-body-male">
              {/* Tóc nền sau */}
              <ellipse cx="150" cy="68" rx="27" ry="22" fill="#1C1917" />
              {/* Thân mình & Hông nối liền liên tục (Continuous Torso & Hips) */}
              <path d="M120 118 Q116 170 120 230 L180 230 Q184 170 180 118 Z" fill="#FFF7ED" />
              <path d="M120 226 L120 252 L180 252 L180 226 Z" fill="#FFF7ED" />
              {/* Đôi chân nối liền trực tiếp chắc chắn từ hông xuống giày (Seamless Continuous Legs) */}
              <rect x="134" y="230" width="13" height="138" rx="5" fill="#FED7AA" />
              <rect x="153" y="230" width="13" height="138" rx="5" fill="#FED7AA" />
              {/* Đôi giày đen nhỏ nền tảng */}
              <ellipse cx="140" cy="368" rx="8.5" ry="4" fill="#1C1917" />
              <ellipse cx="160" cy="368" rx="8.5" ry="4" fill="#1C1917" />
              {/* Cánh tay nền liền vai xuôi xuống cổ tay (Seamless Arms) */}
              <path d="M120 120 Q100 160 88 198 L98 202 Q112 165 128 128 Z" fill="#FED7AA" />
              <path d="M180 120 Q200 160 212 198 L202 202 Q188 165 172 128 Z" fill="#FED7AA" />
              {/* Cổ (Neck) */}
              <rect x="141" y="98" width="18" height="22" rx="4" fill="#FFEFE3" stroke="#FDBA74" strokeWidth="0.8" />
              {/* Khuôn mặt (Face) */}
              <ellipse cx="150" cy="78" rx="23" ry="26" fill="#FFF9F5" stroke="#FED7AA" strokeWidth="1.5" />
              {/* Chi tiết mặt */}
              <path d="M135 70 Q142 67 147 70" stroke="#1C1917" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M153 70 Q158 67 165 70" stroke="#1C1917" strokeWidth="1.8" strokeLinecap="round" />
              <ellipse cx="142" cy="78" rx="2.4" ry="3.2" fill="#1C1917" />
              <ellipse cx="158" cy="78" rx="2.4" ry="3.2" fill="#1C1917" />
              <circle cx="141" cy="77" r="0.8" fill="#FFFFFF" />
              <circle cx="157" cy="77" r="0.8" fill="#FFFFFF" />
              <circle cx="136" cy="84" r="3.5" fill="#FDA4AF" opacity="0.5" />
              <circle cx="164" cy="84" r="3.5" fill="#FDA4AF" opacity="0.5" />
              <path d="M146 90 Q150 93 154 90" stroke="#E11D48" strokeWidth="1.8" strokeLinecap="round" />
              {/* Tóc trước */}
              <path d="M128 72 Q138 58 155 60 Q170 63 174 76 Q168 68 152 68 Q136 68 128 72 Z" fill="#1C1917" />
            </g>
          ) : (
            /* BÚP BÊ NỮ GIỚI - KHUÔN MẶT GỐC CHIBI/ANIME 2D CHUẨN MẪU THAM KHẢO */
            <g id="layer-body-female">
              {/* 1. MÁI TÓC ĐEN DÀI BUÔNG RỦ PHÍA SAU (BACK HAIR - TỶ LỆ ĐẦU MỚI) */}
              <ellipse cx="150" cy="67" rx="36" ry="42" fill="#1A1716" />
              <path d="M113 75 C103 130 99 185 103 250 C105 253 111 253 113 250 C117 195 121 140 125 85 Z" fill="#1A1716" />
              <path d="M187 75 C197 130 201 185 197 250 C195 253 189 253 187 250 C183 195 179 140 175 85 Z" fill="#1A1716" />
              <path d="M113 78 Q105 160 111 246 Q150 254 189 246 Q195 160 187 78 Z" fill="#1A1716" opacity="0.98" />

              {/* 2. THÂN HÌNH & ĐỒ LÓT NỀN TRẮNG CHUẨN MẪU (UNDERGARMENTS BASE) */}
              {/* Thân mình nền da sáng ấm */}
              <path d="M124 118 Q118 170 120 230 L180 230 Q182 170 176 118 Z" fill="#FFF7ED" />
              
              {/* Đôi chân dài thanh mảnh nối liền liên tục */}
              <rect x="135" y="230" width="12" height="138" rx="5" fill="#FED7AA" />
              <rect x="153" y="230" width="12" height="138" rx="5" fill="#FED7AA" />

              {/* Áo hai dây trắng cơ bản (White Camisole Top) */}
              <line x1="140" y1="112" x2="140" y2="124" stroke="#CBD5E1" strokeWidth="1.6" />
              <line x1="160" y1="112" x2="160" y2="124" stroke="#CBD5E1" strokeWidth="1.6" />
              <path d="M134 124 L166 124 L169 194 Q150 198 131 194 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />
              <path d="M134 124 Q150 127 166 124" stroke="#CBD5E1" strokeWidth="1" />

              {/* Quần đùi trắng cơ bản có đường chỉ may (White Shorts with Seams) */}
              <path d="M130 194 L170 194 L172 242 L152 242 L150 216 L148 242 L128 242 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />
              <line x1="150" y1="194" x2="150" y2="216" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 1.5" />
              <path d="M150 206 Q154 207 155 212" stroke="#CBD5E1" strokeWidth="0.8" strokeDasharray="2 1.5" fill="none" />
              <line x1="130" y1="239" x2="146" y2="239" stroke="#CBD5E1" strokeWidth="0.8" strokeDasharray="2 1.5" />
              <line x1="154" y1="239" x2="170" y2="239" stroke="#CBD5E1" strokeWidth="0.8" strokeDasharray="2 1.5" />

              {/* Dép xỏ ngón trắng nền tảng */}
              <ellipse cx="140" cy="368" rx="8" ry="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
              <ellipse cx="160" cy="368" rx="8" ry="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
              <path d="M138 368 L140 365 L142 368" stroke="#71717A" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M158 368 L160 365 L162 368" stroke="#71717A" strokeWidth="1.2" strokeLinecap="round" />

              {/* Cánh tay nền liền vai xuôi tự nhiên */}
              <path d="M124 120 Q106 155 88 198 L98 202 Q116 160 130 128 Z" fill="#FED7AA" />
              <path d="M176 120 Q194 155 212 198 L202 202 Q184 160 170 128 Z" fill="#FED7AA" />

              {/* 3. KHỚP CỔ NỐI LIỀN MƯỢT MÀ (SEAMLESS NECK JOINT - CẰM HẠ THẤP CHE BỚT CỔ DÀI) */}
              <rect x="143" y="96" width="14" height="23" rx="4" fill="#FFEFE5" stroke="#F6CEB4" strokeWidth="0.8" />
              <path d="M143 102 Q150 107 157 102 L157 106 Q150 111 143 106 Z" fill="url(#dollNeckShadow)" />

              {/* 4. TAI VÀ KHUÔN MẶT TRÁI XOAN (OVAL FACE - TO HƠN 12-15%, THANH TÚ, CÂN XỨNG) */}
              <ellipse cx="123" cy="82" rx="3.4" ry="5.5" fill="#FFF8F1" stroke="#F6CEB4" strokeWidth="0.8" />
              <path d="M122.5 80.5 Q124 82 122.5 83.5" stroke="#FBBF9E" strokeWidth="0.7" fill="none" />
              <ellipse cx="177" cy="82" rx="3.4" ry="5.5" fill="#FFF8F1" stroke="#F6CEB4" strokeWidth="0.8" />
              <path d="M177.5 80.5 Q176 82 177.5 83.5" stroke="#FBBF9E" strokeWidth="0.7" fill="none" />
              
              {/* Khuôn mặt hình trái xoan (Oval Face) thanh tú, cằm hạ xuống y=104 giúp cổ ngắn tự nhiên */}
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
                strokeWidth="1.0"
              />

              {/* 5. LÔNG MÀY THANH TÚ, CONG NHẸ ÔN HÒA (ĐỐI XỨNG CÂN BẰNG QUA X=150) */}
              <path d="M133.5 70 Q139.5 67.5 145.5 69.8" stroke="#382B22" strokeWidth="1.1" strokeLinecap="round" fill="none" />
              <path d="M154.5 69.8 Q160.5 67.5 166.5 70" stroke="#382B22" strokeWidth="1.1" strokeLinecap="round" fill="none" />
              {/* Nếp mí mắt mảnh mai đối xứng */}
              <path d="M135 75.5 Q139.5 74 144 75.8" stroke="#C4A794" strokeWidth="0.75" strokeLinecap="round" fill="none" />
              <path d="M156 75.8 Q160.5 74 165 75.5" stroke="#C4A794" strokeWidth="0.75" strokeLinecap="round" fill="none" />

              {/* 6. ĐÔI MẮT TO TRÒN HƠN TƯƠNG XỨNG VỚI MẶT TRÁI XOAN MỚI (CY=80) */}
              {/* Tròng trắng đối xứng cách đều trục 10.5px */}
              <ellipse cx="139.5" cy="80" rx="7.0" ry="6.0" fill="#FFFFFF" />
              <ellipse cx="160.5" cy="80" rx="7.0" ry="6.0" fill="#FFFFFF" />

              {/* Tròng mắt đen láy mềm mại to hơn, có chiều sâu */}
              <ellipse cx="139.5" cy="80.2" rx="5.6" ry="5.9" fill="#1A1513" />
              <ellipse cx="160.5" cy="80.2" rx="5.6" ry="5.9" fill="#1A1513" />

              {/* Đồng tử sâu */}
              <ellipse cx="139.5" cy="80.5" rx="3.4" ry="3.7" fill="#0C0A09" />
              <ellipse cx="160.5" cy="80.5" rx="3.4" ry="3.7" fill="#0C0A09" />

              {/* Ánh phản chiếu đáy mắt ấm áp */}
              <path d="M136.2 82.2 Q139.5 85 142.8 82.2" stroke="#4A3B32" strokeWidth="0.9" strokeLinecap="round" fill="none" />
              <path d="M157.2 82.2 Q160.5 85 163.8 82.2" stroke="#4A3B32" strokeWidth="0.9" strokeLinecap="round" fill="none" />

              {/* Catchlight lớn tròn long lanh góc trên trái */}
              <circle cx="137.7" cy="78.2" r="1.8" fill="#FFFFFF" />
              <circle cx="158.7" cy="78.2" r="1.8" fill="#FFFFFF" />

              {/* Catchlight nhỏ lấp lánh góc dưới phải */}
              <circle cx="141.5" cy="82.2" r="1.1" fill="#FFFFFF" />
              <circle cx="162.5" cy="82.2" r="1.1" fill="#FFFFFF" />

              {/* Đốm sáng vi điểm long lanh nhẹ */}
              <circle cx="138.0" cy="82.8" r="0.6" fill="#FFFFFF" opacity="0.85" />
              <circle cx="159.0" cy="82.8" r="0.6" fill="#FFFFFF" opacity="0.85" />

              {/* Đường viền mí trên mảnh mai tự nhiên đối xứng qua X=150 */}
              <path d="M132.5 78.8 Q139.5 74.8 146.5 79" stroke="#231B16" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              <path d="M132.5 79 Q131.2 78 132 77.2" stroke="#231B16" strokeWidth="0.9" strokeLinecap="round" fill="none" />
              <path d="M167.5 78.8 Q160.5 74.8 153.5 79" stroke="#231B16" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              <path d="M167.5 79 Q168.8 78 168 77.2" stroke="#231B16" strokeWidth="0.9" strokeLinecap="round" fill="none" />

              {/* Viền mi dưới mảnh nhẹ đối xứng */}
              <path d="M136 85.4 Q139.5 86.3 143 85.4" stroke="#8C796D" strokeWidth="0.65" strokeLinecap="round" fill="none" />
              <path d="M164 85.4 Q160.5 86.3 157 85.4" stroke="#8C796D" strokeWidth="0.65" strokeLinecap="round" fill="none" />

              {/* 7. MÁ HỒNG PHỚT NHẸ TỰ NHIÊN & CHẤM MŨI (ĐỐI XỨNG CÂN BẰNG X=150±17.5) */}
              <circle cx="132.5" cy="87" r="5.8" fill="url(#dollBlushGradient)" />
              <circle cx="167.5" cy="87" r="5.8" fill="url(#dollBlushGradient)" />
              <circle cx="150" cy="87" r="0.8" fill="#E59871" opacity="0.75" />

              {/* 8. KHUÔN MIỆNG NHỎ NHẮN CHÍNH GIỮA TRỤC DỌC X=150 (NATURAL SWEET SMILE) */}
              <path d="M146.8 93.8 Q150 96.4 153.2 93.8" stroke="#DF4763" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <ellipse cx="150" cy="95.3" rx="2.0" ry="0.8" fill="#FB7185" opacity="0.32" />

              {/* 9. TÓC MÁI BẰNG CẮT GỌN TRÊN HÀNG LÔNG MÀY (NEAT STRAIGHT BANGS - TỶ LỆ MỚI) */}
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

              {/* 10. KẸP TÓC HOA MAI / HOA ĐÀO (FLOWER HAIR CLIP - TƯƠNG XỨNG ĐẦU MỚI) */}
              <g id="blossom-hairpin">
                <path d="M174.5 49.5 Q179 48.5 178.5 53 Q175.5 54 174.5 49.5 Z" fill="#22C55E" />
                <circle cx="170" cy="51" r="2.8" fill="#F472B6" />
                <circle cx="173" cy="53.2" r="2.8" fill="#F472B6" />
                <circle cx="171.8" cy="56.5" r="2.8" fill="#F472B6" />
                <circle cx="168.2" cy="56.5" r="2.8" fill="#F472B6" />
                <circle cx="167" cy="53.2" r="2.8" fill="#F472B6" />
                <circle cx="170" cy="54" r="1.8" fill="#FDE047" stroke="#F59E0B" strokeWidth="0.4" />
                <circle cx="169.6" cy="53.6" r="0.6" fill="#FFFFFF" />
              </g>
            </g>
          )}
        </svg>
      )}

      {/* ============================================================== */}
      {/* LAYER 20: INNERWEAR (ÁO TRONG / YẾM ĐÀO / TRUNG ĐƠN) */}
      {/* ============================================================== */}
      {showInner && hasInner && (
        <svg
          viewBox="0 0 300 400"
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isYemDao ? (
            /* Yếm đào cổ truyền đỏ sen */
            <g id="layer-inner-yem">
              <path d="M143 100 Q150 107 157 100" stroke="#DC2626" strokeWidth="2" />
              <path d="M136 118 L150 108 L164 118 L166 195 L134 195 Z" fill="#F43F5E" stroke="#E11D48" strokeWidth="1.5" />
              <circle cx="150" cy="144" r="4" fill="#FDE68A" />
              <circle cx="150" cy="144" r="1.8" fill="#E11D48" />
              <path d="M144 144 Q150 138 156 144" stroke="#FDE68A" strokeWidth="1" />
            </g>
          ) : isCroptop ? (
            /* Áo Croptop ôm body */
            <g id="layer-inner-croptop">
              <path d="M132 120 L168 120 L167 175 L133 175 Z" fill="#EC4899" stroke="#DB2777" strokeWidth="1.5" rx="3" />
              <line x1="140" y1="120" x2="140" y2="108" stroke="#DB2777" strokeWidth="2.5" />
              <line x1="160" y1="120" x2="160" y2="108" stroke="#DB2777" strokeWidth="2.5" />
              <path d="M133 175 Q150 181 167 175" stroke="#BE185D" strokeWidth="1.5" />
            </g>
          ) : isTshirt ? (
            /* Áo phông Basic */
            <g id="layer-inner-tshirt">
              <path d="M126 116 L174 116 L176 195 L124 195 Z" fill="#F4F4F5" stroke="#E4E4E7" strokeWidth="1.5" />
              <ellipse cx="150" cy="116" rx="14" ry="7" fill="#E4E4E7" />
              <circle cx="150" cy="150" r="7" fill="#3B82F6" opacity="0.8" />
            </g>
          ) : (
            /* Áo trung đơn trắng cổ đứng chuẩn mực */
            <g id="layer-inner-trung-don">
              <rect x="142" y="100" width="16" height="18" rx="3" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
              <path d="M140 108 L150 128 L160 108" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M130 114 L170 114 L172 205 L128 205 Z" fill="#FFFFFF" opacity="0.95" />
            </g>
          )}
        </svg>
      )}

      {/* ============================================================== */}
      {/* LAYER 30: BOTTOM (QUẦN / VÁY / VÁY ĐỤP / JEANS) */}
      {/* ============================================================== */}
      {hasBottom && (
        <svg
          viewBox="0 0 300 400"
          className="absolute inset-0 w-full h-full z-30 pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isVayDup ? (
            /* Váy đúp đen Kinh Bắc */
            <g id="layer-bottom-vay-dup">
              <path d="M128 210 L104 355 Q150 365 196 355 L172 210 Z" fill="#18181B" stroke="#27272A" strokeWidth="2" />
              <path d="M122 220 Q150 230 178 220" stroke="#3F3F46" strokeWidth="1" />
              <line x1="150" y1="212" x2="150" y2="358" stroke="#27272A" strokeWidth="1" opacity="0.4" />
            </g>
          ) : isJeans ? (
            /* Quần Jeans ống rộng phủ kín eo */
            <g id="layer-bottom-jeans">
              <path d="M120 196 L180 196 L184 252 L116 252 Z" fill="#2563EB" />
              <path d="M116 248 L114 365 L146 365 L149 250 Z" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.8" />
              <path d="M184 248 L186 365 L154 365 L151 250 Z" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.8" />
              <rect x="122" y="196" width="56" height="8" fill="#1E40AF" rx="2" />
              <line x1="150" y1="204" x2="150" y2="250" stroke="#FBBF24" strokeWidth="1" strokeDasharray="3 2" />
            </g>
          ) : isTennisSkirt ? (
            /* Chân váy tennis */
            <g id="layer-bottom-tennis">
              <path d="M124 198 L110 275 Q150 282 190 275 L176 198 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
              <line x1="126" y1="200" x2="120" y2="275" stroke="#CBD5E1" strokeWidth="1" />
              <line x1="138" y1="200" x2="136" y2="278" stroke="#CBD5E1" strokeWidth="1" />
              <line x1="150" y1="200" x2="150" y2="280" stroke="#CBD5E1" strokeWidth="1" />
              <line x1="162" y1="200" x2="164" y2="278" stroke="#CBD5E1" strokeWidth="1" />
              <line x1="174" y1="200" x2="180" y2="275" stroke="#CBD5E1" strokeWidth="1" />
              <rect x="122" y="196" width="56" height="7" fill="#0F172A" rx="1.5" />
            </g>
          ) : isCargo ? (
            /* Quần Cargo túi hộp phủ kín hoàn toàn thân dưới, không có khoảng hở lơ lửng */
            <g id="layer-bottom-cargo">
              <path d="M120 196 L180 196 L184 256 L116 256 Z" fill="#374151" />
              <path d="M116 250 L114 365 L147 365 L149 252 Z" fill="#374151" stroke="#1F2937" strokeWidth="1.5" />
              <path d="M184 250 L186 365 L153 365 L151 252 Z" fill="#374151" stroke="#1F2937" strokeWidth="1.5" />
              <rect x="108" y="250" width="14" height="22" rx="3" fill="#1F2937" stroke="#111827" strokeWidth="1.2" />
              <rect x="178" y="250" width="14" height="22" rx="3" fill="#1F2937" stroke="#111827" strokeWidth="1.2" />
              <line x1="150" y1="198" x2="150" y2="252" stroke="#1F2937" strokeWidth="1.2" />
            </g>
          ) : (
            /* Quần lụa trắng ống suông rộng / Ống sớ phủ kín eo */
            <g id="layer-bottom-quan-lua">
              <path d="M120 198 L180 198 L184 258 L116 258 Z" fill="#F8FAFC" />
              <path d="M116 252 L116 365 L147 365 L149 256 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
              <path d="M184 252 L184 365 L153 365 L151 256 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
              <line x1="131" y1="220" x2="125" y2="360" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="169" y1="220" x2="175" y2="360" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
            </g>
          )}
        </svg>
      )}

      {/* ============================================================== */}
      {/* LAYER 40: OUTERWEAR TORSO & ROBES (THÂN ÁO KHOÁC NGOÀI) */}
      {/* ============================================================== */}
      {showOuter && hasOuter && (
        <svg
          viewBox="0 0 300 400"
          className="absolute inset-0 w-full h-full z-40 pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isBlazer ? (
            /* Thân áo Blazer */
            <g id="layer-outer-blazer">
              <path d="M126 118 L144 118 L162 230 L138 230 Z" fill="#27272A" stroke="#18181B" strokeWidth="1.5" />
              <path d="M174 118 L156 118 L138 230 L162 230 Z" fill="#27272A" stroke="#18181B" strokeWidth="1.5" />
              <path d="M136 118 L150 165 L142 205" stroke="#3F3F46" strokeWidth="2" fill="none" />
              <path d="M164 118 L150 165 L158 205" stroke="#3F3F46" strokeWidth="2" fill="none" />
              <circle cx="150" cy="210" r="2.5" fill="#FDE68A" />
            </g>
          ) : isNam ? (
            isGiaoLinh ? (
              /* Thân áo Giao Lĩnh Nam (cổ chéo Hữu Nhậm) */
              <g id="layer-outer-nam-giaolinh">
                <path d="M122 118 L138 118 L176 195 L182 345 L118 345 L120 195 Z" fill={color.hex} stroke="#FFFFFF" strokeWidth="1.5" />
                <line x1="130" y1="116" x2="164" y2="162" stroke="#FFFFFF" strokeWidth="4" />
                <line x1="166" y1="116" x2="142" y2="144" stroke="#FDE68A" strokeWidth="3" />
              </g>
            ) : isAoDai ? (
              /* Thân áo Dài Nam */
              <g id="layer-outer-nam-aodai">
                <path d="M124 118 L176 118 L180 340 L120 340 Z" fill={color.hex} stroke="#FFFFFF" strokeWidth="1.5" />
                <rect x="142" y="103" width="16" height="14" rx="3" fill={color.hex} stroke="#FDE68A" strokeWidth="1.5" />
                <line x1="150" y1="118" x2="150" y2="340" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
              </g>
            ) : (
              /* Thân áo Ngũ Thân Nam (cổ đứng lập lĩnh khuy phải) */
              <g id="layer-outer-nam-nguthan">
                <path d="M124 116 L176 116 L182 350 L118 350 Z" fill={color.hex} stroke="#FFFFFF" strokeWidth="1.5" />
                <rect x="141" y="103" width="18" height="14" rx="3" fill={color.hex} stroke="#FDE68A" strokeWidth="1.5" />
                <path d="M150 116 Q168 126 172 155 L172 225" stroke="#FDE68A" strokeWidth="2.5" fill="none" />
              </g>
            )
          ) : (
            isNhatBinh ? (
              /* Thân áo Nhật Bình Nữ (cổ chữ nhật viền ngũ sắc) */
              <g id="layer-outer-nu-nhatbinh">
                <path d="M130 118 L170 118 L185 340 L115 340 Z" fill={color.hex} stroke="#FFFFFF" strokeWidth="1.5" />
                <line x1="150" y1="118" x2="150" y2="340" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.4" />
                <rect x="137" y="117" width="26" height="110" fill="#F59E0B" stroke="#B45309" strokeWidth="2" rx="3" />
                <rect x="140" y="120" width="20" height="104" fill="#FEF3C7" opacity="0.9" />
                {/* Dải ngũ sắc gấu áo */}
                <path d="M115 326 Q132 316 150 326 Q168 316 185 326 L185 340 L115 340 Z" fill="#0284C7" />
                <path d="M115 333 Q132 325 150 333 Q168 325 185 333 L185 340 L115 340 Z" fill="#EF4444" />
              </g>
            ) : isTuThan ? (
              /* Thân áo Tứ Thân Nữ (4 vạt) */
              <g id="layer-outer-nu-tuthan">
                <path d="M130 125 L170 125 L182 350 L118 350 Z" fill="#047857" opacity="0.85" />
                <path d="M126 125 L136 195 L112 335 L106 330 L122 150 Z" fill={color.hex} />
                <path d="M174 125 L164 195 L188 335 L194 330 L178 150 Z" fill={color.hex} />
              </g>
            ) : isGiaoLinh ? (
              /* Thân áo Giao Lĩnh Nữ dáng dài thướt tha chuẩn phom người thật */
              <g id="layer-outer-nu-giaolinh">
                {/* 1. Cổ áo lót trung đơn trắng ngà hé lộ thanh nhã */}
                <path d="M142 104 L150 115 L158 104 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.8" />
                <path d="M144 104 L150 113 L156 104" stroke="#CBD5E1" strokeWidth="0.6" fill="none" />
                {/* 2. Thân áo dáng dài thướt tha kéo dài xuống tận bắp chân dưới (y=346), chỉ hở ống quần lụa trắng */}
                <path
                  d="M122 118 Q120 180 121 210 Q119 265 114 346 Q150 351 186 346 Q181 265 179 210 Q180 180 178 118 Z"
                  fill="#18181B"
                  stroke="#27272A"
                  strokeWidth="1.2"
                />
                {/* Nếp rủ vải mềm mại dọc theo thân áo */}
                <path d="M134 196 Q130 265 125 346" stroke="#12100F" strokeWidth="1.4" fill="none" />
                <path d="M136 198 Q132 265 127 346" stroke="#2D2825" strokeWidth="0.8" fill="none" />
                <path d="M166 196 Q170 265 175 346" stroke="#12100F" strokeWidth="1.4" fill="none" />
                <path d="M164 198 Q168 265 173 346" stroke="#2D2825" strokeWidth="0.8" fill="none" />
                <path d="M150 200 Q152 270 150 348" stroke="#141211" strokeWidth="1.2" fill="none" />
                {/* Bóng đổ nhẹ hai bên mạn sườn */}
                <path d="M121 210 Q119 265 114 346 L120 346 Q124 265 126 210 Z" fill="#12100F" opacity="0.45" />
                <path d="M179 210 Q181 265 186 346 L180 346 Q176 265 174 210 Z" fill="#12100F" opacity="0.45" />
                {/* Gấu áo viền may tinh tế */}
                <path d="M114 346 Q150 351 186 346" stroke="#3F3F46" strokeWidth="1.2" fill="none" />
                {/* 3. Cổ áo Giao Lĩnh vạt chéo chữ Y bản to (Hữu Nhậm: trái đè phải) */}
                {/* Vạt dưới (phải qua trái) */}
                <path d="M168 117 L174 118 L136 172 L132 166 Z" fill="#1F1D1C" stroke="#27272A" strokeWidth="1" />
                <line x1="170" y1="117" x2="134" y2="169" stroke="#38332F" strokeWidth="2.2" />
                {/* Vạt trên (Hữu Nhậm: trái đè sang sườn phải) */}
                <path d="M132 117 L126 118 L168 184 L174 178 Z" fill="#24201E" stroke="#27272A" strokeWidth="1" />
                <line x1="128" y1="117" x2="172" y2="182" stroke="#3F3F46" strokeWidth="3" strokeLinecap="round" />
                <line x1="126.5" y1="117.5" x2="170.5" y2="182.5" stroke="#52525B" strokeWidth="0.8" />
                <line x1="130" y1="116.5" x2="174" y2="181.5" stroke="#18181B" strokeWidth="0.8" />
                {/* Bóng đổ nhẹ dưới mép nẹp vạt chéo tạo khối 2D */}
                <path d="M130 120 L174 186 L174 190 L130 124 Z" fill="#0C0A09" opacity="0.35" />
              </g>
            ) : isAoDai ? (
              /* Áo Dài Cách Tân Gen Z - Đã xóa hoàn toàn hàng 5 khuy, cúc khảm và đường vạt chéo nổi. Thân trước phẳng, trơn nhẵn toàn bộ */
              <g id="layer-outer-nu-aodai">
                <ellipse cx="150" cy="112" rx="10" ry="5.5" fill={color.hex} stroke="#FDE68A" strokeWidth="1.5" />
                <path d="M134 118 L166 118 L175 330 L125 330 Z" fill={color.hex} stroke="#FFFFFF" strokeWidth="1.5" />
              </g>
            ) : isNguThan ? (
              /* Thân áo Ngũ Thân Nữ */
              <g id="layer-outer-nu-nguthan">
                <path d="M130 118 L170 118 L182 340 L118 340 Z" fill={color.hex} stroke="#FFFFFF" strokeWidth="1.5" />
                <rect x="141" y="105" width="18" height="12" rx="3" fill={color.hex} stroke="#FDE68A" strokeWidth="1.5" />
                <path d="M150 117 Q165 125 168 155 L168 220" stroke="#FDE68A" strokeWidth="2.5" fill="none" />
              </g>
            ) : (
              /* Áo Dài Cách Tân Mặc định */
              <g id="layer-outer-nu-aodai-default">
                <ellipse cx="150" cy="112" rx="10" ry="5.5" fill={color.hex} stroke="#FDE68A" strokeWidth="1.5" />
                <path d="M134 118 L166 118 L175 330 L125 330 Z" fill={color.hex} stroke="#FFFFFF" strokeWidth="1.5" />
              </g>
            )
          )}
        </svg>
      )}

      {/* ============================================================== */}
      {/* LAYER 50: SLEEVES (TAY ÁO NGOÀI) */}
      {/* ============================================================== */}
      {showOuter && hasOuter && (
        <svg
          viewBox="0 0 300 400"
          className="absolute inset-0 w-full h-full z-50 pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isBlazer ? (
            /* Tay áo Blazer hiện đại */
            <g id="layer-sleeves-blazer">
              <path d="M124 118 L86 195 L104 200 L130 148 Z" fill="#27272A" />
              <path d="M176 118 L214 195 L196 200 L170 148 Z" fill="#27272A" />
            </g>
          ) : isNam ? (
            isGiaoLinh ? (
              /* Tay áo thụng Giao Lĩnh Nam (khớp cổ tay nam 92 và 208) */
              <g id="layer-sleeves-nam-giaolinh">
                <path d="M120 118 L68 195 L96 208 L126 150 Z" fill={color.hex} />
                <path d="M180 118 L232 195 L204 208 L174 150 Z" fill={color.hex} />
              </g>
            ) : (
              /* Tay áo Ngũ Thân Nam (tay chẽn gọn gàng) */
              <g id="layer-sleeves-nam-nguthan">
                <path d="M122 118 L84 200 L100 205 L126 145 Z" fill={color.hex} />
                <path d="M178 118 L216 200 L200 205 L174 145 Z" fill={color.hex} />
              </g>
            )
          ) : (
            isNhatBinh ? (
              /* Tay áo thụng Nhật Bình có viền ngũ sắc thủy ba */
              <g id="layer-sleeves-nu-nhatbinh">
                <path d="M126 118 L68 202 L98 210 L130 148 Z" fill={color.hex} />
                <path d="M174 118 L232 202 L202 210 L170 148 Z" fill={color.hex} />
                {/* Viền ngũ sắc tay áo trái */}
                <path d="M72 198 L86 202 L96 186 L82 182 Z" fill="#0284C7" />
                <path d="M78 202 L90 206 L99 190 L88 186 Z" fill="#EF4444" />
                {/* Viền ngũ sắc tay áo phải */}
                <path d="M228 198 L214 202 L204 186 L218 182 Z" fill="#0284C7" />
                <path d="M222 202 L210 206 L201 190 L212 186 Z" fill="#EF4444" />
              </g>
            ) : isTuThan ? (
              /* Tay áo Tứ Thân Nữ */
              <g id="layer-sleeves-nu-tuthan">
                <path d="M126 118 L90 195 L106 202 L130 145 Z" fill={color.hex} opacity="0.95" />
                <path d="M174 118 L210 195 L194 202 L170 145 Z" fill={color.hex} opacity="0.95" />
              </g>
            ) : isGiaoLinh ? (
              /* Tay áo thụng Giao Lĩnh Nữ rộng và chùng nhẹ cổ kính */
              <g id="layer-sleeves-nu-giaolinh">
                {/* Tay áo trái */}
                <path
                  d="M122 118 Q96 142 88 198 L102 203 Q116 182 126 154 L124 134 Z"
                  fill="#18181B"
                  stroke="#27272A"
                  strokeWidth="1.2"
                />
                <path d="M92 195 Q108 175 120 156" stroke="#2D2825" strokeWidth="1.2" fill="none" />
                <path d="M96 200 Q112 182 124 162" stroke="#12100F" strokeWidth="1" fill="none" />
                <path d="M88 198 L102 203" stroke="#3F3F46" strokeWidth="1.8" strokeLinecap="round" />
                {/* Tay áo phải */}
                <path
                  d="M178 118 Q204 142 212 198 L198 203 Q184 182 174 154 L176 134 Z"
                  fill="#18181B"
                  stroke="#27272A"
                  strokeWidth="1.2"
                />
                <path d="M208 195 Q192 175 180 156" stroke="#2D2825" strokeWidth="1.2" fill="none" />
                <path d="M204 200 Q188 182 176 162" stroke="#12100F" strokeWidth="1" fill="none" />
                <path d="M212 198 L198 203" stroke="#3F3F46" strokeWidth="1.8" strokeLinecap="round" />
              </g>
            ) : isAoDai ? (
              /* Tay Áo Dài thanh thoát khớp hoàn hảo cổ tay */
              <g id="layer-sleeves-nu-aodai">
                <path d="M124 118 L88 196 L102 201 L132 145 Z" fill={color.hex} />
                <path d="M176 118 L212 196 L198 201 L168 145 Z" fill={color.hex} />
              </g>
            ) : isNguThan ? (
              /* Tay áo Ngũ Thân Nữ tay chẽn */
              <g id="layer-sleeves-nu-nguthan">
                <path d="M124 118 L88 198 L102 202 L130 148 Z" fill={color.hex} />
                <path d="M176 118 L212 198 L198 202 L170 148 Z" fill={color.hex} />
              </g>
            ) : (
              /* Tay Áo Dài thanh thoát */
              <g id="layer-sleeves-nu-aodai-default">
                <path d="M124 118 L88 196 L102 201 L132 145 Z" fill={color.hex} />
                <path d="M176 118 L212 196 L198 201 L168 145 Z" fill={color.hex} />
              </g>
            )
          )}
        </svg>
      )}

      {/* ============================================================== */}
      {/* LAYER 55: HANDS (BÀN TAY NỐI LIỀN TRỰC TIẾP VỚI CỔ TAY) */}
      {/* ============================================================== */}
      <svg
        viewBox="0 0 300 400"
        className="absolute inset-0 w-full h-full z-[55] pointer-events-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="layer-doll-hands">
          {/* Bàn tay trái gắn chặt liền mạch vào cổ tay */}
          <path d="M86 198 Q78 206 82 215 Q89 217 94 209 L94 198 Z" fill="#FED7AA" stroke="#FDBA74" strokeWidth="0.8" />
          {/* Bàn tay phải gắn chặt liền mạch vào cổ tay */}
          <path d="M214 198 Q222 206 218 215 Q211 217 206 209 L206 198 Z" fill="#FED7AA" stroke="#FDBA74" strokeWidth="0.8" />
        </g>
      </svg>

      {/* ============================================================== */}
      {/* LAYER 60-WAIST: BELT & FASTENERS (ĐAI LƯNG & KHUY CÚC) */}
      {/* ============================================================== */}
      {showAccessories && showWaistband && (
        <svg
          viewBox="0 0 300 400"
          className="absolute inset-0 w-full h-full z-[48] pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="layer-waist-acc">
            {isDaiThatLung ? (
              /* Dải thắt lưng lụa ngũ sắc buông dài */
              <g id="acc-belt-tuthan">
                <rect x="130" y="185" width="40" height="9" fill="#EAB308" rx="2" />
                <path d="M142 192 L136 290 L144 290 L148 192 Z" fill="#3B82F6" />
                <path d="M150 192 L154 305 L162 305 L156 192 Z" fill="#EF4444" />
                <circle cx="150" cy="189.5" r="4" fill="#F59E0B" />
              </g>
            ) : isGiaoLinh ? (
              isNam ? (
                /* Đai lưng thư sinh Nam */
                <g id="acc-belt-nam-giaolinh">
                  <rect x="126" y="186" width="48" height="12" fill="#78350F" rx="3" stroke="#FDE68A" strokeWidth="1.5" />
                  <circle cx="150" cy="192" r="4.5" fill="#FDE68A" stroke="#78350F" strokeWidth="1" />
                  <path d="M148 198 L144 255 L152 255 L154 198 Z" fill="#92400E" />
                </g>
              ) : (
                /* DẢI LỤA TRẮNG THẮT EO TO BẢN & 2 DẢI LỤA DÀI BUÔNG THÕNG QUA ĐẦU GỐI (CHUẨN ẢNH NGƯỜI THẬT) */
                <g id="acc-belt-nu-giaolinh">
                  {/* Bản lụa to quấn ngang bụng (to bản phẳng phiu y=182-198) */}
                  <path
                    d="M123 182 Q150 186 177 182 L178 198 Q150 202 122 198 Z"
                    fill="#F8FAFC"
                    stroke="#E2E8F0"
                    strokeWidth="1.2"
                  />
                  {/* Nếp gấp lụa ngang tự nhiên */}
                  <path d="M125 188 Q150 191 175 188" stroke="#CBD5E1" strokeWidth="1" fill="none" />
                  <path d="M126 193 Q150 196 174 193" stroke="#CBD5E1" strokeWidth="0.8" fill="none" strokeDasharray="8 2" />
                  {/* Bóng đổ mép dưới đai lụa */}
                  <path d="M122 198 Q150 202 178 198 L178 200.5 Q150 204.5 122 200.5 Z" fill="#0C0A09" opacity="0.2" />

                  {/* Nút thắt nơ lụa mềm mại chính giữa eo */}
                  <ellipse cx="150" cy="191" rx="5" ry="3.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
                  <ellipse cx="150" cy="191" rx="3" ry="2" fill="#F8FAFC" />
                  <path d="M147 189 Q150 192 153 189" stroke="#CBD5E1" strokeWidth="0.9" fill="none" />

                  {/* HAI DẢI LỤA DÀI BUÔNG THÕNG QUA ĐẦU GỐI (ĐẦU GỐI Y=285, DẢI LỤA RỦ XUỐNG TẬN Y=322 VÀ Y=326) */}
                  {/* Dải lụa trái buông rủ tha thướt qua đầu gối */}
                  <path
                    d="M147 193 Q144 235 142 270 Q140 295 143 322 L149 320 Q147 295 148 270 Q150 235 151 193 Z"
                    fill="#F8FAFC"
                    stroke="#E2E8F0"
                    strokeWidth="1"
                  />
                  <path d="M146 196 Q144 240 144 285 Q143 305 146 320" stroke="#CBD5E1" strokeWidth="0.8" fill="none" />
                  <line x1="143" y1="322" x2="149" y2="320" stroke="#CBD5E1" strokeWidth="1" />

                  {/* Dải lụa phải mềm mại bay nhẹ buông rủ dài hơn qua đầu gối */}
                  <path
                    d="M151 193 Q154 235 156 270 Q158 298 155 326 L149 324 Q152 298 150 270 Q148 235 147 193 Z"
                    fill="#FFFFFF"
                    stroke="#E2E8F0"
                    strokeWidth="1"
                  />
                  <path d="M150 196 Q153 240 153 285 Q154 308 152 325" stroke="#CBD5E1" strokeWidth="0.8" fill="none" />
                  <line x1="149" y1="324" x2="155" y2="326" stroke="#CBD5E1" strokeWidth="1" />

                  {/* Bóng đổ nhẹ giữa hai dải lụa */}
                  <path d="M149 200 L150 270 L148 270 Z" fill="#CBD5E1" opacity="0.6" />
                </g>
              )
            ) : isNguThan ? (
              /* 5 Cúc khuy Ngũ Luân */
              <g id="acc-buttons-nguthan">
                <circle cx="150" cy="120" r="2.2" fill="#FDE68A" stroke="#B45309" strokeWidth="1" />
                <circle cx="157" cy="130" r="2.2" fill="#FDE68A" stroke="#B45309" strokeWidth="1" />
                <circle cx="163" cy="144" r="2.2" fill="#FDE68A" stroke="#B45309" strokeWidth="1" />
                <circle cx="165" cy="162" r="2.2" fill="#FDE68A" stroke="#B45309" strokeWidth="1" />
                <circle cx="166" cy="182" r="2.2" fill="#FDE68A" stroke="#B45309" strokeWidth="1" />
              </g>
            ) : null}
          </g>
        </svg>
      )}

      {/* ============================================================== */}
      {/* LAYER 60-HANDHELD: TÚI XÁCH & PHỤ KIỆN CẦM TAY */}
      {/* ============================================================== */}
      {showAccessories && (isTuiTheu || isTuiKepNach || isQuatXep || isVongTay) && (
        <svg
          viewBox="0 0 300 400"
          className="absolute inset-0 w-full h-full z-[60] pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* VÒNG TAY VÀNG ÔM KHÍT CỔ TAY (ĐÃ FIX TỌA ĐỘ VÀ GÓC NGHIÊNG) */}
          {isVongTay && (
            <g id="acc-bracelets">
              {/* Vòng tay trái (cổ tay x=93.5, y=199) */}
              <g id="acc-bracelet-left" transform="rotate(-20 93.5 199)">
                <ellipse cx="93.5" cy="199" rx="5.6" ry="2.8" stroke="#B45309" strokeWidth="2.8" fill="none" />
                <ellipse cx="93.5" cy="199" rx="5.6" ry="2.8" stroke="#F59E0B" strokeWidth="2.0" fill="none" />
                <ellipse cx="93.2" cy="198.6" rx="5.2" ry="2.2" stroke="#FEF08A" strokeWidth="1.0" fill="none" />
                {/* Vòng đôi phụ phía trên tạo nét trang sức thanh lịch */}
                <ellipse cx="94.2" cy="196.2" rx="5.2" ry="2.4" stroke="#F59E0B" strokeWidth="1.5" fill="none" opacity="0.9" />
                <ellipse cx="94.0" cy="195.9" rx="4.8" ry="1.8" stroke="#FEF08A" strokeWidth="0.8" fill="none" opacity="0.9" />
              </g>

              {/* Vòng tay phải (cổ tay x=206.5, y=199) */}
              <g id="acc-bracelet-right" transform="rotate(20 206.5 199)">
                <ellipse cx="206.5" cy="199" rx="5.6" ry="2.8" stroke="#B45309" strokeWidth="2.8" fill="none" />
                <ellipse cx="206.5" cy="199" rx="5.6" ry="2.8" stroke="#F59E0B" strokeWidth="2.0" fill="none" />
                <ellipse cx="206.8" cy="198.6" rx="5.2" ry="2.2" stroke="#FEF08A" strokeWidth="1.0" fill="none" />
                {/* Vòng đôi phụ phía trên tạo nét trang sức thanh lịch */}
                <ellipse cx="205.8" cy="196.2" rx="5.2" ry="2.4" stroke="#F59E0B" strokeWidth="1.5" fill="none" opacity="0.9" />
                <ellipse cx="206.0" cy="195.9" rx="4.8" ry="1.8" stroke="#FEF08A" strokeWidth="0.8" fill="none" opacity="0.9" />
              </g>
            </g>
          )}

          {/* QUẠT XẾP CẦM TAY TRÁI */}
          {isQuatXep && (
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
          )}

          {/* TÚI THÊU TRUYỀN THỐNG CẦM TAY PHẢI */}
          {isTuiTheu && (
            <g id="acc-bag-right">
              <path d="M211 216 Q209 230 213 240" stroke="#D97706" strokeWidth="1.5" fill="none" />
              <path d="M204 242 Q213 236 222 242 L225 260 Q213 268 201 260 Z" fill="#BE123C" stroke="#FDE68A" strokeWidth="1.2" />
              <circle cx="213" cy="252" r="4.2" fill="#FDE68A" />
              <circle cx="213" cy="252" r="1.8" fill="#E11D48" />
              <circle cx="213" cy="266" r="1.5" fill="#F59E0B" />
              <line x1="213" y1="266" x2="213" y2="276" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}

          {/* TÚI KẸP NÁCH Y2K */}
          {isTuiKepNach && (
            <g id="acc-baguette">
              <path d="M120 135 Q110 160 118 190" stroke="#1E293B" strokeWidth="2.5" fill="none" />
              <rect x="108" y="180" width="22" height="15" rx="3.5" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.2" />
              <circle cx="119" cy="187" r="1.8" fill="#FDE68A" />
            </g>
          )}
        </svg>
      )}

      {/* ============================================================== */}
      {/* LAYER 62-SHOES: GIÀY DÉP / GUỐC MỘC TẠI CHÂN */}
      {/* ============================================================== */}
      {showAccessories && hasFootwear && (
        <svg
          viewBox="0 0 300 400"
          className="absolute inset-0 w-full h-full z-[62] pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isCaoGot ? (
            /* Giày cao gót */
            <g id="acc-shoes-highheels">
              <rect x="133" y="366" width="2.5" height="10" rx="0.8" fill="#18181B" />
              <path d="M132 364 Q137 366 141 364 L150 369 Q146 373 138 371 L132 367 Z" fill="#18181B" />
              <rect x="156" y="366" width="2.5" height="10" rx="0.8" fill="#18181B" />
              <path d="M155 364 Q160 366 164 364 L173 369 Q169 373 161 371 L155 367 Z" fill="#18181B" />
            </g>
          ) : isSneaker ? (
            /* Sneaker Chunky */
            <g id="acc-shoes-sneaker">
              <rect x="129" y="364" width="18" height="9" rx="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
              <rect x="153" y="364" width="18" height="9" rx="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
              <line x1="135" y1="367" x2="143" y2="367" stroke="#3B82F6" strokeWidth="1.5" />
              <line x1="159" y1="367" x2="167" y2="367" stroke="#3B82F6" strokeWidth="1.5" />
            </g>
          ) : isGuocMoc ? (
            /* Guốc mộc */
            <g id="acc-shoes-guoc">
              <path d="M131 364 L146 364 L145 371 L132 371 Z" fill="#78350F" />
              <rect x="135" y="362" width="6" height="3" fill="#1C1917" rx="1" />
              <path d="M155 364 L170 364 L169 371 L156 371 Z" fill="#78350F" />
              <rect x="159" y="362" width="6" height="3" fill="#1C1917" rx="1" />
            </g>
          ) : isGiayTay ? (
            /* Giày tây Oxford */
            <g id="acc-shoes-oxford">
              <path d="M128 365 Q135 361 146 364 L148 371 Q142 374 129 373 Z" fill="#09090B" stroke="#27272A" strokeWidth="1" />
              <path d="M152 365 Q161 361 170 364 L172 371 Q166 374 153 373 Z" fill="#09090B" stroke="#27272A" strokeWidth="1" />
              <rect x="129" y="371" width="5" height="3" fill="#000000" rx="0.5" />
              <rect x="153" y="371" width="5" height="3" fill="#000000" rx="0.5" />
              <line x1="135" y1="365" x2="142" y2="365" stroke="#71717A" strokeWidth="0.8" />
              <line x1="158" y1="365" x2="165" y2="365" stroke="#71717A" strokeWidth="0.8" />
            </g>
          ) : (
            /* Hài nhung đen */
            <g id="acc-shoes-default">
              <path d="M131 364 Q143 363 147 371 L129 371 Z" fill="#1C1917" stroke="#44403C" strokeWidth="1" />
              <path d="M154 364 Q166 363 170 371 L152 371 Z" fill="#1C1917" stroke="#44403C" strokeWidth="1" />
            </g>
          )}
        </svg>
      )}

      {/* ============================================================== */}
      {/* LAYER 70: HEADWEAR, HAIR & FACE ITEMS (KHĂN ĐẦU, NÓN, TRÂM) */}
      {/* ============================================================== */}
      {showAccessories && (
        <svg
          viewBox="0 0 300 400"
          className="absolute inset-0 w-full h-full z-70 pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients cho Khăn Mỏ Quạ Xanh Chàm */}
            <linearGradient id="khanIndigoFabricGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="25%" stopColor="#1E3A8A" />
              <stop offset="50%" stopColor="#2563EB" />
              <stop offset="75%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="khanIndigoTrimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#93C5FD" />
              <stop offset="50%" stopColor="#DBEAFE" />
              <stop offset="100%" stopColor="#93C5FD" />
            </linearGradient>

            {/* Gradients cho Khăn Mỏ Quạ Gấm Vàng */}
            <linearGradient id="khanGoldBrocadeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B45309" />
              <stop offset="20%" stopColor="#D97706" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="80%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
            <linearGradient id="khanGoldBrocadeSheen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FDE047" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#B45309" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="khanAmberFoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#78350F" />
              <stop offset="50%" stopColor="#92400E" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>
          </defs>

          {/* KHĂN VẤN NHUNG ĐEN (NỮ) */}
          {isKhanVan && (
            <g id="acc-hat-khanvan">
              <ellipse cx="150" cy="58" rx="27" ry="10" fill="#1C1917" stroke="#44403C" strokeWidth="2" />
              <path d="M144 54 L150 60 L156 54" stroke="#A8A29E" strokeWidth="1.5" />
            </g>
          )}

          {/* KHĂN ĐÓNG ĐEN (NAM) */}
          {isKhanDong && (
            <g id="acc-hat-khandong">
              <ellipse cx="150" cy="58" rx="27" ry="11" fill="#18181B" stroke="#3F3F46" strokeWidth="2" />
              <path d="M138 54 L150 61 L162 54" stroke="#A1A1AA" strokeWidth="1.8" />
              <path d="M142 50 L150 56 L158 50" stroke="#71717A" strokeWidth="1.5" />
            </g>
          )}

          {/* KHĂN MỎ QUẠ (NỮ) - 2 LAYER RIÊNG BIỆT: XANH CHÀM / GẤM VÀNG (LỘ TRỌN MẮT & MẶT) */}
          {isKhanMoQua && !isNam && (
            isKhanMoQuaGamVang ? (
              /* LAYER 2: KHĂN MỎ QUẠ GẤM VÀNG (GOLDEN YELLOW BROCADE) */
              <g id="acc-hat-khanmoqua-gamvang">
                {/* Vòm khăn gấm vàng rực phủ đỉnh đầu và hai bên thái dương */}
                <path
                  d="M121 64
                     C116 48, 126 36, 150 36
                     C174 36, 184 48, 179 64
                     C168 57, 158 62, 150 64
                     C142 62, 132 57, 121 64 Z"
                  fill="url(#khanGoldBrocadeGrad)"
                  stroke="#B45309"
                  strokeWidth="1.2"
                />
                {/* Ánh bóng óng ả của chất liệu gấm phía đỉnh đầu */}
                <path
                  d="M127 54 C135 42, 165 42, 173 54 C163 48, 137 48, 127 54 Z"
                  fill="url(#khanGoldBrocadeSheen)"
                />
                {/* Họa tiết mây gấm chìm điểm xuyết sang trọng */}
                <ellipse cx="140" cy="46" rx="4" ry="1.8" fill="#FDE047" opacity="0.6" />
                <ellipse cx="160" cy="46" rx="4" ry="1.8" fill="#FDE047" opacity="0.6" />
                <circle cx="150" cy="43" r="1.5" fill="#FEF08A" opacity="0.8" />
                {/* Nếp gấp tam giác tối màu tạo chiều sâu mỏ quạ ở chính giữa trán (Y=64) */}
                <path d="M150 64 L145 53 L150 42 L155 53 Z" fill="#78350F" opacity="0.8" />
                {/* Sống gập nếp thêu chỉ vàng lấp lánh */}
                <line x1="150" y1="64" x2="150" y2="40" stroke="#78350F" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="150" y1="64" x2="150" y2="40" stroke="#FEF08A" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="150" y1="64" x2="150" y2="48" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" />
                {/* Viền nẹp tối màu tạo khối sắc nét chạy sang hai bên thái dương */}
                <path
                  d="M150 64 L132 57 L120 65"
                  stroke="url(#khanAmberFoldGrad)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M150 64 L168 57 L180 65"
                  stroke="url(#khanAmberFoldGrad)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Chỉ vàng thêu hoa văn chạy viền song song */}
                <path d="M149 62.5 L133 56 L121.5 63.5" stroke="#FEF08A" strokeWidth="0.9" fill="none" />
                <path d="M151 62.5 L167 56 L178.5 63.5" stroke="#FEF08A" strokeWidth="0.9" fill="none" />
                {/* Dải khăn gấm ôm vòng ra sau mang tai */}
                <path d="M121 64 Q116 75 119 86 L123 84 Q120 74 123 66 Z" fill="#D97706" stroke="#92400E" strokeWidth="0.8" />
                <path d="M179 64 Q184 75 181 86 L177 84 Q180 74 177 66 Z" fill="#D97706" stroke="#92400E" strokeWidth="0.8" />
              </g>
            ) : (
              /* LAYER 1: KHĂN MỎ QUẠ XANH CHÀM (INDIGO BLUE) */
              <g id="acc-hat-khanmoqua-xanhcham">
                {/* Vòm khăn trùm đầu màu xanh chàm đậm */}
                <path
                  d="M121 64
                     C116 48, 126 36, 150 36
                     C174 36, 184 48, 179 64
                     C168 57, 158 62, 150 64
                     C142 62, 132 57, 121 64 Z"
                  fill="url(#khanIndigoFabricGrad)"
                  stroke="#1D4ED8"
                  strokeWidth="1.2"
                />
                {/* Nếp bóng vải dệt mộc mạc phía trên vòm đầu */}
                <path
                  d="M126 56 C134 44, 166 44, 174 56 C164 50, 136 50, 126 56 Z"
                  fill="#3B82F6"
                  opacity="0.35"
                />
                {/* Nếp gập tam giác mỏ quạ đặc trưng ở chính giữa trán (Y=64) */}
                <path d="M150 64 L145 53 L150 42 L155 53 Z" fill="#172554" opacity="0.85" />
                {/* Sống gập nếp chính giữa có dải sáng điểm nhấn */}
                <line x1="150" y1="64" x2="150" y2="40" stroke="#93C5FD" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="150" y1="64" x2="150" y2="48" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" />
                {/* Dải viền nẹp sáng màu uốn lượn sang hai bên thái dương làm điểm nhấn */}
                <path
                  d="M150 64 L132 57 L120 65"
                  stroke="url(#khanIndigoTrimGrad)"
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M150 64 L168 57 L180 65"
                  stroke="url(#khanIndigoTrimGrad)"
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Đường chỉ viền tinh xảo chạy song song */}
                <path d="M148 62 L133 56 L122 63" stroke="#60A5FA" strokeWidth="0.8" fill="none" opacity="0.8" />
                <path d="M152 62 L167 56 L178 63" stroke="#60A5FA" strokeWidth="0.8" fill="none" opacity="0.8" />
                {/* Dải khăn xanh chàm ôm vòng ra sau mang tai */}
                <path d="M121 64 Q116 75 119 86 L123 84 Q120 74 123 66 Z" fill="#1E3A8A" stroke="#1D4ED8" strokeWidth="0.8" />
                <path d="M179 64 Q184 75 181 86 L177 84 Q180 74 177 66 Z" fill="#1E3A8A" stroke="#1D4ED8" strokeWidth="0.8" />
              </g>
            )
          )}

          {/* NÓN QUAI THAO (NỮ) */}
          {isNonQuaiThao && !isNam && (
            <g id="acc-hat-nonquaithao">
              <ellipse cx="150" cy="48" rx="46" ry="17" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
              <ellipse cx="150" cy="48" rx="22" ry="8" fill="#FDE047" stroke="#A16207" strokeWidth="1" />
              <path d="M110 52 Q106 115 114 155" stroke="#EF4444" strokeWidth="3" fill="none" />
              <path d="M190 52 Q194 115 186 155" stroke="#10B981" strokeWidth="3" fill="none" />
            </g>
          )}

          {/* TRÂM CÀI TÓC VÀNG NGỌC */}
          {isTramCai && !isNam && (
            <g id="acc-hairpin">
              <line x1="162" y1="52" x2="178" y2="42" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
              <circle cx="178" cy="42" r="3.8" fill="#E11D48" stroke="#FDE68A" strokeWidth="1" />
              <circle cx="178" cy="42" r="1.4" fill="#FEF08A" />
            </g>
          )}

          {/* HOA TAI / KHUYÊN TAI NGỌC BÍCH */}
          {isHoaTai && !isNam && (
            <g id="acc-earrings">
              <circle cx="174" cy="85" r="1.4" fill="#F59E0B" />
              <ellipse cx="174" cy="89" rx="1.6" ry="2.8" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="0.8" />
              <circle cx="126" cy="85" r="1.4" fill="#F59E0B" />
              <ellipse cx="126" cy="89" rx="1.6" ry="2.8" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="0.8" />
            </g>
          )}

          {/* KIỀNG BẠC / VÒNG CỔ HOÀNG GIA */}
          {isVongCo && !isNam && (
            <g id="acc-necklace">
              <ellipse cx="150" cy="115" rx="14" ry="6" fill="none" stroke="#E2E8F0" strokeWidth="2.5" />
              <ellipse cx="150" cy="115" rx="14" ry="6" fill="none" stroke="#FDE68A" strokeWidth="1" />
              <circle cx="150" cy="121" r="2.3" fill="#DC2626" stroke="#FDE68A" strokeWidth="0.8" />
            </g>
          )}

          {/* KÍNH RÂM HIỆN ĐẠI */}
          {isKinhRam && (
            <g id="acc-sunglasses">
              <rect x="135" y="74" width="12" height="7" rx="2" fill="#09090B" />
              <rect x="153" y="74" width="12" height="7" rx="2" fill="#09090B" />
              <line x1="147" y1="77" x2="153" y2="77" stroke="#09090B" strokeWidth="2" />
            </g>
          )}

          {/* TAI NGHE OVER-EAR - ĐÃ FIX XOAY 180 ĐỘ, HEADBAND VÒNG LÊN ĐẦU, EARCUPS ÁP VÀO 2 TAI */}
          {isTaiNghe && (
            <g id="acc-headphones">
              {/* Vòng cung headband cong vòng lên trên đỉnh đầu (ôm sát đỉnh đầu tại y=38-42) */}
              <path
                d="M123 76 C123 38, 177 38, 177 76"
                stroke="#1E293B"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Lớp viền công nghệ màu xanh cobalt */}
              <path
                d="M124.5 75 C124.5 41, 175.5 41, 175.5 75"
                stroke="#2563EB"
                strokeWidth="2.4"
                strokeLinecap="round"
                fill="none"
              />
              {/* Đệm cao su mềm trên đỉnh đầu */}
              <path
                d="M136 43 Q150 41 164 43"
                stroke="#0F172A"
                strokeWidth="3.2"
                strokeLinecap="round"
                fill="none"
              />
              {/* Khớp nối trượt kim loại (metal slider) hai bên */}
              <rect x="120" y="68" width="5.5" height="7" rx="1.5" fill="#94A3B8" stroke="#64748B" strokeWidth="0.8" />
              <rect x="174.5" y="68" width="5.5" height="7" rx="1.5" fill="#94A3B8" stroke="#64748B" strokeWidth="0.8" />

              {/* Miếng ốp tai trái (Earcup) áp vừa khít vào tai trái búp bê x=123, y=82 */}
              <g id="acc-earcup-left">
                {/* Đệm tai mút xốp êm ái */}
                <rect x="119" y="73" width="7" height="18" rx="3.5" fill="#0F172A" stroke="#334155" strokeWidth="0.8" />
                {/* Vỏ ngoài tai nghe màu xanh công nghệ */}
                <rect x="115.5" y="74.5" width="5.5" height="15" rx="2.5" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1" />
                {/* Đĩa kim loại trang trí */}
                <ellipse cx="118" cy="82" rx="1.8" ry="3.5" fill="#60A5FA" />
              </g>

              {/* Miếng ốp tai phải (Earcup) áp vừa khít vào tai phải búp bê x=177, y=82 */}
              <g id="acc-earcup-right">
                {/* Đệm tai mút xốp êm ái */}
                <rect x="174" y="73" width="7" height="18" rx="3.5" fill="#0F172A" stroke="#334155" strokeWidth="0.8" />
                {/* Vỏ ngoài tai nghe màu xanh công nghệ */}
                <rect x="179" y="74.5" width="5.5" height="15" rx="2.5" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1" />
                {/* Đĩa kim loại trang trí */}
                <ellipse cx="182" cy="82" rx="1.8" ry="3.5" fill="#60A5FA" />
              </g>
            </g>
          )}
        </svg>
      )}
    </div>
  );
};
