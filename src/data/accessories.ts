export interface StylingLevelInfo {
  level: number;
  title: string;
  subtitle: string;
  vibe: string;
  coreRuleLocked: string;
  unlockedFreedom: string;
  accessoriesNu: string[];
  accessoriesNam: string[];
  accessoriesSummaryNu: string;
  accessoriesSummaryNam: string;
  footwear: string;
  headwear: string;
  comRemarkNu: string;
  comRemarkNam: string;
  isSolemnSafe: boolean;
}

export const stylingLevels: Record<number, StylingLevelInfo> = {
  1: {
    level: 1,
    title: "Truyền Thống Thuần Nếp",
    subtitle: "Chuẩn nếp xưa 100% - Không lai tạp",
    vibe: "Trang nghiêm, uy nghi, chuẩn mực khảo cứu lịch sử",
    coreRuleLocked: "Khóa chặt: Phom áo, nếp vạt Hữu Nhậm, 5 cúc Ngũ Luân, quần lụa ống sớ, cổ đứng chuẩn tỉ lệ triều đình.",
    unlockedFreedom: "Biến tấu: Lựa chọn hoa văn dệt chìm (chữ Thọ, hoa sen, mây thủy ba) và chất liệu tơ tằm nguyên bản.",
    accessoriesNu: [
      "Khăn vấn",
      "Hoa tai ngọc",
      "Vòng cổ truyền thống",
      "Vòng tay vàng",
      "Guốc mộc",
      "Túi thêu"
    ],
    accessoriesNam: [
      "Khăn vấn đầu / Mũ quan",
      "Đai lưng vải",
      "Túi vải mộc",
      "Quạt xếp",
      "Giày vải"
    ],
    accessoriesSummaryNu: "Khăn vấn, hoa tai ngọc, vòng cổ truyền thống, vòng tay vàng, guốc mộc, túi thêu",
    accessoriesSummaryNam: "Khăn vấn đầu, mũ quan, đai lưng, túi vải mộc, quạt xếp, giày vải",
    footwear: "Guốc mộc cổ truyền / Giày vải",
    headwear: "Khăn vấn / Khăn đóng truyền thống",
    comRemarkNu: "Chuẩn nếp Tràng An không lệch một li! Mặc đi dâng hương, lễ cưới hay đại lễ là điểm 10 tuyệt đối nhé!",
    comRemarkNam: "Khí phách nho sĩ đĩnh đạc, chín chắn và vô cùng mẫu mực. Các cụ nhìn là gật đầu khen nức nở!",
    isSolemnSafe: true
  },
  2: {
    level: 2,
    title: "Cổ Điển Nhẹ Nhàng",
    subtitle: "Dịu dàng - Tinh tế - Dễ ứng dụng",
    vibe: "Thanh nhã, hoài cổ nhưng gọn gàng hơn cho sinh hoạt",
    coreRuleLocked: "Khóa chặt: Vạt áo Hữu Nhậm, cúc cài bên sườn, không xẻ tà quá cao.",
    unlockedFreedom: "Biến tấu: Dùng khăn vấn nhung bản mảnh hơn, khuyên tai ngọc trai hiện đại, túi xách mini thêu tay.",
    accessoriesNu: [
      "Trâm cài tóc",
      "Hoa tai mảnh",
      "Vòng cổ tinh tế",
      "Vòng tay ngọc",
      "Túi thêu tay",
      "Cao gót nhẹ"
    ],
    accessoriesNam: [
      "Khăn đóng gọn",
      "Đai lưng",
      "Quạt cầm tay",
      "Túi vải canvas",
      "Giày tây cổ điển"
    ],
    accessoriesSummaryNu: "Trâm cài tóc, hoa tai mảnh, vòng cổ tinh tế, vòng tay ngọc, túi thêu tay, cao gót nhẹ",
    accessoriesSummaryNam: "Khăn đóng gọn, đai lưng, quạt cầm tay, túi vải canvas, giày tây cổ điển",
    footwear: "Giày búp bê lụa / Giày tây cổ điển",
    headwear: "Trâm cài tóc / Khăn đóng gọn",
    comRemarkNu: "Rất đỗi dịu dàng và thanh thoát! Cực kỳ hợp để chụp ảnh kỷ yếu, vãng cảnh đền chùa hay dạo phố Tràng Tiền.",
    comRemarkNam: "Vừa có nét thư sinh nho nhã vừa tiện lợi đi lại dạo phố. Rất phong độ và ưa nhìn!",
    isSolemnSafe: true
  },
  3: {
    level: 3,
    title: "Cách Tân Hiện Đại",
    subtitle: "Giao hòa Xưa & Nay - Năng động",
    vibe: "Hơi thở đương đại, bắt mắt, hòa nhập cuộc sống",
    coreRuleLocked: "Khóa chặt: Form tà áo suôn phẳng, đường ráp nách lượn truyền thống.",
    unlockedFreedom: "Biến tấu: Quần culottes ống lửng lụa, túi đeo chéo mini da, kính mắt gọng kim loại thanh mảnh, giày loafer.",
    accessoriesNu: [
      "Kẹp tóc ngọc trai",
      "Khuyên tai tròn",
      "Vòng cổ mảnh",
      "Túi xách nhỏ",
      "Khăn lụa tơ tằm",
      "Cao gót thời trang"
    ],
    accessoriesNam: [
      "Khăn đóng cách điệu",
      "Đồng hồ lịch lãm",
      "Quạt cầm tay",
      "Túi đeo chéo nhỏ",
      "Giày tây hiện đại"
    ],
    accessoriesSummaryNu: "Kẹp tóc ngọc trai, khuyên tai tròn, vòng cổ mảnh, túi xách nhỏ, khăn lụa tơ tằm, cao gót",
    accessoriesSummaryNam: "Khăn đóng cách điệu, đồng hồ lịch lãm, quạt cầm tay, túi đeo chéo nhỏ, giày tây",
    footwear: "Giày cao gót / Giày tây hiện đại",
    headwear: "Kẹp tóc ngọc trai / Khăn đóng cách điệu",
    comRemarkNu: "Giao lộ hoàn hảo giữa di sản và phong cách trẻ! Mặc đi sự kiện, hội thảo văn hóa hay hẹn hò đều cuốn hút.",
    comRemarkNam: "Trẻ trung, hiện đại mà không làm mất đi khí chất phương Đông. Một bản phối rất có gu!",
    isSolemnSafe: true
  },
  4: {
    level: 4,
    title: "Gen Z Phá Cách (Streetwear)",
    subtitle: "Remix bùng nổ - Cá tính độc bản",
    vibe: "Đột phá, streetwear kết hợp di sản, đậm chất biểu diễn",
    coreRuleLocked: "Khóa chặt: Cổ áo và nếp gấp vạt chuẩn Hữu Nhậm để không biến tướng sang đồ ngoại lai.",
    unlockedFreedom: "Biến tấu: Giày sneaker trắng/chunky, kính mát cá tính, tai nghe chụp tai over-ear, túi đeo chéo streetwear, kẹp tóc Gen Z.",
    accessoriesNu: [
      "Sneaker năng động",
      "Kính mát cá tính",
      "Kẹp tóc Gen Z",
      "Vòng tay cách điệu",
      "Túi mini",
      "Khăn lụa"
    ],
    accessoriesNam: [
      "Vòng tay da cá tính",
      "Quạt gấp gọn",
      "Túi đeo chéo streetwear",
      "Giày sneaker năng động"
    ],
    accessoriesSummaryNu: "Sneaker năng động, kính mát cá tính, kẹp tóc Gen Z, vòng tay cách điệu, túi mini, khăn lụa",
    accessoriesSummaryNam: "Vòng tay da cá tính, quạt gấp gọn, túi đeo chéo streetwear, giày sneaker năng động",
    footwear: "Giày Sneaker năng động",
    headwear: "Kẹp tóc Gen Z / Phụ kiện cá tính",
    comRemarkNu: "Cực kỳ cá tính và hút mắt! Nhưng nhớ chỉ nên diện đi dạo phố, quay TikTok, fesival thôi nha!",
    comRemarkNam: "Remix cực cháy luôn người anh em! Chất streetwear ngập tràn nhưng nhớ để mắt xem hoàn cảnh diện đồ nha!",
    isSolemnSafe: false
  }
};
