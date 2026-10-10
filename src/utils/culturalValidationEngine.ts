/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CurrentOutfitState, WardrobeItem } from "../data/wardrobe";
import { Outfit } from "../data/outfits";
import { ClothesItem, clothesData } from "../data/clothesData";

export type EvaluationTier = "danger" | "warning" | "success";

export interface ValidationResult {
  score: number; // Thang điểm 10: Chỉ trả về 3 mức cố định (2-3, 6-7, 8-10)
  tier: EvaluationTier;
  tierLabel: string;
  seal: string; // Con dấu Lookbook
  sealColor: "red" | "amber" | "emerald";
  caseType: 0 | 1 | 2 | 3;
  feedback: string; // Lời nhận xét chi tiết từ Cốm
  isApproved: boolean; // true nếu >= 8.0
  warnings: string[];
}

/**
 * Helper to normalize item whether it's a WardrobeItem, ClothesItem, or ID string
 */
function normalizeItem(raw: WardrobeItem | ClothesItem | string | null | undefined): {
  id: string;
  name: string;
  category?: string;
  style?: string;
  origin?: string;
  isTraditional: boolean;
} | null {
  if (!raw) return null;

  if (typeof raw === "string") {
    const found = clothesData.find((c) => c.id === raw);
    if (found) {
      return {
        id: found.id,
        name: found.name,
        category: found.category,
        style: found.style,
        origin: found.style === "Truyền thống" ? "traditional" : "modern",
        isTraditional: found.style === "Truyền thống"
      };
    }
    return {
      id: raw,
      name: raw,
      isTraditional:
        raw.includes("ngu_than") ||
        raw.includes("nhat_binh") ||
        raw.includes("giao_linh") ||
        raw.includes("ao_dai") ||
        raw.includes("tu_than") ||
        raw.includes("yem")
    };
  }

  const id = (raw as any).id || "";
  const name = (raw as any).name || "";
  const category = (raw as any).category || (raw as any).layer;
  const style = (raw as any).style;
  const origin = (raw as any).origin;
  const isTraditional =
    style === "Truyền thống" ||
    origin === "traditional" ||
    id.includes("ngu_than") ||
    id.includes("nhat_binh") ||
    id.includes("giao_linh") ||
    id.includes("tu_than") ||
    id.includes("ao_dai") ||
    id.includes("yem");

  return { id, name, category, style, origin, isTraditional };
}

/**
 * CHUẨN HÓA HỆ THỐNG CHẤM ĐIỂM VÀ CẢNH BÁO VĂN HÓA (3 TIERS CỐ ĐỊNH):
 *
 * - Mức 2 - 3 điểm (Sai trầm trọng): Phối râu ông nọ cắm cằm bà kia quá lố (VD: Áo Tứ Thân + Jeans + Sneaker)
 *   hoặc mặc sai thuần phong mỹ tục nơi tôn nghiêm. Cảnh báo Đỏ (Red) + icon Alert, chỉ rõ điểm sai lệch.
 *
 * - Mức 6 - 7 điểm (Tạm chấp nhận nhưng sai dịp): Mặc bộ đồ khá ổn nhưng không phù hợp không gian/sự kiện
 *   (VD: Gen Z phá cách đi Lễ Chùa, hoặc Áo Nhật Bình cung đình đi dạo phố). Cảnh báo Vàng/Cam (Warning), nhắc nhở bối cảnh.
 *
 * - Mức 8 - 10 điểm (Chuẩn nếp / Slay): Phối đúng bộ, đúng quy tắc hoặc biến tấu hiện đại phù hợp bối cảnh.
 *   Hiển thị màu Xanh lá (Success) + icon Tán thưởng.
 */
