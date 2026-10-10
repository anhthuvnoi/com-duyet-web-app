export type WardrobeLayerType = "inner" | "outer" | "bottom" | "accessory" | "headwear" | "footwear";
export type WardrobeOrigin = "traditional" | "modern";

export interface WardrobeItem {
  id: string;
  name: string;
  shortName: string;
  layer: WardrobeLayerType;
  origin: WardrobeOrigin;
  gender: "nu" | "nam" | "unisex";
  dynastyOrVibe: string;
  desc: string;
  mixTip: string; // Gợi ý phối đồ chéo cho thẻ lật mặt sau
  culturalRule?: string; // Khóa gen nếp xưa
  svgKey: string;
  colorPreview: string;
  badge: string;
  imageUrl?: string;
  thumbnail?: string;
  category?: 'Lớp Trong' | 'Áo Ngoài' | 'Quần & Váy' | 'Phụ Kiện' | 'Giày Dép';
}

export interface CurrentOutfitState {
  inner: WardrobeItem | null;
  outer: WardrobeItem | null;
  bottom: WardrobeItem | null;
  accessory: WardrobeItem | null;
  headwear: WardrobeItem | null;
  footwear: WardrobeItem | null;
}

// =========================================================================
// 1. TỦ ĐỒ TRUYỀN THỐNG (CÁC MẢNH RỜI CỔ PHỤC)
// =========================================================================
export const traditionalWardrobe: WardrobeItem[] = [
  // --- INNER (LỚP TRONG) ---
  {
    id: "trad_inner_yem_dao",
    name: "Yếm Đào Cổ Truyền",
    shortName: "Yếm đào",
    layer: "inner",
    origin: "traditional",
    gender: "nu",
    category: "Lớp Trong",
    dynastyOrVibe: "Đại Việt / Lê - Nguyễn",
    desc: "Nội y kinh điển của phụ nữ Việt, cổ khoét tròn hoặc xẻ chữ V, may bằng lụa tơ tằm thắm sắc sen.",
    mixTip: "💡 Gợi ý phối chéo: Rất hợp khi mặc lót trong Áo Tứ Thân hoặc remix cùng Quần Jeans ống rộng / Blazer hiện đại để khoe bờ vai thon.",
    culturalRule: "Nếp xưa: Mặc kín đáo bên trong áo khoác, không mặc độc chiếc ra chốn tôn nghiêm lễ bái.",
    svgKey: "yem_dao",
    colorPreview: "#F43F5E",
    badge: "Lớp Trong (Inner)",
    imageUrl: "/assets/clothes/ao_yem.png",
    thumbnail: "/assets/clothes/ao_yem.png"
  },
  {
    id: "trad_inner_trung_don_nu",
    name: "Áo Trong Trắng (Nữ)",
    shortName: "Áo trong trắng",
    layer: "inner",
    origin: "traditional",
    gender: "nu",
    category: "Lớp Trong",
    dynastyOrVibe: "Triều Nguyễn",
    desc: "Áo lót cổ đứng màu trắng tuyền may bằng sa hoặc lụa mỏng, giữ phom áo ngoài và tạo cổ áo hai lớp thanh nhã.",
    mixTip: "💡 Gợi ý phối chéo: Lớp lót chuẩn mực bắt buộc cho Áo Nhật Bình và Áo Ngũ Thân, giúp nếp cổ đứng sáng tôn da.",
    culturalRule: "Nếp xưa: Giữ cổ áo luôn trắng phẳng phiu, biểu trưng cho sự tinh khiết và nề nếp gia giáo.",
    svgKey: "trung_don_nu",
    colorPreview: "#F8FAFC",
    badge: "Lớp Trong (Inner)",
    imageUrl: "/assets/clothes/trung_don_nu.png",
    thumbnail: "/assets/clothes/trung_don_nu.png"
  },
  {
    id: "trad_inner_trung_don_nam",
    name: "Áo Trong Trắng (Nam)",
    shortName: "Áo trong trắng",
    layer: "inner",
    origin: "traditional",
    gender: "nam",
    category: "Lớp Trong",
    dynastyOrVibe: "Triều Nguyễn / Nho sinh",
    desc: "Áo lót trắng dài qua mông may bằng vải lụa mộc, cổ đứng nghiêm cẩn của các bậc nho sĩ trí thức xưa.",
    mixTip: "💡 Gợi ý phối chéo: Là cốt lõi tôn dáng cho Áo Giao Lĩnh và Áo Ngũ Thân nam; cũng có thể mix cùng Quần Âu hiện đại.",
    culturalRule: "Nếp xưa: Cổ áo phải cao hơn ve áo khoác một chút để lộ nếp trắng tinh tươm thanh lịch.",
    svgKey: "trung_don_nam",
    colorPreview: "#F1F5F9",
    badge: "Lớp Trong (Inner)",
    imageUrl: "/assets/clothes/trung_don_nam.png",
    thumbnail: "/assets/clothes/trung_don_nam.png"
  },

  // --- OUTER (ÁO KHOÁC NGOÀI) ---
  {
    id: "trad_outer_tu_than",
    name: "Áo Tứ thân Khoác ngoài",
    shortName: "Áo Tứ Thân",
    layer: "outer",
    origin: "traditional",
    gender: "nu",
    category: "Áo Ngoài",
    dynastyOrVibe: "Đồng bằng Bắc Bộ / Thế kỷ 18-19",
    desc: "Dáng áo 4 vạt biểu trưng cho tứ thân phụ mẫu, 2 vạt sau khâu liền thành sống lưng, 2 vạt trước buông lơi hoặc thắt nút.",
    mixTip: "💡 Gợi ý phối chéo: Khoác ngoài Yếm đào truyền thống, hoặc mix cùng Quần Jeans ống rộng tạo phong cách Dân gian Đương đại độc lạ.",
    culturalRule: "Nếp xưa: Hai vạt trước thả bay bổng hoặc buộc nhẹ trước bụng, không thắt nút quá chặt làm hỏng nếp lụa.",
    svgKey: "tu_than",
    colorPreview: "#047857",
    badge: "Áo Ngoài (Outer)",
    imageUrl: "/assets/clothes/ao_tu_than.png",
    thumbnail: "/assets/clothes/ao_tu_than.png"
  },
  {
    id: "trad_outer_nhat_binh",
    name: "Áo Nhật Bình Cung Đình Triều Nguyễn",
    shortName: "Áo Nhật Bình",
    layer: "outer",
    origin: "traditional",
    gender: "nu",
    category: "Áo Ngoài",
    dynastyOrVibe: "Triều Nguyễn (1802 - 1945)",
    desc: "Phẩm phục cung đình với dải cổ áo trước ngực viền chữ nhật (Nhật Bình), tay viền ngũ sắc thủy ba lộng lẫy uy nghiêm.",
    mixTip: "💡 Gợi ý phối chéo: Mặc ngoài Trung đơn trắng kết hợp Quần lụa trắng. Khi remix Gen Z, có thể phối giày Sneaker trắng tối giản.",
    culturalRule: "Khóa gen: Cổ áo vuông chữ nhật trước ngực bao quanh cổ, vạt áo thả suông phẳng phiu đoan trang.",
    svgKey: "nhat_binh",
    colorPreview: "#D97706",
    badge: "Áo Ngoài (Outer)",
    imageUrl: "/assets/clothes/ao_nhat_binh.png",
    thumbnail: "/assets/clothes/ao_nhat_binh.png"
  },
  {
    id: "trad_outer_ngu_than_nu",
    name: "Áo Ngũ Thân Tay Chẽn (Nữ)",
    shortName: "Ngũ Thân nữ",
    layer: "outer",
    origin: "traditional",
    gender: "nu",
    category: "Áo Ngoài",
    dynastyOrVibe: "Triều Nguyễn (Vua Minh Mạng)",
    desc: "Tiền thân của áo dài hiện đại gồm 5 thân áo, cài 5 hạt cúc khuy bên sườn phải (chuẩn Hữu Nhậm), kín đáo thanh lịch.",
    mixTip: "💡 Gợi ý phối chéo: Phối cùng Quần lụa trắng hoặc phá cách với Quần Jeans / Chân váy xòe Gen Z cho buổi dạo phố cuối tuần.",
    culturalRule: "Khóa gen: Phải cài cúc bên phải tượng trưng cho đạo ngũ luân (Nhân, Nghĩa, Lễ, Trí, Tín).",
    svgKey: "ngu_than_nu",
    colorPreview: "#9333EA",
    badge: "Áo Ngoài (Outer)",
    imageUrl: "/assets/clothes/ao_ngu_than_tay_chen_nu.png",
    thumbnail: "/assets/clothes/ao_ngu_than_tay_chen_nu.png"
  },
  {
    id: "trad_outer_giao_linh_nu",
    name: "Áo Giao Lĩnh Cổ Chéo (Nữ)",
    shortName: "Giao Lĩnh nữ",
    layer: "outer",
    origin: "traditional",
    gender: "nu",
    category: "Áo Ngoài",
    dynastyOrVibe: "Thời Lê Trung Hưng",
    desc: "Áo dáng dài thướt tha đến bắp chân dưới, cổ vạt chéo chữ Y nẹp to phẳng phiu chuẩn Hữu Nhậm, tay thụng rộng chùng nhẹ, kèm dải lụa trắng thắt eo buông dài qua đầu gối.",
    mixTip: "💡 Gợi ý chuẩn phom: Vạt áo dài thướt tha che trọn thân mình chỉ hé lộ một đoạn quần lụa trắng ở chân, dải lụa trắng buông dài qua đầu gối tạo điểm nhấn cổ phong thanh lịch.",
    culturalRule: "Khóa gen: Tuyệt đối vạt trái đè vạt phải (Hữu Nhậm); không cài ngược sang trái tránh điềm kiêng kỵ.",
    svgKey: "giao_linh_nu",
    colorPreview: "#0284C7",
    badge: "Áo Ngoài (Outer)",
    imageUrl: "/assets/clothes/ao_giao_linh_nu.png",
    thumbnail: "/assets/clothes/ao_giao_linh_nu.png"
  },
  {
    id: "trad_outer_ngu_than_nam",
    name: "Áo Ngũ Thân Tay Chẽn (Nam)",
    shortName: "Ngũ Thân nam",
    layer: "outer",
    origin: "traditional",
    gender: "nam",
    category: "Áo Ngoài",
    dynastyOrVibe: "Triều Nguyễn",
    desc: "Quốc phục nam giới triều Nguyễn với 5 thân áo, 5 khuy ngọc cài sườn phải, cổ đứng 3-4cm vững chãi đạo mạo.",
    mixTip: "💡 Gợi ý phối chéo: Mặc cùng Quần lụa trắng và Khăn đóng đen; Gen Z có thể phối cùng Giày Loafer hoặc Sneaker trắng thanh lịch.",
    culturalRule: "Khóa gen: Vạt áo che kín đùi, tà áo suôn phẳng, cổ đứng không mở rộng lôi thôi.",
    svgKey: "ngu_than_nam",
    colorPreview: "#1E3A8A",
    badge: "Áo Ngoài (Outer)",
    imageUrl: "/assets/clothes/ao_ngu_than_tay_chen_nam.png",
    thumbnail: "/assets/clothes/ao_ngu_than_tay_chen_nam.png"
  },
  {
    id: "trad_outer_giao_linh_nam",
    name: "Áo Giao Lĩnh Nho Sinh (Nam)",
    shortName: "Giao Lĩnh nam",
    layer: "outer",
    origin: "traditional",
    gender: "nam",
    category: "Áo Ngoài",
    dynastyOrVibe: "Thời Lê - Nguyễn",
    desc: "Áo vạt chéo thư sinh phong nhã, cổ áo chéo giao nhau đĩnh đạc, kết hợp đai lưng thắt ngang bụng.",
    mixTip: "💡 Gợi ý phối chéo: Phối cùng Quần ống sớ trắng và Quạt nan tre đề thơ; hoặc mix layer cùng Áo thun cổ tròn bên trong.",
    culturalRule: "Khóa gen: Nếp vắt chéo chuẩn Hữu Nhậm, phong thái đĩnh đạc khiêm nhường của kẻ sĩ.",
    svgKey: "giao_linh_nam",
    colorPreview: "#065F46",
    badge: "Áo Ngoài (Outer)",
    imageUrl: "/assets/clothes/ao_giao_linh_nam.png",
    thumbnail: "/assets/clothes/ao_giao_linh_nam.png"
  },
  {
    id: "trad_outer_ao_dai_cach_tan",
    name: "Áo Dài Cách Tân Gen Z",
    shortName: "Áo Dài Cách Tân",
    layer: "outer",
    origin: "traditional",
    gender: "nu",
    category: "Áo Ngoài",
    dynastyOrVibe: "Đương Đại / Gen Z",
    desc: "Sắc xanh cốm nhạt thêu hoa tinh xảo, tà áo lỡ trẻ trung năng động dạo phố đón nắng xuân tươi mới.",
    mixTip: "💡 Gợi ý phối chéo: Kết hợp cùng chân váy xòe hoặc quần lụa, mang giày cao gót mũi nhọn thanh lịch.",
    svgKey: "ao_dai",
    colorPreview: "#84CC16",
    badge: "Áo Ngoài (Outer)",
    imageUrl: "/assets/clothes/ao_dai_cach_tan.svg",
    thumbnail: "/assets/clothes/ao_dai_cach_tan.svg"
  },

  // --- BOTTOM (QUẦN & VÁY) ---
  {
    id: "trad_bottom_vay_dup",
    name: "Váy Đụp Dân Gian Chấm Gót",
    shortName: "Váy đụp lụa",
    layer: "bottom",
    origin: "traditional",
    gender: "nu",
    category: "Quần & Váy",
    dynastyOrVibe: "Bắc Bộ truyền thống",
    desc: "Váy lụa đen rộng rãi buông rủ tha thướt, bước đi êm ả mộc mạc của phụ nữ vùng đồng bằng châu thổ sông Hồng.",
    mixTip: "💡 Gợi ý phối chéo: Cặp bài trùng của Áo Tứ Thân và Yếm đào; tạo nên tổng thể duyên dáng chuẩn mực Kinh Bắc.",
    culturalRule: "Nếp xưa: Cạp váy buộc dải rút khéo léo bên hông, gấu váy buông chấm mắt cá chân.",
    svgKey: "vay_dup",
    colorPreview: "#18181B",
    badge: "Quần & Váy",
    imageUrl: "/assets/clothes/vay_dup_den.png",
    thumbnail: "/assets/clothes/vay_dup_den.png"
  },
  {
    id: "trad_bottom_quan_lua_trang",
    name: "Quần Lụa Trắng Ống Rộng",
    shortName: "Quần lụa trắng",
    layer: "bottom",
    origin: "traditional",
    gender: "unisex",
    category: "Quần & Váy",
    dynastyOrVibe: "Truyền thống mọi triều đại",
    desc: "Quần lụa trắng may ống suông rộng thoải mái, độ rủ mềm mại, mang lại cảm giác thanh thoát khi di chuyển.",
    mixTip: "💡 Gợi ý phối chéo: Món hạ y vạn năng cho Áo Nhật Bình, Ngũ Thân, Giao Lĩnh; hoặc phối cùng Áo Croptop / Phông hiện đại.",
    culturalRule: "Nếp xưa: Ống quần phẳng phiu không nhăn nhúm, cạp quần kín đáo che rốn.",
    svgKey: "quan_lua_trang",
    colorPreview: "#FAFAFA",
    badge: "Quần & Váy",
    imageUrl: "/assets/clothes/quan_lua_trang_ong_rong.png",
    thumbnail: "/assets/clothes/quan_lua_trang_ong_rong.png"
  },
  {
    id: "trad_bottom_quan_ong_so_nam",
    name: "Quần Ống Sớ Lụa Mộc (Nam)",
    shortName: "Quần ống sớ nam",
    layer: "bottom",
    origin: "traditional",
    gender: "nam",
    category: "Quần & Váy",
    dynastyOrVibe: "Nho sĩ truyền thống",
    desc: "Quần lụa trắng hoặc be ngà ống thụng rộng của nam giới, cử động khoáng đạt phong lưu.",
    mixTip: "💡 Gợi ý phối chéo: Chuẩn phối cho Áo Giao Lĩnh và Ngũ Thân; có thể kết hợp cùng giày Loafer hoặc Guốc mộc.",
    culturalRule: "Nếp xưa: Quần buông dài chấm mắt cá chân, không xắn gấu khi vào lễ bái.",
    svgKey: "quan_ong_so",
    colorPreview: "#F5F5F4",
    badge: "Quần & Váy",
    imageUrl: "/assets/clothes/quan_lua_trang_ong_rong.png",
    thumbnail: "/assets/clothes/quan_lua_trang_ong_rong.png"
  },

  // --- ACCESSORIES, HEADWEAR & FOOTWEAR ---
  {
    id: "trad_head_khan_van",
    name: "Khăn Vấn Nhung Đen Truyền Thống",
    shortName: "Khăn vấn nhung",
    layer: "headwear",
    origin: "traditional",
    gender: "nu",
    category: "Phụ Kiện",
    dynastyOrVibe: "Đại Việt / Lê - Nguyễn",
    desc: "Khăn nhung đen quấn khéo quanh lọn tóc mai, tôn lên gương mặt trái xoan thanh tú của thiếu nữ Việt xưa.",
    mixTip: "💡 Gợi ý phối chéo: Phối cùng Áo Tứ Thân, Ngũ Thân hoặc mix cùng Áo Blazer hiện đại để tạo diện mạo quý cô Hà Thành sang trọng.",
    svgKey: "khan_van_nu",
    colorPreview: "#27272A",
    badge: "Phụ Kiện",
    imageUrl: "/assets/clothes/khan_van.png",
    thumbnail: "/assets/clothes/khan_van.png"
  },
  {
    id: "trad_head_khan_dong_nam",
    name: "Khăn Đóng / Khăn Xếp (Nam)",
    shortName: "Khăn đóng nam",
    layer: "headwear",
    origin: "traditional",
    gender: "nam",
    category: "Phụ Kiện",
    dynastyOrVibe: "Triều Nguyễn",
    desc: "Khăn xếp đen xếp nếp chữ Nhất hoặc chữ Nhân ngay ngắn trên trán, thể hiện cốt cách đoan chính nam nhi.",
    mixTip: "💡 Gợi ý phối chéo: Bắt cặp hoàn hảo cùng Áo Ngũ Thân nam; giúp gương mặt sáng sủa đĩnh đạc khi chụp kỷ yếu.",
    svgKey: "khan_dong_nam",
    colorPreview: "#1C1917",
    badge: "Phụ Kiện",
    imageUrl: "/assets/clothes/khan_dong_nam.png",
    thumbnail: "/assets/clothes/khan_dong_nam.png"
  },
  {
    id: "trad_acc_khan_mo_qua",
    name: "Khăn Mỏ Quạ Xanh Chàm",
    shortName: "Khăn mỏ quạ",
    layer: "headwear",
    origin: "traditional",
    gender: "nu",
    category: "Phụ Kiện",
    dynastyOrVibe: "Dân gian Bắc Bộ",
    desc: "Khăn vải mộc xanh chàm gấp góc cánh sen ôm trọn khuôn mặt, nét đẹp hoài niệm mộc mạc thôn dã.",
    mixTip: "💡 Gợi ý phối chéo: Diện cùng Áo Tứ Thân và Yếm Đào tạo tổng thể thiếu nữ Kinh Bắc chuẩn chỉnh.",
    svgKey: "khan_mo_qua_xanh",
    colorPreview: "#1E3A8A",
    badge: "Phụ Kiện",
    imageUrl: "/assets/clothes/khan_mo_qua_xanh.svg",
    thumbnail: "/assets/clothes/khan_mo_qua_xanh.svg"
  },
  {
    id: "trad_acc_khan_mo_qua_theu",
    name: "Khăn Mỏ Quạ Gấm Thêu Vàng",
    shortName: "Khăn mỏ quạ gấm",
    layer: "headwear",
    origin: "traditional",
    gender: "nu",
    category: "Phụ Kiện",
    dynastyOrVibe: "Kinh Kỳ / Quý Phái",
    desc: "Gấm vàng rực dệt hoa văn quý phái, độ bóng óng ả, nếp gấp tối màu tạo chiều sâu sang trọng.",
    mixTip: "💡 Gợi ý phối chéo: Phối với áo Ngũ Thân hoặc Nhật Bình cho bộ ảnh cổ phong kiêu kỳ quý phái.",
    svgKey: "khan_mo_qua_gam_vang",
    colorPreview: "#CA8A04",
    badge: "Phụ Kiện",
    imageUrl: "/assets/clothes/khan_mo_qua_gam_vang.svg",
    thumbnail: "/assets/clothes/khan_mo_qua_gam_vang.svg"
  },
  {
    id: "trad_acc_non_quai_thao",
    name: "Nón Quai Thao Dải Lụa Ngũ Sắc",
    shortName: "Nón quai thao",
    layer: "headwear",
    origin: "traditional",
    gender: "nu",
    category: "Phụ Kiện",
    dynastyOrVibe: "Quan Họ Bắc Ninh",
    desc: "Nón ba tầm đan lá tỉ mỉ cùng quai thao lụa ngũ sắc buông dài, linh hồn e ấp duyên dáng xứ quan họ.",
    mixTip: "💡 Gợi ý phối chéo: Đạo cụ tạo dáng chụp ảnh kỷ yếu hay lễ hội tuyệt đẹp cho nàng thơ.",
    svgKey: "non_quai_thao",
    colorPreview: "#FDE047",
    badge: "Phụ Kiện",
    imageUrl: "/assets/clothes/non_quai_thao.png",
    thumbnail: "/assets/clothes/non_quai_thao.png"
  },
  {
    id: "trad_acc_dai_that_lung",
    name: "Dải Thắt Lưng Lụa Ngũ Sắc",
    shortName: "Dải thắt lưng",
    layer: "accessory",
    origin: "traditional",
    gender: "nu",
    category: "Phụ Kiện",
    dynastyOrVibe: "Thời Lê - Nguyễn",
    desc: "Dải lụa mềm thắt ngang eo buông rủ theo vạt áo, tạo điểm nhấn tôn eo thon thả và bay bổng khi bước đi.",
    mixTip: "💡 Gợi ý phối chéo: Dùng để buộc vạt Áo Tứ Thân hoặc nhấn eo cho Áo Giao Lĩnh; màu sắc rực rỡ vui mắt.",
    svgKey: "dai_that_lung",
    colorPreview: "#EAB308",
    badge: "Phụ Kiện",
    imageUrl: "/assets/clothes/that_lung_lua_ngu_sac.png",
    thumbnail: "/assets/clothes/that_lung_lua_ngu_sac.png"
  },
  {
    id: "trad_acc_vong_tay_vang",
    name: "Vòng Tay Vàng Ánh Kim Cổ Truyền",
    shortName: "Vòng tay vàng",
    layer: "accessory",
    origin: "traditional",
    gender: "nu",
    category: "Phụ Kiện",
    dynastyOrVibe: "Cung đình / Phú quý",
    desc: "Đôi vòng tay vàng chạm khắc hoa sen, đeo ở cổ tay tạo ánh lấp lánh quyền quý mỗi khi nâng tay vén áo.",
    mixTip: "💡 Gợi ý phối chéo: Tôn vinh nét quý phái cho mọi bộ cổ phục; phối cùng Áo Nhật Bình hay Áo Dài đều nổi bật.",
    svgKey: "vong_tay_vang",
    colorPreview: "#F59E0B",
    badge: "Phụ Kiện",
    imageUrl: "/assets/clothes/vong_tay_vang.png",
    thumbnail: "/assets/clothes/vong_tay_vang.png"
  },
  {
    id: "trad_acc_tui_theu",
    name: "Túi Gấm Thêu Hoa Sen Cầm Tay",
    shortName: "Túi thêu hoa sen",
    layer: "accessory",
    origin: "traditional",
    gender: "nu",
    category: "Phụ Kiện",
    dynastyOrVibe: "Thủ công Kinh Bắc",
    desc: "Túi gấm đỏ thắm dáng quả đào thêu đóa sen vàng tinh xảo, đính tua rua đỏ đung đưa theo từng nhịp bước.",
    mixTip: "💡 Gợi ý phối chéo: Cầm tay phải duyên dáng, tách biệt hoàn toàn với Quạt; tạo nét đài các đoan trang.",
    svgKey: "tui_theu",
    colorPreview: "#BE123C",
    badge: "Phụ Kiện",
    imageUrl: "/assets/clothes/tui_gam_theu_hoa_sen.png",
    thumbnail: "/assets/clothes/tui_gam_theu_hoa_sen.png"
  },
  {
    id: "trad_acc_quat_xep",
    name: "Quạt Xếp Nan Tre Đề Thơ Cầm Tay",
    shortName: "Quạt xếp nan tre",
    layer: "accessory",
    origin: "traditional",
    gender: "unisex",
    category: "Phụ Kiện",
    dynastyOrVibe: "Nho sĩ / Văn nhân",
    desc: "Quạt nan tre bồi giấy dó hoặc lụa tơ tằm đề thơ chữ Nôm thanh nhã, đạo cụ tao nhã của văn nhân tài tử.",
    mixTip: "💡 Gợi ý phối chéo: Cầm ở tay trái thư thái, tạo dáng chụp ảnh sống ảo ngàn like cho cả nam và nữ.",
    svgKey: "quat_xep",
    colorPreview: "#FEF3C7",
    badge: "Phụ Kiện",
    imageUrl: "/assets/clothes/quat_nan.png",
    thumbnail: "/assets/clothes/quat_nan.png"
  },
  {
    id: "trad_foot_guoc_moc",
    name: "Guốc Mộc Cổ Truyền Quai Nhung",
    shortName: "Guốc mộc",
    layer: "footwear",
    origin: "traditional",
    gender: "unisex",
    category: "Giày Dép",
    dynastyOrVibe: "Văn hóa dân gian",
    desc: "Guốc đẽo từ gỗ mộc tự nhiên, đế cao vừa phải, quai nhung êm ái phát ra tiếng lách cách rộn ràng thân thương.",
    mixTip: "💡 Gợi ý phối chéo: Giày dép nguyên bản chuẩn nhất cho Áo Tứ Thân, Yếm đào và Áo Ngũ Thân mộc mạc.",
    svgKey: "guoc_moc",
    colorPreview: "#78350F",
    badge: "Giày Dép",
    imageUrl: "/assets/clothes/guoc_moc.png",
    thumbnail: "/assets/clothes/guoc_moc.png"
  }
];

