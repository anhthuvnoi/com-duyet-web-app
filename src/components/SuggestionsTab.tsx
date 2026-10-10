import React, { useState } from "react";
import { outfitDatabase, Outfit } from "../data/outfits";
import { traditionalColors, TraditionalColor } from "../data/colors";
import { stylingLevels, StylingLevelInfo } from "../data/accessories";
import { DialectVoice } from "../data/dialects";
import {
  CurrentOutfitState,
  traditionalWardrobe,
  modernWardrobe,
  WardrobeItem
} from "../data/wardrobe";
import {
  levelPresets,
  getLevelPresetOutfitState,
  buildOutfitStateFromPreset
} from "../data/levelPresets";
const GOIY_IMGS = ["goiy-kyyeu", "goiy-damngo", "goiy-daopho", "goiy-codo"].map(
  (f) => new URL(`../../${f}.webp`, import.meta.url).href
);
import {
  Sparkles,
  Volume2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Bookmark,
  Heart,
  RotateCw
} from "lucide-react";
import { playFlipSound, playTingSound } from "../utils/soundEffects";

interface Props {
  selectedOutfit: Outfit;
  gender: "nu" | "nam";
  occasion: string;
  dialect: DialectVoice;
  setCurrentOutfit: React.Dispatch<React.SetStateAction<CurrentOutfitState>>;
  setSelectedOutfit?: React.Dispatch<React.SetStateAction<Outfit>>;
  setSelectedColor: React.Dispatch<React.SetStateAction<TraditionalColor>>;
  setSliderLevel: React.Dispatch<React.SetStateAction<number>>;
  setActiveTab: (tab: "dressing" | "guide" | "suggest" | "ai" | "quiz" | "phong-thu-do" | any) => void;
  setGender?: React.Dispatch<React.SetStateAction<"nu" | "nam">>;
  setOccasion?: React.Dispatch<React.SetStateAction<string>>;
  setSelectedItems?: (items: (WardrobeItem | string)[]) => void;
  onApplyLevel?: (level: number) => void;
  onApplyPreset?: (preset: {
    outfitId: string;
    gender: "nu" | "nam";
    occasion: string;
    colorId: string;
    level: number;
  }) => void;
  onSpeak: (text: string) => void;
}

