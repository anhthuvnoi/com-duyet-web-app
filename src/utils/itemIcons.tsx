import React from "react";
import {
  Shirt,
  Scissors,
  ShoppingBag,
  Crown,
  Glasses,
  Watch,
  Sparkles,
  Footprints,
  Feather,
  Palette,
  Layers,
  Heart,
  Sun,
  Gem,
  SlidersHorizontal,
  Headphones
} from "lucide-react";
import { WardrobeItem } from "../data/wardrobe";

/**
 * getItemIcon - Ánh xạ icon thông minh cho từng món đồ trong Tủ Đồ Mix & Match
 * Đảm bảo các loại trang phục/phụ kiện đều có icon độc lập, chuẩn văn hóa và thời trang
 */
export function getItemIcon(
  item: WardrobeItem,
  className = "w-7 h-7",
  style?: React.CSSProperties
): React.ReactElement {
  const idLower = (item.id || "").toLowerCase();
  const nameLower = (item.name || "").toLowerCase();
  const shortNameLower = (item.shortName || "").toLowerCase();
  const combined = `${idLower} ${nameLower} ${shortNameLower}`;

  // 1. Giày dép / Guốc mộc (Footwear)
  if (
    item.layer === "footwear" ||
    item.category === "Giày Dép" ||
    combined.includes("guoc") ||
    combined.includes("guốc") ||
    combined.includes("giay") ||
    combined.includes("giày") ||
    combined.includes("sneaker") ||
    combined.includes("cao got") ||
    combined.includes("cao gót") ||
    combined.includes("oxford")
  ) {
    return <Footprints className={className} style={style} />;
  }

  // 2. Phụ kiện đội đầu (Headwear) & Phụ kiện đặc thù (Accessories)
  // Nón lá / Nón quai thao / Nón ba tầm
  if (combined.includes("non") || combined.includes("nón")) {
    return <Sun className={className} style={style} />;
  }

  // Khăn vấn / Mấn / Khăn đóng / Khăn xếp / Khăn mỏ quạ / Mũ
  if (
    item.layer === "headwear" ||
    combined.includes("khan") ||
    combined.includes("khăn") ||
    combined.includes("man") ||
    combined.includes("mấn") ||
    combined.includes("mu") ||
    combined.includes("mũ")
  ) {
    return <Crown className={className} style={style} />;
  }

  // Túi gấm thêu / Túi xách / Túi kẹp nách
  if (combined.includes("tui") || combined.includes("túi")) {
    return <ShoppingBag className={className} style={style} />;
  }

  // Quạt xếp / Quạt nan tre
  if (combined.includes("quat") || combined.includes("quạt")) {
    return <Feather className={className} style={style} />;
  }

  // Vòng tay / Vòng cổ / Hoa tai / Trâm cài / Trang sức ngọc
  if (
    combined.includes("vong") ||
    combined.includes("vòng") ||
    combined.includes("tram") ||
    combined.includes("trâm") ||
    combined.includes("hoa tai") ||
    combined.includes("khuyen tai") ||
    combined.includes("ngoc") ||
    combined.includes("ngọc")
  ) {
    return <Gem className={className} style={style} />;
  }

  // Kính râm / Kính mát
  if (combined.includes("kinh") || combined.includes("kính")) {
    return <Glasses className={className} style={style} />;
  }

  // Tai nghe Over-ear
  if (combined.includes("tai nghe") || combined.includes("headphone")) {
    return <Headphones className={className} style={style} />;
  }

  // Đồng hồ đeo tay
  if (combined.includes("dong ho") || combined.includes("đồng hồ")) {
    return <Watch className={className} style={style} />;
  }

  // Đai thắt lưng lụa
  if (
    combined.includes("dai") ||
    combined.includes("đai") ||
    combined.includes("that lung") ||
    combined.includes("thắt lưng")
  ) {
    return <Sparkles className={className} style={style} />;
  }

  // 3. Quần & Váy (Bottom)
  if (item.layer === "bottom" || item.category === "Quần & Váy") {
    // Váy / Chân váy xếp ly / Váy đụp
    if (
      combined.includes("vay") ||
      combined.includes("váy") ||
      combined.includes("dup") ||
      combined.includes("đụp") ||
      combined.includes("xep ly") ||
      combined.includes("xếp ly")
    ) {
      return <Scissors className={className} style={style} />;
    }
    // Quần dài / Quần ống rộng / Quần jeans / Quần cargo / Quần lụa
    return <SlidersHorizontal className={className} style={style} />;
  }

  // 4. Lớp trong (Inner / Áo lót / Yếm / Trung đơn)
  if (item.layer === "inner" || item.category === "Lớp Trong") {
    // Yếm đào cổ truyền
    if (combined.includes("yem") || combined.includes("yếm")) {
      return <Heart className={className} style={style} />;
    }
    // Áo lót / Trung đơn / Croptop / T-shirt
    return <Shirt className={className} style={style} />;
  }

  // 5. Áo ngoài (Outer / Cổ phục & Hiện đại)
  if (item.layer === "outer" || item.category === "Áo Ngoài") {
    // Áo Tứ Thân, Nhật Bình, Giao Lĩnh
    if (
      combined.includes("tu than") ||
      combined.includes("tứ thân") ||
      combined.includes("nhat binh") ||
      combined.includes("nhật bình") ||
      combined.includes("giao linh") ||
      combined.includes("giao lĩnh")
    ) {
      return <Palette className={className} style={style} />;
    }
    // Áo Ngũ Thân, Áo Tấc, Áo Dài, Blazer
    return <Layers className={className} style={style} />;
  }

  // Phụ kiện thông thường (Accessory fallback)
  if (item.layer === "accessory" || item.category === "Phụ Kiện") {
    return <Sparkles className={className} style={style} />;
  }

  // Default fallback
  return <Shirt className={className} style={style} />;
}
