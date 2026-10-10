import imgNhatBinh from "../assets/images/regenerated_image_1791295938896.webp";
import imgNguThan from "../assets/images/regenerated_image_1791295940047.webp";
import imgTuThan from "../assets/images/regenerated_image_1791295944018.jpg";
import imgGiaoLinh from "../assets/images/regenerated_image_1791295945668.jpg";
import imgAoDai from "../assets/images/regenerated_image_1791295946955.jpg";

const imgNamGiaoLinh = new URL("../../goiy-kyyeu.webp", import.meta.url).href;
const imgNamNguThan = new URL("../../goiy-codo.webp", import.meta.url).href;

export interface CostumeLayers {
  outerwear: string;
  innerwear?: string;
  bottom: string;
  waistband?: string;
  fasteners?: string;
  headwear: string;
  footwear: string;
  accessories: string[];
}

export interface Outfit {
  id: string;
  name: string;
  aliases?: string[];
  dynasty: string;
  occasion: string;
  score: number;
  img: string;
  desc: string;
  correctWay: string;
  coreRule: string;
  note: string;
  recommendedFabric: string;
  layers: CostumeLayers;
}

export const outfitDatabase: Record<"nu" | "nam", Outfit[]> = {
  nu: [
    {
      id: "n_nhatbinh",
      name: "Áo Nhật Bình",
      aliases: ["Áo Phi Phong Cung Đình Triều Nguyễn"],
      dynasty: "Triều Nguyễn (1802 - 1945)",
      occasion: "Lễ cưới/Ăn hỏi",
      score: 9.5,
      img: imgNhatBinh,
      desc: "Phẩm phục cung đình triều Nguyễn với hoa văn cổ áo trước ngực tạo thành ô hình chữ nhật lớn (Nhật Bình). Áo rộng, màu sắc rực rỡ, sang trọng.",
      correctWay: "Mặc ngoài áo tấc hoặc đối khâm, kết hợp khăn vành dây/mấn cầu kỳ và hài thêu hoa văn cung đình.",
      coreRule: "Khóa gen: Dải cổ vuông chữ nhật trước ngực bao quanh cổ, viền ngũ sắc thủy ba và vạt áo thả thẳng thớm uy nghiêm.",
      note: "Do mang tính chất trang nghiêm, hoàng tộc, khi Gen Z phối đi chụp kỷ yếu hoặc sự kiện lớn, cần chú ý chọn bối cảnh phù hợp và giữ nguyên phom dáng rộng suông vốn có của áo.",
      recommendedFabric: "Gấm dệt tơ tằm, sa trơn hoặc đoạn cao cấp.",
      layers: {
        outerwear: "Áo Nhật Bình chính (Cổ chữ nhật, tay viền dải ngũ sắc thủy ba)",
        innerwear: "Áo tấc hoặc áo đối khâm trắng mặc lót bên trong",
        bottom: "Quần lụa trắng ống suông rộng",
        headwear: "Khăn vành dây quấn nhiều vòng hoặc mấn cung đình cầu kỳ, trâm cài tóc",
        footwear: "Hài thêu hoa văn cung đình mũi cong",
        accessories: ["Kiềng cổ vàng/bạc chạm hoa sen", "Quạt lụa thêu", "Khánh ngọc"]
      }
    },
    {
      id: "n_nguthan",
      name: "Áo Ngũ Thân Nữ",
      aliases: ["Áo ngũ thân lập lĩnh", "Áo năm thân"],
      dynasty: "Chúa Nguyễn & Triều Nguyễn",
      occasion: "Đi chùa/Đi di tích",
      score: 9.0,
      img: imgNguThan,
      desc: "Gồm 5 thân áo (4 thân chính và 1 thân phụ), ôm vừa vặn cơ thể, tôn lên vóc dáng thanh lịch của phụ nữ Việt.",
      correctWay: "Cài cúc bên phải chuẩn Đạo Nhậm, kết hợp khăn đóng (mấn) nhỏ, quạt cầm tay, túi gấm, giày vải hoặc guốc mộc.",
      coreRule: "Khóa gen: 5 thân áo định hình phom dáng, cài đủ 5 khuy bên mạn sườn phải (Hữu Nhậm), giữ form cổ đứng lập lĩnh kín đáo.",
      note: "Tránh bóp eo quá sát bằng các chất liệu co giãn mạnh hiện đại vì sẽ làm hỏng form dáng chuẩn mực của tà áo ngũ thân.",
      recommendedFabric: "Đũi tơ tằm, lụa Vạn Phúc, lụa Hà Đông dệt thoáng mát.",
      layers: {
        outerwear: "Thân áo ngũ thân cài 5 khuy bên mạn sườn phải",
        innerwear: "Áo lót cánh trắng / Trung đơn cổ đứng thấp",
        bottom: "Quần lụa ống sớ (Quần trắng hoặc đen suông dài)",
        fasteners: "5 Nút áo / Khuy áo (Biểu trưng cho Ngũ Luân & Ngũ Thường)",
        headwear: "Khăn đóng (mấn) nhỏ ôm đầu gọn gàng",
        footwear: "Giày vải đen thêu hoa hoặc guốc mộc",
        accessories: ["Quạt cầm tay", "Túi gấm rút dây", "Chuỗi ngọc"]
      }
    },
    {
      id: "n_tuchan",
      name: "Áo Tứ Thân & Yếm Đào",
      aliases: ["Áo Mớ Ba Mớ Bảy", "Áo Bốn Vạt Bắc Bộ"],
      dynasty: "Dân gian miền Bắc (Từ thời Lê - Nguyễn)",
      occasion: "Đi học/Kỷ yếu",
      score: 8.8,
      img: imgTuThan,
      desc: "Gồm 4 tà áo rời (2 tà trước buộc thắt hoặc buông, 2 tà sau may liền), mang đậm nét văn hóa truyền thống của phụ nữ Bắc Bộ xưa.",
      correctWay: "Mặc yếm đào bên trong, thắt lưng dải lụa (bao hàm), nón quai thao hoặc nón hoa sen, khăn mỏ quạ.",
      coreRule: "Khóa gen: Form áo mở vạt trước khoe duyên yếm lót đào, buộc dải lụa bao hàm ngang eo cân đối.",
      note: "Tuyệt đối không được bỏ quên yếm đào bên trong vì đây là mảnh ghép cốt lõi tạo nên lớp lang và vẻ đẹp kín đáo mà gợi cảm của áo tứ thân.",
      recommendedFabric: "Vải đũi mộc, tơ tằm tự nhiên, lụa tơ sống nhuộm củ nâu/chàm.",
      layers: {
        outerwear: "Áo Mớ Ba (Áo tứ thân ngoài nhiều lớp chuyển màu nhuộm tự nhiên)",
        innerwear: "Yếm đào bên trong (Mảnh ghép cốt lõi tạo nên lớp lang)",
        bottom: "Chân váy đầm đen tuyền dài chấm mắt cá",
        waistband: "Thắt lưng dải lụa (Bao hàm nhiều màu vàng, xanh, đỏ buộc nút)",
        headwear: "Nón hoa sen / Nón quai thao hoặc khăn mỏ quạ",
        footwear: "Guốc mộc gót cong hoặc dép quai nhung",
        accessories: ["Khăn tay lụa", "Dây chuyền hạt cườm ngọc"]
      }
    },
    {
      id: "n_giaulinh",
      name: "Áo Giao Lĩnh Nữ",
      aliases: ["Áo đối cổ", "Áo cổ chéo Đại Việt"],
      dynasty: "Thời Lý - Trần - Lê Sơ",
      occasion: "Sân khấu/Dạ hội",
      score: 9.2,
      img: imgGiaoLinh,
      desc: "Là loại áo cổ lâu đời nhất của người Việt, có hai vạt áo đắp chéo trước ngực (vạt bên trái đè lên vạt bên phải).",
      correctWay: "Dùng đai lưng vải bản mềm, búi trâm cài tóc hoặc vấn tóc gọn gàng, guốc mộc hoặc giày búp bê tối giản.",
      coreRule: "Khóa gen: Nếp vạt chéo phải nằm đúng chiều (trái đè phải) theo truyền thống, góc chữ V thanh thoát trước ngực.",
      note: "Cần chú ý nếp vạt chéo phải nằm đúng chiều (trái đè phải) theo truyền thống. Khi cách tân, có thể kết hợp với chân váy dài hoặc quần suông để tạo sự thanh thoát, tránh mặc váy quá ngắn làm mất đi nét trang nhã.",
      recommendedFabric: "Lụa gấm tơ tằm, vải sa dệt hoa sen hoặc hoa văn mây sóng Lý - Trần.",
      layers: {
        outerwear: "Áo Giao Lĩnh dáng dài đến bắp chân dưới (Cổ vạt chéo chữ Y nẹp to phẳng phiu, tay thụng rộng chùng nhẹ)",
        innerwear: "Áo lót trong (Trung đơn trắng ngà cổ giao lĩnh)",
        bottom: "Quần lụa trắng suông dài hoặc váy xẫng tha thướt",
        waistband: "Dải lụa trắng thắt eo to bản với hai dải lụa buông dài qua đầu gối",
        headwear: "Búi trâm cài tóc hoặc hoa cài đầu / Mấn",
        footwear: "Guốc mộc hoặc giày búp bê lụa",
        accessories: ["Vòng cổ ngọc", "Nón dù che nắng", "Quạt xếp nan giấy"]
      }
    },
    {
      id: "n_aodai",
      name: "Áo Dài Cách Tân Gen Z",
      aliases: ["Modernized Ao Dai", "Áo dài cách tân đương đại"],
      dynasty: "Phục Hưng Đương Đại",
      occasion: "Dạo phố Tết",
      score: 9.7,
      img: imgAoDai,
      desc: "Biến tấu từ áo dài truyền thống với tà ngắn hơn, tay lỡ hoặc cách điệu, kết hợp màu sắc và họa tiết trẻ trung.",
      correctWay: "Phối cùng giày cao gót mũi nhọn thanh mảnh, túi gấm thêu hoa sen, khăn vấn nhung hoặc mấn mini cách điệu.",
      coreRule: "Khóa gen: Thân trước phẳng phiu, trơn nhẵn tôn dáng, cổ tròn thanh lịch và đường xẻ tà ngang eo duyên dáng cân đối trước sau.",
      note: "Dễ ứng dụng nhất hàng ngày nhưng cần tiết chế các chi tiết cách tân quá đà để giữ trọn vẻ đẹp thanh lịch của tà áo dài.",
      recommendedFabric: "Lụa tơ tằm Bảo Lộc, lụa gấm dệt hoa mai, tơ nhung mềm rủ.",
      layers: {
        outerwear: "Áo dài tà lỡ / tà ngắn trẻ trung với hoa văn dệt chìm hoặc in hiện đại",
        bottom: "Quần suông lụa ống rộng hoặc chân váy xếp ly cách tân",
        headwear: "Băng đô nhung hoặc mấn mini cách điệu, kẹp tóc ngọc trai",
        footwear: "Giày cao gót mũi nhọn thời trang thanh mảnh",
        accessories: ["Túi gấm thêu hoa sen", "Khăn lụa tơ tằm", "Vòng tay vàng"]
      }
    }
  ],
  nam: [
    {
      id: "m_giaulinh",
      name: "Áo Giao Lĩnh Nam",
      aliases: ["Áo cổ chéo nam", "Đại Việt nho sinh phục", "Giao Lĩnh lam sắc"],
      dynasty: "Thời Lý - Trần - Lê Sơ",
      occasion: "Đi học/Kỷ yếu",
      score: 9.6,
      img: imgNamGiaoLinh,
      desc: "Trang phục Áo Giao Lĩnh nam truyền thống với vạt áo đắp chéo chữ V Hữu Nhậm lộ nếp áo lót trắng thanh tao, tay thụng buông rủ phóng khoáng, kết hợp cùng quần lụa trắng và guốc mộc, toát lên phong thái nho nhã của bậc Nho sinh Đại Việt.",
      correctWay: "Mặc áo trung đơn trắng bên trong, tà áo ngoài đắp vạt chéo trái đè phải (chuẩn Hữu Nhậm), kết hợp quần lụa trắng dài chấm mắt cá chân, đi guốc mộc truyền thống, hai tay cầm quạt nan tre thư thái.",
      coreRule: "Khóa gen: Nếp vạt chéo Hữu Nhậm cổ chữ V thanh thoát, tay áo thụng rộng buông rủ, phối chuẩn mực cùng quần lụa trắng và đôi guốc mộc xưa.",
      note: "Sắc áo kết hợp lụa trắng tạo nên vẻ đẹp thanh cao, đĩnh đạc. Khi Gen Z ứng dụng chụp ảnh kỷ yếu hay du xuân, nên giữ trọn vẹn nét mộc mạc với quạt nan tre và guốc mộc, tránh mang sneaker quá hầm hố làm lệch phong thái nho sinh.",
      recommendedFabric: "Vải đũi tơ tằm thô mộc, lụa sa dệt thưa thoáng khí, tơ sống tự nhiên.",
      layers: {
        outerwear: "Áo Giao Lĩnh nam (Cổ giao lĩnh vạt chéo chữ V, tay áo thụng buông rủ)",
        innerwear: "Áo lót trung đơn trắng ngà lộ viền cổ chữ V và mép tay áo",
        bottom: "Quần lụa trắng ống suông rộng buông rủ mềm mại",
        waistband: "Dây buộc vải lụa mềm định hình phom áo",
        headwear: "Tóc búi gọn gàng hoặc khăn vấn mộc mạc",
        footwear: "Guốc mộc truyền thống hai quai đen",
        accessories: ["Quạt xếp nan tre/giấy mộc cầm hai tay", "Túi vải mộc phong cách thư sinh"]
      }
    },
    {
      id: "m_nguthan",
      name: "Áo Ngũ Thân Nam",
      aliases: ["Áo ngũ thân lập lĩnh", "Quốc phục nam triều Nguyễn", "Áo ngũ thân tay chẽn / Áo tấc"],
      dynasty: "Triều Nguyễn (1802 - 1945)",
      occasion: "Đi chùa/Đi di tích",
      score: 9.8,
      img: imgNamNguThan,
      desc: "Áo Ngũ Thân nam truyền thống triều Nguyễn với cổ đứng lập lĩnh kín đáo cài 5 cúc bên sườn phải, đội khăn đóng đen, quần lụa trắng ống sớ và hài/giày đen trang trọng, đậm chất đạo mạo, quân tử của đấng nam nhi xưa.",
      correctWay: "Đội khăn đóng đen (khăn xếp) quấn chuẩn nếp chữ Nhân/chữ Nhất, cài đủ 5 khuy bên mạn sườn phải (chuẩn Đạo Nhậm), mặc quần lụa trắng ống sớ thẳng phom, đi giày đen trang trọng.",
      coreRule: "Khóa gen: 5 hạt cúc biểu tượng Ngũ Luân (Quân Thần, Phụ Tử, Phu Thê, Huynh Đệ, Bằng Hữu) & Ngũ Thường (Nhân Lễ Nghĩa Trí Tín), kết hợp khăn đóng đen định hình khí phách quân tử.",
      note: "Áo may phom suông rộng vừa vặn tôn vóc dáng đĩnh đạc, khoan thai. Lớp lót trong tà áo tạo điểm nhấn sang trọng khi cử động. Rất thích hợp khi vãng cảnh cố đô, di tích hoặc nghi lễ truyền thống.",
      recommendedFabric: "Gấm dệt tơ tằm, sa đoạn cao cấp đứng phom, lụa Vạn Phúc.",
      layers: {
        outerwear: "Thân áo ngũ thân nam cài 5 khuy bên mạn sườn phải, cổ đứng lập lĩnh",
        innerwear: "Áo lót cánh trắng / trung đơn trắng viền cổ và tay áo",
        bottom: "Quần lụa trắng ống sớ thẳng tắp",
        fasteners: "5 Nút áo / Khuy áo kim hoàn hoặc ngọc cài bên sườn phải",
        headwear: "Khăn đóng nam truyền thống màu đen (khăn xếp)",
        footwear: "Giày đen bóng lịch lãm hoặc guốc mộc / hài vải",
        accessories: ["Kính mắt phong cách tân thời tri thức", "Đồng hồ dây da", "Quạt lụa thêu"]
      }
    }
  ]
};
