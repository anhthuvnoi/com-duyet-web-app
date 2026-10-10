export interface ClothesItem {
  id: string;
  name: string;
  gender: 'Nam' | 'Nữ';
  style: 'Truyền thống' | 'Hiện đại';
  category: 'Lớp Trong' | 'Áo Ngoài' | 'Quần & Váy' | 'Phụ Kiện' | 'Giày Dép';
  imageUrl: string;
  thumbnail?: string;
  description: string;
}

export const clothesData: ClothesItem[] = [
  // ==========================================
  // I. TRANG PHỤC TRUYỀN THỐNG (truyen_thong.pdf)
  // ==========================================

  // 1. Lớp Trong
  {
    id: 'ao_yem_nu',
    name: 'Áo yếm thêu sen',
    gender: 'Nữ',
    style: 'Truyền thống',
    category: 'Lớp Trong',
    imageUrl: '/assets/clothes/ao_yem.png',
    thumbnail: '/assets/clothes/ao_yem.png',
    description: 'Yếm lụa đào thêu hoa sen phượng hoàng, tôn trọn bờ vai thon thả chuẩn vẻ đẹp Á Đông.'
  },

  // 2. Áo Ngoài
  {
    id: 'ao_ngu_than_tay_chen_nam',
    name: 'Áo ngũ thân tay chẽn nam',
    gender: 'Nam',
    style: 'Truyền thống',
    category: 'Áo Ngoài',
    imageUrl: '/assets/clothes/ao_ngu_than_tay_chen_nam.png',
    thumbnail: '/assets/clothes/ao_ngu_than_tay_chen_nam.png',
    description: 'Gấm đỏ đô dệt hoa văn chìm sang trọng, 5 khuy cài bên sườn toát lên khí chất thư sinh đĩnh đạc.'
  },
  {
    id: 'ao_giao_linh_nam',
    name: 'Áo giao lĩnh nam',
    gender: 'Nam',
    style: 'Truyền thống',
    category: 'Áo Ngoài',
    imageUrl: '/assets/clothes/ao_giao_linh_nam.png',
    thumbnail: '/assets/clothes/ao_giao_linh_nam.png',
    description: 'Sắc xanh lam thêu rồng mây thủy ba uy nghiêm, cổ chéo giao nhau đĩnh đạc đậm chất nho sĩ.'
  },
  {
    id: 'ao_ngu_than_tay_chen_nu',
    name: 'Áo ngũ thân tay chẽn nữ',
    gender: 'Nữ',
    style: 'Truyền thống',
    category: 'Áo Ngoài',
    imageUrl: '/assets/clothes/ao_ngu_than_tay_chen_nu.png',
    thumbnail: '/assets/clothes/ao_ngu_than_tay_chen_nu.png',
    description: 'Sắc vàng hoàng yến trang nhã, phom áo suông thanh lịch cài 5 khuy bên sườn kín đáo đoan trang.'
  },
  {
    id: 'ao_nhat_binh_nu',
    name: 'Áo nhật bình',
    gender: 'Nữ',
    style: 'Truyền thống',
    category: 'Áo Ngoài',
    imageUrl: '/assets/clothes/ao_nhat_binh.png',
    thumbnail: '/assets/clothes/ao_nhat_binh.png',
    description: 'Cung phục hoàng gia cổ vuông chữ nhật viền ngũ sắc thủy ba, thần thái vương giả quyền quý ngút ngàn.'
  },
  {
    id: 'ao_giao_linh_nu',
    name: 'Áo giao lĩnh nữ',
    gender: 'Nữ',
    style: 'Truyền thống',
    category: 'Áo Ngoài',
    imageUrl: '/assets/clothes/ao_giao_linh_nu.png',
    thumbnail: '/assets/clothes/ao_giao_linh_nu.png',
    description: 'Tà áo hồng phấn phối viền đỏ mềm mại, vạt chéo Hữu Nhậm cổ điển mang vẻ đẹp thoát tục dịu dàng.'
  },
  {
    id: 'ao_tu_than_nu',
    name: 'Áo tứ thân',
    gender: 'Nữ',
    style: 'Truyền thống',
    category: 'Áo Ngoài',
    imageUrl: '/assets/clothes/ao_tu_than.png',
    thumbnail: '/assets/clothes/ao_tu_than.png',
    description: 'Áo khoác gấm đỏ thêu phượng hoàng thắt dải lục, biểu tượng văn hóa Kinh Bắc thướt tha duyên dáng.'
  },
  {
    id: 'ao_dai_cach_tan_nu',
    name: 'Áo dài cách tân',
    gender: 'Nữ',
    style: 'Hiện đại',
    category: 'Áo Ngoài',
    imageUrl: '/assets/clothes/ao_dai_cach_tan.png',
    thumbnail: '/assets/clothes/ao_dai_cach_tan.png',
    description: 'Sắc xanh cốm nhạt thêu hoa tinh tế, tà áo suông nhẹ nhàng hiện đại đón nắng ngày xuân.'
  },

  // 3. Quần & Váy
  {
    id: 'vay_dup_den_nu',
    name: 'Váy đụp đen',
    gender: 'Nữ',
    style: 'Truyền thống',
    category: 'Quần & Váy',
    imageUrl: '/assets/clothes/vay_dup_den.png',
    thumbnail: '/assets/clothes/vay_dup_den.png',
    description: 'Chân váy lụa đen buông dài xếp nếp tỉ mỉ, mộc mạc mà duyên dáng khi diện cùng áo tứ thân.'
  },
  {
    id: 'quan_lua_trang_nu',
    name: 'Quần lụa trắng ống rộng',
    gender: 'Nữ',
    style: 'Truyền thống',
    category: 'Quần & Váy',
    imageUrl: '/assets/clothes/quan_lua_trang_ong_rong.png',
    thumbnail: '/assets/clothes/quan_lua_trang_ong_rong.png',
    description: 'Lụa trắng mềm mại rủ nhẹ theo bước chân, hạ y đa năng phối cực sang với mọi tà cổ phục.'
  },
  {
    id: 'quan_lua_trang_nam',
    name: 'Quần lụa trắng ống rộng',
    gender: 'Nam',
    style: 'Truyền thống',
    category: 'Quần & Váy',
    imageUrl: '/assets/clothes/quan_lua_trang_ong_rong.png',
    thumbnail: '/assets/clothes/quan_lua_trang_ong_rong.png',
    description: 'Ống suông rộng thoáng mát chỉn chu, bảo chứng cho phong thái khoan thai đĩnh đạc của nho sinh.'
  },

  // 4. Phụ Kiện
  {
    id: 'khan_mo_qua_xanh_nu',
    name: 'Khăn mỏ quạ xanh chàm',
    gender: 'Nữ',
    style: 'Truyền thống',
    category: 'Phụ Kiện',
    imageUrl: '/assets/clothes/khan_mo_qua_xanh.svg',
    thumbnail: '/assets/clothes/khan_mo_qua_xanh.svg',
    description: 'Khăn vải mộc xanh chàm gấp góc cánh sen, ôm trọn gương mặt phúc hậu của cô thôn nữ Bắc Bộ.'
  },
  {
    id: 'khan_mo_qua_den_theu_nu',
    name: 'Khăn mỏ quạ gấm thêu vàng',
    gender: 'Nữ',
    style: 'Truyền thống',
    category: 'Phụ Kiện',
    imageUrl: '/assets/clothes/khan_mo_qua_gam_vang.svg',
    thumbnail: '/assets/clothes/khan_mo_qua_gam_vang.svg',
    description: 'Gấm vàng rực dệt hoa văn quý phái, độ bóng óng ả, nếp gấp tối màu tạo chiều sâu và sang trọng.'
  },
  {
    id: 'that_lung_lua_ngu_sac_nu',
    name: 'Thắt lưng lụa ngũ sắc',
    gender: 'Nữ',
    style: 'Truyền thống',
    category: 'Phụ Kiện',
    imageUrl: '/assets/clothes/that_lung_lua_ngu_sac.png',
    thumbnail: '/assets/clothes/that_lung_lua_ngu_sac.png',
    description: 'Dải lụa thêu hoa văn cung đình rực rỡ, điểm nhấn thắt eo giúp vạt áo thêm phần bay bổng uyển chuyển.'
  },
  {
    id: 'tui_gam_theu_hoa_sen_nu',
    name: 'Túi gấm thêu hoa sen cầm tay',
    gender: 'Nữ',
    style: 'Truyền thống',
    category: 'Phụ Kiện',
    imageUrl: '/assets/clothes/tui_gam_theu_hoa_sen.png',
    thumbnail: '/assets/clothes/tui_gam_theu_hoa_sen.png',
    description: 'Gấm lam thêu đóa sen hồng đài các, khóa cài đính ngọc thanh tao cho nàng tự tin trẩy hội.'
  },
  {
    id: 'non_quai_thao_nu',
    name: 'Nón quai thao',
    gender: 'Nữ',
    style: 'Truyền thống',
    category: 'Phụ Kiện',
    imageUrl: '/assets/clothes/non_quai_thao.png',
    thumbnail: '/assets/clothes/non_quai_thao.png',
    description: 'Nón ba tầm đan lá tỉ mỉ cùng quai thao lụa ngũ sắc, linh hồn e ấp duyên dáng xứ quan họ.'
  },
  {
    id: 'quat_nan_nam',
    name: 'Quạt nan xếp',
    gender: 'Nam',
    style: 'Truyền thống',
    category: 'Phụ Kiện',
    imageUrl: '/assets/clothes/quat_nan.png',
    thumbnail: '/assets/clothes/quat_nan.png',
    description: 'Quạt nan tre bồi giấy tao nhã đính tua rua, đạo cụ cầm tay thần thái chuẩn chất tài tử nho phong.'
  },
  {
    id: 'quat_nan_nu',
    name: 'Quạt nan xếp',
    gender: 'Nữ',
    style: 'Truyền thống',
    category: 'Phụ Kiện',
    imageUrl: '/assets/clothes/quat_nan.png',
    thumbnail: '/assets/clothes/quat_nan.png',
    description: 'Quạt nan xếp tông hồng đào dịu dàng, khẽ che nụ cười duyên cho nàng những khung hình thơ mộng.'
  },

  // 5. Giày Dép
  {
    id: 'guoc_moc_nam',
    name: 'Guốc mộc cổ truyền',
    gender: 'Nam',
    style: 'Truyền thống',
    category: 'Giày Dép',
    imageUrl: '/assets/clothes/guoc_moc.png',
    thumbnail: '/assets/clothes/guoc_moc.png',
    description: 'Guốc gỗ đẽo mộc quai da tối giản, bước đi phát tiếng lách cách thân thương đượm hồn xưa cũ.'
  },
  {
    id: 'guoc_moc_nu',
    name: 'Guốc mộc cổ truyền',
    gender: 'Nữ',
    style: 'Truyền thống',
    category: 'Giày Dép',
    imageUrl: '/assets/clothes/guoc_moc.png',
    thumbnail: '/assets/clothes/guoc_moc.png',
    description: 'Guốc gỗ đế cong nhẹ ôm chân gót ngọc, nét duyên dân gian mộc mạc khi đồng hành cùng cổ phục.'
  },

  // ==========================================
  // II. TRANG PHỤC HIỆN ĐẠI (hiendai.pdf)
  // ==========================================

  // 1. Lớp Trong
  {
    id: 'ao_croptop_nu',
    name: 'Áo croptop nữ',
    gender: 'Nữ',
    style: 'Hiện đại',
    category: 'Lớp Trong',
    imageUrl: '/assets/clothes/ao_croptop_nu.png',
    thumbnail: '/assets/clothes/ao_croptop_nu.png',
    description: 'Croptop tay bồng màu kem thời thượng, khoe trọn eo thon khi remix cùng tà áo truyền thống mở cúc.'
  },

  // 2. Áo Ngoài
  {
    id: 'ao_blazer_den_nam',
    name: 'Áo blazer đen',
    gender: 'Nam',
    style: 'Hiện đại',
    category: 'Áo Ngoài',
    imageUrl: '/assets/clothes/ao_blazer_den.png',
    thumbnail: '/assets/clothes/ao_blazer_den.png',
    description: 'Blazer đen đứng form ve nhọn hiện đại, khoác ngoài trung đơn tạo vẻ ngoài nam tính chuẩn soái ca.'
  },

  // 3. Quần & Váy
  {
    id: 'quan_jean_nu',
    name: 'Quần jean nữ ống rộng',
    gender: 'Nữ',
    style: 'Hiện đại',
    category: 'Quần & Váy',
    imageUrl: '/assets/clothes/quan_jean_nu.png',
    thumbnail: '/assets/clothes/quan_jean_nu.png',
    description: 'Denim wash sáng cạp cao tôn dáng hack chân dài, chất ngầu trẻ trung cho buổi dạo phố cuối tuần.'
  },
  {
    id: 'vay_xep_ly_nu',
    name: 'Váy xếp ly tennis',
    gender: 'Nữ',
    style: 'Hiện đại',
    category: 'Quần & Váy',
    imageUrl: '/assets/clothes/vay_xep_ly.png',
    thumbnail: '/assets/clothes/vay_xep_ly.png',
    description: 'Chân váy ngắn xếp ly trắng tinh khôi, tạo vibe học đường năng động khi mix cùng áo giao lĩnh lửng.'
  },
  {
    id: 'quan_cargo_nu',
    name: 'Quần cargo nữ',
    gender: 'Nữ',
    style: 'Hiện đại',
    category: 'Quần & Váy',
    imageUrl: '/assets/clothes/quan_cargo_nu.png',
    thumbnail: '/assets/clothes/quan_cargo_nu.png',
    description: 'Quần túi hộp xám thụng phong cách hip-hop bụi bặm, phá cách táo bạo khi giao thoa cùng áo yếm.'
  },
  {
    id: 'quan_cargo_nam',
    name: 'Quần cargo nam',
    gender: 'Nam',
    style: 'Hiện đại',
    category: 'Quần & Váy',
    imageUrl: '/assets/clothes/quan_cargo_nam.png',
    thumbnail: '/assets/clothes/quan_cargo_nam.png',
    description: 'Quần túi hộp trắng bo gấu thể thao khỏe khoắn, visual streetwear cực cháy cho các chàng trai Gen Z.'
  },
  {
    id: 'quan_jean_nam',
    name: 'Quần jean nam ống suông',
    gender: 'Nam',
    style: 'Hiện đại',
    category: 'Quần & Váy',
    imageUrl: '/assets/clothes/quan_jean_nam.png',
    thumbnail: '/assets/clothes/quan_jean_nam.png',
    description: 'Denim xanh basic ống rộng thoải mái, item vạn năng dễ phối cùng blazer hoặc áo ngũ thân cách điệu.'
  },

  // 4. Phụ Kiện
  {
    id: 'tui_kep_nach_jean_nu',
    name: 'Túi kẹp nách jean',
    gender: 'Nữ',
    style: 'Hiện đại',
    category: 'Phụ Kiện',
    imageUrl: '/assets/clothes/tui_kep_nach_jean.png',
    thumbnail: '/assets/clothes/tui_kep_nach_jean.png',
    description: 'Túi denim đính charm trái tim Y2K sành điệu, điểm nhấn thời trang nhỏ gọn tiện lợi mang dạo phố.'
  },
  {
    id: 'tai_nghe_nam',
    name: 'Tai nghe chụp tai Over-Ear',
    gender: 'Nam',
    style: 'Hiện đại',
    category: 'Phụ Kiện',
    imageUrl: '/assets/clothes/tai_nghe.png',
    thumbnail: '/assets/clothes/tai_nghe.png',
    description: 'Tai nghe bluetooth xanh navy quàng quanh cổ, biến outfit cổ phục thành vibe chill lofi cực cuốn hút.'
  },
  {
    id: 'tai_nghe_nu',
    name: 'Tai nghe chụp tai Over-Ear',
    gender: 'Nữ',
    style: 'Hiện đại',
    category: 'Phụ Kiện',
    imageUrl: '/assets/clothes/tai_nghe.png',
    thumbnail: '/assets/clothes/tai_nghe.png',
    description: 'Phụ kiện công nghệ chụp tai sành điệu quàng cổ, visual giao thoa hiện đại đón đầu xu hướng thời trang.'
  },
  {
    id: 'kinh_ram_nam',
    name: 'Kính râm gọng đen',
    gender: 'Nam',
    style: 'Hiện đại',
    category: 'Phụ Kiện',
    imageUrl: '/assets/clothes/kinh_ram.png',
    thumbnail: '/assets/clothes/kinh_ram.png',
    description: 'Kính mát gọng vuông đen cá tính, phụ kiện tạo thần thái lạnh lùng cuốn hút trong từng góc máy check-in.'
  },
  {
    id: 'kinh_ram_nu',
    name: 'Kính râm gọng đen',
    gender: 'Nữ',
    style: 'Hiện đại',
    category: 'Phụ Kiện',
    imageUrl: '/assets/clothes/kinh_ram.png',
    thumbnail: '/assets/clothes/kinh_ram.png',
    description: 'Kính râm ngầu đét bảo vệ mắt ngày hè, tạo điểm nhấn phá cách đậm chất xuyên không cho nàng thơ.'
  },

  // 5. Giày Dép
  {
    id: 'giay_cao_got_nu',
    name: 'Giày cao gót quai hậu',
    gender: 'Nữ',
    style: 'Hiện đại',
    category: 'Giày Dép',
    imageUrl: '/assets/clothes/giay_cao_got.png',
    thumbnail: '/assets/clothes/giay_cao_got.png',
    description: 'Mũi nhọn đính nơ thanh mảnh màu trắng kem, tôn dáng kiêu sa bước đi uyển chuyển trong mọi sự kiện.'
  },
  {
    id: 'giay_tay_nam',
    name: 'Giày tây Oxford',
    gender: 'Nam',
    style: 'Hiện đại',
    category: 'Giày Dép',
    imageUrl: '/assets/clothes/giay_tay.png',
    thumbnail: '/assets/clothes/giay_tay.png',
    description: 'Giày da đen bóng sang trọng đứng đắn, mảnh ghép hoàn hảo nâng tầm lịch thiệp khi diện cùng áo ngũ thân.'
  },
  {
    id: 'sneaker_trang_nam',
    name: 'Giày sneaker chunky trắng',
    gender: 'Nam',
    style: 'Hiện đại',
    category: 'Giày Dép',
    imageUrl: '/assets/clothes/sneaker.png',
    thumbnail: '/assets/clothes/sneaker.png',
    description: 'Đế chunky êm ái hack chiều cao cực đỉnh, bứt phá mọi khuôn mẫu khi remix cùng cổ phục dạo phố.'
  },
  {
    id: 'sneaker_trang_nu',
    name: 'Giày sneaker chunky trắng',
    gender: 'Nữ',
    style: 'Hiện đại',
    category: 'Giày Dép',
    imageUrl: '/assets/clothes/sneaker.png',
    thumbnail: '/assets/clothes/sneaker.png',
    description: 'Sneaker trắng thể thao năng động, giúp nàng thoải mái sải bước rạng rỡ suốt ngày dài trải nghiệm.'
  }
];
