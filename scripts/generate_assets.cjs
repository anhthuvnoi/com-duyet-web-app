const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../public/assets/clothes');
fs.mkdirSync(targetDir, { recursive: true });

// Copy real photos from src/assets/images
const copies = [
  { src: 'src/assets/images/regenerated_image_1791295938896.webp', dest: 'ao_nhat_binh.png' },
  { src: 'src/assets/images/regenerated_image_1791295938896.webp', dest: 'ao_nhat_binh.webp' },
  { src: 'src/assets/images/regenerated_image_1791295940047.webp', dest: 'ao_ngu_than_tay_chen_nu.png' },
  { src: 'src/assets/images/regenerated_image_1791295940047.webp', dest: 'ao_ngu_than_nu.png' },
  { src: 'src/assets/images/regenerated_image_1791295944018.jpg', dest: 'ao_tu_than.png' },
  { src: 'src/assets/images/regenerated_image_1791295945668.jpg', dest: 'ao_giao_linh_nu.png' },
  { src: 'src/assets/images/nam_giaolinh_xanh_1791299440254.jpg', dest: 'ao_giao_linh_nam.png' },
  { src: 'src/assets/images/nam_nguthan_hoavan_1791299462685.jpg', dest: 'ao_ngu_than_tay_chen_nam.png' },
  { src: 'src/assets/images/nam_nguthan_hoavan_1791299462685.jpg', dest: 'ao_ngu_than_nam.png' },
  { src: 'goiy-kyyeu.webp', dest: 'nam_giaolinh_kyyeu.webp' },
  { src: 'goiy-codo.webp', dest: 'nam_nguthan_codo.webp' },
];

copies.forEach(({ src, dest }) => {
  const fullSrc = path.join(__dirname, '..', src);
  const fullDest = path.join(targetDir, dest);
  if (fs.existsSync(fullSrc)) {
    fs.copyFileSync(fullSrc, fullDest);
    console.log(`Copied ${src} -> ${dest}`);
  }
});

