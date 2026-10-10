import imgNhatBinh from "../assets/images/regenerated_image_1791295938896.webp";
import imgNguThan from "../assets/images/regenerated_image_1791295940047.webp";
import imgTuThan from "../assets/images/regenerated_image_1791295944018.jpg";
import imgGiaoLinh from "../assets/images/regenerated_image_1791295945668.jpg";
import imgAoDai from "../assets/images/regenerated_image_1791295946955.jpg";

const imgNamGiaoLinh = new URL("../../goiy-kyyeu.webp", import.meta.url).href;
const imgNamNguThan = new URL("../../goiy-codo.webp", import.meta.url).href;

export interface CostumeStory {
  id: string;
  name: string;
  history: string;
  story: string;
  thumbnail: string;
  gender: "nu" | "nam";
}

export const storyDataRecord: Record<string, Omit<CostumeStory, "id" | "thumbnail" | "gender">> = {
  ao_giao_linh_nu: {
    name: "Áo Giao Lĩnh (Cổ chéo)",
    history:
      "Kiểu áo cổ xưa nhất của người Việt từ thời Bắc thuộc, qua Lý - Trần - Lê sơ đến nhà Nguyễn. Hai vạt đắp chéo trước ngực tượng trưng cho âm dương hòa hợp. Dưới triều Lê, phổ biến từ thường dân đến cung đình, thể hiện phong cách văn hóa Đại Việt.",
    story:
      "Quy tắc vạt trái đè vạt phải: Vạt trái (Dương - mạnh mẽ) luôn đè lên vạt phải (Âm - mềm mại). Sự giao thoa này thể hiện ước nguyện hài hòa âm dương, trời đất che chở cho con người."
  },
  ao_ngu_than_nu: {
    name: "Áo Ngũ Thân (Lập lĩnh)",
    history:
      "Ra đời năm 1744 do Chúa Võ Vương Nguyễn Phúc Khoát ban hành tại Đàng Trong. Gồm 5 thân tượng trưng cho tứ thân phụ mẫu và bản thân người mặc. Thời Nguyễn, áo cổ đứng trở thành quốc phục phổ biến trên cả nước.",
    story:
      "Gắn liền với 'cách mạng thời trang' Đàng Trong. Chúa Nguyễn bắt toàn dân đổi sang áo cổ đứng chít eo, mặc quần hai ống để thuận tiện lao động và phân biệt lãnh thổ, biến nó thành biểu tượng thanh lịch Việt Nam."
  },
  ao_tu_than_nu: {
    name: "Áo Tứ Thân",
    history:
      "Gắn liền với văn minh lúa nước Bắc Bộ từ thời kỳ đồ đồng. Cấu trúc 4 tà áo rời giúp phụ nữ dễ dàng lội bùn cấy lúa hay buôn bán gánh gồng.",
    story:
      "4 tà áo trước sau tượng trưng cho cha mẹ đẻ và cha mẹ chồng, tà trong cùng (yếm đào) tượng trưng tình mẫu tử và lòng son sắt. Thắt lưng dải lụa là 'tín vật' tôn lên đường cong tự nhiên và sự đoan trang."
  },
  ao_nhat_binh_nu: {
    name: "Áo Nhật Bình",
    history:
      "Phẩm phục cao cấp triều Nguyễn dành cho Hoàng hậu, Phi tần, Công chúa. Điểm nhận diện là hoa văn dạng ô chữ nhật chạy quanh cổ áo, tạo khung trước ngực.",
    story:
      "Quy định nghiêm ngặt: Chỉ Hoàng hậu được mặc màu vàng chính tuyến thêu phượng hoàng chỉ vàng. Đầu thế kỷ 20, triều đình cho phép gia đình quyền quý dùng làm áo cưới, tạo nét đẹp sang trọng trong lễ nạp tài."
  },
  ao_dai_cach_tan_nu: {
    name: "Áo Dài Cách Tân (Gen Z)",
    history:
      "Kế thừa áo dài Le Mur (1930) và Trần Lê Xuân (1960), phổ biến từ năm 2016. Giao thoa giữa phom dáng truyền thống và tư duy thời trang nhanh, năng động của người trẻ.",
    story:
      "Từng vấp phải tranh luận từ giới nghiên cứu văn hóa. Tuy nhiên, sự 'nổi loạn' này giúp áo dài bước ra khỏi bảo tàng, hòa vào đời sống giới trẻ (lễ Tết, sự kiện học đường)."
  },
  ao_giao_linh_nam: {
    name: "Áo Giao Lĩnh Nam",
    history:
      "Trang phục nam giới chủ đạo thời Lý - Trần - Lê. Vua quan đến trí thức đều mặc kết hợp búi tóc cài trâm hoặc đội khăn tùy phẩm cấp.",
    story:
      "Dù bị ảnh hưởng bởi biến động phương Bắc, các vua Lê, Trần kiên quyết duy trì lối mặc áo giao lĩnh mang bản sắc riêng, xem đây là ranh giới khẳng định chủ quyền văn hóa 'Nam - Bắc phân biệt'."
  },
  ao_ngu_than_nam: {
    name: "Áo Ngũ Thân Nam (Tấc & Tay chật)",
    history:
      "Hoàn thiện dưới triều Nguyễn. Chia hai loại: Áo tấc (tay rộng, dùng lễ tế, cưới, tang) và Ngũ thân tay chật (tay gọn, dùng đi lại làm việc hàng ngày).",
    story:
      "Thể hiện triết lý: Ngay thẳng và đĩnh đạc. 5 thân tượng trưng ngũ luân và ngũ thường. Mặc áo ngũ thân là mang theo đạo lý quân tử. Áo tấc rộng đòi hỏi di chuyển khoan thai, rèn phong thái điềm đạm, uy nghi."
  }
};

