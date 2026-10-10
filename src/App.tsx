/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from "react";
import { outfitDatabase, Outfit } from "./data/outfits";
import { traditionalColors, TraditionalColor } from "./data/colors";
import { voiceDialects, DialectVoice } from "./data/dialects";
import { citiesData, CityWeather } from "./data/weather";
import { stylingLevels, StylingLevelInfo } from "./data/accessories";
import { speakVietnamese } from "./utils/speech";

import { InteractivePaperDoll } from "./components/InteractivePaperDoll";
import { LookbookModal } from "./components/LookbookModal";
import { SuggestionsTab } from "./components/SuggestionsTab";
import { AiAssistantTab } from "./components/AiAssistantTab";
import { QuizTab } from "./components/QuizTab";
import { ComMascot } from "./components/ComMascot";
import { WearingGuideTab } from "./components/WearingGuideTab";
import { costumeStories, CostumeStory } from "./data/storyData";
import { StoryFlipCard } from "./components/StoryFlipCard";
import {
  traditionalWardrobe,
  modernWardrobe,
  WardrobeItem,
  WardrobeLayerType,
  CurrentOutfitState,
  getWardrobeItems,
  getDefaultOutfitState,
  getBaseUndergarmentOutfit,
  getPresetOutfitState
} from "./data/wardrobe";
import {
  levelPresets,
  getLevelPresetOutfitState,
  buildOutfitStateFromPreset
} from "./data/levelPresets";
import { ModernFlipCard } from "./components/ModernFlipCard";
import { TraditionalItemCard } from "./components/TraditionalItemCard";
import {
  getCostumeRecommendations,
  normalizeOccasion,
  RecommendationRankItem
} from "./data/costumeRecommendation";
import { CostumeRecommendationBanner } from "./components/CostumeRecommendationBanner";
const COM_LOGO = new URL("../com-logo.webp", import.meta.url).href;

