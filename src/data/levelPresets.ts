/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CurrentOutfitState,
  traditionalWardrobe,
  modernWardrobe,
  WardrobeItem
} from "./wardrobe";

const allItems = [...traditionalWardrobe, ...modernWardrobe];
const getItem = (id: string | undefined): WardrobeItem | null => {
  if (!id) return null;
  return allItems.find((i) => i.id === id) || null;
};

// =========================================================================
// DATA DICTIONARY: LEVEL PRESETS CHO 4 NẤC (NAM / NỮ) CHUẨN ĐẶC TẢ
//
// LƯU Ý CỐT LÕI 1: Tuyệt đối KHÔNG ĐƯỢC phối Áo truyền thống với Quần Jean hoặc Áo Croptop ở bất kỳ nấc nào (đặc biệt Nữ).
// LƯU Ý CỐT LÕI 2: Mỗi preset BẮT BUỘC phải là một bộ đồ hoàn chỉnh (Full Outfit) từ trong ra ngoài.
// =========================================================================
export const levelPresets: Record<"nu" | "nam", Record<number, string[]>> = {
  nu: {
    // Nấc 1 (Truyền thống thuần nếp):
    // Nữ: Áo Trong Trắng (Inner) + Váy đụp lụa đen (Bottom) + Áo Tứ Thân (Outer) + Guốc mộc (Shoes) + Nón quai thao (Accessories).
    1: [
      "trad_inner_trung_don_nu",
      "trad_bottom_vay_dup",
      "trad_outer_tu_than",
      "trad_foot_guoc_moc",
      "trad_acc_non_quai_thao"
    ],

    // Nấc 2 (Cổ điển nhẹ nhàng):
    // Nữ: Áo Trong Trắng (Inner) + Quần lụa trắng (Bottom) + Áo Ngũ thân (Outer) + Giày cao gót (Shoes) + Túi xách gấm (Accessories).
    2: [
      "trad_inner_trung_don_nu",
      "trad_bottom_quan_lua_trang",
      "trad_outer_ngu_than_nu",
      "mod_foot_cao_got",
      "trad_acc_tui_theu"
    ],

    // Nấc 3 (Cách tân hiện đại):
    // Nữ: Áo Trong Trắng (Inner) + Quần lụa trắng (Bottom - không phải jean) + Áo Dài cách tân (Outer) + Giày cao gót + Túi xách nhỏ (Accessories).
    3: [
      "trad_inner_trung_don_nu",
      "trad_bottom_quan_lua_trang",
      "trad_outer_ao_dai_cach_tan",
      "mod_foot_cao_got",
      "mod_acc_tui_kep_nach"
    ],

    // Nấc 4 (Gen Z phá cách - Streetwear):
    // Nữ: Áo Trong Trắng (Inner) + Quần lụa (Bottom) + Áo Tấc (Outer) + Giày Sneaker hầm hố (Shoes) + Tai nghe headphone (Accessories).
    4: [
      "trad_inner_trung_don_nu",
      "trad_bottom_quan_lua_trang",
      "trad_outer_nhat_binh",
      "mod_foot_sneaker_trang",
      "mod_acc_tai_nghe"
    ]
  },

  nam: {
    // Nấc 1 (Truyền thống thuần nếp):
    // Nam: Áo lót trắng (Inner) + Quần lụa trắng (Bottom) + Áo Ngũ Thân (Outer) + Guốc mộc (Shoes).
    1: [
      "trad_inner_trung_don_nam",
      "trad_bottom_quan_ong_so_nam",
      "trad_outer_ngu_than_nam",
      "trad_foot_guoc_moc"
    ],

    // Nấc 2 (Cổ điển nhẹ nhàng):
    // Nam: Áo lót trắng (Inner) + Quần lụa (Bottom) + Áo Giao Lĩnh (Outer) + Giày Tây (Shoes).
    2: [
      "trad_inner_trung_don_nam",
      "trad_bottom_quan_ong_so_nam",
      "trad_outer_giao_linh_nam",
      "mod_foot_giay_tay"
    ],

    // Nấc 3 (Cách tân hiện đại):
    // Nam: Áo lót trắng (Inner) + Quần lụa trắng (Bottom) + Áo Ngũ Thân (Outer) + Giày Tây (Shoes) + Kính mát thanh lịch (Accessories).
    3: [
      "trad_inner_trung_don_nam",
      "trad_bottom_quan_ong_so_nam",
      "trad_outer_ngu_than_nam",
      "mod_foot_giay_tay",
      "mod_acc_kinh_ram"
    ],

    // Nấc 4 (Gen Z phá cách - Streetwear):
    // Nam: Áo lót trắng (Inner) + Quần jean (Bottom) + Áo Giao Lĩnh (Outer) + Giày Sneaker (Shoes) + Tai nghe (Accessories).
    4: [
      "trad_inner_trung_don_nam",
      "mod_bottom_quan_jean_nam",
      "trad_outer_giao_linh_nam",
      "mod_foot_sneaker_trang",
      "mod_acc_tai_nghe"
    ]
  }
};