export function evaluateOutfit(
  currentOutfit?: CurrentOutfitState | null,
  occasion: string = "Đi học/Kỷ yếu",
  fallbackOutfit?: Outfit | null
): ValidationResult {
  // 1. Thu thập danh sách món đồ đang trang bị
  const rawItems = currentOutfit
    ? [
        currentOutfit.outer,
        currentOutfit.inner,
        currentOutfit.bottom,
        currentOutfit.footwear,
        currentOutfit.accessory,
        currentOutfit.headwear
      ].filter(Boolean) as (WardrobeItem | ClothesItem)[]
    : [];

  // Trường hợp búp bê trống trơn (chỉ mặc đồ lót cơ bản)
  if (rawItems.length === 0) {
    if (fallbackOutfit && (!currentOutfit || Object.values(currentOutfit).every((v) => v === null))) {
      // Nếu không mặc gì trên búp bê: Luôn cảnh báo mức 2-3 điểm vì chưa mặc trang phục
      return {
        score: 2.0,
        tier: "danger",
        tierLabel: "Mức 2 - 3 điểm (Sai trầm trọng)",
        seal: "CHƯA ĐẠT NẾP • THIẾU Y PHỤC",
        sealColor: "red",
        caseType: 0,
        isApproved: false,
        warnings: ["Búp bê chưa mặc trang phục cơ bản (chỉ có đồ lót gốc)"],
        feedback:
          "Ối kìa cậu ơi! Búp bê hiện chưa được diện trang phục cơ bản kìa. Mau ghé Tủ Đồ khoác thêm áo và mặc quần/váy chỉn chu rồi Cốm chấm điểm nhé!"
      };
    }
  }

  const normalized = (rawItems || [])
    .map(normalizeItem)
    .filter(Boolean) as Array<{
      id: string;
      name: string;
      category?: string;
      style?: string;
      origin?: string;
      isTraditional: boolean;
    }>;

  const matchesAny = (items: typeof normalized, ...keywords: string[]) => {
    return items.some((item) => {
      const s = (item.id + " " + item.name + " " + (item.category || "")).toLowerCase();
      return keywords.some((kw) => s.includes(kw.toLowerCase()));
    });
  };

  // Phân loại vị trí trang phục
  const uppers = normalized.filter((i) =>
    i.category === "Áo Ngoài" ||
    i.category === "Lớp Trong" ||
    i.category === "outer" ||
    i.category === "inner" ||
    matchesAny([i], "ao_", "áo", "croptop", "yem", "blazer", "so_mi", "sơ mi")
  );

  const lowers = normalized.filter((i) =>
    i.category === "Quần & Váy" ||
    i.category === "bottom" ||
    matchesAny([i], "quan_", "quần", "vay_", "váy", "skirt")
  );

  const shoes = normalized.filter((i) =>
    i.category === "Giày Dép" ||
    i.category === "footwear" ||
    matchesAny([i], "giay", "giày", "guoc", "guốc", "hai", "sneaker", "oxford", "cao_got")
  );

  // =========================================================================
  // BƯỚC 1: KIỂM TRA THIẾU MẢNH GHÉP CƠ BẢN -> MỨC 2 - 3 ĐIỂM
  // =========================================================================
  if (uppers.length === 0 || lowers.length === 0) {
    const missing = uppers.length === 0 && lowers.length === 0
      ? "trang phục thân trên và thân dưới"
      : uppers.length === 0
      ? "áo thân trên"
      : "quần hoặc váy thân dưới";

    return {
      score: 2.0,
      tier: "danger",
      tierLabel: "Mức 2 - 3 điểm (Sai trầm trọng)",
      seal: "CHƯA ĐẠT NẾP • THIẾU Y PHỤC",
      sealColor: "red",
      caseType: 0,
      isApproved: false,
      warnings: [`Thiếu ${missing}`],
      feedback: `Chưa hoàn chỉnh trang phục: Búp bê đang thiếu ${missing}. Để chuẩn nếp văn hóa, cậu cần diện đủ cả áo lẫn quần/váy kín đáo trước khi chấm điểm nhé!`
    };
  }

  // Nhận diện loại trang phục
  const isTuThan = matchesAny(uppers, "tu_than", "tuchan", "tứ thân");
  const isNhatBinh = matchesAny(uppers, "nhat_binh", "nhatbinh", "nhật bình");
  const isGiaoLinh = matchesAny(uppers, "giao_linh", "giaulinh", "giao lĩnh");
  const isNguThan = matchesAny(uppers, "ngu_than", "nguthan", "ngũ thân");
  const isAoDai = matchesAny(uppers, "ao_dai", "aodai", "áo dài");
  const isYem = matchesAny(uppers, "yem", "yếm");
  const hasTraditionalTop = isTuThan || isNhatBinh || isGiaoLinh || isNguThan || isAoDai || isYem;

  // Nhận diện item hiện đại
  const hasJeans = matchesAny(lowers, "jean", "bò");
  const hasCroptop = matchesAny(uppers, "croptop", "hở eo", "crop");
  const hasShortsOrMiniSkirt = matchesAny(lowers, "short", "tennis", "xep_ly", "xếp ly", "ngan", "ngắn");
  const hasSneaker = matchesAny(shoes, "sneaker", "thể thao");
  const hasBlazer = matchesAny(uppers, "blazer", "vest");
  const hasSunglasses = matchesAny(normalized, "kinh", "kính");
  const hasHeadphones = matchesAny(normalized, "tai_nghe", "tai nghe");
  const hasCargo = matchesAny(lowers, "cargo", "túi hộp");

  const hasModernItems =
    hasJeans ||
    hasCroptop ||
    hasShortsOrMiniSkirt ||
    hasSneaker ||
    hasBlazer ||
    hasSunglasses ||
    hasHeadphones ||
    hasCargo ||
    normalized.some((i) => i.origin === "modern");

  // Bối cảnh sự kiện
  const occLower = (occasion || "").toLowerCase();
  const isTemple = occLower.includes("chùa") || occLower.includes("di tích");
  const isWedding = occLower.includes("cưới") || occLower.includes("ăn hỏi");
  const isSolemn = isTemple || isWedding;
  const isCasualStreet = occLower.includes("dạo phố") || occLower.includes("du lịch");
  const isSchool = occLower.includes("học") || occLower.includes("kỷ yếu");
  const isStage = occLower.includes("sân khấu") || occLower.includes("dạ hội");

  // =========================================================================
  // MỨC 2 - 3 ĐIỂM (SAI TRẦM TRỌNG):
  // Phối râu ông nọ cắm cằm bà kia quá lố hoặc mặc sai thuần phong mỹ tục nơi tôn nghiêm
  // =========================================================================

  // 1. Áo Tứ Thân + Quần Jeans (+ Sneaker)
  if (isTuThan && (hasJeans || hasSneaker)) {
    const errorPart = hasJeans && hasSneaker
      ? "Quần Jeans và Giày Sneaker"
      : hasJeans
      ? "Quần Jeans"
      : "Giày Sneaker";

    return {
      score: 2.5,
      tier: "danger",
      tierLabel: "Mức 2 - 3 điểm (Sai trầm trọng)",
      seal: "CHƯA ĐẠT NẾP • SAI LỆCH",
      sealColor: "red",
      caseType: 1,
      isApproved: false,
      warnings: [
        `Phối râu ông nọ cắm cằm bà kia: Áo Tứ Thân kết hợp ${errorPart}`
      ],
      feedback: `Sai lệch trầm trọng: Áo Tứ Thân Kinh Bắc mà đem phối với ${errorPart} là 'râu ông nọ cắm cằm bà kia' quá lố rồi cậu ơi! Áo Tứ Thân mang vẻ mộc mạc dân gian, bắt buộc phải đi cùng Váy đụp lụa đen và Guốc mộc để giữ độ buông rủ thanh tao!`
    };
  }

  // 1b. Áo Giao Lĩnh + Quần Jeans / Sneaker
  if (isGiaoLinh && (hasJeans || hasSneaker)) {
    const errorPart = hasJeans && hasSneaker
      ? "Quần Jeans và Giày Sneaker"
      : hasJeans
      ? "Quần Jeans"
      : "Giày Sneaker";

    return {
      score: 2.5,
      tier: "danger",
      tierLabel: "Mức 2 - 3 điểm (Sai trầm trọng)",
      seal: "CHƯA ĐẠT NẾP • SAI LỆCH",
      sealColor: "red",
      caseType: 1,
      isApproved: false,
      warnings: [
        `Phối râu ông nọ cắm cằm bà kia: Áo Giao Lĩnh cổ chéo kết hợp ${errorPart}`
      ],
      feedback: `Sai lệch trầm trọng: Áo Giao Lĩnh thời Lý - Trần - Lê là cổ phục trang trọng, uy nghi, tuyệt đối không thể phối cùng ${errorPart}! Hãy chọn quần lụa trắng hoặc váy dài chấm gót cùng guốc mộc để giữ trọn nếp phong nhã cổ nhân.`
    };
  }

  // 1c. Áo Ngũ Thân + Quần Jeans
  if (isNguThan && hasJeans) {
    return {
      score: 2.5,
      tier: "danger",
      tierLabel: "Mức 2 - 3 điểm (Sai trầm trọng)",
      seal: "CHƯA ĐẠT NẾP • SAI LỆCH",
      sealColor: "red",
      caseType: 1,
      isApproved: false,
      warnings: ["Áo Ngũ Thân lập lĩnh phối cùng Quần Jeans thô cứng"],
      feedback:
        "Sai lệch quy chuẩn: Áo Ngũ Thân mang phom dáng lập lĩnh nghiêm cẩn triều Nguyễn, tà áo xẻ tà cần độ rủ mềm mại của Quần lụa trắng hoặc Quần ống sớ. Quần Jeans quá thô cứng phá vỡ hoàn toàn nếp thanh lịch nho nhã xưa!"
    };
  }

  // 2. Áo Nhật Bình (Triều phục cung đình) bị phối cẩu thả (Quần Jeans / Váy ngắn / Croptop / Sneaker)
  if (isNhatBinh && (hasJeans || hasShortsOrMiniSkirt || hasCroptop || hasSneaker)) {
    const errorItems = [
      hasJeans && "Quần Jeans",
      hasShortsOrMiniSkirt && "Chân váy ngắn",
      hasCroptop && "Áo Croptop",
      hasSneaker && "Giày Sneaker"
    ].filter(Boolean).join(", ");

    return {
      score: 2.5,
      tier: "danger",
      tierLabel: "Mức 2 - 3 điểm (Sai trầm trọng)",
      seal: "CHƯA ĐẠT NẾP • SAI LỆCH",
      sealColor: "red",
      caseType: 2,
      isApproved: false,
      warnings: [`Triều phục cung đình Nhật Bình bị phối cẩu thả cùng ${errorItems}`],
      feedback: `Sai lệch trầm trọng: Áo Nhật Bình là phẩm phục cung đình triều Nguyễn uy nghi quyền quý của hoàng hậu, công chúa. Tuyệt đối không thể phối cẩu thả cùng ${errorItems}! Hãy chọn quần lụa trắng dài chạm gót và hài thêu cung đình để giữ trọn sự tôn nghiêm hoàng gia.`
    };
  }

  // 3. Cổ phục truyền thống kết hợp Áo Croptop hở eo
  if (hasTraditionalTop && hasCroptop) {
    return {
      score: 2.5,
      tier: "danger",
      tierLabel: "Mức 2 - 3 điểm (Sai trầm trọng)",
      seal: "CHƯA ĐẠT NẾP • PHẢN CẢM",
      sealColor: "red",
      caseType: 1,
      isApproved: false,
      warnings: ["Cổ phục truyền thống kết hợp áo croptop hở eo làm mất nếp kín đáo"],
      feedback:
        "Sai thuần phong mỹ tục: Cổ phục Việt Nam đề cao vẻ đẹp kín đáo, nề nếp gia giáo. Việc để lộ eo với áo croptop làm phá vỡ hoàn toàn cấu trúc trang nghiêm của nếp áo truyền thống, điểm số tụt áp ngay!"
    };
  }

  // 4. Cổ phục truyền thống kết hợp chân váy ngắn / quần cộc
  if (hasTraditionalTop && hasShortsOrMiniSkirt) {
    return {
      score: 2.5,
      tier: "danger",
      tierLabel: "Mức 2 - 3 điểm (Sai trầm trọng)",
      seal: "CHƯA ĐẠT NẾP • SAI LỆCH",
      sealColor: "red",
      caseType: 1,
      isApproved: false,
      warnings: ["Áo cổ phục kết hợp chân váy ngắn/quần cộc làm mất phom dáng nếp xưa"],
      feedback:
        "Sai lệch quy chuẩn: Áo cổ phục không thể đi cùng chân váy ngắn hay quần cộc. Tà áo truyền thống cần độ buông rủ kín đáo của chân váy đụp dài hoặc quần lụa ống rộng chấm gót."
    };
  }

  // 5. Vi phạm thuần phong mỹ tục nơi tôn nghiêm (Đi chùa / Đi di tích)
  if (isTemple && (hasCroptop || hasShortsOrMiniSkirt || (!currentOutfit?.outer && isYem))) {
    return {
      score: 2.0,
      tier: "danger",
      tierLabel: "Mức 2 - 3 điểm (Sai trầm trọng)",
      seal: "CHƯA ĐẠT NẾP • SAI NƠI TÔN NGHIÊM",
      sealColor: "red",
      caseType: 1,
      isApproved: false,
      warnings: ["Trang phục hở hang, thiếu kín đáo tại chốn tôn nghiêm tâm linh"],
      feedback:
        "Vi phạm thuần phong mỹ tục nơi tôn nghiêm: Đi chùa chiền, đền miếu linh thiêng đòi hỏi trang phục kín cổng cao tường. Tuyệt đối không mặc đồ hở hang hay chỉ diện áo yếm trần thiếu áo khoác ngoài nơi cửa Phật!"
    };
  }

  // =========================================================================
  // MỨC 6 - 7 ĐIỂM (TẠM CHẤP NHẬN NHƯNG SAI DỊP):
  // Trang phục khá ổn nhưng không phù hợp không gian/sự kiện đã chọn
  // =========================================================================

  // 1. Mang phong cách Gen Z phá cách đi Chốn Tôn Nghiêm hoặc Hôn Lễ truyền thống
  if (isSolemn && (hasSneaker || hasBlazer || hasSunglasses || hasHeadphones || hasCargo)) {
    const modernItemNames = [
      hasSneaker && "giày sneaker",
      hasSunglasses && "kính râm",
      hasHeadphones && "tai nghe",
      hasBlazer && "áo blazer",
      hasCargo && "quần túi hộp"
    ].filter(Boolean).join(", ");

    return {
      score: 6.5,
      tier: "warning",
      tierLabel: "Mức 6 - 7 điểm (Tạm chấp nhận nhưng sai dịp)",
      seal: "LƯU Ý DỊP MẶC • CHƯA HỢP CẢNH",
      sealColor: "amber",
      caseType: 2,
      isApproved: false,
      warnings: [`Phong cách Gen Z phá cách (${modernItemNames}) chưa phù hợp với dịp ${occasion}`],
      feedback: `Tạm chấp nhận nhưng sai dịp: Bản phối Gen Z phá cách rất năng động, thời thượng. Tuy nhiên, mang ${modernItemNames} vào ${
        isTemple ? "chốn tôn nghiêm tâm linh (chùa, đền miếu)" : "hôn lễ truyền thống trang nghiêm"
      } là chưa đúng bối cảnh văn hóa. Cốm khuyên cậu đổi sang guốc mộc/hài thêu và tháo phụ kiện để giữ trọn sự cung kính nhé!`
    };
  }

  // 2. Mặc Áo Nhật Bình đại triều cung đình đi Dạo phố / Du lịch / Đi học
  if (isNhatBinh && (isCasualStreet || isSchool)) {
    return {
      score: 6.5,
      tier: "warning",
      tierLabel: "Mức 6 - 7 điểm (Tạm chấp nhận nhưng sai dịp)",
      seal: "LƯU Ý DỊP MẶC • CHƯA HỢP CẢNH",
      sealColor: "amber",
      caseType: 2,
      isApproved: false,
      warnings: [`Áo Nhật Bình đại triều cung đình quá trang trọng, nặng nề cho dịp ${occasion}`],
      feedback: `Tạm chấp nhận nhưng sai bối cảnh: Áo Nhật Bình là phẩm phục đại triều cung đình lộng lẫy và uy nghi nhất của hoàng gia, chỉ phù hợp cho lễ cưới hỏi trọng đại hoặc sân khấu nghệ thuật. Diện đi ${occasion} sẽ bị nặng nề và quá khoa trương. Cậu thử đổi sang Áo Ngũ Thân tay chẽn hoặc Áo Dài cách tân xem sao nghen!`
    };
  }

  // 3. Mặc Áo Tứ Thân mộc mạc dân gian đi Sân khấu / Dạ hội mà thiếu phụ kiện trang trọng
  if (isStage && isTuThan && !hasModernItems) {
    return {
      score: 7.0,
      tier: "warning",
      tierLabel: "Mức 6 - 7 điểm (Tạm chấp nhận nhưng sai dịp)",
      seal: "LƯU Ý DỊP MẶC • CẦN ĐIỀU CHỈNH",
      sealColor: "amber",
      caseType: 2,
      isApproved: false,
      warnings: ["Áo Tứ Thân mộc mạc dân gian cần thêm điểm nhấn rực rỡ cho sân khấu dạ hội"],
      feedback:
        "Tạm chấp nhận nhưng chưa thật ăn nhập: Áo Tứ Thân mang nét mộc mạc thôn dã Bắc Bộ, khi diện đi Sân khấu/Dạ hội cần kết hợp dải yếm lụa ngũ sắc rực rỡ và nón quai thao thắt quai cầu kỳ để tỏa sáng hơn dưới ánh đèn sân khấu!"
    };
  }

  // 4. Mặc 100% đồ hiện đại (chưa có nét cổ phục truyền thống nào)
  if (!hasTraditionalTop && !normalized.some((i) => i.isTraditional)) {
    return {
      score: 6.0,
      tier: "warning",
      tierLabel: "Mức 6 - 7 điểm (Tạm chấp nhận nhưng sai dịp)",
      seal: "LƯU Ý DỊP MẶC • THIẾU CỔ PHỤC",
      sealColor: "amber",
      caseType: 2,
      isApproved: false,
      warnings: ["Chưa có yếu tố cổ phục truyền thống trong bộ trang phục"],
      feedback:
        "Tạm chấp nhận nhưng chưa đúng tinh thần Việt Phục: Cậu đang diện hoàn toàn trang phục hiện đại mà chưa kết hợp nét đẹp cổ phục nào. Hãy ghé Tủ Đồ khoác thêm một chiếc Áo Tứ Thân, Ngũ Thân hoặc Nhật Bình để tạo bản phối Việt Phục Remix đúng điệu nhé!"
    };
  }

  // =========================================================================
  // MỨC 8 - 10 ĐIỂM (CHUẨN NẾP / SLAY):
  // Phối đúng bộ, đúng quy tắc hoặc biến tấu hiện đại nhưng phù hợp bối cảnh
  // =========================================================================

  // 1. Thuần truyền thống 100% chuẩn nếp xưa
  if (!hasModernItems && hasTraditionalTop) {
    const isFullTradMatch =
      (isTuThan && matchesAny(lowers, "vay_dup", "váy đụp")) ||
      (isNhatBinh && matchesAny(lowers, "quan_lua", "quần lụa")) ||
      (isNguThan && matchesAny(lowers, "quan_lua", "quần lụa", "quan_ong_so", "ống sớ")) ||
      (isGiaoLinh && (matchesAny(lowers, "quan_lua", "quần lụa") || matchesAny(lowers, "vay", "váy"))) ||
      (isAoDai && matchesAny(lowers, "quan_lua", "quần lụa"));

    const perfectScore = isFullTradMatch ? 10.0 : 9.5;

    return {
      score: perfectScore,
      tier: "success",
      tierLabel: "Mức 8 - 10 điểm (Chuẩn nếp / Slay)",
      seal: "CỐM DUYỆT • CHUẨN NẾP",
      sealColor: "emerald",
      caseType: 3,
      isApproved: true,
      warnings: [],
      feedback: `Chuẩn nếp Tràng An không lệch một li! 100% cổ phục thuần khiết nếp xưa, phối đúng bài bản từ trong ra ngoài và cực kỳ ăn nhập với dịp ${occasion}. Tôn vinh trọn vẹn nét đoan trang của di sản dân tộc, Cốm duyệt điểm tối đa!`
    };
  }

  // 2. Biến tấu hiện đại tinh tế, văn minh, phù hợp bối cảnh (Slay)
  let slayScore = 9.0;
  if (isAoDai && (hasSneaker || hasSunglasses) && (isSchool || isCasualStreet)) {
    slayScore = 9.5;
  } else if (hasBlazer || hasCargo) {
    slayScore = 8.5;
  }

  return {
    score: slayScore,
    tier: "success",
    tierLabel: "Mức 8 - 10 điểm (Chuẩn nếp / Slay)",
    seal: "CỐM DUYỆT • SLAY",
    sealColor: "emerald",
    caseType: 3,
    isApproved: true,
    warnings: [],
    feedback: `Quá slay luôn cậu ơi! Bản phối giao thoa tuyệt mỹ giữa hồn cốt di sản và hơi thở đương đại của Gen Z. Vừa thời thượng, cá tính lại hoàn toàn đúng mực và phù hợp với dịp ${occasion}. Cốm duyệt điểm cao chót vót!`
  };
}

