export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  dynastyContext: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Vạt áo chuẩn mực của trang phục cổ truyền Việt Nam cài theo chiều nào?",
    options: [
      "Tả Nhậm (vạt trái đắp lên vạt phải)",
      "Hữu Nhậm / Đạo Nhậm (vạt phải đắp lên vạt trái)",
      "Cài cúc thẳng chính giữa ngực",
      "Muốn cài bên nào cũng được tùy thuận tay"
    ],
    correctIndex: 1,
    explanation: "Chính xác! Cổ phục Việt Nam chuẩn mực luôn là Hữu Nhậm (Đạo Nhậm) - vạt phải đắp lên vạt trái, cài cúc bên mạn sườn phải. Ngược lại, Tả Nhậm chỉ dùng khi liệm người đã khuất, tuyệt đối tối kỵ khi mặc đời thường!",
    dynastyContext: "Quy chuẩn y phục truyền thống Việt Nam qua các triều đại Lý, Trần, Lê, Nguyễn."
  },
  {
    id: 2,
    question: "5 hạt cúc trên thân áo Ngũ Thân thời Nguyễn mang ý nghĩa sâu xa gì?",
    options: [
      "Chỉ để trang trí cho đẹp mắt và đều đặn",
      "Tượng trưng cho 5 châu lục trên thế giới",
      "Tượng trưng cho Ngũ Luân (đạo làm người) và Ngũ Thường (đức hạnh)",
      "Tượng trưng cho 5 triều đại thịnh trị nhất"
    ],
    correctIndex: 2,
    explanation: "Rất chuẩn! 5 hạt cúc biểu trưng cho Ngũ Luân (Quân Thần, Phụ Tử, Phu Thê, Huynh Đệ, Bằng Hữu) và Ngũ Thường (Nhân, Lễ, Nghĩa, Trí, Tín) - nhắc nhở người mặc luôn giữ gìn luân thường đạo lý.",
    dynastyContext: "Định chế triều Nguyễn từ thời Chúa Nguyễn Phúc Khoát và Vua Minh Mạng."
  },
  {
    id: 3,
    question: "Tên gọi 'Áo Nhật Bình' bắt nguồn từ đặc điểm nhận diện nào trên thân áo?",
    options: [
      "Áo chỉ được mặc vào ngày ban ngày lúc có mặt trời",
      "Dải hoa văn thêu trước ngực tạo thành hình chữ nhật khép kín quanh cổ",
      "Áo được du nhập từ đất nước Nhật Bản",
      "Vạt áo tròn xoe như mặt trời đỏ"
    ],
    correctIndex: 1,
    explanation: "Đúng rồi! 'Nhật' ở đây là hình chữ nhật. Dải hoa văn cổ áo khép lại trước ngực tạo thành hình chữ nhật đặc trưng, dải rủ xuống ngũ sắc tượng trưng cho ngũ hành và sóng nước thủy ba uy nghi.",
    dynastyContext: "Áo phi phong của Hậu phi, Công chúa và mệnh phụ triều Nguyễn."
  },
  {
    id: 4,
    question: "Tại sao cổ nhân cấm kỵ mặc áo vạt 'Tả Nhậm' trong cuộc sống thường nhật?",
    options: [
      "Vì mặc vạt trái khó cử động tay hơn",
      "Vì tốn vải hơn vạt phải",
      "Vì Tả Nhậm theo phong tục xưa là nếp áo mặc cho người đã mất khi khâm liệm",
      "Vì màu vải bên trái dễ bị bạc màu dưới ánh nắng"
    ],
    correctIndex: 2,
    explanation: "Tuyệt vời! Theo quan niệm cổ xưa của người Việt và phương Đông, người sống thuộc dương mặc Hữu Nhậm, người khuất thuộc âm mặc Tả Nhậm. Mặc Tả Nhậm đi lễ hội hay tiệc tùng bị coi là điềm xui xẻo và phạm điều đại kỵ.",
    dynastyContext: "Phong tục tang lễ và y lễ cổ truyền Việt Nam."
  },
  {
    id: 5,
    question: "Dưới triều phong kiến, màu sắc nào là 'Chánh sắc' độc quyền của Hoàng đế?",
    options: [
      "Màu Đỏ thắm (Xích)",
      "Màu Vàng chính sắc (Hoàng bào)",
      "Màu Tím đậm (Tử)",
      "Màu Đen tuyền (Huyền)"
    ],
    correctIndex: 1,
    explanation: "Xuất sắc! Màu Vàng chính sắc (Chánh hoàng) ứng với hành Thổ ở trung tâm ngũ hành, tượng trưng cho thiên tử cai quản bốn phương. Thường dân và quan lại chỉ được dùng các sắc vàng phụ như hoàng yến, vàng quỳ hoặc các màu khác.",
    dynastyContext: "Điển chế phẩm phục triều đình nhà Nguyễn và các triều đại quân chủ."
  }
];
