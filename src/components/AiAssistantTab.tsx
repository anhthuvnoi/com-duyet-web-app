import React, { useState } from "react";
import { DialectVoice } from "../data/dialects";
import { ComMascot } from "./ComMascot";
import { Volume2, Send, RefreshCw, HelpCircle, Sparkles } from "lucide-react";

interface Props {
  dialect: DialectVoice;
  onSpeak: (text: string) => void;
  isSpeaking: boolean;
}

interface Message {
  sender: "com" | "user";
  text: string;
  source?: string;
}

// Cốm Stylist Smart Fallback Generator (chuẩn System Prompt và Persona Gen Z bảo vệ di sản)
function generateComStylistReply(query: string, dialectId: "bac" | "trung" | "nam"): { reply: string; source: string } {
  const q = query.toLowerCase().trim();

  // 1. Áo ngũ thân có 5 hạt cúc
  if (q.includes("ngũ thân") && (q.includes("cúc") || q.includes("năm hạt") || q.includes("5 hạt") || q.includes("hạt cúc"))) {
    if (dialectId === "bac") {
      return {
        reply: `Không phải tự nhiên mà các cụ ngày xưa lại chọn con số 5 đâu cậu nhé! 🌿

Năm hạt cúc trên áo ngũ thân (cúc khảm kim loại hoặc ngọc) mang hai tầng ý nghĩa triết lý sâu xa:
- **Ngũ Thường**: Tượng trưng cho 5 đức tính làm người: Nhân - Nghĩa - Lễ - Trí - Tín.
- **Tứ Thân Phụ Mẫu & Bản Thân**: Bốn thân ngoài đại diện cho cha mẹ đôi bên (cha mẹ mình và cha mẹ người thương), thân con thứ 5 bên trong là chính mình được che chở.

Mặc áo ngũ thân là mặc trọn cả sự khiêm nhường và đạo hiếu đó cậu. Cậu có muốn thử mix một bộ ngũ thân phối cùng khăn vấn không? 👘`,
        source: "Khâm Định Đại Nam Hội Điển Sự Lệ & Triết lý Cổ phục",
      };
    } else if (dialectId === "trung") {
      return {
        reply: `Năm hạt cúc áo ngũ thân là tinh hoa điển chế triều Nguyễn xứ Huế đó nờ! 🌸

- **Ngũ Thường & Ngũ Luân**: Nhắc nhở người mặc luôn giữ trọn Nhân - Lễ - Nghĩa - Trí - Tín cùng đạo nghĩa gia đình xã hội.
- **Thân áo chở che**: Bốn thân áo tựa bốn đấng sinh thành che chở thân con thứ năm e ấp bên trong.

Người Huế cài đủ 5 cúc bên sườn phải là để giữ nếp đoan trang, lịch thiệp. Cậu có muốn Cốm gợi ý thêm màu vải lụa tơ tằm xứ Huế cho bộ ngũ thân ni không hè? ✨`,
        source: "Điển chế Y phục Triều Nguyễn xứ Huế",
      };
    } else {
      return {
        reply: `Năm hạt cúc trên áo ngũ thân siêu ý nghĩa và đỉnh chóp luôn nha bạn hiền! 🌿

- **Ngũ Thường đỉnh nóc**: Tượng trưng cho Nhân - Nghĩa - Lễ - Trí - Tín, mặc lên là thần thái sống đẹp chuẩn không cần chỉnh.
- **Ý nghĩa gia đình**: 4 thân ngoài tượng trưng cho cha mẹ hai bên bao bọc thân thứ 5 là chính bản thân người mặc.

Vừa đẹp vừa mang trọn tinh thần hiếu thảo luôn á. Cậu thích dáng tay chẽn năng động hay tay thụng (áo tấc) thướt tha nè? ✨`,
        source: "Văn hóa Trang phục Nam Bộ & Cổ phục Việt",
      };
    }
  }

  // 2. Yếm đào phối quần jeans / thời trang mùa hè dạo phố
  if (q.includes("yếm") || (q.includes("jeans") && (q.includes("phối") || q.includes("mặc") || q.includes("mang")))) {
    if (dialectId === "bac") {
      return {
        reply: `Ý tưởng táo bạo và rất "vibe" mùa hè đó cậu! 🌸

- **Điểm cộng**: Yếm đào phối với quần jeans cạp cao, khoác thêm một chiếc áo tơ mỏng bên ngoài thì diện mạo cực kỳ "slay" để dạo phố hay cafe chụp hình cùng hội bạn.
- **Lưu ý văn hóa**: Set đồ này khá phóng khoáng, nên cậu nhớ tuyệt đối tránh mặc đến những nơi cần sự tôn nghiêm (như đền, chùa, di tích lịch sử) nhé!

Cậu định phối yếm đào lụa với jeans ống rộng hay skinny thế? Cần tớ gợi ý thêm mẫu vòng cổ kiềng bạc không? ✨`,
        source: "Cốm Stylist • Mix & Match Gen Z",
      };
    } else if (dialectId === "trung") {
      return {
        reply: `Phối yếm đào với jeans là phá cách táo bạo lắm rứa hè! 🌿

- **Phong cách dạo phố**: Cậu có thể khoác thêm áo voan tơ hoặc áo tấc mỏng bên ngoài, vừa giữ được nét e ấp duyên dáng lại vừa thời thượng, chụp hình ở Đại Nội hay quán xá là xinh xỉu!
- **Chuẩn mực nơi tôn nghiêm**: Vào chốn tâm linh đền đài thì không được mặc hở lưng mô nờ, nhớ đổi sang áo ngũ thân kín đáo nghe!

Cậu tính chọn yếm màu đỏ cánh sen hay màu xanh lam ngọc rứa? ✨`,
        source: "Cốm Stylist • Phong vị Cố Đô Remix",
      };
    } else {
      return {
        reply: `U là trời, combo Yếm đào + Jeans cạp cao là bao "dính", chuẩn gu mùa hè luôn nha bạn ơi! 🌸

- **Giao diện cực slay**: Khoác thêm sơ mi tơ mỏng hay cardigan nhẹ bên ngoài là tự tin thả dáng cafe sống ảo vạn người mê.
- **Quy tắc an toàn**: Đi chơi dạo phố thì thoải mái bung xõa, nhưng đi chùa hay nơi trang nghiêm thì nhớ cất set này đi kẻo lệch nếp nha!

Cậu định mang kèm sneaker trắng hay guốc mộc quai nhung nè? 👟`,
        source: "Cốm Stylist • Sài Gòn Năng Động",
      };
    }
  }

  // 3. Đi chùa, đền miếu, mang sneaker phá cách
  if (q.includes("chùa") || q.includes("đền") || q.includes("miếu") || (q.includes("sneaker") && q.includes("tôn nghiêm"))) {
    if (dialectId === "bac") {
      return {
        reply: `Đi chùa cần ưu tiên sự trang nghiêm, nhưng cậu mang sneaker thì hoàn toàn ô kê nhé! 👟

- **Cách phối chuẩn nếp**: Gợi ý của Cốm là cậu nên mix **sneaker trắng/be tối giản** với **Áo ngũ thân tay chẽn** tông màu trầm nhã nhặn (như Chàm, Lam ngọc, Nguyệt bạch).
- **Điểm cần tránh**: Tuyệt đối tránh sneaker màu dạ quang chói lóa, đế hầm hố quá khổ hoặc các phụ kiện cyberpunk ở nơi cửa Phật thanh tịnh.

Giao diện này vừa năng động để đi bộ vãn cảnh, vừa giữ trọn nét thanh lịch Tràng An. Cậu có muốn thử ngắm bộ ngũ thân màu Lam Ngọc không? ✨`,
        source: "Quy chuẩn Văn hóa Lễ nghi & Đi chùa",
      };
    } else if (dialectId === "trung") {
      return {
        reply: `Đến chốn cửa thiền hay lăng tẩm Cố Đô, sự thanh tịnh và cung kính là trên hết rứa nờ! 🪷

- **Nếu mang sneaker**: Hãy chọn sneaker trắng tinh khôi, phom dáng gọn gàng phối cùng Áo Ngũ Thân hoặc Áo Tấc tay thụng buông lơi.
- **Gợi ý chuẩn Huế**: Nếu muốn trọn vẹn nét thơ mộng xưa, một đôi guốc mộc mộc mạc quai nhung đen hoặc hài thêu sẽ làm bộ đồ của cậu xuất sắc hơn nhiều đó!

Cậu muốn Cốm phối thử bộ cổ phục tone Nguyệt Bạch trang nhã để đi viếng cảnh chùa không nè? ✨`,
        source: "Lễ nghi Cung đình & Chốn Tôn Nghiêm xứ Huế",
      };
    } else {
      return {
        reply: `Đi chùa thì tinh thần tôn nghiêm là số một, nhưng Gen Z mang sneaker thì vẫn duyệt được nếu biết cách mix nha! 👟

- **Mix chuẩn bài**: Sneaker trắng/vintage basic phối cùng Áo Ngũ Thân tay chẽn hoặc Áo Dài cách tân tối màu là vừa thoải mái leo tam cấp vừa chuẩn nếp.
- **Không nên**: Cất mấy đôi chunky to tướng hay giày dạ quang neon đi nha bạn hiền, kẻo bị các cụ nhắc nhở á!

Cậu có muốn xem thử set đồ đi lễ chùa vừa đẹp vừa tôn dáng không nè? 🌿`,
        source: "Cốm Stylist • Văn hóa Ứng xử Di Sản",
      };
    }
  }

  // 4. Tối kỵ vạt Tả Nhậm
  if (q.includes("tả nhậm") || q.includes("vạt trái") || q.includes("đạo nhậm") || q.includes("hữu nhậm")) {
    return {
      reply: `Đây là một kiến thức văn hóa cực kỳ cốt lõi mà ai yêu cổ phục cũng phải nằm lòng! 🌿

- **Tả Nhậm (vạt trái đè vạt phải)**: Theo phong tục cổ truyền hàng ngàn năm, nếp vạt này chỉ dùng khi **khâm liệm người đã khuất** trong tang lễ. Mặc Tả Nhậm trong đời sống thường nhật bị coi là xui xẻo, mang điềm tang tóc và sai lệch hoàn toàn về văn hóa.
- **Hữu Nhậm (vạt phải đè vạt trái - Đạo Nhậm)**: Là quy chuẩn bất biến của người sống từ thời Lý, Trần, Lê đến Nguyễn, biểu trưng cho dương khí, sự sinh sôi và hanh thông tài lộc.

Nhớ luôn kiểm tra vạt áo cài sang bên sườn phải trước khi bấm máy chụp hình nha cậu! Cậu có cần Cốm hướng dẫn mẹo cài cúc sườn phải nhanh và phẳng phiu không? ✨`,
      source: "Lễ Ký & Khâm Định Đại Nam Hội Điển Sự Lệ",
    };
  }

  // 5. Chụp kỷ yếu / Văn Miếu / Đi tiệc / Chụp ảnh
  if (q.includes("văn miếu") || q.includes("kỷ yếu") || q.includes("chụp ảnh") || q.includes("màu gì")) {
    return {
      reply: `Không gian Văn Miếu mang sắc ngói đỏ và tường rêu phong cổ kính, nên chọn màu tương phản thanh tao là lên hình bao sáng! ✨

- **Màu sắc đề cử**:
  • **Trắng Ngà (Nguyệt Bạch)**: Tinh khôi, nho nhã, đậm chất sĩ tử Tràng An xưa.
  • **Xanh Lam Ngọc**: Dịu mát, nổi bật trên nền gạch đỏ mà không hề bị chói.
  • **Tím Hoa Cà / Màu Chàm**: Sâu lắng, hoài niệm, tạo chiều sâu cho khung hình.
- **Phom dáng**: Áo Ngũ Thân tay chẽn hoặc Áo Tứ Thân đũi mộc buông tà tự nhiên.

Cậu có muốn mang thêm đạo cụ như quạt xếp giấy dó hay sách thẻ tre để concept kỷ yếu thêm chất lừ không? 🌿`,
      source: "Cốm Stylist • Concept Kỷ Yếu Di Sản",
    };
  }

  // 6. Áo Nhật Bình & hoa văn Thủy Ba
  if (q.includes("nhật bình") || q.includes("thủy ba") || q.includes("hoàng hậu") || q.includes("cung đình")) {
    return {
      reply: `Áo Nhật Bình là tuyệt tác triều phục cung đình triều Nguyễn đó cậu! 👘

- **Tên gọi "Nhật Bình"**: Bắt nguồn từ dải hoa văn thêu quanh cổ tạo thành hình chữ nhật khép kín ngay trước ngực, biểu trưng cho sự ngay thẳng và tôn ti phép tắc.
- **Dải sóng nước Thủy Ba**: Dưới gấu áo và tay áo thêu dải ngũ sắc sóng nước cuồn cuộn dâng trào và mây ngũ sắc, tượng trưng cho phúc lộc và sự vững bền của xã tắc.
- **Vương giả & Đẳng cấp**: Xưa kia chỉ Hoàng hậu, Công chúa và các bậc Mệnh phụ mới có vinh dự khoác lên mình.

Ngày nay Nhật Bình rất được ưa chuộng trong ngày cưới hoặc chụp ảnh kỷ niệm. Cậu có muốn biết thứ bậc màu sắc của áo Nhật Bình qua từng phẩm cấp không? ✨`,
      source: "Trang phục Cung đình Triều Nguyễn - Trần Đình Sơn",
    };
  }

  // 7. Thời tiết nắng nóng miền Nam / Chất liệu vải
  if (q.includes("nắng nóng") || q.includes("thời tiết") || q.includes("chất liệu") || q.includes("vải") || q.includes("miền nam")) {
    return {
      reply: `Trời nắng nóng mà muốn diện cổ phục nhẹ tênh, bí quyết nằm ở việc chọn chất liệu thuần tự nhiên cậu nhé! 🌿

- **Vải Đũi tơ tằm**: Dệt từ tơ sống xước mộc, thấm hút mồ hôi đỉnh cao, càng mặc càng mềm mát.
- **Sa tơ / Tơ sống**: Mỏng nhẹ như mây, tà áo bay bổng khi có gió thoảng, thoáng khí tuyệt đối.
- **Linen tự nhiên**: Đứng phom, tạo nét phong trần hiện đại, rất hợp phối phong cách Gen Z dạo phố.

Tránh xa các loại vải phi bóng nhân tạo hoặc nilon bí bách nha. Cậu muốn Cốm gợi ý một mẫu áo ngũ thân may bằng sa tơ mỏng nhẹ không? 🌸`,
      source: "Làng nghề Lụa Vạn Phúc & Sa Tân Châu Cổ Truyền",
    };
  }

  // 8. Áo Giao Lĩnh & Áo Tứ Thân
  if (q.includes("giao lĩnh") || q.includes("tứ thân") || q.includes("lý") || q.includes("trần") || q.includes("lê")) {
    return {
      reply: `Áo Giao Lĩnh và Tứ Thân là những trang phục có bề dày lịch sử ngàn năm của dân tộc mình! 👘

- **Áo Giao Lĩnh**: Có cổ áo giao nhau bắt chéo trước ngực (bên phải đè bên trái), thịnh hành từ thời Lý, Trần qua thời Lê sơ. Phom áo rộng rãi, tà dài khoan thai toát lên khí chất ung dung tự tại.
- **Áo Tứ Thân**: Biểu tượng mộc mạc của phụ nữ Bắc Bộ với 4 vạt áo tượng trưng cho tứ thân phụ mẫu, kết hợp cùng yếm đào, thắt lưng hoa lý và nón quai thao duyên dáng.

Cậu đang muốn tìm hiểu trang phục cho nam hay cho nữ thế? Để Cốm gợi ý chi tiết hơn nhé! ✨`,
      source: "Ngàn Năm Áo Mũ & Lịch sử Y phục Đại Việt",
    };
  }

  // 9. Phối đồ phá cách với Blazer / Boots / Phụ kiện hiện đại
  if (q.includes("blazer") || q.includes("boot") || q.includes("kính") || q.includes("phá cách") || q.includes("hiện đại") || q.includes("remix")) {
    return {
      reply: `Remix cổ phục với thời trang hiện đại đang là xu hướng cực kỳ bùng nổ của Gen Z! ✨

- **Combo gợi ý**:
  • Áo Ngũ Thân tay chẽn khoác ngoài áo sơ mi cổ tàu + quần âu ống suông.
  • Áo Dài cách tân phối cùng combat boots đen hầm hố cho diện mạo cá tính.
  • Phối kính râm mắt mèo hoặc túi cói thủ công mang lại nét giao thoa văn hóa độc bản.
- **Nguyên tắc vàng**: Giữ phom dáng áo chính đoan chính, chỉ phá cách ở phụ kiện đi kèm để không làm mất đi cốt cách truyền thống.

Cậu đã chuẩn bị những món đồ nào trong tủ rồi? Thử hỏi Cốm cách mix chi tiết xem sao nha! 🌿`,
      source: "Cốm Stylist • Xu hướng Việt Phục Remix Gen Z",
    };
  }

  // 10. General / Fallback câu hỏi mở
  if (dialectId === "trung") {
    return {
      reply: `Ý tưởng này của cậu thú vị lắm nờ! 🌸

- **Về góc độ văn hóa**: Mỗi chi tiết trên cổ phục xứ mình, từ đường kim mũi chỉ, nẹp cổ đến vạt áo đều chứa đựng tinh hoa ngàn năm của cha ông.
- **Gợi ý phối đồ**: Cậu cứ tự tin thử nghiệm các gam màu trầm ấm như Trắng Ngà, Tím Cố Đô hay Lam Ngọc, vừa giữ nét dịu dàng nền nã mà lên hình lại vô cùng nghệ thuật!

Cậu muốn Cốm kể thêm về điển tích triều Nguyễn hay muốn thử ướm ngay một bộ cổ phục lên người búp bê hè? ✨`,
      source: "Cốm Xứ Huế • AI Stylist Di Sản",
    };
  } else if (dialectId === "nam") {
    return {
      reply: `Nghe cậu hỏi là thấy có gu thời trang xịn xò rồi đó nha bạn hiền! 🌿

- **Bí kíp từ Cốm**: Cứ thoải mái sáng tạo phối đồ dạo phố với phong cách Gen Z năng động, miễn là giữ đúng nếp vạt phải (Hữu Nhậm) và tôn trọng chốn tâm linh là bao "slay" luôn.
- **Mẹo lên đồ**: Thử kết hợp cổ phục cùng các chất liệu đũi tơ thoáng mát, tà áo bay nhẹ tênh chụp hình sống ảo bao dính!

Cậu muốn Cốm tư vấn cách mix phụ kiện như nón lá, túi xách hay quạt xếp cho set này không nè? ✨`,
      source: "Cốm Sài Gòn • AI Stylist Di Sản",
    };
  } else {
    return {
      reply: `Góc nhìn này của cậu rất hay và cho thấy cậu thực sự quan tâm đến di sản áo mũ nước mình đấy nhé! 🌿

- **Góc nhìn Stylist**: Cổ phục Việt Nam từ thời Lý, Trần, Lê đến Nguyễn sở hữu vẻ đẹp đa dạng và chiều sâu triết lý phong phú. Phối đồ vừa giữ được hồn cốt ngàn năm, vừa mang hơi thở trẻ trung hiện đại chính là tinh thần của "Việt Phục Remix".
- **Gợi ý nhanh**: Nếu muốn lên đồ đi chơi hay chụp ảnh, hãy ưu tiên chọn phom Áo Ngũ Thân tay chẽn hoặc Áo Giao Lĩnh với các tông màu thanh nhã như Nguyệt Bạch hoặc Lam Ngọc.

Cậu có muốn biết thêm cách chọn phụ kiện như kiềng bạc, quạt xếp hay hài thêu cho chuẩn nếp không? ✨`,
      source: "Cốm Duyệt • AI Stylist Di Sản",
    };
  }
}

