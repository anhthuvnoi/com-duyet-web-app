export interface DialectVoice {
  id: "bac" | "trung" | "nam";
  region: string;
  name: string;
  avatarEmoji: string;
  badge: string;
  tagline: string;
  characteristicWords: string[];
  greeting: string;
  evaluateGood: (score: number, outfitName: string) => string;
  evaluateWarning: (outfitName: string, occasion: string) => string;
  quickAudioSnippet: string;
  speechRate: number;
  speechPitch: number;
}

export const voiceDialects: Record<"bac" | "trung" | "nam", DialectVoice> = {
  bac: {
    id: "bac",
    region: "Miền Bắc",
    name: "Cốm Duyệt",
    avatarEmoji: "🌱",
    badge: "Hà Nội phố",
    tagline: "Thanh lịch - Chuẩn nếp - Tinh tế",
    characteristicWords: ["nhé", "nhỉ", "ạ", "thế", "đấy", "chuẩn nếp"],
    greeting: "Chào cậu nhé! Tớ là Cốm Duyệt đây, cùng tớ khám phá cổ phục Việt Nam chuẩn nếp Tràng An nha!",
    evaluateGood: (score, outfitName) =>
      `Bộ ${outfitName} này chuẩn nếp quá, Cốm chấm ${score}/10 điểm! Mặc lên thanh lịch, đoan trang mà vẫn toát nét riêng của cậu nhé!`,
    evaluateWarning: (outfitName, occasion) =>
      `Cẩn thận đấy cậu ơi! Phối nấc Gen Z phá cách với ${outfitName} khi đi ${occasion} là hơi lệch nếp cổ truyền mất rồi, đổi lại xí cho tôn nghiêm nha!`,
    quickAudioSnippet: "Bộ này chuẩn nếp quá, mặc lên thanh lịch lắm nhé!",
    speechRate: 0.95,
    speechPitch: 1.05
  },
  trung: {
    id: "trung",
    region: "Miền Trung",
    name: "Cốm Xứ Huế",
    avatarEmoji: "🪷",
    badge: "Cố đô Huế",
    tagline: "Mộng mơ - Nết na - Thơ mộng",
    characteristicWords: ["hỉ", "rứa", "răng", "mô", "ni", "nờ", "mệ"],
    greeting: "Mệ với bợn chào hỉ! Tớ là Cốm Huế đây mờ, răng mà thương tà áo dài với cổ phục Việt Nam rứa nờ!",
    evaluateGood: (score, outfitName) =>
      `Bộ ${outfitName} ni đúng nếp cung đình rứa hè, được ${score}/10 điểm luôn! Mặc vô nhìn dịu dàng đậm chất thơ xứ Huế nờ!`,
    evaluateWarning: (outfitName, occasion) =>
      `Răng mà phối rứa hỉ? ${outfitName} mang đi ${occasion} mà chơi sneaker hầm hố rứa là không hợp mô, sửa lại xí cho đúng lễ nghi nờ!`,
    quickAudioSnippet: "Bộ ni đúng nếp rứa hè, mặc vô đẹp xuất sắc nờ!",
    speechRate: 0.9,
    speechPitch: 1.1
  },
  nam: {
    id: "nam",
    region: "Miền Nam",
    name: "Cốm Sài Gòn",
    avatarEmoji: "✨",
    badge: "Sài Gòn năng động",
    tagline: "Phóng khoáng - Gen Z - Bắt trend",
    characteristicWords: ["nha", "nè", "hen", "hông", "quá trời", "xinh xỉu"],
    greeting: "Hello bạn hiền nha! Tớ là Cốm Sài Gòn nè, sẵn sàng quậy tung bộ sưu tập Việt phục remix Gen Z chưa hen!",
    evaluateGood: (score, outfitName) =>
      `Trời ơi bộ ${outfitName} này slay quá chừng nè! Cốm chấm ngay ${score}/10 điểm, mặc vô là xinh xỉu up xỉu down luôn nha!`,
    evaluateWarning: (outfitName, occasion) =>
      `Hông bé ơi! Phối đồ kiểu này đi ${occasion} là dễ bị các bác nhắc nhở lắm nha! Đổi phụ kiện cho lịch sự hơn lẹ lên nè!`,
    quickAudioSnippet: "Bộ này chuẩn quá trời luôn nè, mặc vô xinh xỉu nha!",
    speechRate: 1.02,
    speechPitch: 1.0
  }
};