// SVG visual cards for each item
const svgTemplates = {
  // 1. Áo yếm
  'ao_yem': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#FFF1F2" rx="20"/>
    <path d="M70 40 Q100 25 130 40 L165 170 L35 170 Z" fill="#991B1B" stroke="#B91C1C" stroke-width="3"/>
    <path d="M85 45 Q100 58 115 45" fill="none" stroke="#FDE047" stroke-width="3"/>
    <circle cx="100" cy="100" r="14" fill="#FACC15"/>
    <path d="M100 80 Q105 100 100 120" stroke="#B45309" stroke-width="2"/>
    <path d="M80 100 Q100 105 120 100" stroke="#B45309" stroke-width="2"/>
    <text x="100" y="188" font-size="12" font-family="sans-serif" font-weight="bold" fill="#991B1B" text-anchor="middle">ÁO YẾM THÊU SEN</text>
  </svg>`,

  // 2. Váy đụp đen
  'vay_dup_den': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#F8FAFC" rx="20"/>
    <path d="M75 40 L125 40 L165 175 Q100 185 35 175 Z" fill="#18181B" stroke="#27272A" stroke-width="3"/>
    <line x1="85" y1="40" x2="65" y2="175" stroke="#3F3F46" stroke-width="2"/>
    <line x1="100" y1="40" x2="100" y2="178" stroke="#3F3F46" stroke-width="2"/>
    <line x1="115" y1="40" x2="135" y2="175" stroke="#3F3F46" stroke-width="2"/>
    <rect x="70" y="36" width="60" height="8" rx="2" fill="#09090B"/>
    <text x="100" y="192" font-size="12" font-family="sans-serif" font-weight="bold" fill="#27272A" text-anchor="middle">VÁY ĐỤP ĐEN</text>
  </svg>`,

  // 3. Quần lụa trắng ống rộng
  'quan_lua_trang_ong_rong': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#F1F5F9" rx="20"/>
    <path d="M75 35 L125 35 L160 170 L110 170 L100 80 L90 170 L40 170 Z" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="3"/>
    <line x1="65" y1="45" x2="55" y2="165" stroke="#E2E8F0" stroke-width="2"/>
    <line x1="135" y1="45" x2="145" y2="165" stroke="#E2E8F0" stroke-width="2"/>
    <text x="100" y="190" font-size="11" font-family="sans-serif" font-weight="bold" fill="#475569" text-anchor="middle">QUẦN LỤA TRẮNG</text>
  </svg>`,

  // 4. Khăn mỏ quạ xanh chàm
  'khan_mo_qua_xanh': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#EFF6FF" rx="20"/>
    <polygon points="100,30 175,130 100,165 25,130" fill="#1E3A8A" stroke="#1D4ED8" stroke-width="3"/>
    <polygon points="100,30 155,115 100,145 45,115" fill="#2563EB" opacity="0.6"/>
    <path d="M100 30 L100 165" stroke="#93C5FD" stroke-width="2" stroke-dasharray="4 2"/>
    <text x="100" y="190" font-size="11" font-family="sans-serif" font-weight="bold" fill="#1E3A8A" text-anchor="middle">KHĂN MỎ QUẠ</text>
  </svg>`,

  // 5. Khăn mỏ quạ gấm thêu
  'khan_mo_qua_den_theu': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#F8FAFC" rx="20"/>
    <polygon points="100,30 175,130 100,165 25,130" fill="#0F172A" stroke="#CA8A04" stroke-width="3"/>
    <circle cx="100" cy="100" r="16" fill="none" stroke="#EAB308" stroke-width="2"/>
    <path d="M100 86 Q112 100 100 114 Q88 100 100 86" fill="#FACC15"/>
    <text x="100" y="190" font-size="11" font-family="sans-serif" font-weight="bold" fill="#0F172A" text-anchor="middle">KHĂN MỎ QUẠ GẤM</text>
  </svg>`,

  // 6. Thắt lưng lụa ngũ sắc
  'that_lung_lua_ngu_sac': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#FEF2F2" rx="20"/>
    <rect x="25" y="70" width="150" height="30" rx="6" fill="#DC2626" stroke="#B91C1C" stroke-width="2"/>
    <rect x="85" y="65" width="30" height="40" rx="4" fill="#FACC15" stroke="#CA8A04" stroke-width="2"/>
    <path d="M75 100 L65 175 L85 175 L90 100 Z" fill="#2563EB"/>
    <path d="M95 100 L95 175 L115 175 L110 100 Z" fill="#16A34A"/>
    <path d="M115 100 L125 175 L140 175 L125 100 Z" fill="#EAB308"/>
    <text x="100" y="192" font-size="11" font-family="sans-serif" font-weight="bold" fill="#991B1B" text-anchor="middle">THẮT LƯNG NGŨ SẮC</text>
  </svg>`,

  // 7. Túi gấm thêu hoa sen
  'tui_gam_theu_hoa_sen': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#ECFDF5" rx="20"/>
    <path d="M70 40 Q100 25 130 40" stroke="#CA8A04" stroke-width="4" fill="none"/>
    <rect x="55" y="55" width="90" height="15" rx="4" fill="#EAB308" stroke="#CA8A04" stroke-width="2"/>
    <path d="M45 70 Q40 160 100 165 Q160 160 155 70 Z" fill="#0D9488" stroke="#0F766E" stroke-width="3"/>
    <circle cx="100" cy="115" r="16" fill="#F43F5E"/>
    <circle cx="100" cy="115" r="7" fill="#FDE047"/>
    <text x="100" y="188" font-size="11" font-family="sans-serif" font-weight="bold" fill="#0F766E" text-anchor="middle">TÚI GẤM THÊU SEN</text>
  </svg>`,

  // 8. Nón quai thao
  'non_quai_thao': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#FEFCE8" rx="20"/>
    <ellipse cx="100" cy="90" rx="80" ry="45" fill="#FEF08A" stroke="#CA8A04" stroke-width="4"/>
    <ellipse cx="100" cy="90" rx="45" ry="25" fill="#FDE047" stroke="#A16207" stroke-width="2"/>
    <circle cx="100" cy="90" r="12" fill="#EAB308"/>
    <path d="M60 115 Q50 160 70 175" stroke="#DC2626" stroke-width="4" fill="none"/>
    <path d="M140 115 Q150 160 130 175" stroke="#16A34A" stroke-width="4" fill="none"/>
    <text x="100" y="190" font-size="12" font-family="sans-serif" font-weight="bold" fill="#854D0E" text-anchor="middle">NÓN QUAI THAO</text>
  </svg>`,

  // 9. Quạt nan
  'quat_nan': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#FFFBEB" rx="20"/>
    <path d="M100 150 L25 80 A95 95 0 0 1 175 80 Z" fill="#FDE68A" stroke="#B45309" stroke-width="3"/>
    <line x1="100" y1="150" x2="45" y2="60" stroke="#78350F" stroke-width="2"/>
    <line x1="100" y1="150" x2="75" y2="45" stroke="#78350F" stroke-width="2"/>
    <line x1="100" y1="150" x2="100" y2="40" stroke="#78350F" stroke-width="2"/>
    <line x1="100" y1="150" x2="125" y2="45" stroke="#78350F" stroke-width="2"/>
    <line x1="100" y1="150" x2="155" y2="60" stroke="#78350F" stroke-width="2"/>
    <circle cx="100" cy="150" r="6" fill="#B45309"/>
    <path d="M100 156 L100 180" stroke="#DC2626" stroke-width="3"/>
    <text x="100" y="192" font-size="12" font-family="sans-serif" font-weight="bold" fill="#92400E" text-anchor="middle">QUẠT NAN XẾP</text>
  </svg>`,

  // 10. Guốc mộc
  'guoc_moc': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#FDF4FF" rx="20"/>
    <path d="M30 120 Q80 110 170 115 L165 145 Q120 140 100 155 L60 155 Q40 145 30 140 Z" fill="#92400E" stroke="#78350F" stroke-width="3"/>
    <path d="M55 113 Q80 80 110 114" stroke="#DC2626" stroke-width="10" stroke-linecap="round" fill="none"/>
    <circle cx="56" cy="116" r="3" fill="#FDE047"/>
    <circle cx="108" cy="117" r="3" fill="#FDE047"/>
    <text x="100" y="188" font-size="12" font-family="sans-serif" font-weight="bold" fill="#78350F" text-anchor="middle">GUỐC MỘC TRUYỀN THỐNG</text>
  </svg>`,

  // 11. Áo croptop nữ
  'ao_croptop_nu': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#FDF2F8" rx="20"/>
    <path d="M60 45 Q100 65 140 45 L175 110 L150 120 L135 90 L135 125 L65 125 L65 90 L50 120 L25 110 Z" fill="#FBCFE8" stroke="#DB2777" stroke-width="3"/>
    <path d="M65 125 Q100 135 135 125" stroke="#BE185D" stroke-width="3" fill="none"/>
    <text x="100" y="185" font-size="12" font-family="sans-serif" font-weight="bold" fill="#9D174D" text-anchor="middle">ÁO CROPTOP NỮ</text>
  </svg>`,

  // 12. Áo blazer đen
  'ao_blazer_den': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#F8FAFC" rx="20"/>
    <path d="M65 35 L135 35 L175 170 L145 170 L135 95 L135 170 L65 170 L65 95 L55 170 L25 170 Z" fill="#1E293B" stroke="#0F172A" stroke-width="3"/>
    <polygon points="65,35 100,105 100,45" fill="#334155"/>
    <polygon points="135,35 100,105 100,45" fill="#334155"/>
    <circle cx="100" cy="125" r="3" fill="#94A3B8"/>
    <circle cx="100" cy="145" r="3" fill="#94A3B8"/>
    <text x="100" y="190" font-size="12" font-family="sans-serif" font-weight="bold" fill="#0F172A" text-anchor="middle">ÁO BLAZER ĐEN</text>
  </svg>`,

  // 13. Quần jean nữ
  'quan_jean_nu': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#EFF6FF" rx="20"/>
    <path d="M70 30 L130 30 L155 175 L115 175 L100 80 L85 175 L45 175 Z" fill="#3B82F6" stroke="#1D4ED8" stroke-width="3"/>
    <line x1="70" y1="45" x2="130" y2="45" stroke="#FBBF24" stroke-width="2"/>
    <line x1="100" y1="45" x2="100" y2="80" stroke="#FBBF24" stroke-width="2"/>
    <text x="100" y="190" font-size="12" font-family="sans-serif" font-weight="bold" fill="#1E40AF" text-anchor="middle">QUẦN JEAN ỐNG RỘNG</text>
  </svg>`,

  // 14. Váy xếp ly tennis
  'vay_xep_ly': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#F8FAFC" rx="20"/>
    <path d="M75 40 L125 40 L165 140 Q100 150 35 140 Z" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="3"/>
    <line x1="55" y1="45" x2="50" y2="140" stroke="#94A3B8" stroke-width="2"/>
    <line x1="75" y1="45" x2="75" y2="142" stroke="#94A3B8" stroke-width="2"/>
    <line x1="95" y1="45" x2="100" y2="144" stroke="#94A3B8" stroke-width="2"/>
    <line x1="115" y1="45" x2="125" y2="142" stroke="#94A3B8" stroke-width="2"/>
    <line x1="135" y1="45" x2="150" y2="140" stroke="#94A3B8" stroke-width="2"/>
    <rect x="70" y="38" width="60" height="6" fill="#0F172A" rx="2"/>
    <text x="100" y="180" font-size="12" font-family="sans-serif" font-weight="bold" fill="#334155" text-anchor="middle">VÁY XẾP LY TENNIS</text>
  </svg>`,

  // 15. Quần cargo
  'quan_cargo': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#F3F4F6" rx="20"/>
    <path d="M68 30 L132 30 L158 175 L118 175 L100 80 L82 175 L42 175 Z" fill="#6B7280" stroke="#4B5563" stroke-width="3"/>
    <rect x="36" y="95" width="20" height="30" rx="3" fill="#4B5563" stroke="#374151" stroke-width="2"/>
    <rect x="144" y="95" width="20" height="30" rx="3" fill="#4B5563" stroke="#374151" stroke-width="2"/>
    <text x="100" y="190" font-size="12" font-family="sans-serif" font-weight="bold" fill="#374151" text-anchor="middle">QUẦN CARGO TÚI HỘP</text>
  </svg>`,

  // 16. Túi kẹp nách jean
  'tui_kep_nach_jean': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#EFF6FF" rx="20"/>
    <path d="M65 80 Q100 25 135 80" stroke="#1D4ED8" stroke-width="6" fill="none"/>
    <rect x="40" y="80" width="120" height="70" rx="12" fill="#3B82F6" stroke="#1D4ED8" stroke-width="3"/>
    <path d="M100 105 Q105 100 110 105 Q115 110 100 125 Q85 110 90 105 Q95 100 100 105" fill="#EF4444"/>
    <text x="100" y="185" font-size="12" font-family="sans-serif" font-weight="bold" fill="#1E40AF" text-anchor="middle">TÚI KẸP NÁCH Y2K</text>
  </svg>`,

  // 17. Tai nghe
  'tai_nghe': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#EEF2FF" rx="20"/>
    <path d="M45 105 A55 55 0 0 1 155 105" stroke="#1E40AF" stroke-width="12" stroke-linecap="round" fill="none"/>
    <rect x="35" y="90" width="22" height="42" rx="10" fill="#1D4ED8" stroke="#1E3A8A" stroke-width="3"/>
    <rect x="143" y="90" width="22" height="42" rx="10" fill="#1D4ED8" stroke="#1E3A8A" stroke-width="3"/>
    <text x="100" y="180" font-size="12" font-family="sans-serif" font-weight="bold" fill="#1E3A8A" text-anchor="middle">TAI NGHE OVER-EAR</text>
  </svg>`,

  // 18. Kính râm
  'kinh_ram': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#F4F4F5" rx="20"/>
    <path d="M35 85 L165 85" stroke="#18181B" stroke-width="5" stroke-linecap="round"/>
    <rect x="40" y="85" width="50" height="35" rx="8" fill="#09090B" stroke="#27272A" stroke-width="2"/>
    <rect x="110" y="85" width="50" height="35" rx="8" fill="#09090B" stroke="#27272A" stroke-width="2"/>
    <path d="M90 92 L110 92" stroke="#18181B" stroke-width="4"/>
    <text x="100" y="175" font-size="12" font-family="sans-serif" font-weight="bold" fill="#18181B" text-anchor="middle">KÍNH RÂM GEN Z</text>
  </svg>`,

  // 19. Giày cao gót
  'giay_cao_got': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#FFF1F2" rx="20"/>
    <path d="M35 125 Q65 125 90 100 Q120 70 170 125 L160 135 L80 135 Z" fill="#FFFFFF" stroke="#E11D48" stroke-width="3"/>
    <rect x="42" y="125" width="8" height="42" rx="2" fill="#E11D48"/>
    <circle cx="140" cy="115" r="6" fill="#F43F5E"/>
    <text x="100" y="185" font-size="12" font-family="sans-serif" font-weight="bold" fill="#BE123C" text-anchor="middle">GIÀY CAO GÓT</text>
  </svg>`,

  // 20. Giày tây Oxford
  'giay_tay': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#F8FAFC" rx="20"/>
    <path d="M30 115 Q65 95 110 105 L175 125 Q165 145 140 145 L35 145 Z" fill="#18181B" stroke="#09090B" stroke-width="3"/>
    <rect x="35" y="145" width="30" height="15" rx="2" fill="#09090B"/>
    <line x1="85" y1="105" x2="105" y2="105" stroke="#71717A" stroke-width="2"/>
    <line x1="83" y1="112" x2="107" y2="112" stroke="#71717A" stroke-width="2"/>
    <text x="100" y="185" font-size="12" font-family="sans-serif" font-weight="bold" fill="#09090B" text-anchor="middle">GIÀY TÂY OXFORD</text>
  </svg>`,

  // 21. Sneaker
  'sneaker': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#F0FDF4" rx="20"/>
    <path d="M35 125 Q55 90 95 100 L165 110 Q175 130 165 145 L35 145 Z" fill="#FFFFFF" stroke="#16A34A" stroke-width="3"/>
    <path d="M30 145 Q100 140 170 145 L165 160 Q100 155 30 160 Z" fill="#E2E8F0" stroke="#94A3B8" stroke-width="2"/>
    <line x1="75" y1="105" x2="100" y2="105" stroke="#3B82F6" stroke-width="2"/>
    <line x1="78" y1="113" x2="103" y2="113" stroke="#3B82F6" stroke-width="2"/>
    <text x="100" y="188" font-size="12" font-family="sans-serif" font-weight="bold" fill="#15803D" text-anchor="middle">SNEAKER CHUNKY</text>
  </svg>`,

  // 22. Áo trong trắng
  'trung_don_nu': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#F8FAFC" rx="20"/>
    <path d="M70 40 L130 40 L160 170 L40 170 Z" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="3"/>
    <rect x="90" y="32" width="20" height="15" rx="3" fill="#FFFFFF" stroke="#94A3B8" stroke-width="2"/>
    <text x="100" y="188" font-size="11" font-family="sans-serif" font-weight="bold" fill="#64748B" text-anchor="middle">ÁO TRONG TRẮNG</text>
  </svg>`,

  // 23. Áo phông Basic
  'tshirt': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#F1F5F9" rx="20"/>
    <path d="M65 40 Q100 55 135 40 L170 85 L145 95 L135 75 L135 165 L65 165 L65 75 L55 95 L30 85 Z" fill="#FFFFFF" stroke="#94A3B8" stroke-width="3"/>
    <circle cx="100" cy="115" r="14" fill="#3B82F6"/>
    <text x="100" y="188" font-size="12" font-family="sans-serif" font-weight="bold" fill="#475569" text-anchor="middle">ÁO PHÔNG GRAPHIC</text>
  </svg>`,

  // 24. Khăn vấn nhung đen
  'khan_van': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#FAF5FF" rx="20"/>
    <ellipse cx="100" cy="100" rx="70" ry="30" fill="#18181B" stroke="#3F3F46" stroke-width="4"/>
    <ellipse cx="100" cy="100" rx="45" ry="18" fill="#FAF5FF" stroke="#3F3F46" stroke-width="2"/>
    <text x="100" y="175" font-size="12" font-family="sans-serif" font-weight="bold" fill="#18181B" text-anchor="middle">KHĂN VẤN NHUNG ĐEN</text>
  </svg>`,

  // 25. Khăn đóng nam
  'khan_dong_nam': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#F5F5F4" rx="20"/>
    <ellipse cx="100" cy="95" rx="70" ry="32" fill="#1C1917" stroke="#44403C" stroke-width="4"/>
    <path d="M75 85 L100 102 L125 85" stroke="#A8A29E" stroke-width="3" fill="none"/>
    <text x="100" y="175" font-size="12" font-family="sans-serif" font-weight="bold" fill="#1C1917" text-anchor="middle">KHĂN ĐÓNG NAM</text>
  </svg>`,

  // 26. Vòng tay vàng
  'vong_tay_vang': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#FFFBEB" rx="20"/>
    <circle cx="100" cy="95" r="45" fill="none" stroke="#F59E0B" stroke-width="12"/>
    <circle cx="100" cy="95" r="45" fill="none" stroke="#FEF08A" stroke-width="4"/>
    <circle cx="100" cy="50" r="8" fill="#DC2626"/>
    <text x="100" y="180" font-size="12" font-family="sans-serif" font-weight="bold" fill="#B45309" text-anchor="middle">VÒNG TAY VÀNG</text>
  </svg>`
};