export const costumeStories: CostumeStory[] = [
  {
    id: "ao_giao_linh_nu",
    ...storyDataRecord.ao_giao_linh_nu,
    thumbnail: imgGiaoLinh,
    gender: "nu"
  },
  {
    id: "ao_ngu_than_nu",
    ...storyDataRecord.ao_ngu_than_nu,
    thumbnail: imgNguThan,
    gender: "nu"
  },
  {
    id: "ao_tu_than_nu",
    ...storyDataRecord.ao_tu_than_nu,
    thumbnail: imgTuThan,
    gender: "nu"
  },
  {
    id: "ao_nhat_binh_nu",
    ...storyDataRecord.ao_nhat_binh_nu,
    thumbnail: imgNhatBinh,
    gender: "nu"
  },
  {
    id: "ao_dai_cach_tan_nu",
    ...storyDataRecord.ao_dai_cach_tan_nu,
    thumbnail: imgAoDai,
    gender: "nu"
  },
  {
    id: "ao_giao_linh_nam",
    ...storyDataRecord.ao_giao_linh_nam,
    thumbnail: imgNamGiaoLinh,
    gender: "nam"
  },
  {
    id: "ao_ngu_than_nam",
    ...storyDataRecord.ao_ngu_than_nam,
    thumbnail: imgNamNguThan,
    gender: "nam"
  }
];

/**
 * Tìm câu chuyện tương ứng với costume ID hoặc SVG key hoặc tên
 */
export function getStoryForCostume(
  query: string | undefined | null,
  gender: "nu" | "nam" = "nu"
): CostumeStory {
  if (!query) {
    return gender === "nu" ? costumeStories[2] : costumeStories[5]; // Mặc định Tứ thân hoặc Giao lĩnh nam
  }

  const q = query.toLowerCase().trim();

  // 1. Kiểm tra trực tiếp ID story
  const exact = costumeStories.find((s) => s.id === q);
  if (exact) return exact;

  // 2. Mapping theo từ khóa và giới tính
  if (gender === "nam" || q.includes("nam") || q.includes("m_")) {
    if (q.includes("giao") || q.includes("giaulinh")) {
      return costumeStories.find((s) => s.id === "ao_giao_linh_nam")!;
    }
    if (q.includes("ngu") || q.includes("nguthan") || q.includes("tac")) {
      return costumeStories.find((s) => s.id === "ao_ngu_than_nam")!;
    }
    return costumeStories.find((s) => s.id === "ao_giao_linh_nam")!;
  }

  // Giới tính nữ
  if (q.includes("nhat") || q.includes("nhatbinh")) {
    return costumeStories.find((s) => s.id === "ao_nhat_binh_nu")!;
  }
  if (q.includes("tu_than") || q.includes("tuthan") || q.includes("tuchan") || q.includes("yem")) {
    return costumeStories.find((s) => s.id === "ao_tu_than_nu")!;
  }
  if (q.includes("giao") || q.includes("giaulinh")) {
    return costumeStories.find((s) => s.id === "ao_giao_linh_nu")!;
  }
  if (q.includes("aodai") || q.includes("cach_tan") || q.includes("dài")) {
    return costumeStories.find((s) => s.id === "ao_dai_cach_tan_nu")!;
  }
  if (q.includes("ngu") || q.includes("nguthan")) {
    return costumeStories.find((s) => s.id === "ao_ngu_than_nu")!;
  }

  // Fallback mặc định theo giới tính
  return gender === "nu" ? costumeStories[2] : costumeStories[5];
}
