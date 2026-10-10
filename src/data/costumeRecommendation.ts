/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type OccasionType =
  | "Đi học/Kỷ yếu"
  | "Lễ cưới/Ăn hỏi"
  | "Đi chùa/Đi di tích"
  | "Dạo phố Tết"
  | "Sân khấu/Dạ hội"
  | "Du lịch sống ảo";

export interface CostumeSuitability {
  id: string; // Khóa định danh costume
  storyId: string; // Khớp với id trong costumeStories (StoryFlipCard)
  outfitId?: string; // Khớp với id trong outfitDatabase
  name: string; // Tên hiển thị ngắn gọn
  fullName: string;
  gender: "nu" | "nam";
  scores: Record<OccasionType, number>; // Tỷ lệ % phù hợp (0 - 100)
  vibeTip: string; // Lời khuyên của Cốm khi diện dịp này
}

export interface RecommendationRankItem {
  costume: CostumeSuitability;
  score: number;
  rank: number; // 1 = cao nhất, 2 = cao nhì,...
  isTop: boolean; // Thuộc top đề cử nổi bật (top 1 hoặc đồng hạng)
  occasion: OccasionType;
}

// =========================================================================
// DATA DICTIONARY: ĐỘ PHÙ HỢP THEO DỊP & GIỚI TÍNH CHUẨN ĐẶC TẢ
// =========================================================================

export const femaleCostumeSuitabilities: CostumeSuitability[] = [
  {
    id: "ao_dai",
    storyId: "ao_dai_cach_tan_nu",
    outfitId: "n_aodai",
    name: "Áo Dài",
    fullName: "Áo Dài Cách Tân Gen Z",
    gender: "nu",
    scores: {
      "Đi học/Kỷ yếu": 95,
      "Lễ cưới/Ăn hỏi": 95,
      "Đi chùa/Đi di tích": 80,
      "Dạo phố Tết": 100,
      "Sân khấu/Dạ hội": 80,
      "Du lịch sống ảo": 80
    },
    vibeTip: "Tà áo thanh thoát, năng động, tôn trọn nét duyên thiếu nữ Việt đương đại."
  },
  {
    id: "ao_ngu_than",
    storyId: "ao_ngu_than_nu",
    outfitId: "n_nguthan",
    name: "Áo Ngũ Thân",
    fullName: "Áo Ngũ Thân Tay Chẽn Nữ",
    gender: "nu",
    scores: {
      "Đi học/Kỷ yếu": 85,
      "Lễ cưới/Ăn hỏi": 90,
      "Đi chùa/Đi di tích": 100,
      "Dạo phố Tết": 95,
      "Sân khấu/Dạ hội": 80,
      "Du lịch sống ảo": 90
    },
    vibeTip: "Kín đáo, đoan trang, cài 5 khuy Hữu Nhậm chuẩn nếp gia giáo cung đình triều Nguyễn."
  },
  {
    id: "ao_nhat_binh",
    storyId: "ao_nhat_binh_nu",
    outfitId: "n_nhatbinh",
    name: "Áo Nhật Bình",
    fullName: "Áo Nhật Bình Cung Đình Nữ",
    gender: "nu",
    scores: {
      "Đi học/Kỷ yếu": 40,
      "Lễ cưới/Ăn hỏi": 95,
      "Đi chùa/Đi di tích": 30,
      "Dạo phố Tết": 50,
      "Sân khấu/Dạ hội": 95,
      "Du lịch sống ảo": 75
    },
    vibeTip: "Phẩm phục cung đình hoàng gia lộng lẫy với cổ áo chữ nhật và viền ngũ sắc quý phái."
  },
  {
    id: "ao_giao_linh",
    storyId: "ao_giao_linh_nu",
    outfitId: "n_giaolinh",
    name: "Áo Giao Lĩnh",
    fullName: "Áo Giao Lĩnh Cổ Chéo Nữ",
    gender: "nu",
    scores: {
      "Đi học/Kỷ yếu": 30,
      "Lễ cưới/Ăn hỏi": 40,
      "Đi chùa/Đi di tích": 70,
      "Dạo phố Tết": 40,
      "Sân khấu/Dạ hội": 85,
      "Du lịch sống ảo": 70
    },
    vibeTip: "Cổ áo chéo chữ Y khoáng đạt thời Lê Trung Hưng, phiêu dật và đậm chất cổ phong."
  },
  {
    id: "ao_tu_than",
    storyId: "ao_tu_than_nu",
    outfitId: "n_tuthan",
    name: "Áo Tứ Thân",
    fullName: "Áo Tứ Thân Kinh Bắc",
    gender: "nu",
    scores: {
      "Đi học/Kỷ yếu": 20,
      "Lễ cưới/Ăn hỏi": 10,
      "Đi chùa/Đi di tích": 40,
      "Dạo phố Tết": 50,
      "Sân khấu/Dạ hội": 90,
      "Du lịch sống ảo": 65
    },
    vibeTip: "Dáng áo 4 tà bay bổng kết hợp yếm đào thắm sắc và khăn mỏ quạ Kinh Bắc thôn dã mộc mạc."
  }
];