// Write both .svg and aliases
Object.entries(svgTemplates).forEach(([key, svg]) => {
  const filePath = path.join(targetDir, `${key}.png`);
  // If target PNG does not exist yet (or isn't a copied photo), save the svg as png/svg
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, svg);
    console.log(`Created template ${key}.png`);
  }
  // Also save .svg
  fs.writeFileSync(path.join(targetDir, `${key}.svg`), svg);
});

// Provide standard aliases so any requested path works 100%
const aliases = [
  ['quan_cargo.png', 'quan_cargo_nam.png'],
  ['quan_cargo.png', 'quan_cargo_nu.png'],
  ['quan_jean_nu.png', 'quan_jean_nam.png'],
  ['quan_jean_nu.png', 'jeans_ong_rong.png'],
  ['vay_xep_ly.png', 'chan_vay_tennis.png'],
  ['ao_croptop_nu.png', 'croptop.png'],
  ['ao_blazer_den.png', 'blazer.png'],
  ['tui_kep_nach_jean.png', 'tui_kep_nach.png'],
  ['sneaker.png', 'sneaker_trang.png'],
  ['giay_cao_got.png', 'cao_got.png'],
  ['giay_tay.png', 'giay_tay_nam.png'],
  ['guoc_moc.png', 'guoc_moc_nu.png'],
  ['guoc_moc.png', 'guoc_moc_nam.png'],
  ['quat_nan.png', 'quat_xep.png'],
  ['that_lung_lua_ngu_sac.png', 'that_lung.png'],
  ['that_lung_lua_ngu_sac.png', 'dai_that_lung.png'],
  ['tui_gam_theu_hoa_sen.png', 'tui_theu.png'],
  ['khan_mo_qua_xanh.png', 'khan_mo_qua.png'],
  ['vay_dup_den.png', 'vay_dup.png'],
  ['quan_lua_trang_ong_rong.png', 'quan_lua_trang.png'],
  ['quan_lua_trang_ong_rong.png', 'quan_ong_so.png'],
  ['trung_don_nu.png', 'trung_don_nam.png'],
  ['trung_don_nu.png', 'trung_don.png'],
  ['ao_yem.png', 'yem_dao.png']
];

aliases.forEach(([srcName, aliasName]) => {
  const srcPath = path.join(targetDir, srcName);
  const aliasPath = path.join(targetDir, aliasName);
  if (fs.existsSync(srcPath) && !fs.existsSync(aliasPath)) {
    fs.copyFileSync(srcPath, aliasPath);
    console.log(`Aliased ${srcName} -> ${aliasName}`);
  }
});