// =========================================================================
// 2. TỦ ĐỒ HIỆN ĐẠI GEN Z (CÁC MẢNH RỜI STREETWEAR / ĐƯƠNG ĐẠI)
// =========================================================================
export const modernWardrobe: WardrobeItem[] = [
  // --- INNER (LỚP TRONG) ---
  {
    id: "mod_inner_croptop",
    name: "Áo Croptop Năng Động Ôm Body",
    shortName: "Áo Croptop",
    layer: "inner",
    origin: "modern",
    gender: "nu",
    category: "Lớp Trong",
    dynastyOrVibe: "Gen Z Streetwear / Y2K",
    desc: "Áo croptop cotton co giãn ngắn ngang eo, phong cách trẻ trung khỏe khoắn tôn trọn vòng eo thon gọn.",
    mixTip: "💡 Gợi ý phối chéo: Rất hợp khi mặc lót trong Áo Giao Lĩnh hoặc Áo Tứ Thân khoác hờ bên ngoài để tạo nét đối lập vừa kín vừa hở phá cách!",
    svgKey: "croptop",
    colorPreview: "#EC4899",
    badge: "Lớp Trong (Inner)",
    imageUrl: "/assets/clothes/ao_croptop_nu.png",
    thumbnail: "/assets/clothes/ao_croptop_nu.png"
  },
  {
    id: "mod_inner_tshirt",
    name: "Áo Phông Graphic T-Shirt Basic",
    shortName: "Áo phông Graphic",
    layer: "inner",
    origin: "modern",
    gender: "unisex",
    category: "Lớp Trong",
    dynastyOrVibe: "Casual Minimalist",
    desc: "Áo thun cotton thoáng mát cổ tròn cơ bản, form suông năng động phù hợp mọi dáng người.",
    mixTip: "💡 Gợi ý phối chéo: Mặc lót bên trong Áo Ngũ Thân hay Áo Giao Lĩnh mở cúc tà, biến trang phục thành chiếc áo cardigan độc lạ dạo phố.",
    svgKey: "tshirt",
    colorPreview: "#F4F4F5",
    badge: "Lớp Trong (Inner)",
    imageUrl: "/assets/clothes/tshirt.png",
    thumbnail: "/assets/clothes/tshirt.png"
  },

  // --- OUTER (ÁO KHOÁC NGOÀI) ---
  {
    id: "mod_outer_blazer",
    name: "Áo Blazer Đen Oversize",
    shortName: "Blazer đen",
    layer: "outer",
    origin: "modern",
    gender: "unisex",
    category: "Áo Ngoài",
    dynastyOrVibe: "Chic Modern Fashion",
    desc: "Áo khoác blazer đứng form vai độn nhẹ, chất vải kaki cao cấp phong thái chỉn chu thanh lịch.",
    mixTip: "💡 Gợi ý phối chéo: Khoác ngoài Yếm đào hoặc Trung đơn cổ đứng lụa trắng, cài thêm khăn vấn tạo vẻ đẹp quý cô thời thượng giao thoa Đông - Tây.",
    svgKey: "blazer",
    colorPreview: "#3F3F46",
    badge: "Áo Ngoài (Outer)",
    imageUrl: "/assets/clothes/ao_blazer_den.png",
    thumbnail: "/assets/clothes/ao_blazer_den.png"
  },

  // --- BOTTOM (QUẦN & VÁY) ---
  {
    id: "mod_bottom_jeans_ong_rong",
    name: "Quần Jeans Ống Rộng Cạp Cao",
    shortName: "Quần Jeans ống rộng",
    layer: "bottom",
    origin: "modern",
    gender: "unisex",
    category: "Quần & Váy",
    dynastyOrVibe: "Y2K / Streetwear",
    desc: "Quần bò xanh denim wash cá tính, cạp cao tôn dáng, ống suông rộng thoải mái hack chân dài cực đỉnh.",
    mixTip: "💡 Gợi ý phối chéo: Rất hợp khi phối cùng Áo Giao Lĩnh khoác ngoài hoặc Yếm đào để tạo nét phá cách mà vẫn kín đáo và năng động.",
    svgKey: "jeans_ong_rong",
    colorPreview: "#2563EB",
    badge: "Quần & Váy",
    imageUrl: "/assets/clothes/quan_jean_nu.png",
    thumbnail: "/assets/clothes/quan_jean_nu.png"
  },
  {
    id: "mod_bottom_chan_vay_tennis",
    name: "Chân Váy Xếp Ly Tennis Năng Động",
    shortName: "Chân váy xếp ly",
    layer: "bottom",
    origin: "modern",
    gender: "nu",
    category: "Quần & Váy",
    dynastyOrVibe: "Preppy / Gen Z",
    desc: "Chân váy ngắn xếp ly xòe bồng bềnh, trẻ trung dễ thương, phong cách nữ sinh hiện đại.",
    mixTip: "💡 Gợi ý phối chéo: Thử kết hợp cùng Áo Ngũ Thân tay chẽn hoặc Áo Giao Lĩnh lửng để tạo set đồ 'cổ phục học đường' siêu bắt mắt!",
    svgKey: "chan_vay_tennis",
    colorPreview: "#E2E8F0",
    badge: "Quần & Váy",
    imageUrl: "/assets/clothes/vay_xep_ly.png",
    thumbnail: "/assets/clothes/vay_xep_ly.png"
  },
  {
    id: "mod_bottom_quan_cargo",
    name: "Quần Cargo Túi Hộp Streetwear",
    shortName: "Quần túi hộp Cargo",
    layer: "bottom",
    origin: "modern",
    gender: "unisex",
    category: "Quần & Váy",
    dynastyOrVibe: "Hip-hop / Cyberpunk",
    desc: "Quần dài kaki túi hộp hầm hố, bo gấu khỏe khoắn, phong cách biểu diễn đường phố cực chất.",
    mixTip: "💡 Gợi ý phối chéo: Phối với Áo Ngũ Thân nam hoặc Áo Tứ Thân xắn tay áo, kết hợp sneaker chunky cho những buổi diễn festival bùng nổ.",
    svgKey: "quan_cargo",
    colorPreview: "#4B5563",
    badge: "Quần & Váy",
    imageUrl: "/assets/clothes/quan_cargo.png",
    thumbnail: "/assets/clothes/quan_cargo.png"
  },
  {
    id: "mod_bottom_quan_jean_nam",
    name: "Quần Jean Nam Ống Suông",
    shortName: "Quần Jean nam",
    layer: "bottom",
    origin: "modern",
    gender: "nam",
    category: "Quần & Váy",
    dynastyOrVibe: "Casual Boy",
    desc: "Denim xanh nhạt ống suông rộng rãi thoải mái, item vạn năng dễ phối cùng blazer hoặc áo ngũ thân.",
    mixTip: "💡 Gợi ý phối chéo: Phối cùng Áo Ngũ Thân nam hoặc Áo Giao Lĩnh tạo nét phong trần hiện đại.",
    svgKey: "jeans_ong_rong",
    colorPreview: "#60A5FA",
    badge: "Quần & Váy",
    imageUrl: "/assets/clothes/quan_jean_nam.png",
    thumbnail: "/assets/clothes/quan_jean_nam.png"
  },

  // --- ACCESSORIES, HEADWEAR & FOOTWEAR ---
  {
    id: "mod_foot_sneaker_trang",
    name: "Giày Sneaker Chunky Trắng Năng Động",
    shortName: "Sneaker Chunky trắng",
    layer: "footwear",
    origin: "modern",
    gender: "unisex",
    category: "Giày Dép",
    dynastyOrVibe: "Streetwear Essential",
    desc: "Đôi sneaker trắng tinh đế cao êm chân, item không thể thiếu trong tủ đồ của giới trẻ hiện đại.",
    mixTip: "💡 Gợi ý phối chéo: Phá vỡ sự gò bó của trang phục truyền thống, mang lại sự năng động giúp bạn tự tin sải bước dạo phố cả ngày.",
    svgKey: "sneaker_trang",
    colorPreview: "#FFFFFF",
    badge: "Giày Dép",
    imageUrl: "/assets/clothes/sneaker.png",
    thumbnail: "/assets/clothes/sneaker.png"
  },
  {
    id: "mod_foot_cao_got",
    name: "Giày Cao Gót Mũi Nhọn Thời Trang",
    shortName: "Cao gót thời trang",
    layer: "footwear",
    origin: "modern",
    gender: "nu",
    category: "Giày Dép",
    dynastyOrVibe: "Modern Glamour",
    desc: "Giày cao gót thanh mảnh 7cm tôn dáng kiêu sa, bước đi uyển chuyển quý phái.",
    mixTip: "💡 Gợi ý phối chéo: Kết hợp hoàn hảo với Áo Ngũ Thân hoặc Áo Nhật Bình khi tham dự các sự kiện dạ hội và lễ trao giải trang trọng.",
    svgKey: "cao_got",
    colorPreview: "#18181B",
    badge: "Giày Dép",
    imageUrl: "/assets/clothes/giay_cao_got.png",
    thumbnail: "/assets/clothes/giay_cao_got.png"
  },
  {
    id: "mod_foot_giay_tay",
    name: "Giày Tây Oxford Lịch Lãm (Nam)",
    shortName: "Giày tây Oxford",
    layer: "footwear",
    origin: "modern",
    gender: "nam",
    category: "Giày Dép",
    dynastyOrVibe: "Gentleman Classic",
    desc: "Giày da Oxford đen bóng sang trọng đứng đắn, nâng tầm khí chất quý ông khi diện cùng áo ngũ thân.",
    mixTip: "💡 Gợi ý phối chéo: Bắt cặp hoàn hảo cùng Áo Ngũ Thân nam và Quần lụa trắng cho lễ cưới hiện đại.",
    svgKey: "giay_tay",
    colorPreview: "#09090B",
    badge: "Giày Dép",
    imageUrl: "/assets/clothes/giay_tay.png",
    thumbnail: "/assets/clothes/giay_tay.png"
  },
  {
    id: "mod_acc_kinh_ram",
    name: "Kính Mát Streetwear Đen Cá Tính",
    shortName: "Kính mát ngầu",
    layer: "accessory",
    origin: "modern",
    gender: "unisex",
    category: "Phụ Kiện",
    dynastyOrVibe: "Futuristic / Matrix",
    desc: "Kính râm gọng đen cá tính chống tia UV, tạo điểm nhấn thần thái lạnh lùng cuốn hút.",
    mixTip: "💡 Gợi ý phối chéo: Đeo cùng Áo Nhật Bình hoặc Áo Giao Lĩnh khi chụp hình check-in để tạo vibe 'Cung đình xuyên không' cực kỳ trendy.",
    svgKey: "kinh_ram",
    colorPreview: "#09090B",
    badge: "Phụ Kiện",
    imageUrl: "/assets/clothes/kinh_ram.png",
    thumbnail: "/assets/clothes/kinh_ram.png"
  },
  {
    id: "mod_acc_tui_kep_nach",
    name: "Túi Kẹp Nách Mini Y2K Đương Đại",
    shortName: "Túi kẹp nách mini",
    layer: "accessory",
    origin: "modern",
    gender: "nu",
    category: "Phụ Kiện",
    dynastyOrVibe: "Y2K Aesthetic",
    desc: "Chiếc túi da nhỏ kẹp dưới nách gọn gàng, chứa vừa điện thoại và thỏi son cho buổi dạo chơi nhẹ nhàng.",
    mixTip: "💡 Gợi ý phối chéo: Thay thế túi gấm truyền thống, mang lại hơi thở hiện đại tươi mới cho các set đồ cổ phục dạo phố.",
    svgKey: "tui_kep_nach",
    colorPreview: "#3B82F6",
    badge: "Phụ Kiện",
    imageUrl: "/assets/clothes/tui_kep_nach_jean.png",
    thumbnail: "/assets/clothes/tui_kep_nach_jean.png"
  },
  {
    id: "mod_acc_tai_nghe",
    name: "Tai Nghe Chụp Tai Over-Ear Bluetooth",
    shortName: "Tai nghe Over-ear",
    layer: "accessory",
    origin: "modern",
    gender: "unisex",
    category: "Phụ Kiện",
    dynastyOrVibe: "Music Lover / Gen Z",
    desc: "Tai nghe chụp tai quàng hờ quanh cổ, phụ kiện thời trang đình đám của giới trẻ đam mê âm nhạc.",
    mixTip: "💡 Gợi ý phối chéo: Quàng quanh cổ khi mặc Áo Giao Lĩnh hoặc Áo Ngũ Thân để biến thành bộ outfit 'Lo-fi Chill Beats' siêu hút mắt.",
    svgKey: "tai_nghe",
    colorPreview: "#1D4ED8",
    badge: "Phụ Kiện",
    imageUrl: "/assets/clothes/tai_nghe.png",
    thumbnail: "/assets/clothes/tai_nghe.png"
  }
];