export const maleCostumeSuitabilities: CostumeSuitability[] = [
  {
    id: "ao_ngu_than_nam",
    storyId: "ao_ngu_than_nam",
    outfitId: "m_nguthan",
    name: "Áo Ngũ Thân (Nam)",
    fullName: "Áo Ngũ Thân Tay Chẽn Nam",
    gender: "nam",
    scores: {
      "Đi học/Kỷ yếu": 90,
      "Lễ cưới/Ăn hỏi": 100,
      "Đi chùa/Đi di tích": 100,
      "Dạo phố Tết": 95,
      "Sân khấu/Dạ hội": 85,
      "Du lịch sống ảo": 90
    },
    vibeTip: "Quốc phục nam giới đĩnh đạc, cổ đứng lập lĩnh, toát lên phong thái nho nhã quân tử."
  },
  {
    id: "ao_giao_linh_nam",
    storyId: "ao_giao_linh_nam",
    outfitId: "m_giaolinh",
    name: "Áo Giao Lĩnh (Nam)",
    fullName: "Áo Giao Lĩnh Nho Sinh Nam",
    gender: "nam",
    scores: {
      "Đi học/Kỷ yếu": 40,
      "Lễ cưới/Ăn hỏi": 50,
      "Đi chùa/Đi di tích": 75,
      "Dạo phố Tết": 50,
      "Sân khấu/Dạ hội": 90,
      "Du lịch sống ảo": 75
    },
    vibeTip: "Phong thái thư sinh phong nhã, vạt chéo Hữu Nhậm kết hợp đai lưng tao nhã thời Lê - Nguyễn."
  }
];

export const costumeSuitabilityDatabase = {
  nu: femaleCostumeSuitabilities,
  nam: maleCostumeSuitabilities
};

/**
 * Chuẩn hóa chuỗi dịp sử dụng về key chuẩn
 */
export function normalizeOccasion(occasion: string): OccasionType {
  const norm = (occasion || "").toLowerCase().trim();
  if (norm.includes("học") || norm.includes("kỷ yếu") || norm.includes("kyyeu")) {
    return "Đi học/Kỷ yếu";
  }
  if (norm.includes("cưới") || norm.includes("hỏi") || norm.includes("ăn hỏi")) {
    return "Lễ cưới/Ăn hỏi";
  }
  if (norm.includes("chùa") || norm.includes("tích") || norm.includes("di tích")) {
    return "Đi chùa/Đi di tích";
  }
  if (norm.includes("tết") || norm.includes("dạo phố") || norm.includes("phố")) {
    return "Dạo phố Tết";
  }
  if (norm.includes("sân khấu") || norm.includes("dạ hội") || norm.includes("biểu diễn")) {
    return "Sân khấu/Dạ hội";
  }
  if (norm.includes("du lịch") || norm.includes("sống ảo") || norm.includes("checkin")) {
    return "Du lịch sống ảo";
  }
  return "Đi học/Kỷ yếu";
}

/**
 * Thuật toán Đề Cử: Quét và sắp xếp theo tỷ lệ phần trăm từ cao xuống thấp
 * Trả về toàn bộ danh sách đã xếp hạng kèm top 1-2 đề cử cao nhất
 */
export function getCostumeRecommendations(
  gender: "nu" | "nam",
  rawOccasion: string
): {
  normalizedOccasion: OccasionType;
  rankedList: RecommendationRankItem[];
  topRecommendations: RecommendationRankItem[];
  primaryRecommendation: RecommendationRankItem;
  secondaryRecommendation: RecommendationRankItem | null;
} {
  const normOccasion = normalizeOccasion(rawOccasion);
  const costumeList = costumeSuitabilityDatabase[gender];

  // Sắp xếp giảm dần theo tỷ lệ phần trăm
  const sorted = [...costumeList].sort((a, b) => {
    const scoreA = a.scores[normOccasion] ?? 0;
    const scoreB = b.scores[normOccasion] ?? 0;
    return scoreB - scoreA;
  });

  const rankedList: RecommendationRankItem[] = sorted.map((costume, index) => {
    const score = costume.scores[normOccasion] ?? 0;
    return {
      costume,
      score,
      rank: index + 1,
      isTop: index === 0 || score === sorted[0].scores[normOccasion],
      occasion: normOccasion
    };
  });

  const primary = rankedList[0];
  const secondary = rankedList.length > 1 ? rankedList[1] : null;

  // Lấy ra 1 hoặc 2 trang phục có phần trăm cao nhất
  const topRecommendations = rankedList.slice(0, 2);

  return {
    normalizedOccasion: normOccasion,
    rankedList,
    topRecommendations,
    primaryRecommendation: primary,
    secondaryRecommendation: secondary
  };
}