/**
 * Trả về mảng các WardrobeItem đầy đủ của từng preset
 */
export const levelPresetsItems: Record<"nu" | "nam", Record<number, WardrobeItem[]>> = {
  nu: {
    1: levelPresets.nu[1].map((id) => getItem(id)).filter(Boolean) as WardrobeItem[],
    2: levelPresets.nu[2].map((id) => getItem(id)).filter(Boolean) as WardrobeItem[],
    3: levelPresets.nu[3].map((id) => getItem(id)).filter(Boolean) as WardrobeItem[],
    4: levelPresets.nu[4].map((id) => getItem(id)).filter(Boolean) as WardrobeItem[]
  },
  nam: {
    1: levelPresets.nam[1].map((id) => getItem(id)).filter(Boolean) as WardrobeItem[],
    2: levelPresets.nam[2].map((id) => getItem(id)).filter(Boolean) as WardrobeItem[],
    3: levelPresets.nam[3].map((id) => getItem(id)).filter(Boolean) as WardrobeItem[],
    4: levelPresets.nam[4].map((id) => getItem(id)).filter(Boolean) as WardrobeItem[]
  }
};

/**
 * Helper chuyển đổi mảng preset (IDs hoặc WardrobeItem) thành CurrentOutfitState hoàn chỉnh
 */
export function buildOutfitStateFromPreset(
  presetArray: (string | WardrobeItem)[]
): { outfitState: CurrentOutfitState; items: WardrobeItem[] } {
  const items: WardrobeItem[] = presetArray
    .map((entry) => (typeof entry === "string" ? getItem(entry) : entry))
    .filter(Boolean) as WardrobeItem[];

  const outfitState: CurrentOutfitState = {
    inner: null,
    outer: null,
    bottom: null,
    accessory: null,
    headwear: null,
    footwear: null
  };

  items.forEach((item) => {
    let layer = item.layer;
    if (
      item.id === "trad_acc_non_quai_thao" ||
      item.id.includes("khan") ||
      item.id.includes("non")
    ) {
      layer = "headwear";
    }
    outfitState[layer] = item;
  });

  return { outfitState, items };
}

/**
 * Trả về cấu hình preset hoàn chỉnh (Full Outfit) cho Nấc và Giới Tính
 */
export function getLevelPresetOutfitState(
  gender: "nu" | "nam",
  level: number
): {
  level: number;
  gender: "nu" | "nam";
  itemIds: string[];
  outfitState: CurrentOutfitState;
  selectedItems: WardrobeItem[];
  outfitId: string;
} {
  const safeLevel = level >= 1 && level <= 4 ? level : 1;
  const itemIds = levelPresets[gender][safeLevel] || levelPresets[gender][1];
  const { outfitState, items } = buildOutfitStateFromPreset(itemIds);

  const outerItem = outfitState.outer;
  let outfitId = gender === "nu" ? "n_tuchan" : "m_nguthan";
  if (outerItem) {
    if (outerItem.id.includes("tu_than")) outfitId = "n_tuchan";
    else if (outerItem.id.includes("ngu_than"))
      outfitId = gender === "nu" ? "n_nguthan" : "m_nguthan";
    else if (outerItem.id.includes("ao_dai")) outfitId = "n_aodai";
    else if (outerItem.id.includes("nhat_binh")) outfitId = "n_nhatbinh";
    else if (outerItem.id.includes("giao_linh"))
      outfitId = gender === "nu" ? "n_giaulinh" : "m_giaulinh";
  }

  return {
    level: safeLevel,
    gender,
    itemIds,
    outfitState,
    selectedItems: items,
    outfitId
  };
}
