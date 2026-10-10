export interface TraditionalColor {
  id: string;
  name: string;
  vietnameseName: string;
  hex: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  meaning: string;
  historyLore: string;
  suitability: string;
}

export const traditionalColors: TraditionalColor[] = [
  {
    id: "cham",
    name: "Màu Chàm (Thanh Chàm)",
    vietnameseName: "Chàm",
    hex: "#1E3D59",
    bgClass: "bg-[#1E3D59]",
    textClass: "text-[#1E3D59]",
    borderClass: "border-[#1E3D59]",
    meaning: "Bình dị, kiên cường, gắn kết lao động dân gian và sự bền bỉ của người Việt.",
    historyLore: "Nhuộm từ cây chàm tự nhiên, đây là sắc màu ngự trị ngàn năm trên áo quần người Việt từ miền núi phía Bắc đến đồng bằng châu thổ. Thanh nhã mà không cầu kỳ.",
    suitability: "Rất hợp đi học, dạo phố, chụp ảnh hoài niệm cổ kính tại Văn Miếu, Cố đô Huế hay phố cổ Hội An."
  },
  {
    id: "do",
    name: "Xích Đào / Đỏ Son",
    vietnameseName: "Đỏ Son",
    hex: "#9E2A2B",
    bgClass: "bg-[#9E2A2B]",
    textClass: "text-[#9E2A2B]",
    borderClass: "border-[#9E2A2B]",
    meaning: "Hỷ khí viên mãn, may mắn, phú quý, xua đuổi điều dữ và chúc phúc trăm năm.",
    historyLore: "Sắc phục đại lễ của công chúa, hoàng thái hậu và cô dâu ngày cưới. Màu đỏ thắm trên áo Nhật Bình hay áo Tấc luôn tượng trưng cho niềm vui tột bực và phúc lộc.",
    suitability: "Đứng đầu bảng cho Lễ cưới, Lễ hỏi, tiệc tân hôn và ngày Tết Nguyên Đán rực rỡ."
  },
  {
    id: "vang",
    name: "Hoàng Bào / Vàng Hoàng Yến",
    vietnameseName: "Vàng Hoàng Yến",
    hex: "#DDA15E",
    bgClass: "bg-[#DDA15E]",
    textClass: "text-[#DDA15E]",
    borderClass: "border-[#DDA15E]",
    meaning: "Đất mẹ trung tâm ngũ hành (Hành Thổ), uy quyền tối thượng, thái bình thịnh trị.",
    historyLore: "Thời phong kiến xưa, màu vàng chính sắc ('Chánh hoàng') là độc quyền của Hoàng đế. Giới quý tộc và thường dân mặc màu vàng hoa quỳ, hoàng yến hoặc hổ phách thanh nhã.",
    suitability: "Rực rỡ cho chụp ảnh sân khấu, dạ hội, kỷ niệm lớn hoặc các buổi lễ hội văn hóa tầm cỡ."
  },
  {
    id: "tim",
    name: "Tím Cố Đô / Tím Hoa Cà",
    vietnameseName: "Tím Huế",
    hex: "#5E3A6E",
    bgClass: "bg-[#5E3A6E]",
    textClass: "text-[#5E3A6E]",
    borderClass: "border-[#5E3A6E]",
    meaning: "Thủy chung, e ấp, trầm mặc, tôn nghiêm và chiều sâu tâm hồn xứ Kinh kỳ.",
    historyLore: "Được mệnh danh là sắc màu đại diện cho xứ Huế mộng mơ, từ áo dài nữ sinh Đồng Khánh đến áo dài của các mệnh phụ trong cung cấm triều Nguyễn.",
    suitability: "Hoàn hảo khi đi vãng cảnh chùa chiền, di tích lịch sử, dạo thuyền sông Hương hay lăng tẩm."
  },
  {
    id: "trang",
    name: "Trắng Ngà / Nguyệt Bạch",
    vietnameseName: "Trắng Ngà",
    hex: "#F4F1DE",
    bgClass: "bg-[#EAE4CC]",
    textClass: "text-[#6B5E3C]",
    borderClass: "border-[#D4CBA7]",
    meaning: "Tinh khôi, thanh tịnh, tâm hồn trong sáng, cốt cách người quân tử và thục nữ.",
    historyLore: "Màu trắng ngà dệt từ tơ tằm tự nhiên không tẩy hóa chất (Nguyệt bạch / Bạch tố) luôn là lớp áo trong (trung đơn) cao quý hoặc bộ áo dài thuần khiết của học trò Việt.",
    suitability: "Cực kỳ ăn ảnh cho kỷ yếu học đường, lễ tốt nghiệp, chụp ảnh đền đài thanh tịnh."
  },
  {
    id: "xanh",
    name: "Lam Ngọc / Xanh Bích",
    vietnameseName: "Xanh Lam Ngọc",
    hex: "#287271",
    bgClass: "bg-[#287271]",
    textClass: "text-[#287271]",
    borderClass: "border-[#287271]",
    meaning: "Mùa xuân đâm chồi, hành Mộc sinh sôi, an nhiên tự tại và hòa hợp cùng đất trời.",
    historyLore: "Rất phổ biến trên các bức tranh cổ thời Lê - Nguyễn. Màu xanh ngọc bích tạo cảm giác mát mẻ dễ chịu trong khí hậu nhiệt đới gió mùa của Việt Nam.",
    suitability: "Thích hợp cho cả 4 mùa, dạo phố Tết, du xuân trẩy hội và check-in không gian xanh."
  }
];