// Helper renderer for Markdown-like bold and bullet text
const FormattedMessageText: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split("\n");
  return (
    <div className="space-y-1.5 leading-relaxed">
      {lines.map((line, idx) => {
        if (!line.trim()) {
          return <div key={idx} className="h-1.5" />;
        }

        const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("• ");
        const content = isBullet ? line.trim().substring(2) : line;

        // Split by **bold** text
        const parts = content.split(/(\*\*.*?\*\*)/g);

        return (
          <div key={idx} className={isBullet ? "flex items-start gap-1.5 pl-2" : ""}>
            {isBullet && <span className="text-emerald-500 font-bold select-none">•</span>}
            <p className="flex-1">
              {parts.map((part, pIdx) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                  return (
                    <strong key={pIdx} className="font-bold text-emerald-950 bg-emerald-50/60 px-1 py-0.5 rounded">
                      {part.slice(2, -2)}
                    </strong>
                  );
                }
                return <span key={pIdx}>{part}</span>;
              })}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export const AiAssistantTab: React.FC<Props> = ({ dialect, onSpeak, isSpeaking }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "com",
      text: dialect.greeting,
      source: "Linh vật Cốm Duyệt"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "Tại sao áo ngũ thân có 5 hạt cúc?",
    "Có được mang yếm đào với quần jeans không?",
    "Đi chùa hay đền miếu có được mang sneaker phá cách không?",
    "Tại sao tối kỵ mặc vạt Tả Nhậm?",
    "Chụp kỷ yếu ở Văn Miếu nên mặc màu gì?",
    "Áo Nhật Bình có ý nghĩa và hoa văn gì?",
    "Thời tiết nắng nóng nên chọn chất liệu gì?",
    "Phối blazer với áo ngũ thân dạo phố được không?"
  ];

  const handleSend = async (query?: string) => {
    const textToSend = query || input;
    if (!textToSend.trim()) return;

    const userMsg: Message = { sender: "user", text: textToSend };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    if (!query) setInput("");
    setIsTyping(true);

    try {
      // Gọi Server-side Gemini API (/api/chat)
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          dialect: dialect.id,
          history: updatedMessages
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          setMessages((prev) => [
            ...prev,
            {
              sender: "com",
              text: data.reply,
              source: data.source || `${dialect.name} • Gemini AI Stylist`
            }
          ]);
          setIsTyping(false);
          return;
        }
      }
    } catch (err) {
      console.warn("API /api/chat offline or failed, falling back to Cốm smart stylist:", err);
    }

    // Fallback: Smart Cốm Stylist Persona (Gen Z, lịch sử uyên bác, zero rập khuôn)
    setTimeout(() => {
      const fallback = generateComStylistReply(textToSend, dialect.id);
      setMessages((prev) => [
        ...prev,
        {
          sender: "com",
          text: fallback.reply,
          source: fallback.source
        }
      ]);
      setIsTyping(false);
    }, 400);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-emerald-100 p-4 sm:p-6 max-w-4xl mx-auto flex flex-col h-[650px]">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-emerald-100 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center border-2 border-emerald-500 shadow-md animate-mascot-float overflow-hidden">
            <ComMascot className="w-12 h-12" expression="happy" />
          </div>
          <div>
            <h3 className="font-black text-sm sm:text-base text-emerald-950 flex items-center gap-2">
              Trợ Lý AI {dialect.name}
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                {dialect.badge}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full font-semibold">
                <Sparkles className="w-2.5 h-2.5 text-amber-600" /> AI Stylist Gen Z
              </span>
            </h3>
            <p className="text-xs text-emerald-600">
              Giải đáp cặn kẽ điển chế triều đình, phong tục và bí kíp phối đồ chuẩn văn hóa
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                sender: "com",
                text: dialect.greeting,
                source: "Linh vật Cốm Duyệt"
              }
            ])
          }
          className="p-2 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-all cursor-pointer"
          title="Làm mới cuộc trò chuyện"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="mb-3">
        <div className="text-[11px] font-bold text-slate-500 mb-1.5 flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>Gợi ý câu hỏi nhanh cho Cốm:</span>
        </div>
        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pb-1 no-scrollbar">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 px-2.5 py-1 rounded-xl transition-all font-medium text-left truncate max-w-full cursor-pointer"
            >
              ✦ {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[88%] sm:max-w-[80%] p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-xs ${
                msg.sender === "user"
                  ? "bg-emerald-600 text-white rounded-br-none"
                  : "bg-white text-slate-800 rounded-bl-none border border-emerald-100"
              }`}
            >
              {msg.sender === "user" ? (
                <div className="whitespace-pre-wrap">{msg.text}</div>
              ) : (
                <FormattedMessageText text={msg.text} />
              )}

              {msg.sender === "com" && (
                <div className="mt-2.5 pt-2 border-t border-emerald-100/70 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-emerald-700 italic font-medium truncate">
                    {msg.source ? `📚 ${msg.source}` : ""}
                  </span>
                  <button
                    onClick={() => onSpeak(msg.text)}
                    className="text-[11px] text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 py-0.5 px-2 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors cursor-pointer shrink-0"
                    title="Nghe Cốm đọc to câu này"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>Nghe giọng</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl text-xs text-slate-500 border border-emerald-100 flex items-center gap-2 shadow-2xs">
              <span className="text-base animate-bounce">{dialect.avatarEmoji}</span>
              <span className="text-emerald-800 font-medium animate-pulse">Cốm đang suy nghĩ gợi ý cho cậu...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Field */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={`Hỏi ${dialect.name} về vạt áo, phối đồ Gen Z, điển cố lịch sử...`}
          className="flex-1 px-4 py-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Gửi Cốm</span>
        </button>
      </div>
    </div>
  );
};