import {
  Shirt,
  Sparkles,
  MessageSquareText,
  Award,
  MapPin,
  CloudSun,
  User,
  Sliders,
  Volume2,
  VolumeX,
  Palette,
  AlertTriangle,
  Info,
  CheckCircle2,
  Calendar,
  Compass,
  ChevronLeft,
  ChevronRight,
  RotateCw
} from "lucide-react";

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<
    "dressing" | "guide" | "suggest" | "ai" | "quiz" | "phong-thu-do"
  >("dressing");

  const handleSetActiveTab = (
    tab: "dressing" | "guide" | "suggest" | "ai" | "quiz" | "phong-thu-do" | any
  ) => {
    if (tab === "phong-thu-do") {
      setActiveTab("dressing");
    } else {
      setActiveTab(tab);
    }
  };

  // Voice Dialect (bac, trung, nam)
  const [dialectKey, setDialectKey] = useState<"bac" | "trung" | "nam">("bac");
  const currentDialect: DialectVoice = voiceDialects[dialectKey];

  // Global sound state
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Dressing states
  const [cityName, setCityName] = useState("Hà Nội");
  const currentCity: CityWeather = citiesData[cityName] || citiesData["Hà Nội"];

  const [gender, setGender] = useState<"nu" | "nam">("nu");
  const [occasion, setOccasion] = useState("Đi học/Kỷ yếu");

  // Selected Outfit
  const currentOutfitList = outfitDatabase[gender];
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit>(currentOutfitList[0]);

  // Selected Color
  const [selectedColor, setSelectedColor] = useState<TraditionalColor>(traditionalColors[0]);

  // Styling Slider Level (1, 2, 3, 4)
  const [sliderLevel, setSliderLevel] = useState<number>(2);
  const currentLevelInfo: StylingLevelInfo = stylingLevels[sliderLevel];

  // 3D Flip Card state
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const storyScrollRef = useRef<HTMLDivElement>(null);

  // Lookbook Modal state & Captured Doll Canvas Snapshot
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [capturedDollImage, setCapturedDollImage] = useState<string | null>(null);

  // FAB (Floating Action Button) scroll visibility state
  const [showFab, setShowFab] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const mixMatchSection = document.getElementById("mix-match-section");
      if (!mixMatchSection) {
        setShowFab(false);
        return;
      }
      const rect = mixMatchSection.getBoundingClientRect();
      // Khi phần đầu của khu vực Mix & Match chạm vào mép dưới màn hình (bắt đầu xuất hiện trong tầm nhìn, top < window.innerHeight), hiện nút ngay
      if (rect.top < window.innerHeight) {
        setShowFab(true);
      } else {
        setShowFab(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeTab]);

  // 2-Compartment Wardrobe States (Mix & Match)
  const [wardrobeTab, setWardrobeTab] = useState<"traditional" | "modern">("traditional");
  const [wardrobeCategory, setWardrobeCategory] = useState<WardrobeLayerType | "all">("all");
  const [currentOutfit, setCurrentOutfit] = useState<CurrentOutfitState>(() =>
    getDefaultOutfitState("nu")
  );

  // Synchronize default outfit when gender changes
  useEffect(() => {
    setCurrentOutfit(getDefaultOutfitState(gender));
  }, [gender]);

  // Hàm cập nhật mảng trang phục preset lên búp bê
  const setSelectedItems = (items: (WardrobeItem | string)[]) => {
    const { outfitState } = buildOutfitStateFromPreset(items);
    setCurrentOutfit(outfitState);
  };

  const handleEquipWardrobeItem = (item: WardrobeItem) => {
    // Determine target layer accurately from layer or category
    let targetLayer: WardrobeLayerType = item.layer;
    if (!targetLayer && (item as any).category) {
      const cat = (item as any).category;
      if (cat === "Lớp Trong") targetLayer = "inner";
      else if (cat === "Áo Ngoài") targetLayer = "outer";
      else if (cat === "Quần & Váy") targetLayer = "bottom";
      else if (cat === "Giày Dép") targetLayer = "footwear";
      else if (cat === "Phụ Kiện") {
        const idLower = (item.id || "").toLowerCase();
        const nameLower = (item.name || "").toLowerCase();
        if (
          idLower.includes("khan") ||
          idLower.includes("non") ||
          idLower.includes("mu") ||
          nameLower.includes("khăn") ||
          nameLower.includes("nón") ||
          nameLower.includes("mũ")
        ) {
          targetLayer = "headwear";
        } else {
          targetLayer = "accessory";
        }
      }
    }

    if (
      item.layer === "headwear" ||
      (item.id &&
        (item.id.includes("khan") ||
          item.id.includes("non") ||
          item.id.includes("mu")))
    ) {
      targetLayer = "headwear";
    }

    const finalLayer = targetLayer || item.layer || "accessory";

    // Toggle check: Nếu bấm vào món đồ đang được mặc (id trùng), thì set layer về null (tháo đồ ra)
    if (
      currentOutfit[finalLayer]?.id === item.id ||
      Object.values(currentOutfit).some((equipped) => equipped?.id === item.id)
    ) {
      handleUnequipWardrobeItem(item);
      handleSpeak(`Đã tháo ${item.shortName || item.name} ra khỏi búp bê!`);
      return;
    }

    const equippedItem: WardrobeItem = {
      ...item,
      layer: finalLayer
    };

    setCurrentOutfit((prev) => ({
      ...prev,
      [finalLayer]: equippedItem
    }));

    handleSpeak(`Đã mặc ${item.shortName || item.name} lên búp bê!`);

    // If equipping outer, also sync selectedOutfit for Lookbook & Wearing Guide details
    if (finalLayer === "outer") {
      const found = outfitDatabase[gender].find((o) =>
        (item.shortName && o.name.toLowerCase().includes(item.shortName.toLowerCase())) ||
        (item.name && item.name.toLowerCase().includes(o.name.toLowerCase())) ||
        (item.name && o.name.toLowerCase().includes(item.name.toLowerCase())) ||
        (item.svgKey && o.id.toLowerCase().includes(item.svgKey.toLowerCase())) ||
        (item.id && item.id.toLowerCase().includes(o.id.toLowerCase()))
      );
      if (found) setSelectedOutfit(found);
    }
  };

  const handleUnequipWardrobeItem = (item: WardrobeItem) => {
    let targetLayer: WardrobeLayerType = item.layer;
    if (!targetLayer && (item as any).category) {
      const cat = (item as any).category;
      if (cat === "Lớp Trong") targetLayer = "inner";
      else if (cat === "Áo Ngoài") targetLayer = "outer";
      else if (cat === "Quần & Váy") targetLayer = "bottom";
      else if (cat === "Giày Dép") targetLayer = "footwear";
      else if (cat === "Phụ Kiện") {
        const idLower = (item.id || "").toLowerCase();
        if (idLower.includes("khan") || idLower.includes("non") || idLower.includes("mu")) {
          targetLayer = "headwear";
        } else {
          targetLayer = "accessory";
        }
      }
    }
    if (
      item.layer === "headwear" ||
      (item.id &&
        (item.id.includes("khan") ||
          item.id.includes("non") ||
          item.id.includes("mu")))
    ) {
      targetLayer = "headwear";
    }

    const finalLayer = targetLayer || item.layer || "accessory";

    // Set giá trị layer đó về null (tháo đồ ra)
    setCurrentOutfit((prev) => ({
      ...prev,
      [finalLayer]: null
    }));
  };

  // Tháo đồ theo từng layer cụ thể khi click nút X
  const handleUnequipLayer = (layer: WardrobeLayerType) => {
    const itemToRemove = currentOutfit[layer];
    setCurrentOutfit((prev) => ({
      ...prev,
      [layer]: null
    }));
    handleSpeak(
      `Đã cởi ${itemToRemove?.shortName || itemToRemove?.name || "món đồ"} ra khỏi búp bê!`
    );
  };

  // PHẦN 1: Phối lại (Đặt về trạng thái búp bê nguyên bản)
  const handleRemixOutfit = () => {
    const baseOutfit = getBaseUndergarmentOutfit(gender);
    setCurrentOutfit(baseOutfit);
    setSliderLevel(1);
    handleSpeak(
      "Đã làm mới búp bê về trạng thái ban đầu để bạn thỏa sức sáng tạo phối đồ!"
    );
  };

  const handleResetOutfit = () => {
    setCurrentOutfit(getDefaultOutfitState(gender));
    setSliderLevel(1);
    handleSpeak("Đã làm mới búp bê về trạng thái ban đầu!");
  };

  const handleSelectStoryOutfit = (story: CostumeStory) => {
    // 1. Ensure gender matches
    if (gender !== story.gender) {
      setGender(story.gender);
    }

    // 2. Map story to Outfit & full wardrobe layers
    if (story.id === "ao_giao_linh_nu") {
      const outfit = outfitDatabase.nu.find((o) => o.id === "n_giaulinh") || outfitDatabase.nu[0];
      setSelectedOutfit(outfit);
      setCurrentOutfit({
        inner: traditionalWardrobe.find((i) => i.id === "trad_inner_trung_don_nu") || null,
        outer: traditionalWardrobe.find((i) => i.id === "trad_outer_giao_linh_nu") || null,
        bottom: traditionalWardrobe.find((i) => i.id === "trad_bottom_quan_lua_trang") || null,
        accessory: traditionalWardrobe.find((i) => i.id === "trad_acc_dai_that_lung") || null,
        headwear: traditionalWardrobe.find((i) => i.id === "trad_head_khan_van") || null,
        footwear: traditionalWardrobe.find((i) => i.id === "trad_foot_guoc_moc") || null
      });
      setSliderLevel(1);
      setSelectedAccessories([...stylingLevels[1].accessoriesNu]);
      handleSpeak("Đã mặc trọn bộ Áo Giao Lĩnh cổ chéo chuẩn nếp xưa lên búp bê!");
    } else if (story.id === "ao_ngu_than_nu") {
      const outfit = outfitDatabase.nu.find((o) => o.id === "n_nguthan") || outfitDatabase.nu[0];
      setSelectedOutfit(outfit);
      setCurrentOutfit({
        inner: traditionalWardrobe.find((i) => i.id === "trad_inner_trung_don_nu") || null,
        outer: traditionalWardrobe.find((i) => i.id === "trad_outer_ngu_than_nu") || null,
        bottom: traditionalWardrobe.find((i) => i.id === "trad_bottom_quan_lua_trang") || null,
        accessory: traditionalWardrobe.find((i) => i.id === "trad_acc_tui_theu") || null,
        headwear: traditionalWardrobe.find((i) => i.id === "trad_head_khan_van") || null,
        footwear: traditionalWardrobe.find((i) => i.id === "trad_foot_guoc_moc") || null
      });
      setSliderLevel(1);
      setSelectedAccessories([...stylingLevels[1].accessoriesNu]);
      handleSpeak("Đã mặc trọn bộ Áo Ngũ Thân lập lĩnh thanh lịch lên búp bê!");
    } else if (story.id === "ao_tu_than_nu") {
      const outfit = outfitDatabase.nu.find((o) => o.id === "n_tuchan") || outfitDatabase.nu[0];
      setSelectedOutfit(outfit);
      setCurrentOutfit({
        inner: traditionalWardrobe.find((i) => i.id === "trad_inner_yem_dao") || null,
        outer: traditionalWardrobe.find((i) => i.id === "trad_outer_tu_than") || null,
        bottom: traditionalWardrobe.find((i) => i.id === "trad_bottom_vay_dup") || null,
        accessory: traditionalWardrobe.find((i) => i.id === "trad_acc_dai_that_lung") || null,
        headwear: traditionalWardrobe.find((i) => i.id === "trad_head_khan_van") || null,
        footwear: traditionalWardrobe.find((i) => i.id === "trad_foot_guoc_moc") || null
      });
      setSliderLevel(1);
      setSelectedAccessories([...stylingLevels[1].accessoriesNu]);
      handleSpeak("Đã mặc trọn bộ Áo Tứ Thân và Yếm đào Kinh Bắc lên búp bê!");
    } else if (story.id === "ao_nhat_binh_nu") {
      const outfit = outfitDatabase.nu.find((o) => o.id === "n_nhatbinh") || outfitDatabase.nu[0];
      setSelectedOutfit(outfit);
      setCurrentOutfit({
        inner: traditionalWardrobe.find((i) => i.id === "trad_inner_trung_don_nu") || null,
        outer: traditionalWardrobe.find((i) => i.id === "trad_outer_nhat_binh") || null,
        bottom: traditionalWardrobe.find((i) => i.id === "trad_bottom_quan_lua_trang") || null,
        accessory: traditionalWardrobe.find((i) => i.id === "trad_acc_vong_tay_vang") || traditionalWardrobe.find((i) => i.id === "trad_acc_tui_theu") || null,
        headwear: traditionalWardrobe.find((i) => i.id === "trad_head_khan_van") || null,
        footwear: traditionalWardrobe.find((i) => i.id === "trad_foot_guoc_moc") || null
      });
      setSliderLevel(1);
      setSelectedAccessories([...stylingLevels[1].accessoriesNu]);
      handleSpeak("Đã mặc trọn bộ Áo Nhật Bình cung đình triều Nguyễn lên búp bê!");
    } else if (story.id === "ao_dai_cach_tan_nu") {
      const outfit = outfitDatabase.nu.find((o) => o.id === "n_aodai") || outfitDatabase.nu[0];
      setSelectedOutfit(outfit);
      setCurrentOutfit({
        inner: traditionalWardrobe.find((i) => i.id === "trad_inner_trung_don_nu") || null,
        outer: traditionalWardrobe.find((i) => i.id === "trad_outer_ao_dai_cach_tan") || null,
        bottom: traditionalWardrobe.find((i) => i.id === "trad_bottom_quan_lua_trang") || null,
        accessory: traditionalWardrobe.find((i) => i.id === "trad_acc_tui_theu") || null,
        headwear: traditionalWardrobe.find((i) => i.id === "trad_head_khan_van") || null,
        footwear: modernWardrobe.find((i) => i.id === "mod_foot_cao_got") || null
      });
      setSliderLevel(2);
      setSelectedAccessories([...stylingLevels[2].accessoriesNu.filter((a) => !a.toLowerCase().includes("kính"))]);
      handleSpeak("Đã mặc trọn bộ Áo Dài Cách Tân thanh lịch cùng giày cao gót mũi nhọn lên búp bê!");
    } else if (story.id === "ao_giao_linh_nam") {
      const outfit = outfitDatabase.nam.find((o) => o.id === "m_giaulinh") || outfitDatabase.nam[0];
      setSelectedOutfit(outfit);
      setCurrentOutfit({
        inner: traditionalWardrobe.find((i) => i.id === "trad_inner_trung_don_nam") || null,
        outer: traditionalWardrobe.find((i) => i.id === "trad_outer_giao_linh_nam") || null,
        bottom: traditionalWardrobe.find((i) => i.id === "trad_bottom_quan_ong_so_nam") || null,
        accessory: traditionalWardrobe.find((i) => i.id === "trad_acc_quat_xep") || null,
        headwear: traditionalWardrobe.find((i) => i.id === "trad_head_khan_dong_nam") || null,
        footwear: traditionalWardrobe.find((i) => i.id === "trad_foot_guoc_moc") || null
      });
      setSliderLevel(1);
      setSelectedAccessories([...stylingLevels[1].accessoriesNam]);
      handleSpeak("Đã mặc trọn bộ Áo Giao Lĩnh nam nho sinh Đại Việt lên búp bê!");
    } else if (story.id === "ao_ngu_than_nam") {
      const outfit = outfitDatabase.nam.find((o) => o.id === "m_nguthan") || outfitDatabase.nam[0];
      setSelectedOutfit(outfit);
      setCurrentOutfit({
        inner: traditionalWardrobe.find((i) => i.id === "trad_inner_trung_don_nam") || null,
        outer: traditionalWardrobe.find((i) => i.id === "trad_outer_ngu_than_nam") || null,
        bottom: traditionalWardrobe.find((i) => i.id === "trad_bottom_quan_ong_so_nam") || null,
        accessory: traditionalWardrobe.find((i) => i.id === "trad_acc_quat_xep") || null,
        headwear: traditionalWardrobe.find((i) => i.id === "trad_head_khan_dong_nam") || null,
        footwear: traditionalWardrobe.find((i) => i.id === "trad_foot_guoc_moc") || null
      });
      setSliderLevel(1);
      setSelectedAccessories([...stylingLevels[1].accessoriesNam]);
      handleSpeak("Đã mặc trọn bộ Áo Ngũ Thân nam đạo mạo triều Nguyễn lên búp bê!");
    }
  };

  // Active Accessories toggle state (initialized to default accessories for the level)
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>(() => {
    return stylingLevels[2].accessoriesNu;
  });

  // Automatically reset accessories whenever sliderLevel or gender changes
  useEffect(() => {
    const defaultAccs =
      gender === "nu"
        ? stylingLevels[sliderLevel].accessoriesNu
        : stylingLevels[sliderLevel].accessoriesNam;
    setSelectedAccessories([...defaultAccs]);
  }, [sliderLevel, gender]);

  // Toggle individual accessory on/off
  const handleToggleAccessory = (accName: string) => {
    setSelectedAccessories((prev) => {
      if (prev.includes(accName)) {
        return prev.filter((item) => item !== accName);
      } else {
        return [...prev, accName];
      }
    });
  };

  // Update outfit when gender changes
  useEffect(() => {
    const list = outfitDatabase[gender];
    const match = list.find((o) => o.occasion === occasion) || list[0];
    setSelectedOutfit(match);
  }, [gender, occasion]);

  // PHẦN 2: Thuật toán Đề Cử theo Dịp Sử Dụng & Giới Tính
  const recommendationData = useMemo(() => {
    return getCostumeRecommendations(gender, occasion);
  }, [gender, occasion]);

  const {
    normalizedOccasion,
    rankedList,
    topRecommendations,
    primaryRecommendation,
    secondaryRecommendation
  } = recommendationData;

  // Sắp xếp Thẻ Lật Câu Chuyện Cổ Phục theo tỷ lệ % phù hợp (Đẩy trang phục đề cử cao nhất lên đầu danh sách)
  const sortedCostumeStories = useMemo(() => {
    const list = costumeStories.filter((story) => story.gender === gender);
    return [...list].sort((a, b) => {
      const matchA = rankedList.find((r) => r.costume.storyId === a.id);
      const matchB = rankedList.find((r) => r.costume.storyId === b.id);
      const scoreA = matchA ? matchA.score : 0;
      const scoreB = matchB ? matchB.score : 0;
      return scoreB - scoreA;
    });
  }, [gender, rankedList]);

  // Tự động cuộn mượt về đầu danh sách thẻ lật khi đổi Dịp Sử Dụng hoặc Giới Tính
  useEffect(() => {
    if (storyScrollRef.current) {
      storyScrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [gender, occasion]);

  // Handle Speech trigger
  const handleSpeak = (text: string) => {
    if (!soundEnabled) return;
    setIsSpeaking(true);
    speakVietnamese(
      text,
      currentDialect.speechRate,
      currentDialect.speechPitch,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  // Check solemn warning
  const isSolemn = occasion === "Đi chùa/Đi di tích" || occasion === "Lễ cưới/Ăn hỏi";
  const hasCulturalWarning = sliderLevel === 4 && isSolemn;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 flex flex-col justify-between">
      {/* ================= HEADER ================= */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 shadow-xs border-b border-emerald-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Logo Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md animate-mascot-float overflow-hidden bg-emerald-100 border-2 border-emerald-500">
              <img src={COM_LOGO} alt="Cốm Cốm Cute" className="w-12 h-12 rounded-2xl object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-emerald-950 tracking-tight">
                  Cốm Duyệt
                </h1>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                  Việt Phục Remix Gen Z
                </span>
              </div>
              <p className="text-xs text-emerald-700 font-medium">
                "Mặc chất Việt - Bật chất riêng - Cốm duyệt liền!"
              </p>
            </div>
          </div>

          {/* Regional Dialects Selector */}
          <div className="flex items-center gap-1.5 bg-emerald-50/90 p-1.5 rounded-2xl border border-emerald-200">
            <span className="text-xs font-bold text-emerald-900 px-2 hidden md:inline">
              Giọng Cốm:
            </span>
            {(["bac", "trung", "nam"] as const).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setDialectKey(key);
                  const voice = voiceDialects[key];
                  handleSpeak(voice.quickAudioSnippet);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  dialectKey === key
                    ? "bg-emerald-600 text-white shadow-sm scale-102"
                    : "text-emerald-800 hover:bg-emerald-100"
                }`}
                title={`Chọn giọng Cốm ${voiceDialects[key].name}`}
              >
                <span>{voiceDialects[key].avatarEmoji}</span>
                <span>
                  {key === "bac" ? "Bắc" : key === "trung" ? "Trung" : "Nam"}
                </span>
              </button>
            ))}

            {/* Sound Mute/Unmute */}
            <button
              onClick={() => {
                if (soundEnabled) window.speechSynthesis?.cancel();
                setSoundEnabled(!soundEnabled);
              }}
              className={`p-2 rounded-xl text-xs transition-colors ml-1 ${
                soundEnabled
                  ? "text-emerald-700 hover:bg-emerald-200/60"
                  : "text-slate-400 hover:bg-slate-200"
              }`}
              title={soundEnabled ? "Tắt âm thanh giọng đọc" : "Bật âm thanh giọng đọc"}
              aria-label={soundEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-6xl mx-auto px-4 flex space-x-1 sm:space-x-2 border-t border-emerald-100 pt-2 pb-1 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("dressing")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
              activeTab === "dressing" || activeTab === "phong-thu-do"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-emerald-800 hover:bg-emerald-100"
            }`}
          >
            <Shirt className="w-4 h-4" />
            <span>Phòng Thử Đồ</span>
          </button>

          <button
            onClick={() => setActiveTab("guide")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
              activeTab === "guide"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-emerald-800 hover:bg-emerald-100"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Cách Mặc Đúng</span>
          </button>

          <button
            onClick={() => setActiveTab("suggest")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
              activeTab === "suggest"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-emerald-800 hover:bg-emerald-100"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Gợi Ý Của Cốm</span>
          </button>

          <button
            onClick={() => setActiveTab("ai")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
              activeTab === "ai"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-emerald-800 hover:bg-emerald-100"
            }`}
          >
            <MessageSquareText className="w-4 h-4" />
            <span>Hỏi Cốm AI</span>
          </button>

          <button
            onClick={() => setActiveTab("quiz")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
              activeTab === "quiz"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-emerald-800 hover:bg-emerald-100"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Cốm Thử Tài</span>
          </button>
        </div>
      </header>

      {/* ================= MAIN CONTAINER ================= */}
      <main className="max-w-6xl mx-auto px-4 mt-6 flex-1 w-full">
        {/* ================= TAB 1: PHÒNG THỬ ĐỒ ================= */}
        {(activeTab === "dressing" || activeTab === "phong-thu-do") && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* CỘT TRÁI: BẢNG ĐIỀU KHIỂN & LỰA CHỌN */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. Chọn Thành Phố & Thời Tiết */}
              <div className="bg-white p-5 rounded-3xl shadow-xs border border-emerald-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>Chọn Địa Điểm & Khí Hậu</span>
                  </h3>
                  <span className="text-[11px] text-emerald-700 font-medium">
                    Gợi ý chất liệu vải tự nhiên
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
                  {Object.keys(citiesData).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCityName(c)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                        cityName === c
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                          : "bg-emerald-50/50 text-emerald-900 border-emerald-200 hover:bg-emerald-100"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                {/* Weather advice card */}
                <div className="bg-emerald-50/80 p-3.5 rounded-2xl flex items-start gap-3 border border-emerald-200">
                  <CloudSun className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <div className="font-bold text-emerald-950">
                      {cityName} • {currentCity.temp} • {currentCity.weatherDesc}
                    </div>
                    <div className="text-emerald-800 mt-1 leading-relaxed">
                      💡 <strong>Chất liệu khuyên dùng:</strong> {currentCity.fabricAdvice}
                    </div>
                    <div className="text-emerald-700 text-[11px] mt-0.5 italic">
                      Mẹo Cốm: {currentCity.tips}
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Chọn Giới Tính & Dịp Sử Dụng */}
              <div className="bg-white p-5 rounded-3xl shadow-xs border border-emerald-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Giới tính */}
                  <div>
                    <label className="text-xs font-bold text-emerald-950 mb-2 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-emerald-600" />
                      <span>Chọn Giới Tính</span>
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setGender("nu");
                          setOccasion("Đi học/Kỷ yếu");
                        }}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                          gender === "nu"
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                            : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                        }`}
                      >
                        Nữ
                      </button>
                      <button
                        onClick={() => {
                          setGender("nam");
                          setOccasion("Đi học/Kỷ yếu");
                        }}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                          gender === "nam"
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                            : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                        }`}
                      >
                        Nam
                      </button>
                    </div>
                  </div>

                  {/* Dịp sử dụng */}
                  <div>
                    <label className="text-xs font-bold text-emerald-950 mb-2 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      <span>Chọn Dịp Sử Dụng</span>
                    </label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full py-2 px-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Đi học/Kỷ yếu">Đi học / Kỷ yếu</option>
                      <option value="Lễ cưới/Ăn hỏi">Lễ cưới / Ăn hỏi</option>
                      <option value="Đi chùa/Đi di tích">Đi chùa / Đi di tích</option>
                      <option value="Dạo phố Tết">Dạo phố Tết</option>
                      <option value="Sân khấu/Dạ hội">Sân khấu / Dạ hội</option>
                      <option value="Du lịch sống ảo">Du lịch sống ảo</option>
                    </select>
                  </div>
                </div>

                {/* Banner Đề Cử Của Cốm ngay bên dưới dropdown Chọn Dịp Sử Dụng */}
                <CostumeRecommendationBanner
                  occasion={normalizedOccasion}
                  gender={gender}
                  topRecommendations={topRecommendations}
                  primaryRecommendation={primaryRecommendation}
                  secondaryRecommendation={secondaryRecommendation}
                  onApplyOutfit={(storyId) => {
                    const targetStory = costumeStories.find((s) => s.id === storyId);
                    if (targetStory) {
                      handleSelectStoryOutfit(targetStory);
                    }
                  }}
                  onSpeak={handleSpeak}
                />
              </div>

              {/* ================= THẺ LẬT CÂU CHUYỆN (STORY FLIP CARDS) ================= */}
              <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-xs border border-emerald-100 space-y-3">
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-base shadow-2xs">
                      📜
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-emerald-950 flex items-center gap-2">
                        <span>Thẻ Lật Câu Chuyện Cổ Phục</span>
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full">
                          {gender === "nu" ? "5 trang phục Nữ" : "2 trang phục Nam"}
                        </span>
                      </h3>
                      <p className="text-[11px] text-emerald-700 font-medium">
                        Chạm vào thẻ bất kỳ để lật mặt sau đọc điển tích lịch sử
                      </p>
                    </div>
                  </div>

                  {/* Thanh điều hướng cuộn ngang */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        if (storyScrollRef.current) {
                          storyScrollRef.current.scrollBy({ left: -260, behavior: "smooth" });
                        }
                      }}
                      className="p-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors cursor-pointer"
                      title="Cuộn thẻ sang trái"
                      aria-label="Cuộn thẻ sang trái"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (storyScrollRef.current) {
                          storyScrollRef.current.scrollBy({ left: 260, behavior: "smooth" });
                        }
                      }}
                      className="p-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors cursor-pointer"
                      title="Cuộn thẻ sang phải"
                      aria-label="Cuộn thẻ sang phải"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Container cuộn ngang (Horizontal Scroll) - Tự động đẩy trang phục đề cử lên đầu */}
                <div
                  ref={storyScrollRef}
                  className="flex flex-nowrap gap-4 overflow-x-auto scrollbar-none no-scrollbar hide-scrollbar py-1 px-0.5 scroll-smooth"
                >
                  {sortedCostumeStories.map((story) => {
                    const rankItem = rankedList.find((r) => r.costume.storyId === story.id);
                    return (
                      <StoryFlipCard
                        key={story.id}
                        story={story}
                        gender={gender}
                        recommendationScore={rankItem?.score}
                        isTopRecommended={rankItem?.isTop}
                        rank={rankItem?.rank}
                        onSpeak={handleSpeak}
                        onSelect={handleSelectStoryOutfit}
                      />
                    );
                  })}
                </div>
              </div>

              {/* ================= 3. TỦ ĐỒ 2 NGĂN (MIX & MATCH PHỐI TỪNG MẢNH) ================= */}
              <div id="mix-match-section" className="bg-white p-5 rounded-3xl shadow-xs border border-emerald-100 space-y-4">
                {/* Header & Reset button */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
                  <div>
                    <h3 className="text-sm font-black text-emerald-950 flex items-center gap-2">
                      <span className="text-base">🚪</span>
                      <span>Tủ Đồ Phối Riêng (Mix & Match)</span>
                    </h3>
                    <p className="text-[11px] text-emerald-700 font-medium">
                      Tự do kết hợp từng mảnh y phục Cổ Phục & Gen Z trên búp bê
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleRemixOutfit}
                      className="py-1.5 px-3 rounded-xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
                      title="Phối lại: Giữ 2 món lót nền cơ bản chuẩn thuần phong mỹ tục để bạn tự do phối mới"
                    >
                      <RotateCw className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Phối lại</span>
                    </button>
                    <button
                      onClick={handleResetOutfit}
                      className="py-1.5 px-2.5 rounded-xl text-xs font-bold bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Khôi phục về bộ y phục chuẩn nếp ban đầu"
                    >
                      <span>🔄 Đặt lại nếp chuẩn</span>
                    </button>
                  </div>
                </div>

                {/* 2 Tabs: Tủ Đồ Truyền Thống vs Tủ Đồ Hiện Đại */}
                <div className="flex p-1 bg-stone-100/80 rounded-2xl border border-stone-200">
                  <button
                    onClick={() => setWardrobeTab("traditional")}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      wardrobeTab === "traditional"
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "text-stone-700 hover:text-emerald-900"
                    }`}
                  >
                    <span>👘 Tủ Đồ Truyền Thống</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        wardrobeTab === "traditional"
                          ? "bg-white/20 text-white"
                          : "bg-stone-200 text-stone-700"
                      }`}
                    >
                      {getWardrobeItems("traditional", gender).length}
                    </span>
                  </button>

                  <button
                    onClick={() => setWardrobeTab("modern")}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      wardrobeTab === "modern"
                        ? "bg-gradient-to-r from-pink-600 to-indigo-600 text-white shadow-xs"
                        : "text-stone-700 hover:text-emerald-900"
                    }`}
                  >
                    <span>⚡ Tủ Đồ Hiện Đại (Gen Z)</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        wardrobeTab === "modern"
                          ? "bg-white/20 text-white"
                          : "bg-stone-200 text-stone-700"
                      }`}
                    >
                      {getWardrobeItems("modern", gender).length}
                    </span>
                  </button>
                </div>

                {/* Category Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  {[
                    { id: "all", label: "Tất Cả" },
                    { id: "inner", label: "Lớp Trong" },
                    { id: "outer", label: "Áo Ngoài" },
                    { id: "bottom", label: "Quần & Váy" },
                    { id: "accessory", label: "Phụ Kiện" },
                    { id: "footwear", label: "Giày Dép" }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setWardrobeCategory(cat.id as any)}
                      className={`py-1.5 px-3 rounded-xl text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
                        wardrobeCategory === cat.id
                          ? "bg-slate-900 text-white shadow-xs"
                          : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  {getWardrobeItems(wardrobeTab, gender, wardrobeCategory).map((item) => {
                    const isEquipped =
                      currentOutfit[item.layer]?.id === item.id ||
                      Object.values(currentOutfit).some((equipped) => equipped?.id === item.id);
                    if (wardrobeTab === "modern") {
                      return (
                        <ModernFlipCard
                          key={item.id}
                          item={item}
                          isEquipped={isEquipped}
                          currentColor={selectedColor.hex}
                          gender={gender}
                          onEquip={handleEquipWardrobeItem}
                          onUnequip={handleUnequipWardrobeItem}
                        />
                      );
                    } else {
                      return (
                        <TraditionalItemCard
                          key={item.id}
                          item={item}
                          isEquipped={isEquipped}
                          currentColor={selectedColor.hex}
                          gender={gender}
                          onEquip={handleEquipWardrobeItem}
                          onUnequip={handleUnequipWardrobeItem}
                        />
                      );
                    }
                  })}
                </div>
              </div>

              {/* 4. Chọn Màu Sắc & Ý Nghĩa Lịch Sử */}
              <div className="bg-white p-5 rounded-3xl shadow-xs border border-emerald-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                    <Palette className="w-4 h-4 text-emerald-600" />
                    <span>6 Màu Sắc Cổ Truyền & Điển Cố Triều Đình</span>
                  </h3>
                  <span className="text-[11px] text-emerald-700 font-semibold">
                    Đang chọn: {selectedColor.vietnameseName}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-3">
                  {traditionalColors.map((col) => {
                    const isSelected = selectedColor.id === col.id;
                    return (
                      <button
                        key={col.id}
                        onClick={() => setSelectedColor(col)}
                        className={`p-2.5 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${
                          isSelected
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                            : "bg-emerald-50/50 hover:bg-emerald-100 text-slate-800 border-emerald-200"
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-white/60 shadow-xs shrink-0"
                          style={{ backgroundColor: col.hex }}
                        />
                        <div className="truncate">
                          <div className="font-bold text-xs truncate">{col.vietnameseName}</div>
                          <div
                            className={`text-[10px] truncate ${
                              isSelected ? "text-emerald-100" : "text-slate-500"
                            }`}
                          >
                            {col.name.split("(")[0]}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Lore description box */}
                <div className="bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200 text-xs text-amber-950">
                  <div className="font-bold mb-1 flex items-center gap-1.5">
                    <span>✨ Điển cố màu {selectedColor.name}:</span>
                  </div>
                  <p className="leading-relaxed text-slate-700 mb-1">{selectedColor.historyLore}</p>
                  <p className="text-amber-900 font-medium">
                    🎯 <strong>Ứng dụng chuẩn:</strong> {selectedColor.suitability}
                  </p>
                </div>
              </div>

              {/* 5. Phụ Kiện & Thanh Trượt 4 Nấc Phối Đồ */}
              <div className="bg-white p-5 rounded-3xl shadow-xs border border-emerald-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-emerald-600" />
                    <span>Nấc Phối Đồ Gen Z (1 - 4)</span>
                  </h3>
                  <span className="text-xs bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-xl font-bold">
                    Nấc {sliderLevel}: {currentLevelInfo.title}
                  </span>
                </div>

                {/* Slider */}
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="1"
                  value={sliderLevel}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setSliderLevel(val);
                    const defaultAccs =
                      gender === "nu"
                        ? stylingLevels[val].accessoriesNu
                        : stylingLevels[val].accessoriesNam;
                    setSelectedAccessories([...defaultAccs]);
                    if (val === 4 && isSolemn) {
                      handleSpeak(currentDialect.evaluateWarning(selectedOutfit.name, occasion));
                    }
                  }}
                  className="w-full accent-emerald-600 cursor-pointer my-3 h-2 bg-emerald-100 rounded-lg"
                  aria-label="Thanh trượt nấc phối đồ từ 1 đến 4"
                />

                <div className="flex justify-between text-[11px] font-bold text-emerald-800 px-1 mb-4">
                  <span className={sliderLevel === 1 ? "text-emerald-950 font-black" : ""}>
                    1. Truyền Thống
                  </span>
                  <span className={sliderLevel === 2 ? "text-emerald-950 font-black" : ""}>
                    2. Cổ Điển Nhẹ
                  </span>
                  <span className={sliderLevel === 3 ? "text-emerald-950 font-black" : ""}>
                    3. Cách Tân
                  </span>
                  <span className={sliderLevel === 4 ? "text-emerald-950 font-black" : ""}>
                    4. Gen Z Phá Cách
                  </span>
                </div>

                {/* Cultural Warning Banner if level 4 + solemn */}
                {hasCulturalWarning && (
                  <div className="mb-4 bg-red-50 border-2 border-red-300 p-3.5 rounded-2xl flex items-start gap-3 animate-pulse">
                    <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <div className="font-black text-red-900">
                        ⚠️ CẢNH BÁO LỆCH NẾP VĂN HÓA TỪ CỐM!
                      </div>
                      <p className="text-red-800 mt-0.5 leading-relaxed">
                        Bạn đang chọn nấc <strong>Gen Z Phá Cách (Sneaker, Kính râm)</strong> cho dịp <strong>{occasion}</strong>. Chốn tâm linh/hỷ sự cần sự trang nghiêm; Cốm khuyên bạn nên hạ về nấc 1 hoặc 2 để giữ trọn sự tôn kính nhé!
                      </p>
                    </div>
                  </div>
                )}

                {/* Active Accessories Breakdown */}
                <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-2">
                  <div className="font-bold flex items-center justify-between">
                    <span>🛍️ Bộ phụ kiện nấc {sliderLevel} ({gender === "nu" ? "Nữ" : "Nam"}):</span>
                    <span className="text-[11px] text-emerald-700 italic">
                      Click thẻ để bật/tắt
                    </span>
                  </div>

                  <p className="text-emerald-900 font-semibold text-xs leading-relaxed bg-white/70 p-2.5 rounded-xl border border-emerald-200">
                    {gender === "nu"
                      ? currentLevelInfo.accessoriesSummaryNu
                      : currentLevelInfo.accessoriesSummaryNam}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {(gender === "nu"
                      ? currentLevelInfo.accessoriesNu
                      : currentLevelInfo.accessoriesNam
                    ).map((acc) => {
                      const isSelected = selectedAccessories.includes(acc);
                      return (
                        <button
                          key={acc}
                          type="button"
                          onClick={() => handleToggleAccessory(acc)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer shadow-xs select-none ${
                            isSelected
                              ? "bg-white border-emerald-400 text-emerald-900 ring-1 ring-emerald-300 shadow-sm"
                              : "bg-slate-100 border-slate-300 text-slate-400 opacity-60 hover:opacity-80"
                          }`}
                          title={isSelected ? `Bấm để tắt phụ kiện ${acc}` : `Bấm để bật phụ kiện ${acc}`}
                        >
                          {isSelected && <span className="text-emerald-600 font-bold">✓</span>}
                          <span>{acc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* CỘT PHẢI: BÚP BÊ PREVIEW (STICKY) */}
            <div id="mannequin-preview" className="lg:col-span-5 space-y-4 scroll-mt-24">
              <div className="sticky top-20">
                <InteractivePaperDoll
                  outfit={selectedOutfit}
                  currentOutfit={currentOutfit}
                  sliderLevel={sliderLevel}
                  color={selectedColor}
                  levelInfo={currentLevelInfo}
                  gender={gender}
                  dialect={currentDialect}
                  occasion={occasion}
                  selectedLocation={cityName}
                  cityName={cityName}
                  isSpeaking={isSpeaking}
                  activeAccessories={selectedAccessories}
                  onSpeak={handleSpeak}
                  onOpenLookbook={(capturedImg) => {
                    if (capturedImg) {
                      setCapturedDollImage(capturedImg);
                    } else {
                      setCapturedDollImage(null);
                    }
                    setIsLookbookOpen(true);
                  }}
                  onOpenDetails={() => setFlippedCardId(selectedOutfit.id)}
                  onUnequipLayer={handleUnequipLayer}
                  onResetOutfit={handleRemixOutfit}
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= NÚT CUỘN NHANH (FAB) XEM BÚP BÊ CHO MOBILE / TABLET ================= */}
        {(activeTab === "dressing" || activeTab === "phong-thu-do") && (
          <button
            type="button"
            onClick={() => {
              document.getElementById("mannequin-preview")?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`w-12 h-12 rounded-full flex items-center justify-center bg-green-500 text-white shadow-lg fixed bottom-6 right-6 z-50 lg:hidden transition-all duration-300 cursor-pointer active:scale-95 ${
              showFab
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-90 pointer-events-none"
            }`}
            title={gender === "nam" ? "Xem búp bê nam" : "Xem búp bê nữ"}
            aria-label={gender === "nam" ? "Xem búp bê nam" : "Xem búp bê nữ"}
          >
            {gender === "nam" ? (
              /* MaleIcon: SVG hình bóng nam (đầu tròn, thân thẳng vai rộng) */
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="4" r="2.5" />
                <path d="M8.5 8h7c.8 0 1.5.7 1.5 1.5v5c0 .6-.4 1-1 1h-1v6c0 .6-.4 1-1 1h-1.2c-.6 0-1-.4-1-1v-5.5h-1.6v5.5c0 .6-.4 1-1 1H9.2c-.6 0-1-.4-1-1v-6h-1c-.6 0-1-.4-1-1v-5c0-.8.7-1.5 1.5-1.5z" />
              </svg>
            ) : (
              /* FemaleIcon: SVG hình bóng nữ (đầu tròn, thân hình thang/mặc váy xòe) */
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="4" r="2.5" />
                <path d="M9.5 8h5c.8 0 1.5.5 1.8 1.3l2.2 6.2c.2.6-.2 1.2-.8 1.2h-2.2v4.8c0 .5-.4 1-1 1h-1c-.5 0-1-.5-1-1v-4.8h-1v4.8c0 .5-.5 1-1 1h-1c-.6 0-1-.5-1-1v-4.8H6.3c-.6 0-1-.6-.8-1.2l2.2-6.2C8 8.5 8.7 8 9.5 8z" />
              </svg>
            )}
          </button>
        )}

        {/* ================= TAB: CÁCH MẶC ĐÚNG ================= */}
        {activeTab === "guide" && (
          <WearingGuideTab
            dialect={currentDialect}
            onSpeak={handleSpeak}
            onSelectCostumeToDress={(guideId) => {
              // Map guideId to wardrobe item and outfit
              const matchedItem = traditionalWardrobe.find((w) =>
                w.layer === "outer" && (
                  guideId.includes(w.svgKey) ||
                  w.svgKey.includes(guideId) ||
                  guideId.includes(w.id) ||
                  w.id.includes(guideId)
                )
              );
              if (matchedItem) {
                setGender(matchedItem.gender === "nam" ? "nam" : "nu");
                handleEquipWardrobeItem(matchedItem);
              }
              const targetList = outfitDatabase[matchedItem?.gender === "nam" ? "nam" : gender];
              const matchedOutfit = targetList.find((o) =>
                guideId.includes(o.id) || o.id.includes(guideId) || o.name.toLowerCase().includes(guideId.toLowerCase())
              );
              if (matchedOutfit) {
                setSelectedOutfit(matchedOutfit);
              }
              setActiveTab("dressing");
              handleSpeak(`Đã chọn ${matchedItem?.shortName || "cổ phục"} lên búp bê thử đồ!`);
            }}
          />
        )}

        {/* ================= TAB 2: GỢI Ý CỦA CỐM ================= */}
        {activeTab === "suggest" && (
          <SuggestionsTab
            selectedOutfit={selectedOutfit}
            gender={gender}
            occasion={occasion}
            dialect={currentDialect}
            setCurrentOutfit={setCurrentOutfit}
            setSelectedOutfit={setSelectedOutfit}
            setSelectedColor={setSelectedColor}
            setSliderLevel={setSliderLevel}
            setActiveTab={handleSetActiveTab}
            setGender={setGender}
            setOccasion={setOccasion}
            setSelectedItems={setSelectedItems}
            onApplyLevel={(lvl) => {
              const { outfitState, outfitId } = getLevelPresetOutfitState(gender, lvl);
              setCurrentOutfit(outfitState);
              setSliderLevel(lvl);
              const foundOutfit = outfitDatabase[gender].find((o) => o.id === outfitId);
              if (foundOutfit) setSelectedOutfit(foundOutfit);
              setActiveTab("dressing");
            }}
            onApplyPreset={(preset) => {
              setGender(preset.gender);
              setOccasion(preset.occasion);
              const foundOutfit = outfitDatabase[preset.gender].find(
                (o) => o.id === preset.outfitId
              );
              if (foundOutfit) setSelectedOutfit(foundOutfit);
              const foundColor = traditionalColors.find((c) => c.id === preset.colorId);
              if (foundColor) setSelectedColor(foundColor);
              setSliderLevel(preset.level);

              // Cập nhật currentOutfit các layers cho búp bê
              const presetLayers = getPresetOutfitState(
                preset.outfitId,
                preset.gender,
                preset.level
              );
              setCurrentOutfit(presetLayers);

              setActiveTab("dressing");
            }}
            onSpeak={handleSpeak}
          />
        )}

        {/* ================= TAB 3: HỎI CỐM AI ================= */}
        {activeTab === "ai" && (
          <AiAssistantTab
            dialect={currentDialect}
            onSpeak={handleSpeak}
            isSpeaking={isSpeaking}
          />
        )}

        {/* ================= TAB 4: CỐM THỬ TÀI ================= */}
        {activeTab === "quiz" && (
          <QuizTab dialect={currentDialect} onSpeak={handleSpeak} />
        )}
      </main>

      {/* ================= LOOKBOOK MODAL ================= */}
      <LookbookModal
        isOpen={isLookbookOpen}
        onClose={() => {
          setIsLookbookOpen(false);
          setCapturedDollImage(null);
        }}
        outfit={selectedOutfit}
        currentOutfit={currentOutfit}
        capturedDollImage={capturedDollImage}
        color={selectedColor}
        city={currentCity}
        selectedLocation={cityName}
        levelInfo={currentLevelInfo}
        gender={gender}
        dialect={currentDialect}
        occasion={occasion}
        activeAccessories={selectedAccessories}
        onSpeak={handleSpeak}
      />

      {/* ================= FOOTER ================= */}
      <footer className="mt-auto border-t border-emerald-200/60 bg-emerald-50/50 backdrop-blur-xs py-6 sm:py-8 text-center">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center">
          <p className="text-sm font-medium text-slate-600">
            Sản phẩm dự thi Việt Phục Remix - Phát triển bằng ❤️ bởi Đội PINKER
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Thành viên: Nguyễn Anh Thư, Trần Vi Diệu, Kiều Ngọc Khuê
          </p>
        </div>
      </footer>
    </div>
  );
}