export const SuggestionsTab: React.FC<Props> = ({
  selectedOutfit,
  gender,
  occasion,
  dialect,
  setCurrentOutfit,
  setSelectedOutfit,
  setSelectedColor,
  setSliderLevel,
  setActiveTab,
  setGender,
  setOccasion,
  setSelectedItems: propSetSelectedItems,
  onApplyLevel,
  onApplyPreset,
  onSpeak
}) => {
  const isSolemn = occasion === "Đi chùa/Đi di tích" || occasion === "Lễ cưới/Ăn hỏi";

  const allWardrobeItems = [...traditionalWardrobe, ...modernWardrobe];
  const getItem = (id: string | null): WardrobeItem | null => {
    if (!id) return null;
    return allWardrobeItems.find((i) => i.id === id) || null;
  };

  // Hàm cập nhật mảng trang phục lên búp bê
  const setSelectedItems = (presetArray: (string | WardrobeItem)[]) => {
    const { outfitState, items } = buildOutfitStateFromPreset(presetArray);
    setCurrentOutfit(outfitState);
    if (propSetSelectedItems) {
      propSetSelectedItems(items);
    }
  };

  // Hàm dùng chung nhận tham số là levelIndex (1, 2, 3, hoặc 4)
  const handleApplyLevel = (levelIndex: number) => {
    playTingSound();

    // Thao tác 1 (Cập nhật Búp Bê): Dựa vào levelIndex và state gender hiện tại,
    // lấy ra mảng preset tương ứng từ levelPresets. Gọi hàm setSelectedItems(presetArray)
    // để búp bê mặc trọn vẹn bộ đồ mới.
    const presetArray = levelPresets[gender][levelIndex];
    setSelectedItems(presetArray);

    // Đồng bộ mức nấc thanh trượt
    setSliderLevel(levelIndex);

    // Đồng bộ áo ngoài sang selectedOutfit cho Lookbook & thông tin ngữ cảnh
    const presetInfo = getLevelPresetOutfitState(gender, levelIndex);
    if (presetInfo && setSelectedOutfit) {
      const foundOutfit = outfitDatabase[gender].find(
        (o) => o.id === presetInfo.outfitId
      );
      if (foundOutfit) setSelectedOutfit(foundOutfit);
    }

    if (onApplyLevel) {
      onApplyLevel(levelIndex);
    }

    const info = stylingLevels[levelIndex];
    onSpeak?.(`Đã áp dụng Nấc ${levelIndex}: ${info.title} vào Phòng Thử Đồ!`);

    // Thao tác 2 (Chuyển Tab): Gọi hàm setActiveTab('phong-thu-do') để đưa người dùng về phòng thử đồ.
    setActiveTab("phong-thu-do");
  };

  const getOutfitImg = (id: string, gen: "nu" | "nam") => {
    return outfitDatabase[gen].find((o) => o.id === id)?.img;
  };

  // Pre-configured curated collections with precise wardrobe layers
  const curatedCollections = [
    {
      title: "Kỷ Yếu Văn Miếu & Thư Viện",
      desc: "Nho nhã, thanh tao, đậm chất học trò đất Tràng An.",
      outfitName: gender === "nu" ? "Áo Tứ Thân & Yếm Đào" : "Áo Giao Lĩnh Nam",
      outfitId: gender === "nu" ? "n_tuchan" : "m_giaulinh",
      gender,
      occasion: "Đi học/Kỷ yếu",
      colorId: "trang",
      colorName: "Trắng Ngà / Nguyệt Bạch",
      level: 2,
      layers:
        gender === "nu"
          ? {
              outer: "trad_outer_tu_than",
              inner: "trad_inner_yem_dao",
              bottom: "trad_bottom_vay_dup",
              accessory: "trad_acc_dai_that_lung",
              headwear: "trad_head_khan_van",
              footwear: "trad_foot_guoc_moc"
            }
          : {
              outer: "trad_outer_giao_linh_nam",
              inner: "trad_inner_trung_don_nam",
              bottom: "trad_bottom_quan_ong_so_nam",
              accessory: "trad_acc_quat_xep",
              headwear: "trad_head_khan_dong_nam",
              footwear: "trad_foot_guoc_moc"
            },
      img: getOutfitImg(gender === "nu" ? "n_tuchan" : "m_giaulinh", gender) || GOIY_IMGS[0]
    },
    {
      title: "Lễ Dạm Ngõ & Hỷ Sự Viên Mãn",
      desc: "Trang nghiêm, quyền quý, hỷ khí ngập tràn cho ngày trọng đại.",
      outfitName: gender === "nu" ? "Áo Nhật Bình" : "Áo Ngũ Thân Nam",
      outfitId: gender === "nu" ? "n_nhatbinh" : "m_nguthan",
      gender,
      occasion: "Lễ cưới/Ăn hỏi",
      colorId: "do",
      colorName: "Xích Đào / Đỏ Son",
      level: 1,
      layers:
        gender === "nu"
          ? {
              outer: "trad_outer_nhat_binh",
              inner: "trad_inner_trung_don_nu",
              bottom: "trad_bottom_quan_lua_trang",
              accessory: "trad_acc_vong_tay_vang",
              headwear: "trad_head_khan_van",
              footwear: "trad_foot_guoc_moc"
            }
          : {
              outer: "trad_outer_ngu_than_nam",
              inner: "trad_inner_trung_don_nam",
              bottom: "trad_bottom_quan_ong_so_nam",
              accessory: "trad_acc_quat_nan",
              headwear: "trad_head_khan_dong_nam",
              footwear: "trad_foot_guoc_moc"
            },
      img: getOutfitImg(gender === "nu" ? "n_nhatbinh" : "m_nguthan", gender) || GOIY_IMGS[1]
    },
    {
      title: "Dạo Phố Tràng Tiền & Bến Bạch Đằng",
      desc: "Năng động, trẻ trung, tự tin hòa nhịp phố thị đương đại.",
      outfitName: gender === "nu" ? "Áo Dài Cách Tân Gen Z" : "Áo Giao Lĩnh Nam",
      outfitId: gender === "nu" ? "n_aodai" : "m_giaulinh",
      gender,
      occasion: "Dạo phố Tết",
      colorId: "cham",
      colorName: "Thanh Chàm Cổ Điển",
      level: 3,
      layers:
        gender === "nu"
          ? {
              outer: "trad_outer_ao_dai_cach_tan",
              inner: "trad_inner_trung_don_nu",
              bottom: "trad_bottom_quan_lua_trang",
              accessory: "mod_acc_kinh_ram",
              headwear: "trad_head_khan_van",
              footwear: "mod_foot_sneaker_trang"
            }
          : {
              outer: "trad_outer_giao_linh_nam",
              inner: "mod_inner_tshirt",
              bottom: "mod_bottom_quan_jean_nam",
              accessory: "mod_acc_tai_nghe",
              headwear: null,
              footwear: "mod_foot_sneaker_trang"
            },
      img: getOutfitImg(gender === "nu" ? "n_aodai" : "m_giaulinh", gender) || GOIY_IMGS[2]
    },
    {
      title: "Vãng Cảnh Cố Đô & Di Tích Lịch Sử",
      desc: "Thanh tịnh, tôn nghiêm, hài hòa cùng kiến trúc lăng tẩm ngàn năm.",
      outfitName: gender === "nu" ? "Áo Ngũ Thân Nữ" : "Áo Ngũ Thân Nam",
      outfitId: gender === "nu" ? "n_nguthan" : "m_nguthan",
      gender,
      occasion: "Đi chùa/Đi di tích",
      colorId: "tim",
      colorName: "Tím Huế Thủy Chung",
      level: 1,
      layers:
        gender === "nu"
          ? {
              outer: "trad_outer_ngu_than_nu",
              inner: "trad_inner_trung_don_nu",
              bottom: "trad_bottom_quan_lua_trang",
              accessory: "trad_acc_tui_theu",
              headwear: "trad_head_khan_van",
              footwear: "trad_foot_guoc_moc"
            }
          : {
              outer: "trad_outer_ngu_than_nam",
              inner: "trad_inner_trung_don_nam",
              bottom: "trad_bottom_quan_ong_so_nam",
              accessory: "trad_acc_quat_nan",
              headwear: "trad_head_khan_dong_nam",
              footwear: "trad_foot_guoc_moc"
            },
      img: getOutfitImg(gender === "nu" ? "n_nguthan" : "m_nguthan", gender) || GOIY_IMGS[3]
    }
  ];

  const [flippedCuratedIdx, setFlippedCuratedIdx] = useState<number | null>(null);

  // Logic xử lý khi bấm nút "Chọn Bộ Này":
  // 1. Cập nhật các layer trang phục vào currentOutfit của búp bê
  // 2. Cập nhật selectedColor
  // 3. Cập nhật sliderLevel
  // 4. Auto-navigation chuyển sang Tab 'dressing' (Phòng Thử Đồ)
  const handleSelectCuratedPreset = (col: (typeof curatedCollections)[0]) => {
    // Phát âm thanh ting xác nhận phối đồ
    playTingSound();

    // 1. Cập nhật các layer trang phục
    const newLayers: CurrentOutfitState = {
      outer: getItem(col.layers.outer),
      inner: getItem(col.layers.inner),
      bottom: getItem(col.layers.bottom),
      accessory: getItem(col.layers.accessory),
      headwear: getItem(col.layers.headwear),
      footwear: getItem(col.layers.footwear)
    };
    setCurrentOutfit(newLayers);

    // Đồng bộ selectedOutfit nếu có
    const targetOutfit =
      outfitDatabase[gender].find((o) => o.id === col.outfitId) ||
      outfitDatabase[gender][0];
    if (targetOutfit && setSelectedOutfit) {
      setSelectedOutfit(targetOutfit);
    }

    // 2. Cập nhật màu sắc khớp thẻ
    const targetColor =
      traditionalColors.find((c) => c.id === col.colorId) || traditionalColors[0];
    setSelectedColor(targetColor);

    // 3. Cập nhật nấc phong cách khớp thẻ
    setSliderLevel(col.level);

    // Cập nhật dịp nếu có
    if (setOccasion) {
      setOccasion(col.occasion);
    }

    // Callback tương thích nếu có
    if (onApplyPreset) {
      onApplyPreset({
        outfitId: col.outfitId,
        gender: col.gender,
        occasion: col.occasion,
        colorId: col.colorId,
        level: col.level
      });
    }

    // Cốm lên tiếng chào mừng & xác nhận
    onSpeak?.(`Cốm đã mặc trọn bộ ${col.title} lên búp bê cho bạn rồi đó!`);

    // 4. Tự động chuyển về Phòng Thử Đồ (Auto-navigation)
    setActiveTab("dressing");
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl shadow-xs border border-emerald-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GỢI Ý PHỐI ĐỒ ĐỘC BẢN TỪ CỐM</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-emerald-950">
            4 Nấc Biến Tấu Cùng {selectedOutfit.name}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-700 mt-1">
            Được căn chỉnh riêng cho dịp: <strong className="text-emerald-900">{occasion}</strong> (
            {gender === "nu" ? "Nữ giới" : "Nam giới"})
          </p>
        </div>

        <div className="flex items-center gap-3 bg-emerald-50 p-3 rounded-2xl border border-emerald-200">
          <span className="text-2xl animate-mascot-float">{dialect.avatarEmoji}</span>
          <div className="text-xs">
            <div className="font-bold text-emerald-950">{dialect.name} nhắc nhở:</div>
            <div className="text-emerald-700">"Khóa chặt nếp tà - Tự do phụ kiện!"</div>
          </div>
        </div>
      </div>

      {/* 4 Nấc Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[1, 2, 3, 4].map((lvl) => {
          const info = stylingLevels[lvl];
          const accessories = gender === "nu" ? info.accessoriesNu : info.accessoriesNam;
          const remark =
            lvl === 4 && isSolemn
              ? dialect.evaluateWarning(selectedOutfit.name, occasion)
              : gender === "nu"
              ? info.comRemarkNu
              : info.comRemarkNam;

          return (
            <div
              key={lvl}
              className={`bg-white rounded-3xl p-5 sm:p-6 shadow-xs border flex flex-col justify-between transition-all hover:shadow-md ${
                lvl === 4 && isSolemn
                  ? "border-amber-300 ring-1 ring-amber-200"
                  : "border-emerald-100 hover:border-emerald-300"
              }`}
            >
              <div>
                {/* Level Tag & Audio Button */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-black px-3 py-1 rounded-xl ${
                      lvl === 1
                        ? "bg-amber-100 text-amber-900"
                        : lvl === 2
                        ? "bg-emerald-100 text-emerald-900"
                        : lvl === 3
                        ? "bg-teal-100 text-teal-900"
                        : "bg-purple-100 text-purple-900"
                    }`}
                  >
                    NẤC {lvl}: {info.title.toUpperCase()}
                  </span>

                  <button
                    onClick={() => onSpeak(remark)}
                    className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg flex items-center gap-1 text-[11px] font-bold transition-all cursor-pointer"
                    title="Nghe Cốm nhận xét nấc này"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Nghe Cốm</span>
                  </button>
                </div>

                <h3 className="font-black text-emerald-950 text-base mb-1">
                  {info.subtitle}
                </h3>
                <p className="text-xs text-slate-600 italic mb-4">
                  "{remark}"
                </p>

                {/* Cultural Locks */}
                <div className="space-y-2 mb-4">
                  <div className="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-100 text-xs">
                    <div className="font-bold text-emerald-950 flex items-center gap-1.5 mb-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Khóa gen cốt lõi:</span>
                    </div>
                    <p className="text-emerald-800 text-[11px] leading-relaxed">
                      {info.coreRuleLocked}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs">
                    <div className="font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Được phép biến tấu phụ kiện:</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      {accessories.slice(0, 4).join(" • ")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => handleApplyLevel(lvl)}
                className="w-full mt-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Áp Dụng Nấc {lvl} Vào Phòng Thử Đồ</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Curated Occasion Collections */}
      <div className="bg-white p-6 rounded-3xl shadow-xs border border-emerald-100">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-black text-emerald-950 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-emerald-600" />
              Bộ Sưu Tập Gợi Ý Theo Dịp Tiêu Biểu
            </h3>
            <p className="text-xs text-emerald-700">
              Chọn nhanh bộ phối mẫu hoàn hảo đã được Cốm kiểm duyệt từ A-Z (Bấm vào thẻ hoặc nút Lật để xem cấu tạo)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {curatedCollections.map((col, idx) => {
            const isFlipped = flippedCuratedIdx === idx;
            const outerItem = getItem(col.layers.outer);
            const innerItem = getItem(col.layers.inner);
            const bottomItem = getItem(col.layers.bottom);
            const accItem = getItem(col.layers.accessory);
            const headItem = getItem(col.layers.headwear);
            const footItem = getItem(col.layers.footwear);

            return (
              <div key={idx} className="perspective-1000 min-h-[430px] w-full select-none">
                <div
                  className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                >
                  {/* ================= MẶT TRƯỚC ================= */}
                  <div className="w-full h-full bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 flex flex-col justify-between hover:shadow-md transition-all backface-hidden">
                    <div
                      className="relative h-64 overflow-hidden bg-stone-100 cursor-pointer group"
                      onClick={() => {
                        playFlipSound();
                        setFlippedCuratedIdx(idx);
                      }}
                      title="Bấm để lật thẻ xem chi tiết từng lớp phối"
                    >
                      <img
                        src={col.img}
                        alt={col.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                        Nấc {col.level}
                      </div>

                      {/* Nút Lật thẻ ở góc trên phải */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          playFlipSound();
                          setFlippedCuratedIdx(idx);
                        }}
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white text-slate-800 text-[10px] font-bold px-2 py-1 rounded-lg backdrop-blur-sm shadow-xs flex items-center gap-1 border border-stone-200 cursor-pointer"
                        title="Lật thẻ xem chi tiết cấu tạo các lớp"
                      >
                        <span>Lật thẻ</span>
                        <RotateCw className="w-2.5 h-2.5 text-emerald-600" />
                      </button>

                      <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-xl text-left">
                        <span className="text-[11px] font-black text-slate-900 block truncate">
                          {col.outfitName}
                        </span>
                        <span className="text-[10px] text-emerald-700">Màu: {col.colorName}</span>
                      </div>
                    </div>

                    <div className="p-3.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 mb-1">{col.title}</h4>
                        <p className="text-[11px] text-slate-600 line-clamp-2 mb-3">
                          {col.desc}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleSelectCuratedPreset(col)}
                          className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-md"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Chọn Bộ Này</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* ================= MẶT SAU (CHI TIẾT CẤU TẠO LỚP) ================= */}
                  <div className="absolute inset-0 w-full h-full bg-emerald-950 text-white rounded-2xl p-4 border-2 border-emerald-500 flex flex-col justify-between backface-hidden rotate-y-180 shadow-md overflow-y-auto text-left">
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-emerald-800">
                        <span className="text-xs font-black text-amber-300 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                          <span>Cấu Tạo {col.outfitName}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            playFlipSound();
                            setFlippedCuratedIdx(null);
                          }}
                          className="p-1 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-emerald-200 text-[10px] font-bold flex items-center gap-1 border border-emerald-700 cursor-pointer"
                        >
                          <span>Đóng</span>
                          <RotateCw className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <div className="mt-2.5 space-y-2 text-[11px]">
                        <div className="p-2 bg-emerald-900/60 rounded-xl border border-emerald-700/60">
                          <span className="text-amber-200 font-bold block mb-1">🧩 Các mảnh ghép lớp áo:</span>
                          <ul className="space-y-1 text-slate-200 text-[10.5px]">
                            {outerItem && <li>• <strong>Áo ngoài:</strong> {outerItem.name}</li>}
                            {innerItem && <li>• <strong>Lớp trong:</strong> {innerItem.name}</li>}
                            {bottomItem && <li>• <strong>Hạ y:</strong> {bottomItem.name}</li>}
                            {headItem && <li>• <strong>Khăn/Mũ:</strong> {headItem.name}</li>}
                            {accItem && <li>• <strong>Đai/Phụ kiện:</strong> {accItem.name}</li>}
                            {footItem && <li>• <strong>Giày dép:</strong> {footItem.name}</li>}
                          </ul>
                        </div>

                        <div className="p-2 bg-emerald-900/40 rounded-xl border border-emerald-800/80 text-[10.5px] text-emerald-100">
                          <strong className="text-amber-300">💡 Gợi ý dịp {col.occasion}:</strong>
                          <p className="mt-0.5 text-slate-300 leading-snug">{col.desc}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-emerald-800/80 flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setFlippedCuratedIdx(null);
                          handleSelectCuratedPreset(col);
                        }}
                        className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>Chọn Bộ Này Ngay</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