/**
 * Alias backward-compatible for validateCulturalOutfit
 */
export function validateCulturalOutfit(
  currentOutfit?: CurrentOutfitState | null,
  fallbackOutfit?: Outfit | null,
  occasion: string = "Đi học/Kỷ yếu"
): ValidationResult {
  return evaluateOutfit(currentOutfit, occasion, fallbackOutfit);
}
export function validateSelectedItems(
  selectedItems: (ClothesItem | WardrobeItem | string | any)[],
  occasion: string = "Đi học/Kỷ yếu"
): ValidationResult {
  const dummyState: CurrentOutfitState = {
    inner: null,
    outer: null,
    bottom: null,
    accessory: null,
    headwear: null,
    footwear: null
  };

  (selectedItems || []).forEach((item) => {
    const norm = normalizeItem(item);
    if (!norm) return;
    const cat = (norm.category || "").toLowerCase();
    const wardrobeItem: any = typeof item === "object" ? item : { id: norm.id, name: norm.name, category: norm.category };
    if (cat.includes("outer") || cat.includes("ngoài")) dummyState.outer = wardrobeItem;
    else if (cat.includes("inner") || cat.includes("trong")) dummyState.inner = wardrobeItem;
    else if (cat.includes("bottom") || cat.includes("quần") || cat.includes("váy")) dummyState.bottom = wardrobeItem;
    else if (cat.includes("foot") || cat.includes("giày") || cat.includes("dép")) dummyState.footwear = wardrobeItem;
    else if (cat.includes("head") || cat.includes("khăn") || cat.includes("nón")) dummyState.headwear = wardrobeItem;
    else dummyState.accessory = wardrobeItem;
  });

  return evaluateOutfit(dummyState, occasion);
}