// Helper để lấy danh sách theo gender và tủ
export function getWardrobeItems(
  origin: WardrobeOrigin,
  gender: "nu" | "nam",
  category?: WardrobeLayerType | "all"
): WardrobeItem[] {
  const source = origin === "traditional" ? traditionalWardrobe : modernWardrobe;
  return source.filter((item) => {
    const matchGender = item.gender === "unisex" || item.gender === gender;
    const matchCategory = !category || category === "all" || item.layer === category;
    return matchGender && matchCategory;
  });
}

// State khởi tạo mặc định: Tất cả các layer đều là null để không ép đồ mặc định lên búp bê
export function getDefaultOutfitState(_gender?: "nu" | "nam"): CurrentOutfitState {
  return {
    inner: null,
    outer: null,
    bottom: null,
    accessory: null,
    headwear: null,
    footwear: null
  };
}

// Búp bê gốc đã có sẵn đồ lót nên tính năng "Phối lại" đặt về trạng thái nguyên bản (null cho tất cả layer)
export function getBaseUndergarmentOutfit(_gender?: "nu" | "nam"): CurrentOutfitState {
  return {
    inner: null,
    outer: null,
    bottom: null,
    accessory: null,
    headwear: null,
    footwear: null
  };
}

// Preset trang phục theo bộ mẫu gợi ý hoặc outfitId
export function getPresetOutfitState(
  outfitId: string,
  gender: "nu" | "nam",
  level: number = 1
): CurrentOutfitState {
  const allItems = [...traditionalWardrobe, ...modernWardrobe];
  const getItem = (id: string | null) => {
    if (!id) return null;
    return allItems.find((i) => i.id === id) || null;
  };

  const idLower = outfitId.toLowerCase();

  if (gender === "nu") {
    if (idLower.includes("tuchan") || idLower.includes("tu_than")) {
      return {
        inner: getItem("trad_inner_yem_dao"),
        outer: getItem("trad_outer_tu_than"),
        bottom: getItem("trad_bottom_vay_dup"),
        accessory: getItem("trad_acc_dai_that_lung") || getItem("trad_acc_tui_theu"),
        headwear: getItem("trad_head_khan_van"),
        footwear: getItem("trad_foot_guoc_moc")
      };
    }
    if (idLower.includes("nhatbinh") || idLower.includes("nhat_binh")) {
      return {
        inner: getItem("trad_inner_trung_don_nu"),
        outer: getItem("trad_outer_nhat_binh"),
        bottom: getItem("trad_bottom_quan_lua_trang"),
        accessory: getItem("trad_acc_vong_tay_vang") || getItem("trad_acc_tui_theu"),
        headwear: getItem("trad_head_khan_van"),
        footwear: getItem("trad_foot_guoc_moc")
      };
    }
    if (idLower.includes("aodai") || idLower.includes("ao_dai")) {
      return {
        inner: getItem("trad_inner_trung_don_nu"),
        outer: getItem("trad_outer_ao_dai_cach_tan"),
        bottom: getItem("trad_bottom_quan_lua_trang"),
        accessory: getItem("trad_acc_tui_theu"),
        headwear: getItem("trad_head_khan_van"),
        footwear: getItem("mod_foot_cao_got") || getItem("trad_foot_guoc_moc")
      };
    }
    if (idLower.includes("giaulinh") || idLower.includes("giao_linh")) {
      return {
        inner: getItem("trad_inner_trung_don_nu"),
        outer: getItem("trad_outer_giao_linh_nu"),
        bottom: getItem("trad_bottom_quan_lua_trang"),
        accessory: getItem("trad_acc_dai_that_lung"),
        headwear: getItem("trad_head_khan_van"),
        footwear: getItem("trad_foot_guoc_moc")
      };
    }
    // Mặc định nữ: Áo Ngũ Thân
    return {
      inner: getItem("trad_inner_trung_don_nu"),
      outer: getItem("trad_outer_ngu_than_nu"),
      bottom: getItem("trad_bottom_quan_lua_trang"),
      accessory: getItem("trad_acc_tui_theu"),
      headwear: getItem("trad_head_khan_van"),
      footwear: getItem("trad_foot_guoc_moc")
    };
  } else {
    // Nam
    if (idLower.includes("giaulinh") || idLower.includes("giao_linh")) {
      if (level >= 3) {
        return {
          inner: getItem("mod_inner_tshirt") || getItem("trad_inner_trung_don_nam"),
          outer: getItem("trad_outer_giao_linh_nam"),
          bottom: getItem("mod_bottom_quan_jean_nam") || getItem("trad_bottom_quan_ong_so_nam"),
          accessory: getItem("mod_acc_tai_nghe") || getItem("mod_acc_kinh_ram"),
          headwear: null,
          footwear: getItem("mod_foot_sneaker_trang")
        };
      }
      return {
        inner: getItem("trad_inner_trung_don_nam"),
        outer: getItem("trad_outer_giao_linh_nam"),
        bottom: getItem("trad_bottom_quan_ong_so_nam"),
        accessory: getItem("trad_acc_quat_xep"),
        headwear: getItem("trad_head_khan_dong_nam"),
        footwear: getItem("trad_foot_guoc_moc")
      };
    }
    // Mặc định nam: Áo Ngũ Thân
    return {
      inner: getItem("trad_inner_trung_don_nam"),
      outer: getItem("trad_outer_ngu_than_nam"),
      bottom: getItem("trad_bottom_quan_ong_so_nam"),
      accessory: getItem("trad_acc_quat_nan") || getItem("trad_acc_quat_xep"),
      headwear: getItem("trad_head_khan_dong_nam"),
      footwear: getItem("trad_foot_guoc_moc")
    };
  }
}

